import React from 'react';
import { Sliders, Info } from 'lucide-react';
import { HYPERPARAMETER_DATA } from '../data/projectData';

export default function OptimizationSection() {
  const { bestParams, testPerformance, cvScore, cvFolds } = HYPERPARAMETER_DATA;

  return (
    <section id="optimization" className="py-24 relative bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs font-bold text-sky-800 bg-sky-50 px-2.5 py-1 rounded border border-sky-200">
              SECTION 14 • TUNING
            </span>
            <span className="text-xs font-mono text-slate-500">GRIDSEARCHCV OPTIMIZATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Model Optimization (GridSearchCV)
          </h2>
          <p className="text-slate-600 mt-2 text-base">
            Systematic hyperparameter exploration using 3-fold cross-validation on the SMOTE-balanced training partition.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-sky-500 to-teal-500 rounded-full mt-3" />
        </div>

        {/* Optimal Parameters Banner */}
        <div className="lab-card p-6 sm:p-8 bg-slate-50/70 border border-slate-200 shadow-sm mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-200">
            <div>
              <span className="text-xs font-mono uppercase text-sky-700 font-bold">Exhaustive Search Space</span>
              <h3 className="text-lg font-bold text-slate-900">Best Random Forest Hyperparameters</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-3 py-1 rounded bg-white text-slate-700 border border-slate-200 shadow-2xs font-semibold">
                Method: GridSearchCV
              </span>
              <span className="text-xs font-mono px-3 py-1 rounded bg-white text-slate-700 border border-slate-200 shadow-2xs font-semibold">
                Folds: {cvFolds}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-5 rounded-xl bg-white border border-slate-200 text-center shadow-xs">
              <span className="text-xs font-mono text-slate-500 uppercase">Tree Count</span>
              <h4 className="text-base font-bold text-slate-900 mt-1 mb-1 font-mono">n_estimators</h4>
              <p className="text-4xl font-extrabold text-sky-700 font-mono">{bestParams.n_estimators}</p>
              <span className="text-[11px] text-slate-500 mt-2 block">Number of trees in ensemble</span>
            </div>

            <div className="p-5 rounded-xl bg-white border border-slate-200 text-center shadow-xs">
              <span className="text-xs font-mono text-slate-500 uppercase">Maximum Tree Depth</span>
              <h4 className="text-base font-bold text-slate-900 mt-1 mb-1 font-mono">max_depth</h4>
              <p className="text-4xl font-extrabold text-teal-700 font-mono">{bestParams.max_depth}</p>
              <span className="text-[11px] text-slate-500 mt-2 block">Limits tree growth & overfitting</span>
            </div>

            <div className="p-5 rounded-xl bg-white border border-slate-200 text-center shadow-xs">
              <span className="text-xs font-mono text-slate-500 uppercase">Split Threshold</span>
              <h4 className="text-base font-bold text-slate-900 mt-1 mb-1 font-mono">min_samples_split</h4>
              <p className="text-4xl font-extrabold text-indigo-700 font-mono">{bestParams.min_samples_split}</p>
              <span className="text-[11px] text-slate-500 mt-2 block">Min samples needed for node split</span>
            </div>

          </div>
        </div>

        {/* IMPORTANT Mandatory Separation: Cross-Validation vs Final Test Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Card 1: Cross-Validation Performance */}
          <div className="lab-card p-6 sm:p-8 bg-white border border-indigo-200 shadow-sm">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-mono uppercase text-indigo-700 font-bold">Phase 1: In-Sample Optimization</span>
                <h4 className="text-base font-bold text-slate-900">Cross-Validation Result (3-Fold)</h4>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-indigo-50 text-indigo-800 border border-indigo-200 font-semibold">
                Train + SMOTE Folds
              </span>
            </div>

            <div className="p-6 rounded-xl bg-indigo-50/50 border border-indigo-100 text-center my-4">
              <span className="text-xs font-mono uppercase text-indigo-800 font-bold block mb-1">
                Best CV F1-Score
              </span>
              <span className="text-4xl sm:text-5xl font-black text-indigo-900 font-mono tracking-tight">
                0.7929
              </span>
              <p className="text-xs text-indigo-800 mt-2">
                Equivalent to 79.29% mean F1 across 3 cross-validation training folds.
              </p>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Achieved inside the SMOTE-balanced training folds during parameter search. Used strictly for parameter selection and not to be confused with holdout test accuracy.
            </p>
          </div>

          {/* Card 2: Holdout Test Performance */}
          <div className="lab-card p-6 sm:p-8 bg-white border border-sky-200 shadow-sm">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-mono uppercase text-sky-700 font-bold">Phase 2: Final Holdout Verification</span>
                <h4 className="text-base font-bold text-slate-900">Unseen Test Performance (20% Split)</h4>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-sky-50 text-sky-800 border border-sky-200 font-semibold">
                5,173 Real Samples
              </span>
            </div>

            {/* Test Performance Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-4 font-mono">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-center">
                <span className="text-[10px] text-slate-500 uppercase font-sans">Accuracy</span>
                <p className="text-xl font-bold text-slate-900 mt-0.5">{testPerformance.accuracy}%</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-center">
                <span className="text-[10px] text-slate-500 uppercase font-sans">Precision</span>
                <p className="text-xl font-bold text-slate-900 mt-0.5">{testPerformance.precision}%</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-center">
                <span className="text-[10px] text-slate-500 uppercase font-sans">Recall</span>
                <p className="text-xl font-bold text-emerald-700 mt-0.5">{testPerformance.recall}%</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-center">
                <span className="text-[10px] text-slate-500 uppercase font-sans">F1-Score</span>
                <p className="text-xl font-bold text-sky-700 mt-0.5">{testPerformance.f1}%</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-center col-span-2 sm:col-span-2">
                <span className="text-[10px] text-slate-500 uppercase font-sans">ROC-AUC</span>
                <p className="text-xl font-bold text-teal-700 mt-0.5">{testPerformance.rocAuc}</p>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Final honest metrics evaluated on the genuine test distribution (8.2% fraud). Recall improves significantly from 5.66% up to <strong>48.58%</strong>.
            </p>
          </div>

        </div>

        {/* Mandatory Academic Disclaimer Box */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
          <Info className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            <strong className="text-slate-900">Strict Academic Separation:</strong> Cross-validation F1-score (0.7929) represents internal hyperparameter search performance within balanced synthetic training folds. It must NOT be claimed as the final test score. The actual unseen test F1 is <strong>20.50%</strong> and test Recall is <strong>48.58%</strong>.
          </div>
        </div>

      </div>
    </section>
  );
}
