import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Scale, AlertTriangle, Info } from 'lucide-react';
import { PROJECT_METRICS } from '../data/projectData';

export default function DataDistribution() {
  const chartData = [
    { name: 'Normal Consumers (FLAG 0)', value: PROJECT_METRICS.normalConsumers, percentage: PROJECT_METRICS.normalPercentage, color: '#059669' },
    { name: 'Fraudulent Consumers (FLAG 1)', value: PROJECT_METRICS.fraudConsumers, percentage: PROJECT_METRICS.fraudPercentage, color: '#e11d48' }
  ];

  const total = PROJECT_METRICS.totalRecords;

  return (
    <section id="distribution" className="py-24 relative bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs font-bold text-sky-800 bg-sky-50 px-2.5 py-1 rounded border border-sky-200">
              SECTION 03 • DISTRIBUTION
            </span>
            <span className="text-xs font-mono text-slate-500">CLASS IMBALANCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Data Distribution & Class Imbalance
          </h2>
          <p className="text-slate-600 mt-2 text-base">
            Quantifying the acute skewness between legitimate consumer consumption patterns and anomalous fraud cases.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-sky-500 to-teal-500 rounded-full mt-3" />
        </div>

        {/* Central Visualization Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          
          {/* Donut Chart Visual */}
          <div className="lg:col-span-6 lab-card p-6 sm:p-8 bg-white border border-slate-200 shadow-sm relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <span className="text-xs font-mono uppercase text-slate-500 font-bold">Binary Class Donut Ratio</span>
              <span className="text-xs font-mono text-slate-500">Total: {total.toLocaleString()} Records</span>
            </div>

            <div className="h-64 sm:h-72 w-full relative flex items-center justify-center my-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={105}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="#ffffff" strokeWidth={3} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-lg text-xs font-mono">
                            <p className="font-bold text-slate-900 mb-1">{data.name}</p>
                            <p className="text-slate-600">Count: <span className="text-slate-900 font-bold">{data.value.toLocaleString()}</span></p>
                            <p className="text-slate-600">Share: <span className="text-slate-900 font-bold">{data.percentage}%</span></p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* Center Donut Label */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                <span className="text-[11px] font-mono uppercase text-slate-400 font-semibold">Ratio</span>
                <p className="text-2xl font-black text-slate-900 font-mono tracking-tight">11.2 : 1</p>
                <span className="text-[10px] text-rose-700 font-semibold font-mono">Normal / Fraud</span>
              </div>
            </div>

            {/* Legend Cards */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  <span className="text-xs font-bold text-emerald-950">Normal (FLAG 0)</span>
                </div>
                <div className="text-xl font-extrabold text-emerald-700 font-mono">23,741</div>
                <div className="text-[11px] text-emerald-800 font-medium">91.8% of consumers</div>
              </div>

              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-600" />
                  <span className="text-xs font-bold text-rose-950">Fraud (FLAG 1)</span>
                </div>
                <div className="text-xl font-extrabold text-rose-700 font-mono">2,122</div>
                <div className="text-[11px] text-rose-800 font-medium">8.2% of consumers</div>
              </div>
            </div>

          </div>

          {/* Large Percentage Breakdown & Visual Bar */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="lab-card p-6 bg-white border border-slate-200 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-1">Proportional Representation</h3>
              <p className="text-xs text-slate-500 mb-5">
                Visualizing the disparity in class representation across the full 25,863 observations.
              </p>

              {/* Stacked Proportional Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-emerald-700 font-bold">91.8% Normal (23,741)</span>
                  <span className="text-rose-700 font-bold">8.2% Fraud (2,122)</span>
                </div>
                <div className="h-6 w-full rounded-xl bg-slate-100 p-1 flex overflow-hidden border border-slate-200">
                  <div 
                    style={{ width: '91.8%' }} 
                    className="h-full bg-emerald-600 rounded-l-lg transition-all"
                  />
                  <div 
                    style={{ width: '8.2%' }} 
                    className="h-full bg-rose-600 rounded-r-lg transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  <span>Majority Class: Normal accounts</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-600" />
                  <span>Minority Class: Tampered accounts</span>
                </div>
              </div>
            </div>

            {/* The Majority Class Baseline Simulator */}
            <div className="lab-card p-6 bg-amber-50/60 border border-amber-200">
              <div className="flex items-center gap-2 text-amber-900 mb-2 font-bold text-sm">
                <AlertTriangle className="w-4 h-4 text-amber-700" />
                <span>The Naive Majority Classifier Baseline</span>
              </div>
              <p className="text-xs text-amber-900 leading-relaxed mb-3">
                If a trivial classifier simply outputs <strong>"FLAG = 0 (Normal)"</strong> for every single consumer without inspecting their usage readings, it will achieve:
              </p>
              
              <div className="grid grid-cols-3 gap-2 text-center font-mono">
                <div className="bg-white p-2.5 rounded-lg border border-amber-200 shadow-sm">
                  <div className="text-lg font-bold text-emerald-700">91.8%</div>
                  <div className="text-[10px] text-slate-500 uppercase font-sans">Accuracy</div>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-amber-200 shadow-sm">
                  <div className="text-lg font-bold text-rose-700">0.00%</div>
                  <div className="text-[10px] text-slate-500 uppercase font-sans">Recall</div>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-amber-200 shadow-sm">
                  <div className="text-lg font-bold text-rose-700">0.00%</div>
                  <div className="text-[10px] text-slate-500 uppercase font-sans">Fraud Caught</div>
                </div>
              </div>
              <p className="text-[11px] text-amber-950 mt-2 italic">
                Demonstrates conclusively why high accuracy in isolation provides zero proof of effective fraud detection.
              </p>
            </div>

          </div>

        </div>

        {/* IMPORTANT Mandatory Callout Box */}
        <div className="rounded-2xl p-6 sm:p-8 bg-sky-50/80 border-2 border-sky-300 shadow-sm relative overflow-hidden">
          <div className="relative z-10 max-w-4xl">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="p-1.5 rounded-lg bg-sky-600 text-white shadow-sm">
                <Info className="w-5 h-5" />
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Class imbalance is one of the major challenges in this project.
              </h3>
            </div>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4">
              Because fraudulent consumers represent only <span className="font-bold text-rose-700 font-mono">8.2%</span> of the dataset, a model could achieve high accuracy simply by predicting most consumers as normal.
            </p>

            <div className="p-4 rounded-xl bg-white border border-sky-200 text-sky-950 font-semibold text-xs sm:text-sm shadow-sm">
              This is why we evaluate <strong>Precision</strong>, <strong>Recall</strong>, <strong>F1-score</strong> and <strong>ROC-AUC</strong> along with Accuracy.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
