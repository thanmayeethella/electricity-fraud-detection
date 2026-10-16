import React from 'react';
import { 
  Database, 
  Filter, 
  Sparkles, 
  Split, 
  Scale, 
  Cpu, 
  Sliders, 
  CheckCircle2, 
  CheckSquare
} from 'lucide-react';

export default function TrainingPipeline() {
  const pipelineStages = [
    { name: "1. Dataset", icon: Database, desc: "25,863 rows × 28 cols" },
    { name: "2. Preprocessing", icon: Filter, desc: "Median, IQR, Scaling" },
    { name: "3. Feature Eng.", icon: Sparkles, desc: "9 Behavioural Features" },
    { name: "4. Train/Test Split", icon: Split, desc: "80% / 20% Stratified" },
    { name: "5. SMOTE", icon: Scale, desc: "Applied only to train set" },
    { name: "6. Model Training", icon: Cpu, desc: "6 ML Classifiers" },
    { name: "7. Hyperparameter Opt.", icon: Sliders, desc: "GridSearchCV (3-Fold)" },
    { name: "8. Evaluation", icon: CheckCircle2, desc: "Prec, Rec, F1, ROC-AUC" }
  ];

  return (
    <section id="training-pipeline" className="py-24 relative bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs font-bold text-sky-800 bg-sky-50 px-2.5 py-1 rounded border border-sky-200">
              SECTION 09 • PIPELINE
            </span>
            <span className="text-xs font-mono text-slate-500">TRAINING WORKFLOW</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            End-to-End Training & Evaluation Flow
          </h2>
          <p className="text-slate-600 mt-2 text-base">
            Systematic machine learning experimental lifecycle from raw ingestion to cross-validated model evaluation.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-sky-500 to-teal-500 rounded-full mt-3" />
        </div>

        {/* Pipeline Stages */}
        <div className="lab-card p-6 sm:p-8 bg-white border border-slate-200 shadow-sm mb-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 relative">
            {pipelineStages.map((stage, idx) => {
              const Icon = stage.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center flex flex-col items-center justify-between relative group hover:border-sky-300 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-sky-700 border border-slate-200 mb-2 shadow-2xs group-hover:scale-105 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 mb-1 leading-tight">{stage.name}</h4>
                    <p className="text-[10px] text-slate-500 font-mono leading-tight">{stage.desc}</p>
                  </div>

                  {idx < pipelineStages.length - 1 && (
                    <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-slate-300 font-bold">
                      →
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Partitioning Callout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="lab-card p-6 bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2.5 text-sky-800 mb-3 font-bold text-sm">
              <Split className="w-5 h-5 text-sky-600" />
              <span>Dataset Splitting Ratio</span>
            </div>
            <div className="grid grid-cols-2 gap-4 my-4 font-mono">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                <span className="text-xs text-slate-500 uppercase font-sans font-semibold">Training Set</span>
                <p className="text-2xl font-extrabold text-slate-900 my-1">80%</p>
                <span className="text-xs text-slate-600">20,690 samples</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                <span className="text-xs text-slate-500 uppercase font-sans font-semibold">Testing Set</span>
                <p className="text-2xl font-extrabold text-sky-700 my-1">20%</p>
                <span className="text-xs text-slate-600">5,173 samples</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Standard 80:20 partition applied prior to model estimation. Training subset used for SMOTE oversampling and hyperparameter search; test subset strictly held out for final inference.
            </p>
          </div>

          <div className="lab-card p-6 bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2.5 text-indigo-900 mb-3 font-bold text-sm">
              <CheckSquare className="w-5 h-5 text-indigo-600" />
              <span>Stratified Partitioning Principle</span>
            </div>
            <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-200 text-xs sm:text-sm text-indigo-950 leading-relaxed my-2">
              <strong className="text-slate-900 block mb-1">Stratified split was used to preserve class distribution.</strong>
              <p className="text-xs text-indigo-900">
                Due to the acute 8.2% fraud minority, stratified splitting enforces that both the 80% train and 20% test splits retain exactly 91.8% normal and 8.2% fraudulent proportions.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
