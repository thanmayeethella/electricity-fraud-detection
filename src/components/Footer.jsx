import React from 'react';
import { Zap, Database, Terminal, Shield } from 'lucide-react';

export default function Footer() {
  const technologies = [
    "Python",
    "Pandas",
    "NumPy",
    "Scikit-learn",
    "Matplotlib",
    "Seaborn",
    "Imbalanced-learn"
  ];

  return (
    <footer className="bg-white border-t border-slate-200 py-16 text-slate-500 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Project Title & Context */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shadow-2xs">
                <Zap className="w-4 h-4 fill-sky-600/20" />
              </div>
              <span className="text-base font-bold text-slate-900 tracking-tight">
                Electricity Fraud Detection
              </span>
            </div>

            <p className="text-slate-600 leading-relaxed max-w-sm text-xs">
              Detection of Potentially Fraudulent Electricity Consumption Patterns Using Machine Learning. College Machine Learning Semester Project / Digital Assignment.
            </p>

            <div className="pt-2">
              <span className="inline-block text-[11px] font-mono px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200">
                Machine Learning Semester Project
              </span>
            </div>
          </div>

          {/* Dataset Attribution */}
          <div className="md:col-span-3 space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase font-mono tracking-wider">
              <Database className="w-3.5 h-3.5 text-teal-600" />
              <span>Dataset Attribution</span>
            </div>
            <p className="text-slate-800 font-semibold">
              SGCC Electricity Theft Detection Dataset
            </p>
            <p className="text-slate-500 text-xs leading-relaxed">
              State Grid Corporation of China (SGCC). Telemetry extracted from <span className="font-mono text-slate-800 font-semibold">datasetsmall.csv</span> (25,863 rows × 28 columns).
            </p>
          </div>

          {/* Technology Stack */}
          <div className="md:col-span-4 space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase font-mono tracking-wider">
              <Terminal className="w-3.5 h-3.5 text-sky-600" />
              <span>Technology & Libraries</span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[11px] px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <div>
            College Machine Learning Digital Assignment • All statistics strictly reflect experimental project data.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-emerald-700 flex items-center gap-1 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              Verified Results
            </span>
            <span>SGCC Benchmark Study</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
