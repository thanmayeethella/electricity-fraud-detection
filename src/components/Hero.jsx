import React, { useState } from 'react';
import { 
  Zap, 
  ArrowRight, 
  BarChart2, 
  ShieldAlert, 
  Database, 
  Cpu, 
  Activity, 
  CheckCircle2, 
  AlertTriangle,
  Layers,
  ChevronDown,
  Sparkles,
  FileCheck
} from 'lucide-react';

export default function Hero() {
  const [simulationMode, setSimulationMode] = useState('tampered'); // 'normal' | 'tampered'

  const normalPoints = [12.4, 11.8, 13.1, 12.9, 14.0, 13.5, 12.8, 13.2, 12.1, 13.7, 14.2, 13.0, 12.6, 13.3, 14.5, 13.8, 12.9, 13.1, 14.0, 13.4, 12.7, 13.9, 14.1, 13.5, 12.8, 13.2];
  const tamperedPoints = [18.2, 17.9, 19.1, 2.1, 0.0, 0.0, 1.4, 0.0, 0.8, 1.2, 0.0, 0.5, 1.1, 0.0, 0.0, 0.9, 1.3, 0.0, 0.0, 1.5, 0.0, 0.7, 1.0, 0.0, 0.0, 1.2];

  const currentPoints = simulationMode === 'normal' ? normalPoints : tamperedPoints;

  // Build clean SVG path
  const svgWidth = 420;
  const svgHeight = 150;
  const maxVal = 25;
  const pathD = currentPoints
    .map((val, idx) => {
      const x = (idx / (currentPoints.length - 1)) * (svgWidth - 24) + 12;
      const y = svgHeight - 20 - (val / maxVal) * (svgHeight - 40);
      return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <section id="hero" className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden lab-grid border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Lab Reference Badge */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping" />
            <span className="font-mono text-[11px] text-teal-700 font-bold uppercase">SMART ELECTRICITY ANALYTICS LAB</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-600 text-[11px]">College Machine Learning Semester Project / Digital Assignment</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Project Information */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-3">
              <div className="text-xs font-mono font-bold uppercase text-sky-700 tracking-wider">
                [PROJECT REF: ML-SGCC-2026] • APPLIED MACHINE LEARNING
              </div>
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                Electricity Fraud <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-teal-600 to-blue-700">Detection</span>
              </h1>
              <p className="text-lg sm:text-xl font-medium text-slate-700 leading-snug">
                Detection of Potentially Fraudulent Electricity Consumption Patterns Using Machine Learning
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              An end-to-end machine learning approach for identifying potentially fraudulent electricity consumption patterns from consumer usage data.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-sm">
                <Cpu className="w-3.5 h-3.5 text-sky-600" />
                <span>Machine Learning</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-sm">
                <Database className="w-3.5 h-3.5 text-teal-600" />
                <span>SGCC Dataset</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-sm">
                <Layers className="w-3.5 h-3.5 text-indigo-600" />
                <span>Binary Classification</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-sm">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                <span>Fraud Detection</span>
              </div>
            </div>

            {/* CTAs including Live Detection */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <a
                href="#live-detection"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
              >
                <Activity className="w-4 h-4" />
                <span>Run Live Detection</span>
              </a>

              <a
                href="#overview"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold text-sm shadow-sm transition-all hover:border-slate-300"
              >
                <span>Explore the Project</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </a>

              <a
                href="#results"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-all"
              >
                <BarChart2 className="w-4 h-4 text-sky-600" />
                <span>View Results</span>
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-6 border-t border-slate-200/90 grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <p className="text-2xl font-extrabold text-slate-900 tracking-tight font-mono">25,863</p>
                <p className="text-xs text-slate-500">Consumers Analyzed</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-sky-600 tracking-tight font-mono">28</p>
                <p className="text-xs text-slate-500">Telemetry Columns</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-amber-600 tracking-tight font-mono">92.09%</p>
                <p className="text-xs text-slate-500">Top Model Accuracy</p>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Telemetry Waveform & Pipeline Card */}
          <div className="lg:col-span-5">
            <div className="lab-card-elevated p-5 sm:p-6 bg-white border border-slate-200">
              
              {/* Simulator Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                    Telemetry Stream Simulator
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                  <button
                    onClick={() => setSimulationMode('normal')}
                    className={`text-[11px] font-bold px-2.5 py-1 rounded transition-all ${
                      simulationMode === 'normal'
                        ? 'bg-white text-emerald-700 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Normal Profile
                  </button>
                  <button
                    onClick={() => setSimulationMode('tampered')}
                    className={`text-[11px] font-bold px-2.5 py-1 rounded transition-all ${
                      simulationMode === 'tampered'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Fraud Profile
                  </button>
                </div>
              </div>

              {/* 4-Stage Architectural Flow Diagram */}
              <div className="py-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
                    Inference Pipeline Architecture
                  </span>
                  <span className="text-[10px] font-mono text-teal-700 font-bold">END-TO-END</span>
                </div>
                <div className="grid grid-cols-4 gap-2 relative">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-center">
                    <div className="w-6 h-6 rounded bg-sky-100 text-sky-700 mx-auto flex items-center justify-center mb-1">
                      <Zap className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-[10px] font-bold text-slate-800">1. Usage</div>
                    <div className="text-[8px] text-slate-500 font-mono">kWh Meter</div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-center">
                    <div className="w-6 h-6 rounded bg-teal-100 text-teal-700 mx-auto flex items-center justify-center mb-1">
                      <Database className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-[10px] font-bold text-slate-800">2. Data</div>
                    <div className="text-[8px] text-slate-500 font-mono">26 Days</div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-center">
                    <div className="w-6 h-6 rounded bg-indigo-100 text-indigo-700 mx-auto flex items-center justify-center mb-1">
                      <Cpu className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-[10px] font-bold text-slate-800">3. ML</div>
                    <div className="text-[8px] text-slate-500 font-mono">Random Forest</div>
                  </div>

                  <div className={`p-2.5 rounded-lg border text-center transition-all ${
                    simulationMode === 'normal'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : 'bg-rose-50 border-rose-200 text-rose-800'
                  }`}>
                    <div className={`w-6 h-6 rounded mx-auto flex items-center justify-center mb-1 ${
                      simulationMode === 'normal' ? 'bg-emerald-200 text-emerald-800' : 'bg-rose-200 text-rose-800'
                    }`}>
                      {simulationMode === 'normal' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                    </div>
                    <div className="text-[10px] font-bold">
                      {simulationMode === 'normal' ? 'Normal' : 'Fraud'}
                    </div>
                    <div className="text-[8px] font-mono">
                      FLAG {simulationMode === 'normal' ? '0' : '1'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic Waveform Graph Canvas */}
              <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-200 mt-1">
                <div className="flex items-center justify-between text-xs mb-2 text-slate-600">
                  <span className="font-mono text-[11px] font-semibold flex items-center gap-1.5">
                    <Activity className={`w-3.5 h-3.5 ${simulationMode === 'normal' ? 'text-emerald-600' : 'text-rose-600'}`} />
                    26-Day Electricity Consumption Signature
                  </span>
                  <span className="font-mono text-[10px] text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {simulationMode === 'normal' ? 'CONS_004921' : 'CONS_012903'}
                  </span>
                </div>

                <div className="relative w-full h-32 flex items-center justify-center overflow-hidden bg-white rounded-lg border border-slate-200">
                  <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-full">
                    <defs>
                      <linearGradient id="lightNormalGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#059669" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#059669" stopOpacity="0.0" />
                      </linearGradient>
                      <linearGradient id="lightTamperedGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#e11d48" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#e11d48" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Fine grid lines */}
                    <line x1="10" y1="25" x2={svgWidth - 10} y2="25" stroke="#f1f5f9" strokeDasharray="3 3" />
                    <line x1="10" y1="75" x2={svgWidth - 10} y2="75" stroke="#f1f5f9" strokeDasharray="3 3" />
                    <line x1="10" y1="125" x2={svgWidth - 10} y2="125" stroke="#f1f5f9" strokeDasharray="3 3" />

                    {/* Area fill */}
                    <path
                      d={`${pathD} L ${svgWidth - 12} ${svgHeight - 20} L 12 ${svgHeight - 20} Z`}
                      fill={simulationMode === 'normal' ? 'url(#lightNormalGrad)' : 'url(#lightTamperedGrad)'}
                      className="transition-all duration-300"
                    />

                    {/* Stroke line */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke={simulationMode === 'normal' ? '#059669' : '#e11d48'}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-all duration-300"
                    />
                  </svg>
                </div>

                {/* Status Footer */}
                <div className="mt-2.5 pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 font-mono">Detection Diagnostic:</span>
                  <span className={`font-semibold ${simulationMode === 'normal' ? 'text-emerald-700' : 'text-rose-700'}`}>
                    {simulationMode === 'normal' 
                      ? 'Steady Periodic Baseline (Normal Consumer)' 
                      : 'Anomalous Shunt Bypass (14 Zero-Days Flagged)'}
                  </span>
                </div>
              </div>

              {/* Bottom Lab Evaluation Note */}
              <div className="mt-3 px-3 py-2 rounded-lg bg-sky-50/60 border border-sky-100 flex items-center justify-between text-xs">
                <span className="text-slate-600 font-mono text-[11px]">Lab Evaluation Priority:</span>
                <span className="text-sky-800 font-semibold text-[11px]">Precision, Recall & F1 Balanced</span>
              </div>

            </div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="mt-14 flex justify-center">
          <a
            href="#overview"
            className="flex flex-col items-center gap-1 text-slate-400 hover:text-sky-700 transition-colors group"
          >
            <span className="text-[11px] uppercase font-mono tracking-widest text-slate-500 group-hover:text-sky-700">
              Scroll to explore research
            </span>
            <ChevronDown className="w-4 h-4 animate-bounce text-slate-400 group-hover:text-sky-700" />
          </a>
        </div>

      </div>
    </section>
  );
}
