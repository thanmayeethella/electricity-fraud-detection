import React from 'react';
import { Lightbulb, AlertTriangle, Sparkles, Award, Scale } from 'lucide-react';
import { KEY_FINDINGS } from '../data/projectData';

export default function KeyFindings() {
  const iconList = [Scale, Sparkles, Award, AlertTriangle];

  return (
    <section id="findings" className="py-24 relative bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs font-bold text-sky-800 bg-sky-50 px-2.5 py-1 rounded border border-sky-200">
              SECTION 15 • FINDINGS
            </span>
            <span className="text-xs font-mono text-slate-500">CORE INSIGHTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Key Project Findings
          </h2>
          <p className="text-slate-600 mt-2 text-base">
            Four fundamental conclusions distilled from rigorous empirical model evaluation and domain analysis.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-sky-500 to-teal-500 rounded-full mt-3" />
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {KEY_FINDINGS.map((finding, idx) => {
            const Icon = iconList[idx] || Lightbulb;
            return (
              <div
                key={idx}
                className="lab-card-interactive p-6 sm:p-8 bg-white border border-slate-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-black text-sky-700">
                      Finding {finding.number}
                    </span>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-sky-700 shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                    "{finding.title}"
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {finding.summary}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                  <span>Category: Core ML Insight</span>
                  <span className="text-teal-700 font-bold">Verified</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
