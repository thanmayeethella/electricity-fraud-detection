import React, { useState } from 'react';
import { Filter, Sliders, ChevronRight, Info } from 'lucide-react';
import { PREPROCESSING_STEPS } from '../data/projectData';

export default function DataPreprocessing() {
  const [activeStep, setActiveStep] = useState(3);

  const technicalCards = [
    {
      title: "Median Imputation",
      badge: "Missing Values",
      formula: "\\tilde{x} = \\text{median}(X)",
      color: "border-sky-200 bg-sky-50/50 text-sky-900",
      description: "Missing numerical values were handled using median imputation.",
      extended: "Smart meter telemetry often suffers from temporary sensor dropouts, transmission latency, or network disconnects. Rather than discarding records or using the mean (which is sensitive to heavy load spikes), the median was computed per daily feature to impute null values robustly."
    },
    {
      title: "IQR-Based Outlier Clipping",
      badge: "Outlier Treatment",
      formula: "\\text{IQR} = Q_3 - Q_1, \\quad [Q_1 - 1.5\\times\\text{IQR},\\; Q_3 + 1.5\\times\\text{IQR}]",
      color: "border-indigo-200 bg-indigo-50/50 text-indigo-900",
      description: "Outliers were identified using the Interquartile Range (IQR) method and treated through clipping.",
      extended: "Smart meter readings sometimes register erroneous extreme electrical spikes caused by transient surges or short-circuit faults. Extreme consumption values outside the upper bound were clipped rather than deleted, preserving the continuity of the 26-day observation period."
    },
    {
      title: "StandardScaler Feature Scaling",
      badge: "Standardization",
      formula: "z = \\frac{x - \\mu}{\\sigma}",
      color: "border-teal-200 bg-teal-50/50 text-teal-900",
      description: "StandardScaler was used for feature scaling.",
      extended: "StandardScaler was used for feature scaling, transforming daily consumption and engineered metrics into standard z-scores with mean zero and unit variance. This is essential for distance-sensitive algorithms like K-Nearest Neighbors (KNN), Support Vector Machines (SVM), and Logistic Regression."
    },
    {
      title: "CONS_NO Identifier Exclusion",
      badge: "Feature Selection",
      formula: "X_{train} = X \\setminus \\{ \\text{CONS\\_NO} \\}",
      color: "border-amber-200 bg-amber-50/50 text-amber-900",
      description: "CONS_NO was excluded from model training because it is an identifier rather than a meaningful predictive feature.",
      extended: "Consumer account numbers (CONS_NO) are unique surrogate database keys. Keeping identifiers inside feature vectors would cause spurious memorization and target leakage, where models memorize account IDs instead of generalizable electrical consumption characteristics."
    }
  ];

  return (
    <section id="preprocessing" className="py-24 relative bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs font-bold text-sky-800 bg-sky-50 px-2.5 py-1 rounded border border-sky-200">
              SECTION 04 • PREPROCESSING
            </span>
            <span className="text-xs font-mono text-slate-500">CLEANING & SCALING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Data Preprocessing Pipeline
          </h2>
          <p className="text-slate-600 mt-2 text-base">
            Systematic eight-stage data cleansing and standardization applied to raw smart meter telemetry.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-sky-500 to-teal-500 rounded-full mt-3" />
        </div>

        {/* 8-Stage Pipeline */}
        <div className="lab-card p-6 sm:p-8 bg-slate-50/70 border border-slate-200 mb-14">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-sky-600" />
                End-to-End Cleaning Architecture
              </h3>
              <p className="text-xs text-slate-500">Click any step to inspect implementation details.</p>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded bg-white text-slate-700 border border-slate-200 shadow-sm">
              8 Sequential Stages
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {PREPROCESSING_STEPS.map((step, idx) => {
              const isSelected = activeStep === step.step;
              return (
                <div
                  key={step.step}
                  onClick={() => setActiveStep(step.step)}
                  className={`p-4 rounded-xl cursor-pointer transition-all border relative flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white border-sky-500 shadow-md ring-1 ring-sky-500/20'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono font-bold text-xs ${
                        isSelected ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {step.step}
                      </span>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {step.tag}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-slate-900 mb-1">{step.title}</h4>
                    <p className="text-xs text-slate-500 leading-snug line-clamp-2">{step.description}</p>
                  </div>

                  {idx < PREPROCESSING_STEPS.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-slate-300 pointer-events-none">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {activeStep && (
            <div className="mt-6 p-4 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-700 shadow-sm flex items-start gap-3">
              <Info className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-mono text-sky-800 font-bold uppercase">
                  Stage {activeStep} Diagnostic: {PREPROCESSING_STEPS[activeStep - 1]?.title}
                </span>
                <p className="mt-1 leading-relaxed text-slate-600">
                  {PREPROCESSING_STEPS[activeStep - 1]?.description} — {PREPROCESSING_STEPS[activeStep - 1]?.details}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 4 In-Depth Cards (Required Explanations) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {technicalCards.map((card, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl lab-card border ${card.color} shadow-sm`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase font-mono px-2.5 py-0.5 rounded bg-white border border-slate-200 font-bold text-slate-700">
                  {card.badge}
                </span>
                <span className="text-xs font-mono text-slate-500">{card.formula}</span>
              </div>

              <h4 className="text-base font-bold text-slate-900 mb-2">{card.title}</h4>
              
              <div className="p-3 rounded-lg bg-white border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 mb-3 shadow-2xs">
                {card.description}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {card.extended}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
