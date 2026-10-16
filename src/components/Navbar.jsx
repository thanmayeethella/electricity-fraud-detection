import React, { useState, useEffect } from 'react';
import { Zap, Menu, X, ArrowUpRight, Cpu, Sparkles, Activity } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { name: 'Overview', href: '#overview' },
    { name: 'Live Detection', href: '#live-detection', isInteractive: true },
    { name: 'Dataset', href: '#dataset' },
    { name: 'Preprocessing', href: '#preprocessing' },
    { name: 'EDA', href: '#eda' },
    { name: 'Features', href: '#features' },
    { name: 'SMOTE', href: '#smote' },
    { name: 'Models', href: '#models' },
    { name: 'Results', href: '#results' },
    { name: 'Conclusion', href: '#conclusion' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['hero', 'live-detection', 'overview', 'dataset', 'preprocessing', 'eda', 'features', 'smote', 'models', 'results', 'conclusion'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-[0_2px_15px_rgba(15,23,42,0.05)] py-2.5' 
        : 'bg-white/80 backdrop-blur-sm border-b border-slate-200/60 py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo / Brand - Smart Electricity Analytics Lab */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-all shadow-sm">
              <Zap className="w-5 h-5 transition-transform group-hover:scale-105" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm sm:text-base text-slate-900 tracking-tight">
                  Electricity Fraud Detection
                </span>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-sky-100/70 text-sky-700 border border-sky-200/60 hidden sm:inline-block">
                  ANALYTICS LAB
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block font-mono">SGCC Machine Learning Benchmark</p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 bg-slate-100/80 p-1 rounded-full border border-slate-200">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-150 flex items-center gap-1.5 ${
                    link.isInteractive
                      ? 'bg-teal-600 text-white shadow-sm hover:bg-teal-700'
                      : isActive
                        ? 'bg-white text-sky-700 shadow-sm border border-slate-200/80'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  {link.isInteractive && <Activity className="w-3 h-3 animate-pulse" />}
                  <span>{link.name}</span>
                  {link.isInteractive && (
                    <span className="text-[9px] font-mono px-1 py-0.2 bg-teal-800 text-teal-100 rounded font-bold uppercase">
                      Interactive
                    </span>
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <a
              href="#live-detection"
              className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-all shadow-sm hover:shadow"
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Live Detection</span>
            </a>
            <a
              href="#results"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-sky-700 hover:border-sky-300 transition-all shadow-sm"
            >
              <span>Benchmark</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 hover:text-sky-700 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-5 mt-2 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 gap-1.5 mb-3">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-between ${
                    link.isInteractive
                      ? 'bg-teal-600 text-white col-span-2'
                      : isActive
                        ? 'bg-sky-50 text-sky-700 border border-sky-200'
                        : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{link.name}</span>
                  {link.isInteractive && (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 bg-teal-800 rounded text-teal-100">
                      LIVE
                    </span>
                  )}
                </a>
              );
            })}
          </div>
          <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
            <span className="text-slate-500 font-mono text-[11px]">SGCC Smart Meter Telemetry</span>
            <a
              href="#live-detection"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-bold text-teal-700 hover:underline"
            >
              Open Live Detector →
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
