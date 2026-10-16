import React, { useState } from 'react';
import { ShieldAlert, Info } from 'lucide-react';

export default function ConfusionMatrixSection() {
  const [activeCell, setActiveCell] = useState('fn');

  const matrixInfo = {
    tp: {
      title: "True Positive (TP)",
      label: "Actual Fraud → Predicted Fraud",
      type: "Correct Detection",
      color: "border-emerald-200 bg-emerald-50/70 text-emerald-950",
      definition: "The smart meter was genuinely tampered with (FLAG = 1), and the machine learning model accurately flagged it as fraudulent.",
      gridImpact: "Immediate inspection scheduled. Power utility recovers non-technical revenue losses and repairs bypassed meter infrastructure."
    },
    tn: {
      title: "True Negative (TN)",
      label: "Actual Normal → Predicted Normal",
      type: "Correct Detection",
      color: "border-sky-200 bg-sky-50/70 text-sky-950",
      definition: "The consumer operates an honest, legitimate power connection (FLAG = 0), and the model correctly classifies them as normal.",
      gridImpact: "Normal billing continues unhindered. No unnecessary operational disruptions or technician dispatches."
    },
    fp: {
      title: "False Positive (FP)",
      label: "Actual Normal → Predicted Fraud",
      type: "Type I Error (False Alarm)",
      color: "border-amber-200 bg-amber-50/70 text-amber-950",
      definition: "An innocent consumer with atypical usage (e.g., family on vacation or sudden seasonal variation) is incorrectly flagged as a thief.",
      gridImpact: "Utility incurs operational labor cost dispatching field technicians to inspect a compliant meter; slight risk of customer friction."
    },
    fn: {
      title: "False Negative (FN)",
      label: "Actual Fraud → Predicted Normal",
      type: "Type II Error (Critical Miss)",
      color: "border-rose-200 bg-rose-50/70 text-rose-950",
      definition: "A fraudulent consumer who bypassed or tampered with the smart meter is incorrectly classified as a legitimate customer.",
      gridImpact: "Worst-case utility scenario. Theft continues undetected indefinitely, causing direct financial revenue loss and transformer overload."
    }
  };

  const selected = matrixInfo[activeCell];

  return (
    <section id="confusion-matrix" className="py-24 relative bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs font-bold text-sky-800 bg-sky-50 px-2.5 py-1 rounded border border-sky-200">
              SECTION 12 • DIAGNOSTICS
            </span>
            <span className="text-xs font-mono text-slate-500">DECISION OUTCOMES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Understanding Model Predictions
          </h2>
          <p className="text-slate-600 mt-2 text-base">
            Deconstructing classification decision outcomes and their asymmetric operational impact on power utilities.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-sky-500 to-teal-500 rounded-full mt-3" />
        </div>

        {/* Clear Notice */}
        <div className="mb-8 p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs font-mono">
          <span className="text-slate-700 font-semibold flex items-center gap-2">
            <Info className="w-4 h-4 text-sky-600" />
            Classification Diagnostics: Conceptual Confusion Matrix
          </span>
          <span className="text-amber-800 font-semibold px-2.5 py-0.5 rounded bg-amber-50 border border-amber-200">
            Conceptual Matrix
          </span>
        </div>

        {/* 2x2 Interactive Matrix Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Matrix Container */}
          <div className="lg:col-span-7 lab-card p-6 sm:p-8 bg-slate-50/70 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
              <span className="text-xs font-mono uppercase text-slate-600 font-bold">
                Interactive 2×2 Decision Matrix
              </span>
              <span className="text-xs font-mono text-slate-500">Click any quadrant to inspect</span>
            </div>

            <div className="space-y-3">
              
              {/* Column Headers */}
              <div className="grid grid-cols-12 gap-2 text-center text-xs font-mono">
                <div className="col-span-3"></div>
                <div className="col-span-9 grid grid-cols-2 gap-2 font-bold text-slate-700">
                  <div className="bg-white py-2 rounded-lg border border-slate-200 shadow-2xs">
                    Predicted: Normal (0)
                  </div>
                  <div className="bg-white py-2 rounded-lg border border-slate-200 shadow-2xs">
                    Predicted: Fraud (1)
                  </div>
                </div>
              </div>

              {/* Row 1: Actual Normal */}
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-3 flex items-center justify-center p-2 rounded-lg bg-white font-mono text-xs font-bold text-emerald-800 border border-slate-200 text-center shadow-2xs">
                  Actual: Normal (0)
                </div>
                <div className="col-span-9 grid grid-cols-2 gap-2">
                  
                  {/* True Negative */}
                  <div
                    onClick={() => setActiveCell('tn')}
                    className={`p-4 rounded-xl cursor-pointer border transition-all text-center ${
                      activeCell === 'tn'
                        ? 'border-sky-500 bg-sky-50/70 shadow-sm ring-1 ring-sky-500/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-mono font-bold text-sky-800 mb-1">True Negative (TN)</div>
                    <div className="text-sm font-extrabold text-slate-900">Correct Normal</div>
                    <span className="text-[10px] text-slate-500 block mt-1">Normal billing maintained</span>
                  </div>

                  {/* False Positive */}
                  <div
                    onClick={() => setActiveCell('fp')}
                    className={`p-4 rounded-xl cursor-pointer border transition-all text-center ${
                      activeCell === 'fp'
                        ? 'border-amber-500 bg-amber-50/70 shadow-sm ring-1 ring-amber-500/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-mono font-bold text-amber-800 mb-1">False Positive (FP)</div>
                    <div className="text-sm font-extrabold text-slate-900">Type I Error</div>
                    <span className="text-[10px] text-slate-500 block mt-1">False alarm inspection</span>
                  </div>

                </div>
              </div>

              {/* Row 2: Actual Fraud */}
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-3 flex items-center justify-center p-2 rounded-lg bg-white font-mono text-xs font-bold text-rose-800 border border-slate-200 text-center shadow-2xs">
                  Actual: Fraud (1)
                </div>
                <div className="col-span-9 grid grid-cols-2 gap-2">
                  
                  {/* False Negative */}
                  <div
                    onClick={() => setActiveCell('fn')}
                    className={`p-4 rounded-xl cursor-pointer border transition-all text-center ${
                      activeCell === 'fn'
                        ? 'border-rose-500 bg-rose-50/70 shadow-sm ring-1 ring-rose-500/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-mono font-bold text-rose-800 mb-1">False Negative (FN)</div>
                    <div className="text-sm font-extrabold text-slate-900">Type II Error</div>
                    <span className="text-[10px] text-rose-700 font-bold block mt-1">Critical Theft Miss!</span>
                  </div>

                  {/* True Positive */}
                  <div
                    onClick={() => setActiveCell('tp')}
                    className={`p-4 rounded-xl cursor-pointer border transition-all text-center ${
                      activeCell === 'tp'
                        ? 'border-emerald-500 bg-emerald-50/70 shadow-sm ring-1 ring-emerald-500/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-mono font-bold text-emerald-800 mb-1">True Positive (TP)</div>
                    <div className="text-sm font-extrabold text-slate-900">Correct Fraud</div>
                    <span className="text-[10px] text-emerald-700 font-semibold block mt-1">Theft detected & halted</span>
                  </div>

                </div>
              </div>

            </div>

            <p className="text-[11px] text-slate-500 mt-4 text-center font-mono">
              Note: Clearly labeled as conceptual matrix as exact per-cell test splits are evaluated through aggregate Precision/Recall.
            </p>
          </div>

          {/* Quadrant Detail Inspector */}
          <div className="lg:col-span-5">
            <div className={`p-6 rounded-2xl lab-card border ${selected.color} shadow-sm transition-all`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase font-bold text-slate-700">{selected.type}</span>
                <span className="text-xs font-mono text-slate-500">{selected.label}</span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-2">{selected.title}</h3>
              
              <div className="p-3 rounded-lg bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 mb-4 leading-relaxed shadow-2xs">
                {selected.definition}
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-700 font-bold">
                  Grid Operational Impact
                </span>
                <p className="text-xs sm:text-sm text-slate-600 bg-white p-3 rounded-lg border border-slate-200 leading-relaxed shadow-2xs">
                  {selected.gridImpact}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200/80 text-xs font-mono text-slate-500 flex items-center justify-between">
                <span>Utility Cost Function:</span>
                <span className="text-rose-700 font-bold">Cost(FN) ≫ Cost(FP)</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
