// Track the timestamp of the last Nominatim request to enforce the 1 request/sec rate limit dynamically
let lastGeocodeTime = 0;

// Simple geocoding function with localStorage caching
const STATE_MAP = {
  'alabama': 'AL', 'alaska': 'AK', 'arizona': 'AZ', 'arkansas': 'AR', 'california': 'CA',
  'colorado': 'CO', 'connecticut': 'CT', 'delaware': 'DE', 'florida': 'FL', 'georgia': 'GA',
  'hawaii': 'HI', 'idaho': 'ID', 'illinois': 'IL', 'indiana': 'IN', 'iowa': 'IA',
  'kansas': 'KS', 'kentucky': 'KY', 'louisiana': 'LA', 'maine': 'ME', 'maryland': 'MD',
  'massachusetts': 'MA', 'michigan': 'MI', 'minnesota': 'MN', 'mississippi': 'MS', 'missouri': 'MO',
  'montana': 'MT', 'nebraska': 'NE', 'nevada': 'NV', 'new hampshire': 'NH', 'new jersey': 'NJ',
  'new mexico': 'NM', 'new york': 'NY', 'north carolina': 'NC', 'north dakota': 'ND', 'ohio': 'OH',
  'oklahoma': 'OK', 'oregon': 'OR', 'pennsylvania': 'PA', 'rhode island': 'RI', 'south carolina': 'SC',
  'south dakota': 'SD', 'tennessee': 'TN', 'texas': 'TX', 'utah': 'UT', 'vermont': 'VT',
  'virginia': 'VA', 'washington': 'WA', 'west virginia': 'WV', 'wisconsin': 'WI', 'wyoming': 'WY'
};

function formatCleanAddress(addressObj, defaultName) {
  if (!addressObj) return defaultName;
  const houseNumber = addressObj.house_number || '';
  const road = addressObj.road || '';
  const city = addressObj.city || addressObj.town || addressObj.village || addressObj.hamlet || addressObj.suburb || addressObj.municipality || '';
  const rawState = addressObj.state || '';
  const postcode = addressObj.postcode || '';

  const stateAbbr = STATE_MAP[rawState.toLowerCase().trim()] || rawState;

  const street = [houseNumber, road].filter(Boolean).join(' ');
  
  if (street && city) {
    let formatted = `${street}, ${city}`;
    if (stateAbbr) {
      formatted += `, ${stateAbbr}`;
    }
    if (postcode) {
      formatted += ` ${postcode}`;
    }
    return formatted;
  }
  return defaultName;
}

// Simple geocoding function with localStorage caching
export async function geocodeAddress(address) {
  if (!address) return null;
  
  const cacheKey = `geocode_v2_${address}`;
  let cached = null;
  try {
    cached = localStorage.getItem(cacheKey);
  } catch (e) {
    console.warn("localStorage is not accessible:", e);
  }
  
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      console.error("Failed to parse cached geocode:", e);
    }
  }

  // Calculate the delay needed to respect Nominatim's 1 request/second usage policy.
  const now = Date.now();
  const timeSinceLast = now - lastGeocodeTime;
  const minInterval = 1100; // 1.1 seconds buffer

  if (timeSinceLast < minInterval) {
    const delay = minInterval - timeSinceLast;
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  // Record actual request initiation time
  lastGeocodeTime = Date.now();

  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(address)}&limit=1`;
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.length > 0) {
      const cleanAddress = formatCleanAddress(data[0].address, data[0].display_name);
      const result = {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
        displayName: cleanAddress
      };
      try {
        localStorage.setItem(cacheKey, JSON.stringify(result));
      } catch (e) {
        console.warn("Could not save to localStorage:", e);
      }
      return result;
    }
    return null;
  } catch (error) {
    console.error(`Failed to geocode address: ${address}`, error);
    return null;
  }
}
