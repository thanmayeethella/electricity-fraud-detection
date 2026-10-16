import React from 'react';
import { 
  Database, 
  Filter, 
  BarChart3, 
  Sparkles, 
  Scale, 
  Cpu, 
  Sliders, 
  CheckCircle2, 
  BarChart2, 
  Compass,
  Activity
} from 'lucide-react';

export default function PipelineTimeline() {
  const steps = [
    { name: "LIVE DETECTION", label: "Interactive Model", target: "#live-detection", icon: Activity, isSpecial: true },
    { name: "DATA", label: "Dataset Ingestion", target: "#dataset", icon: Database },
    { name: "CLEAN", label: "Preprocessing", target: "#preprocessing", icon: Filter },
    { name: "ANALYZE", label: "Exploratory EDA", target: "#eda", icon: BarChart3 },
    { name: "ENGINEER FEATURES", label: "Feature Extraction", target: "#features", icon: Sparkles },
    { name: "BALANCE", label: "SMOTE Oversampling", target: "#smote", icon: Scale },
    { name: "TRAIN", label: "Model Suite", target: "#models", icon: Cpu },
    { name: "TUNE", label: "GridSearchCV Tuning", target: "#optimization", icon: Sliders },
    { name: "COMPARE", label: "Model Benchmark", target: "#results", icon: BarChart2 }
  ];

  return (
    <section className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-white border border-slate-200 text-xs font-semibold text-slate-700 mb-1 shadow-sm">
              <Compass className="w-3.5 h-3.5 text-sky-600" />
              <span className="font-mono text-[11px] text-sky-800 uppercase font-bold">NAVIGATOR</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              End-to-End Methodology Milestones
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Click any stage to jump directly to that research module.
            </p>
          </div>
        </div>

        {/* Clickable Stages Timeline */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <a
                key={idx}
                href={s.target}
                className={`group p-3 rounded-xl border transition-all flex flex-col items-center text-center shadow-sm hover:shadow ${
                  s.isSpecial
                    ? 'bg-teal-50/80 border-teal-200 hover:border-teal-400 hover:bg-teal-100/70'
                    : 'bg-white border-slate-200 hover:border-sky-300 hover:bg-sky-50/50'
                }`}
              >
                <div className={`w-7 h-7 rounded-lg border flex items-center justify-center mb-1.5 transition-transform group-hover:scale-105 ${
                  s.isSpecial 
                    ? 'bg-teal-600 text-white border-teal-700' 
                    : 'bg-slate-50 text-slate-600 border-slate-200 group-hover:text-sky-700 group-hover:bg-sky-50'
                }`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className={`font-mono font-bold text-[10px] tracking-wider ${
                  s.isSpecial ? 'text-teal-900' : 'text-slate-800 group-hover:text-sky-700'
                }`}>
                  {s.name}
                </span>
                <span className="text-[9px] text-slate-500 mt-0.5 leading-tight">
                  {s.label}
                </span>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
