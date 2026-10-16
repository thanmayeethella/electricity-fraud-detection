import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
  ArrowUpDown, 
  AlertTriangle
} from 'lucide-react';
import { MODEL_RESULTS } from '../data/projectData';

export default function ModelComparison() {
  const [sortField, setSortField] = useState('accuracy');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterType, setFilterType] = useState('all');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const filteredModels = MODEL_RESULTS.filter(m => {
    if (filterType === 'ensemble') return m.name.includes('Random Forest');
    if (filterType === 'baseline') return !m.name.includes('Random Forest');
    return true;
  });

  const sortedModels = [...filteredModels].sort((a, b) => {
    const valA = a[sortField];
    const valB = b[sortField];
    return sortOrder === 'desc' ? valB - valA : valA - valB;
  });

  const accuracyChartData = MODEL_RESULTS.map(m => ({
    name: m.shortName,
    fullName: m.name,
    accuracy: m.accuracy,
    isHighest: m.isHighestAccuracy
  }));

  const recallF1ChartData = MODEL_RESULTS.map(m => ({
    name: m.shortName,
    fullName: m.name,
    recall: m.recall,
    f1: m.f1
  }));

  return (
    <section id="results" className="py-24 relative bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs font-bold text-sky-800 bg-sky-50 px-2.5 py-1 rounded border border-sky-200">
              SECTION 10 • BENCHMARK
            </span>
            <span className="text-xs font-mono text-slate-500">MODEL PERFORMANCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Comprehensive Model Comparison
          </h2>
          <p className="text-slate-600 mt-2 text-base">
            Systematic quantitative performance across accuracy, precision, recall, and harmonic F1-score.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-sky-500 to-teal-500 rounded-full mt-3" />
        </div>

        {/* IMPORTANT Mandatory Notice */}
        <div className="mb-12 p-5 sm:p-6 rounded-2xl bg-amber-50/80 border-2 border-amber-300 shadow-sm flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-amber-600 text-white shrink-0 shadow-sm">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-amber-950 uppercase font-mono mb-1">
              Academic Evaluation Caveat
            </h4>
            <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
              <strong>Do not visually imply that 92.09% automatically means the best fraud detector.</strong> In highly imbalanced classification, accuracy is dominated by the 91.8% majority normal class. An operational fraud detection system must be prioritized based on <strong>Recall</strong> (percentage of actual fraudsters caught) and <strong>F1-score</strong>.
            </p>
          </div>
        </div>

        {/* Interactive Comparison Table */}
        <div className="lab-card bg-white border border-slate-200 shadow-sm overflow-hidden mb-14">
          <div className="p-5 sm:p-6 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Model Performance Matrix</h3>
              <p className="text-xs text-slate-500">Click any column header to sort ascending or descending.</p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 shadow-sm text-xs font-medium">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1 rounded transition-all ${filterType === 'all' ? 'bg-sky-600 text-white font-bold' : 'text-slate-600 hover:text-slate-900'}`}
              >
                All (6)
              </button>
              <button
                onClick={() => setFilterType('ensemble')}
                className={`px-3 py-1 rounded transition-all ${filterType === 'ensemble' ? 'bg-sky-600 text-white font-bold' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Random Forest Variants
              </button>
              <button
                onClick={() => setFilterType('baseline')}
                className={`px-3 py-1 rounded transition-all ${filterType === 'baseline' ? 'bg-sky-600 text-white font-bold' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Baselines Only
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-100/70 text-slate-700 uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-6 font-sans font-bold">Model Architecture</th>
                  
                  <th 
                    onClick={() => handleSort('accuracy')}
                    className="py-3.5 px-4 cursor-pointer hover:text-sky-700 transition-colors font-bold"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Accuracy</span>
                      <ArrowUpDown className="w-3.5 h-3.5" />
                    </div>
                  </th>

                  <th 
                    onClick={() => handleSort('precision')}
                    className="py-3.5 px-4 cursor-pointer hover:text-sky-700 transition-colors font-bold"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Precision</span>
                      <ArrowUpDown className="w-3.5 h-3.5" />
                    </div>
                  </th>

                  <th 
                    onClick={() => handleSort('recall')}
                    className="py-3.5 px-4 cursor-pointer hover:text-sky-700 transition-colors font-bold"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Recall</span>
                      <ArrowUpDown className="w-3.5 h-3.5" />
                    </div>
                  </th>

                  <th 
                    onClick={() => handleSort('f1')}
                    className="py-3.5 px-4 cursor-pointer hover:text-sky-700 transition-colors font-bold"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>F1-Score</span>
                      <ArrowUpDown className="w-3.5 h-3.5" />
                    </div>
                  </th>

                  <th className="py-3.5 px-4 font-sans text-slate-500 font-bold">Tradeoff Analysis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sortedModels.map((model) => {
                  const isTopAcc = model.isHighestAccuracy;
                  return (
                    <tr
                      key={model.id}
                      className={`hover:bg-slate-50/70 transition-colors ${
                        isTopAcc ? 'bg-sky-50/40' : ''
                      }`}
                    >
                      <td className="py-4 px-6 font-sans">
                        <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                          {model.name}
                          {isTopAcc && (
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200">
                              Top Accuracy
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5">{model.type}</div>
                      </td>

                      <td className="py-4 px-4">
                        <span className={`text-sm font-bold ${isTopAcc ? 'text-sky-800 font-extrabold' : 'text-slate-900'}`}>
                          {model.accuracy.toFixed(2)}%
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <span className={`text-sm font-bold ${model.precision > 50 ? 'text-emerald-700' : 'text-slate-700'}`}>
                          {model.precision.toFixed(2)}%
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <span className={`text-sm font-bold ${model.recall > 40 ? 'text-emerald-700' : model.recall < 10 ? 'text-rose-700' : 'text-slate-700'}`}>
                          {model.recall.toFixed(2)}%
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <span className="text-sm font-bold text-slate-800">
                          {model.f1.toFixed(2)}%
                        </span>
                      </td>

                      <td className="py-4 px-4 font-sans text-[11px] text-slate-600">
                        {isTopAcc ? (
                          <span className="text-amber-800 font-medium">High Accuracy (92.09%), but poor Recall (5.66%)</span>
                        ) : model.recall === 65.33 ? (
                          <span className="text-emerald-800 font-medium">Highest Recall (65.33%), low Precision (11.06%)</span>
                        ) : (
                          <span>Balanced baseline tradeoff</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dual Chart Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Chart 1: Accuracy Comparison */}
          <div className="lab-card p-6 bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Model Overall Accuracy (%)</h4>
                <p className="text-xs text-slate-500">Random Forest (Accuracy Optimized) achieves 92.09% test accuracy</p>
              </div>
              <span className="text-xs font-mono text-sky-700 font-bold">Accuracy Metric</span>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={accuracyChartData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={11} interval={0} angle={-20} textAnchor="end" />
                  <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} unit="%" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '8px', fontSize: '12px' }}
                    formatter={(val, name, item) => [`${val}%`, item.payload.fullName]}
                  />
                  <Bar dataKey="accuracy" fill="#0284c7" radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-slate-500 mt-2 italic text-center">
              Notice: Decision Tree drops to 54.11%, while Random Forest (Acc) reaches 92.09%.
            </p>
          </div>

          {/* Chart 2: Recall and F1-Score Comparison */}
          <div className="lab-card p-6 bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Recall vs. F1-Score Comparison (%)</h4>
                <p className="text-xs text-slate-500">Critical metrics for fraud sensitivity and harmonic balance</p>
              </div>
              <span className="text-xs font-mono text-rose-700 font-bold">Fraud Sensitivity</span>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={recallF1ChartData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={11} interval={0} angle={-20} textAnchor="end" />
                  <YAxis stroke="#64748b" fontSize={11} domain={[0, 70]} unit="%" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '8px', fontSize: '12px' }}
                    formatter={(val, name, item) => [`${val}%`, `${name} (${item.payload.fullName})`]}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="recall" name="Recall (Fraud Caught)" fill="#059669" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="f1" name="F1-Score (Harmonic Mean)" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-slate-500 mt-2 italic text-center">
              Crucial: Notice how RF (Acc-Opt) has the lowest Recall (5.66%) despite having the highest Accuracy (92.09%).
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
