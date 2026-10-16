import React, { useState } from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { BarChart3, Activity, Layers, Info } from 'lucide-react';
import { PROJECT_METRICS } from '../data/projectData';

export default function EdaDashboard() {
  const [activeTab, setActiveTab] = useState('curves');

  const dailyTelemetryData = [
    { day: 'D1', normal: 13.8, fraud: 7.2 },
    { day: 'D2', normal: 13.5, fraud: 6.8 },
    { day: 'D3', normal: 14.1, fraud: 7.0 },
    { day: 'D4', normal: 13.9, fraud: 3.5 },
    { day: 'D5', normal: 14.4, fraud: 2.1 },
    { day: 'D6', normal: 14.8, fraud: 1.8 },
    { day: 'D7', normal: 13.2, fraud: 2.4 },
    { day: 'D8', normal: 13.6, fraud: 1.5 },
    { day: 'D9', normal: 14.0, fraud: 1.2 },
    { day: 'D10', normal: 13.7, fraud: 2.0 },
    { day: 'D11', normal: 14.2, fraud: 1.9 },
    { day: 'D12', normal: 14.5, fraud: 2.2 },
    { day: 'D13', normal: 13.4, fraud: 1.4 },
    { day: 'D14', normal: 13.8, fraud: 1.1 },
    { day: 'D15', normal: 14.3, fraud: 1.8 },
    { day: 'D16', normal: 14.6, fraud: 2.5 },
    { day: 'D17', normal: 13.5, fraud: 1.3 },
    { day: 'D18', normal: 13.9, fraud: 1.6 },
    { day: 'D19', normal: 14.2, fraud: 1.9 },
    { day: 'D20', normal: 14.7, fraud: 2.1 },
    { day: 'D21', normal: 13.3, fraud: 1.2 },
    { day: 'D22', normal: 13.7, fraud: 1.5 },
    { day: 'D23', normal: 14.1, fraud: 1.7 },
    { day: 'D24', normal: 14.4, fraud: 2.0 },
    { day: 'D25', normal: 13.6, fraud: 1.4 },
    { day: 'D26', normal: 13.9, fraud: 1.6 }
  ];

  const featureDistributionData = [
    { feature: 'Mean Consumption', normalQ1: 10.2, normalMed: 13.5, normalQ3: 16.8, fraudQ1: 1.1, fraudMed: 3.2, fraudQ3: 7.4 },
    { feature: 'Standard Dev', normalQ1: 1.2, normalMed: 1.8, normalQ3: 2.6, fraudQ1: 2.4, fraudMed: 4.1, fraudQ3: 6.8 },
    { feature: 'Peak Ratio', normalQ1: 1.3, normalMed: 1.6, normalQ3: 1.9, fraudQ1: 2.8, fraudMed: 4.6, fraudQ3: 8.2 },
    { feature: 'Rate of Change', normalQ1: 0.8, normalMed: 1.2, normalQ3: 1.7, fraudQ1: 2.1, fraudMed: 3.8, fraudQ3: 6.4 }
  ];

  const classBarData = [
    { class: 'Normal (FLAG 0)', count: PROJECT_METRICS.normalConsumers, percentage: 91.8, fill: '#059669' },
    { class: 'Fraud (FLAG 1)', count: PROJECT_METRICS.fraudConsumers, percentage: 8.2, fill: '#e11d48' }
  ];

  return (
    <section id="eda" className="py-24 relative bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs font-bold text-sky-800 bg-sky-50 px-2.5 py-1 rounded border border-sky-200">
              SECTION 05 • EDA
            </span>
            <span className="text-xs font-mono text-slate-500">CONSUMPTION PROFILES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            EDA & Consumption Pattern Analysis
          </h2>
          <p className="text-slate-600 mt-2 text-base">
            Examining structural differences between legitimate customer consumption patterns and fraudulent anomalies across the 26-day telemetry.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-sky-500 to-teal-500 rounded-full mt-3" />
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-2 mb-8 bg-white p-1.5 rounded-xl border border-slate-200 w-fit shadow-sm">
          <button
            onClick={() => setActiveTab('curves')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'curves'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            26-Day Consumption Trajectory
          </button>
          <button
            onClick={() => setActiveTab('boxplots')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'boxplots'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Feature Quartile & Spread Comparison
          </button>
          <button
            onClick={() => setActiveTab('classes')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'classes'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Class Volume Breakdown
          </button>
        </div>

        {/* Tab 1: Curves */}
        {activeTab === 'curves' && (
          <div className="lab-card p-6 sm:p-8 bg-white border border-slate-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-sky-600" />
                  Mean Daily Consumption Patterns (Normal vs. Potentially Fraudulent)
                </h3>
                <p className="text-xs text-slate-500">Comparing 26-day time-series readings in kilowatt-hours (kWh)</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono font-semibold">
                <span className="flex items-center gap-1.5 text-emerald-700">
                  <span className="w-3 h-0.5 bg-emerald-600 inline-block" /> Normal (FLAG 0)
                </span>
                <span className="flex items-center gap-1.5 text-rose-700">
                  <span className="w-3 h-0.5 bg-rose-600 inline-block" /> Fraud (FLAG 1)
                </span>
              </div>
            </div>

            <div className="h-80 w-full my-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyTelemetryData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="day" stroke="#64748b" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={11} unit=" kWh" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '8px', fontSize: '12px' }}
                    labelStyle={{ color: '#0f172a', fontWeight: 'bold' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="normal"
                    name="Normal Consumers"
                    stroke="#059669"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: '#059669' }}
                    activeDot={{ r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="fraud"
                    name="Fraudulent Consumers"
                    stroke="#e11d48"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: '#e11d48' }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <div className="flex items-center gap-2 text-sky-800 font-bold mb-1">
                <Info className="w-4 h-4" />
                <span>Exploratory Finding: Structural Trajectory Divergence</span>
              </div>
              <p>
                Normal consumers exhibit a stable, cyclical consumption baseline with minimal day-to-day deviation, reflecting regular household and commercial appliances. In contrast, fraudulent profiles demonstrate sharp downward shifts and prolonged periods of near-zero meter readings, a physical hallmark of meter shunting and phase bypassing.
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Quartile / Spread Boxplot Comparison */}
        {activeTab === 'boxplots' && (
          <div className="lab-card p-6 sm:p-8 bg-white border border-slate-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-sky-600" />
                  Feature Spread & Quartile Comparison
                </h3>
                <p className="text-xs text-slate-500">Comparing median values and variance across key consumption-related features</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono font-semibold">
                <span className="flex items-center gap-1.5 text-emerald-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" /> Normal Median
                </span>
                <span className="flex items-center gap-1.5 text-rose-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-600 inline-block" /> Fraud Median
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
              {featureDistributionData.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-bold text-sm text-slate-900">{item.feature}</span>
                    <span className="text-[11px] font-mono text-slate-500">Quartile Dispersion</span>
                  </div>

                  <div className="space-y-3 font-mono text-xs">
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-emerald-800 font-semibold">Normal (FLAG 0)</span>
                        <span className="text-slate-600">Median: {item.normalMed}</span>
                      </div>
                      <div className="h-4 bg-white rounded-full overflow-hidden flex items-center px-1 border border-slate-200">
                        <div 
                          style={{ width: `${Math.min(100, item.normalMed * 8)}%` }}
                          className="h-2 rounded-full bg-emerald-600"
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                        <span>Q1: {item.normalQ1}</span>
                        <span>Q3: {item.normalQ3}</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-rose-800 font-semibold">Fraud (FLAG 1)</span>
                        <span className="text-slate-600">Median: {item.fraudMed}</span>
                      </div>
                      <div className="h-4 bg-white rounded-full overflow-hidden flex items-center px-1 border border-slate-200">
                        <div 
                          style={{ width: `${Math.min(100, item.fraudMed * 8)}%` }}
                          className="h-2 rounded-full bg-rose-600"
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                        <span>Q1: {item.fraudQ1}</span>
                        <span>Q3: {item.fraudQ3}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <div className="flex items-center gap-2 text-sky-800 font-bold mb-1">
                <Info className="w-4 h-4" />
                <span>Exploratory Finding: Dispersion and Volatility Disparity</span>
              </div>
              <p>
                Comparing the feature distributions reveals that legitimate consumers concentrate around higher mean consumption with tight standard deviations. Fraudulent records show heavily skewed distributions characterized by depressed median consumption coupled with elevated peak ratios and heightened rate of change from intermittent tampering.
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Classes */}
        {activeTab === 'classes' && (
          <div className="lab-card p-6 sm:p-8 bg-white border border-slate-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-sky-600" />
                  Absolute Consumer Count by Class (datasetsmall.csv)
                </h3>
                <p className="text-xs text-slate-500">Total record count: 25,863 observations</p>
              </div>
            </div>

            <div className="h-72 w-full my-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={classBarData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="class" stroke="#64748b" fontSize={12} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '8px', fontSize: '12px' }}
                    formatter={(val, name, item) => [`${val.toLocaleString()} records (${item.payload.percentage}%)`, 'Class Count']}
                  />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    {classBarData.map((entry, index) => (
                      <rect key={`bar-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <div className="flex items-center gap-2 text-sky-800 font-bold mb-1">
                <Info className="w-4 h-4" />
                <span>Exploratory Finding: Severe Imbalance Scale</span>
              </div>
              <p>
                The dataset contains 23,741 normal consumers (91.8%) and only 2,122 fraudulent consumers (8.2%). This 11:1 ratio illustrates why naive models predict the majority class, necessitating specialized class balancing techniques and non-accuracy metrics.
              </p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
