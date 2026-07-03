import { Outlet } from 'react-router-dom';
import { AnimatedBackground } from './AnimatedBackground';

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col relative text-text">
      <AnimatedBackground />
      
      {/* Navbar Placeholder */}
      <nav className="w-full h-20 border-b border-white/10 glass-panel sticky top-0 z-50 flex items-center px-8 justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center font-bold text-xl shadow-[0_0_15px_rgba(0,229,255,0.4)]">
            C
          </div>
          <div>
            <h1 className="font-bold tracking-tight text-lg">College Portal</h1>
            <p className="text-xs text-text-secondary">Student Registration</p>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8 flex flex-col">
        <Outlet />
      </main>
      
      {/* Footer Placeholder */}
      <footer className="w-full py-6 text-center text-sm text-text-secondary border-t border-white/10 mt-auto">
        &copy; {new Date().getFullYear()} College Portal. All rights reserved.
      </footer>
    </div>
  );
};
