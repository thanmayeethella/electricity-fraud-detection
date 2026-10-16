import React from 'react';
import { Scale, Sparkles, AlertOctagon } from 'lucide-react';
import { PROJECT_METRICS } from '../data/projectData';

export default function SmoteSection() {
  const beforeNormal = PROJECT_METRICS.smoteBefore.normal; // 18,992
  const beforeFraud = PROJECT_METRICS.smoteBefore.fraud;   // 1,698
  const beforeTotal = beforeNormal + beforeFraud;          // 20,690

  const afterNormal = PROJECT_METRICS.smoteAfter.normal;   // 18,992
  const afterFraud = PROJECT_METRICS.smoteAfter.fraud;     // 18,992
  const afterTotal = afterNormal + afterFraud;             // 37,984

  return (
    <section id="smote" className="py-24 relative bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs font-bold text-sky-800 bg-sky-50 px-2.5 py-1 rounded border border-sky-200">
              SECTION 07 • SMOTE
            </span>
            <span className="text-xs font-mono text-slate-500">TRAINING OVERSAMPLING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Class Balancing with SMOTE
          </h2>
          <p className="text-slate-600 mt-2 text-base">
            Resolving the severe 11:1 training skew using Synthetic Minority Oversampling Technique.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-sky-500 to-teal-500 rounded-full mt-3" />
        </div>

        {/* SMOTE Definition Card */}
        <div className="p-6 rounded-2xl lab-card bg-white border border-slate-200 shadow-sm mb-12">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">What is SMOTE?</h3>
              <p className="text-slate-800 text-sm sm:text-base leading-relaxed">
                "SMOTE (Synthetic Minority Oversampling Technique) was applied to the training data to increase representation of the minority fraud class."
              </p>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                Rather than simple random replication (which induces extreme overfitting to existing noise), SMOTE generates synthetic feature vectors along the line segments connecting the k-nearest neighbors in minority feature space.
              </p>
            </div>
          </div>
        </div>

        {/* Before and After SMOTE Horizontal Bar Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Card 1: BEFORE SMOTE */}
          <div className="lab-card p-6 sm:p-8 bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <span className="text-xs font-mono uppercase text-amber-700 font-bold">Training Set (80% Partition)</span>
                <h4 className="text-base font-bold text-slate-900">BEFORE SMOTE</h4>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200 font-semibold">
                Imbalance: 11.2 : 1
              </span>
            </div>

            <div className="space-y-6">
              {/* Normal Bar */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-emerald-800 font-bold flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" /> Normal Consumers
                  </span>
                  <span className="text-slate-900 font-bold">{beforeNormal.toLocaleString()} (91.8%)</span>
                </div>
                <div className="h-7 w-full bg-slate-100 rounded-lg p-1 border border-slate-200">
                  <div 
                    style={{ width: '91.8%' }}
                    className="h-full bg-emerald-600 rounded flex items-center justify-end pr-2 text-[10px] font-mono font-bold text-white"
                  >
                    18,992
                  </div>
                </div>
              </div>

              {/* Fraud Bar */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-rose-800 font-bold flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-600" /> Fraud Consumers
                  </span>
                  <span className="text-slate-900 font-bold">{beforeFraud.toLocaleString()} (8.2%)</span>
                </div>
                <div className="h-7 w-full bg-slate-100 rounded-lg p-1 border border-slate-200">
                  <div 
                    style={{ width: '8.2%' }}
                    className="h-full bg-rose-600 rounded flex items-center justify-center text-[10px] font-mono font-bold text-white"
                  >
                    1,698
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-600">
              <span>Total Training Samples:</span>
              <span className="text-slate-900 font-bold">{beforeTotal.toLocaleString()} instances</span>
            </div>
          </div>

          {/* Card 2: AFTER SMOTE */}
          <div className="lab-card p-6 sm:p-8 bg-white border border-teal-200 shadow-sm ring-1 ring-teal-500/10">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <span className="text-xs font-mono uppercase text-teal-700 font-bold">Synthesized Balance</span>
                <h4 className="text-base font-bold text-slate-900">AFTER SMOTE</h4>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-teal-50 text-teal-800 border border-teal-200 font-semibold">
                Perfect Balance: 1 : 1
              </span>
            </div>

            <div className="space-y-6">
              {/* Normal Bar */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-emerald-800 font-bold flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" /> Normal Consumers
                  </span>
                  <span className="text-slate-900 font-bold">{afterNormal.toLocaleString()} (50.0%)</span>
                </div>
                <div className="h-7 w-full bg-slate-100 rounded-lg p-1 border border-slate-200">
                  <div 
                    style={{ width: '100%' }}
                    className="h-full bg-emerald-600 rounded flex items-center justify-end pr-3 text-[10px] font-mono font-bold text-white"
                  >
                    18,992
                  </div>
                </div>
              </div>

              {/* Fraud Bar */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-rose-800 font-bold flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-600" /> Fraud Consumers (Synthesized)
                  </span>
                  <span className="text-slate-900 font-bold">{afterFraud.toLocaleString()} (50.0%)</span>
                </div>
                <div className="h-7 w-full bg-slate-100 rounded-lg p-1 border border-slate-200">
                  <div 
                    style={{ width: '100%' }}
                    className="h-full bg-gradient-to-r from-rose-600 to-teal-600 rounded flex items-center justify-end pr-3 text-[10px] font-mono font-bold text-white"
                  >
                    18,992 (+17,294 synthetic instances)
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-600">
              <span>Balanced Training Samples:</span>
              <span className="text-teal-800 font-bold">{afterTotal.toLocaleString()} instances</span>
            </div>
          </div>

        </div>

        {/* IMPORTANT Mandatory Note Box */}
        <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/80 border-2 border-amber-300 flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-amber-600 text-white shrink-0 shadow-sm">
            <AlertOctagon className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-amber-950 uppercase font-mono mb-1">
              Methodological Integrity Notice
            </h4>
            <p className="text-sm sm:text-base font-bold text-slate-900">
              SMOTE was applied only to the training data.
            </p>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Applying SMOTE to the test dataset would cause data leakage and artificial inflation of test metrics. The test partition was held out at its authentic real-world 8.2% fraud proportion.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
