import React from 'react';
import { 
  Rocket, 
  Sparkles, 
  Network, 
  DollarSign, 
  Scale, 
  Database, 
  Radio, 
  Eye, 
  Server,
  ArrowUpRight
} from 'lucide-react';
import { FUTURE_SCOPE_ITEMS } from '../data/projectData';

export default function FutureScope() {
  const iconList = [
    Sparkles,
    Network,
    DollarSign,
    Scale,
    Database,
    Radio,
    Eye,
    Server
  ];

  return (
    <section id="future-scope" className="py-24 relative bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs font-bold text-sky-800 bg-sky-50 px-2.5 py-1 rounded border border-sky-200">
              SECTION 17 • ROADMAP
            </span>
            <span className="text-xs font-mono text-slate-500">FUTURE RESEARCH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Future Scope & Roadmap
          </h2>
          <p className="text-slate-600 mt-2 text-base">
            Promising extensions to bridge academic models with real-world smart grid deployment.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-sky-500 to-teal-500 rounded-full mt-3" />
        </div>

        {/* 8 Future Scope Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FUTURE_SCOPE_ITEMS.map((item, idx) => {
            const Icon = iconList[idx] || Rocket;
            return (
              <div
                key={idx}
                className="lab-card-interactive p-6 bg-white border border-slate-200 shadow-sm group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 text-sky-700 group-hover:bg-sky-50 flex items-center justify-center transition-colors mb-4 shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-sky-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-sky-700 font-bold">
                  <span>Phase {idx + 1}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
