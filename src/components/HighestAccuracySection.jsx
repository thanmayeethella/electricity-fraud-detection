import React from 'react';
import { Award, AlertOctagon, CheckCircle2, XCircle } from 'lucide-react';

export default function HighestAccuracySection() {
  return (
    <section id="highest-accuracy" className="py-24 relative bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Large Highlighted Hero Banner */}
        <div className="lab-card p-8 sm:p-12 bg-white border border-slate-200 shadow-md relative overflow-hidden mb-12">
          
          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-800 border border-sky-200 text-xs font-bold uppercase tracking-wider mb-4">
              <Award className="w-4 h-4 text-sky-600" />
              <span>Highest Observed Accuracy Model</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-baseline gap-4 mb-4">
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                Highest Accuracy: Random Forest
              </h2>
              <span className="text-4xl sm:text-6xl font-black text-sky-700 font-mono">
                92.09%
              </span>
            </div>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-8">
              The accuracy-optimized Random Forest achieved the highest overall test accuracy of <strong>92.09%</strong>.
            </p>

            {/* Metric Breakdown Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 text-center">
                <span className="text-xs uppercase font-mono text-slate-500 font-bold">Accuracy</span>
                <p className="text-3xl sm:text-4xl font-black text-slate-900 font-mono mt-1">92.09%</p>
                <span className="text-[11px] text-slate-500 mt-1 block">Overall Correct</span>
              </div>

              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 text-center">
                <span className="text-xs uppercase font-mono text-emerald-700 font-bold">Precision</span>
                <p className="text-3xl sm:text-4xl font-black text-emerald-700 font-mono mt-1">72.73%</p>
                <span className="text-[11px] text-slate-500 mt-1 block">Positive Predictive Val</span>
              </div>

              <div className="bg-rose-50 p-5 rounded-xl border border-rose-200 text-center">
                <span className="text-xs uppercase font-mono text-rose-800 font-bold">Recall</span>
                <p className="text-3xl sm:text-4xl font-black text-rose-700 font-mono mt-1">5.66%</p>
                <span className="text-[11px] text-rose-800 font-bold mt-1 block">Fraud Detected (Low)</span>
              </div>

              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 text-center">
                <span className="text-xs uppercase font-mono text-indigo-700 font-bold">F1-Score</span>
                <p className="text-3xl sm:text-4xl font-black text-slate-900 font-mono mt-1">10.50%</p>
                <span className="text-[11px] text-slate-500 mt-1 block">Harmonic Mean</span>
              </div>

            </div>

          </div>
        </div>

        {/* Academic Deep Dive: "Why isn't 92.09% enough?" */}
        <div className="rounded-2xl p-6 sm:p-8 bg-rose-50/70 border-2 border-rose-200 shadow-sm relative overflow-hidden">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-rose-600 text-white shrink-0 shadow-sm">
              <AlertOctagon className="w-8 h-8" />
            </div>

            <div className="space-y-4 max-w-4xl">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-rose-700 font-bold">
                  Critical Analytical Evaluation
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                  Why isn't 92.09% enough?
                </h3>
              </div>

              <p className="text-slate-800 text-sm sm:text-base leading-relaxed">
                The dataset is highly imbalanced. Although this Random Forest achieved the highest overall accuracy, its recall was only <strong>5.66%</strong>, meaning that it detected only a small proportion of the actual fraudulent cases.
              </p>

              <div className="p-4 rounded-xl bg-white border border-rose-200 text-slate-700 text-xs sm:text-sm leading-relaxed shadow-xs">
                <strong className="text-slate-900 block mb-1">The Physical Utility Reality:</strong>
                If 100 consumers in a municipal power grid are actively committing electricity theft via meter bypassing or shunting, this 92.09% accurate model catches approximately <strong>only 6 of them</strong>, while <strong>94 fraudulent accounts continue siphoning electricity unbilled</strong>.
              </div>

              <p className="text-slate-800 text-sm sm:text-base leading-relaxed">
                For fraud detection, <strong>Recall</strong>, <strong>Precision</strong> and <strong>F1-score</strong> are important because the objective is not simply to classify the majority class correctly, but also to identify fraudulent consumers.
              </p>

              {/* Contrast Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 uppercase font-mono">Accuracy-First Mindset</h5>
                    <p className="text-xs text-slate-500 mt-1">
                      Maximizes correct overall guesses by defaulting heavily to "Normal", masking pervasive electricity theft.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 uppercase font-mono">Utility-Centered Mindset</h5>
                    <p className="text-xs text-slate-500 mt-1">
                      Prioritizes high Recall and balanced F1-score to actively flag anomalous power draws and minimize non-technical revenue loss.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
