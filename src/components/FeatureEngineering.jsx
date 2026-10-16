import React, { useState } from 'react';
import { Sparkles, ArrowRight, Layers } from 'lucide-react';
import { FEATURES_LIST } from '../data/projectData';

export default function FeatureEngineering() {
  const [selectedFeature, setSelectedFeature] = useState(FEATURES_LIST[0]);

  return (
    <section id="features" className="py-24 relative bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs font-bold text-sky-800 bg-sky-50 px-2.5 py-1 rounded border border-sky-200">
              SECTION 06 • FEATURES
            </span>
            <span className="text-xs font-mono text-slate-500">BEHAVIOURAL INDICATORS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Turning Raw Consumption Into Behavioural Features
          </h2>
          <p className="text-slate-600 mt-2 text-base">
            Instead of relying only on raw daily consumption values, statistical and behavioural features were created.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-sky-500 to-teal-500 rounded-full mt-3" />
        </div>

        {/* Transformation Flow: RAW DAILY DATA -> FEATURE ENGINEERING -> BEHAVIOURAL FEATURES */}
        <div className="lab-card p-6 sm:p-8 bg-slate-50/70 border border-slate-200 mb-14">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Step 1 */}
            <div className="w-full md:w-1/3 bg-white p-5 rounded-xl border border-slate-200 text-center shadow-sm">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
                Telemetry Input
              </span>
              <h4 className="text-sm font-bold text-slate-900 mt-2 mb-1">RAW DAILY DATA</h4>
              <p className="text-xs text-slate-500 mb-3">26 daily smart meter readings (Day 1 to Day 26 in kWh)</p>
              <div className="flex justify-center gap-1 font-mono text-[10px] text-slate-600">
                <span className="bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200">x₁</span>
                <span className="bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200">x₂</span>
                <span className="bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200">x₃</span>
                <span className="text-slate-400">...</span>
                <span className="bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200">x₂₆</span>
              </div>
            </div>

            {/* Transform Arrow */}
            <div className="flex flex-col items-center justify-center text-teal-700 shrink-0">
              <div className="p-2.5 rounded-full bg-white border border-slate-200 shadow-sm text-teal-700">
                <ArrowRight className="w-4 h-4 hidden md:block" />
                <ArrowRight className="w-4 h-4 md:hidden rotate-90" />
              </div>
              <span className="text-[10px] font-mono text-slate-600 mt-1 uppercase font-bold tracking-wider">
                Feature Engineering
              </span>
            </div>

            {/* Step 2 */}
            <div className="w-full md:w-1/3 bg-white p-5 rounded-xl border border-slate-200 text-center shadow-sm">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-sky-50 text-sky-800 font-semibold">
                Mathematical Modeling
              </span>
              <h4 className="text-sm font-bold text-slate-900 mt-2 mb-1">STATISTICAL MAPPING</h4>
              <p className="text-xs text-slate-500 mb-3">Moments, ratios, rate of change, zero-counts & trend slope</p>
              <div className="text-[11px] font-mono text-sky-800 bg-sky-50 py-1 px-2 rounded border border-sky-100">
                f: ℝ²⁶ → ℝ⁹ Behavioural Vectors
              </div>
            </div>

            {/* Transform Arrow */}
            <div className="flex flex-col items-center justify-center text-teal-700 shrink-0">
              <div className="p-2.5 rounded-full bg-white border border-slate-200 shadow-sm text-teal-700">
                <ArrowRight className="w-4 h-4 hidden md:block" />
                <ArrowRight className="w-4 h-4 md:hidden rotate-90" />
              </div>
              <span className="text-[10px] font-mono text-slate-600 mt-1 uppercase font-bold tracking-wider">
                Predictive Space
              </span>
            </div>

            {/* Step 3 */}
            <div className="w-full md:w-1/3 bg-white p-5 rounded-xl border border-slate-200 text-center shadow-sm">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-semibold">
                ML Representation
              </span>
              <h4 className="text-sm font-bold text-slate-900 mt-2 mb-1">BEHAVIOURAL FEATURES</h4>
              <p className="text-xs text-slate-500 mb-3">Interpretable fraud signals robust against noise and offset</p>
              <div className="text-[11px] font-mono text-emerald-800 bg-emerald-50 py-1 px-2 rounded border border-emerald-100 font-semibold">
                9 Compact Descriptive Attributes
              </div>
            </div>

          </div>
        </div>

        {/* Interactive Feature Cards Grid */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-sky-600" />
              The 9 Engineered Behavioural Features
            </h3>
            <span className="text-xs font-mono text-slate-500">Click any card to inspect the fraud detection rationale</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {FEATURES_LIST.map((feat) => {
              const isSelected = selectedFeature.id === feat.id;
              return (
                <div
                  key={feat.id}
                  onClick={() => setSelectedFeature(feat)}
                  className={`p-5 rounded-xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-white border-sky-500 shadow-md ring-1 ring-sky-500/20'
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-slate-900">{feat.name}</span>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {feat.importance} Priority
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-snug mb-3 italic">
                    "{feat.summary}"
                  </p>

                  <div className="p-2 rounded bg-slate-50 font-mono text-[11px] text-slate-700 border border-slate-200 flex items-center justify-between">
                    <span className="text-slate-500">Formula:</span>
                    <span className="font-semibold">{feat.formula}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Inspector for Selected Feature */}
        {selectedFeature && (
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-200">
              <div>
                <span className="text-xs font-mono uppercase text-sky-700 font-bold">Engineered Feature Analysis</span>
                <h4 className="text-lg font-bold text-slate-900">{selectedFeature.name}</h4>
              </div>
              <div className="text-xs font-mono px-3 py-1 rounded bg-white text-slate-700 border border-slate-200 shadow-xs">
                Formula: {selectedFeature.formula}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="text-xs font-mono uppercase text-slate-500 font-semibold mb-1">Standard Definition</h5>
                <p className="text-sm font-semibold text-slate-800 bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                  "{selectedFeature.summary}"
                </p>
              </div>

              <div>
                <h5 className="text-xs font-mono uppercase text-teal-800 font-semibold mb-1">Role in Detecting Electricity Theft</h5>
                <p className="text-xs sm:text-sm text-slate-700 bg-white p-3 rounded-lg border border-slate-200 leading-relaxed shadow-2xs">
                  {selectedFeature.rationale}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
