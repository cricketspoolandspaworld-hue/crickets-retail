import Estimator from './components/Estimator';

export default function App() {
  return (
    <div className="min-h-screen bg-brand-light flex flex-col md:flex-row">
      {/* Brand Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-brand-dark text-white fixed h-full left-0 top-0 border-r border-brand-slate z-30 shadow-premium">
        {/* Brand Logo Header */}
        <div className="flex items-center space-x-3 px-6 py-5 border-b border-brand-slate bg-brand-darker">
          <div className="bg-white p-1 rounded-xl flex items-center justify-center w-12 h-12 flex-shrink-0 shadow-sm">
            <img 
              src="https://res.cloudinary.com/drvl3r9me/image/upload/f_auto,q_auto/CRICKET-POOL-LOGO-fun-2_ifxtqw" 
              alt="Cricket's Retail" 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h1 className="font-outfit font-extrabold text-base tracking-tight text-white leading-tight">Cricket's Retail</h1>
            <p className="text-[9px] text-brand-blueLight font-semibold uppercase tracking-wider mt-0.5">Maintenance Estimator</p>
          </div>
        </div>

        {/* Sidebar Info Content */}
        <div className="flex-1 px-6 py-6 space-y-4 text-slate-400 text-xs leading-relaxed">
          <p>
            Welcome to the <strong>Cricket's Retail Maintenance Estimator</strong>.
          </p>
          <p>
            Use this portal to calculate pricing estimates for routine pool maintenance and chemical checks based on pool capacity and service zone distance.
          </p>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-brand-slate bg-brand-darker/60 text-center">
          <p className="text-[10px] text-slate-500">Version 1.0.0</p>
        </div>
      </aside>

      {/* Main View Container */}
      <div className="flex-1 md:ml-64 transition-all duration-300">
        {/* Sticky Header */}
        <header className="sticky top-0 bg-white/85 backdrop-blur-md border-b border-brand-border px-6 py-4.5 z-20 flex justify-between items-center shadow-[0_2px_8px_rgba(0,0,0,0.015)]">
          <div className="flex items-center space-x-3">
            {/* Mobile Logo */}
            <div className="bg-white p-1 rounded-xl border border-brand-border flex items-center justify-center w-11 h-11 flex-shrink-0 shadow-sm md:hidden">
              <img
                src="https://res.cloudinary.com/drvl3r9me/image/upload/f_auto,q_auto/CRICKET-POOL-LOGO-fun-2_ifxtqw"
                alt="Cricket's Retail"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2 className="text-base font-extrabold font-outfit text-slate-800 tracking-tight leading-tight capitalize">
                Maintenance Estimator
              </h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                Cricket's Retail
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-bold px-2.5 py-1.5 bg-brand-blue/10 text-brand-blue rounded-lg border border-brand-blue/15">
              Retail Estimation Portal
            </span>
          </div>
        </header>

        {/* Content View */}
        <main className="p-4 md:p-6 max-w-5xl mx-auto">
          <Estimator />
        </main>
      </div>
    </div>
  );
}
