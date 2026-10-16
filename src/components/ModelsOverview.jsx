import React from 'react';
import { 
  Activity, 
  GitBranch, 
  Trees, 
  Network, 
  ShieldAlert, 
  Zap, 
  Tag
} from 'lucide-react';
import { MODELS_INFO } from '../data/projectData';

export default function ModelsOverview() {
  const iconMap = {
    Activity,
    GitBranch,
    Trees,
    Network,
    ShieldAlert,
    Zap
  };

  return (
    <section id="models" className="py-24 relative bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs font-bold text-sky-800 bg-sky-50 px-2.5 py-1 rounded border border-sky-200">
              SECTION 08 • CLASSIFIERS
            </span>
            <span className="text-xs font-mono text-slate-500">MACHINE LEARNING SUITE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Machine Learning Classifiers
          </h2>
          <p className="text-slate-600 mt-2 text-base">
            Six distinct supervised classification paradigms evaluated on smart grid electricity theft pattern detection.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-sky-500 to-teal-500 rounded-full mt-3" />
        </div>

        {/* 6 Model Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODELS_INFO.map((model, idx) => {
            const Icon = iconMap[model.icon] || Activity;
            return (
              <div
                key={idx}
                className="lab-card-interactive p-6 bg-white border border-slate-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sky-700">
                      <Icon className="w-5 h-5" />
                    </div>
                    {/* Required Badge */}
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 font-semibold">
                      <Tag className="w-3 h-3 text-slate-400" />
                      {model.badge}
                    </span>
                  </div>

                  <div className="text-xs font-mono text-slate-400 mb-1">{model.category}</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {model.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {model.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
                  <span>Task: Supervised Binary</span>
                  <span className="text-sky-700 font-semibold">y ∈ &#123;0, 1&#125;</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
