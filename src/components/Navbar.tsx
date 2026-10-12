import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sparkles, Layers, Calendar, Info, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page transition
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleNavClick = (sectionId?: string) => {
    setIsOpen(false);
    if (!sectionId) return;

    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { label: 'Home', path: '/', isHash: false },
    { label: 'Events', path: '/events', isHash: false, icon: Layers },
    { label: 'Schedule', path: '/#schedule', isHash: true, id: 'schedule', icon: Calendar },
    { label: 'About', path: '/#about', isHash: true, id: 'about', icon: Info },
    { label: 'Contact', path: '/#contact', isHash: true, id: 'contact', icon: PhoneCall },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-nav py-3.5 shadow-xl shadow-black/40 border-b border-emerald-500/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-400 via-green-500 to-teal-400 p-[2px] shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-500/60 transition-all duration-300 transform group-hover:scale-105">
            <div className="w-full h-full bg-[#04120d] rounded-[10px] flex items-center justify-center">
              <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">
                X
              </span>
            </div>
            {/* Glowing corner indicator */}
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping opacity-75" />
          </div>

          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center">
              Event<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-300 to-teal-300">Xora</span>
            </span>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-emerald-400/80 -mt-1 hidden sm:block">
              Tech Fest 2026
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 bg-slate-900/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-slate-800/80 shadow-inner">
          {navLinks.map((item) => {
            const isActive =
              !item.isHash && location.pathname === item.path;

            if (item.isHash) {
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.id)}
                  className="px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all cursor-pointer"
                >
                  {item.label}
                </button>
              );
            }

            return (
              <Link
                key={item.label}
                to={item.path}
                className={`px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/register"
            className="relative group overflow-hidden px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 transition-all duration-300 group-hover:opacity-90" />
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
              Register Now
            </span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            to="/register"
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-bold shadow-md shadow-emerald-500/20"
          >
            Register
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden glass-nav border-b border-emerald-500/30 overflow-hidden"
          >
            <div className="px-5 pt-3 pb-6 space-y-2">
              {navLinks.map((item) => {
                const isActive = !item.isHash && location.pathname === item.path;

                if (item.isHash) {
                  return (
                    <button
                      key={item.label}
                      onClick={() => handleNavClick(item.id)}
                      className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all flex items-center gap-3"
                    >
                      {item.icon && <item.icon className="w-4 h-4 text-emerald-400" />}
                      {item.label}
                    </button>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-3 ${
                      isActive
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    {item.icon && <item.icon className="w-4 h-4 text-emerald-400" />}
                    {item.label}
                  </Link>
                );
              })}

              <div className="pt-3">
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-green-500 to-teal-600 text-white font-bold text-center flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  Register For EventXora 2026
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
