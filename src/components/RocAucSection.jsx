import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { TrendingUp, Activity } from 'lucide-react';
import { ROC_VALUES } from '../data/projectData';

export default function RocAucSection() {
  const lightRocValues = [
    { model: "Random Forest (Tuned)", score: 0.6474, color: "#0f766e" },
    { model: "Random Forest", score: 0.643, color: "#0284c7" },
    { model: "Decision Tree", score: 0.618, color: "#4f46e5" },
    { model: "SVM", score: 0.605, color: "#7c3aed" },
    { model: "KNN", score: 0.597, color: "#d97706" },
    { model: "Logistic Regression", score: 0.594, color: "#64748b" }
  ];

  return (
    <section id="roc-auc" className="py-24 relative bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs font-bold text-sky-800 bg-sky-50 px-2.5 py-1 rounded border border-sky-200">
              SECTION 13 • ROC-AUC
            </span>
            <span className="text-xs font-mono text-slate-500">DISCRIMINATIVE CAPACITY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            ROC-AUC Evaluation
          </h2>
          <p className="text-slate-600 mt-2 text-base">
            Measuring the probability threshold tradeoff between True Positive Rate and False Positive Rate.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-sky-500 to-teal-500 rounded-full mt-3" />
        </div>

        {/* Conceptual Definition Card */}
        <div className="lab-card p-6 sm:p-8 bg-white border border-slate-200 shadow-sm mb-12">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 text-sky-700 shrink-0">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">What Does ROC-AUC Measure?</h3>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-3">
                <strong>ROC-AUC (Receiver Operating Characteristic - Area Under Curve)</strong> measures a classifier’s ability to discriminate between legitimate consumers and fraudulent accounts across all possible classification probability thresholds from 0.0 to 1.0.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block mb-0.5">AUC = 0.50</span>
                  <span className="text-amber-800 font-bold">Random Guessing (Coin Toss)</span>
                </div>
                <div className="bg-sky-50 p-3 rounded-lg border border-sky-200">
                  <span className="text-slate-500 block mb-0.5">AUC ≈ 0.60 – 0.65</span>
                  <span className="text-sky-900 font-bold">Modest Discriminative Power (Observed)</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block mb-0.5">AUC = 1.00</span>
                  <span className="text-emerald-800 font-bold">Perfect Separability</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Known ROC-AUC Values Visual Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
          
          {/* Chart View */}
          <div className="lg:col-span-7 lab-card p-6 sm:p-8 bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Known Experimental ROC-AUC Values</h4>
                <p className="text-xs text-slate-500">Strictly reported without artificial score inflation</p>
              </div>
              <span className="text-xs font-mono text-teal-800 font-bold">Range [0.594 – 0.6474]</span>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={lightRocValues} layout="vertical" margin={{ top: 10, right: 30, left: 40, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                  <XAxis type="number" domain={[0.5, 0.7]} stroke="#64748b" fontSize={11} tickCount={5} />
                  <YAxis type="category" dataKey="model" stroke="#475569" fontSize={11} width={130} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '8px', fontSize: '12px' }}
                    formatter={(val) => [`${val}`, 'ROC-AUC']}
                  />
                  <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                    {lightRocValues.map((entry, index) => (
                      <rect key={`rect-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-slate-500 mt-2 font-mono text-center">
              Random chance baseline: 0.500 | Tuned Random Forest leads at 0.6474
            </p>
          </div>

          {/* Value Cards List */}
          <div className="lg:col-span-5 space-y-2.5">
            <h4 className="text-xs font-bold text-slate-700 uppercase font-mono tracking-wider mb-2">
              Exact Experimental Benchmark Values
            </h4>

            {lightRocValues.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">{item.model}</span>
                </div>
                <span className="font-mono font-extrabold text-sm text-slate-900 bg-slate-50 px-2.5 py-1 rounded border border-slate-200">
                  {item.score}
                </span>
              </div>
            ))}

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 leading-relaxed">
              <strong>Academic Honesty:</strong> These scores reflect genuine real-world smart meter noise without synthetic leakage. AUC scores between 0.59 and 0.65 represent modest separability in complex 26-day time-series data.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
