import React from 'react';
import { Users, FileSpreadsheet, ShieldCheck, AlertCircle, Target, SearchCheck, ZapOff, CheckCircle } from 'lucide-react';
import { PROJECT_METRICS } from '../data/projectData';

export default function ProjectOverview() {
  const statCards = [
    {
      value: "25,863",
      label: "Consumer Records",
      sublabel: "Individual smart meter accounts analyzed",
      icon: Users,
      color: "bg-sky-50 text-sky-700 border-sky-200",
      textColor: "text-slate-900"
    },
    {
      value: "28",
      label: "Dataset Columns",
      sublabel: "CONS_NO + FLAG + 26 daily consumption metrics",
      icon: FileSpreadsheet,
      color: "bg-indigo-50 text-indigo-700 border-indigo-200",
      textColor: "text-slate-900"
    },
    {
      value: "91.8%",
      rawNumber: "23,741 records",
      label: "Normal Consumers",
      sublabel: "Legitimate consumption profiles (FLAG = 0)",
      icon: ShieldCheck,
      color: "bg-emerald-50 text-emerald-700 border-emerald-200",
      textColor: "text-emerald-700"
    },
    {
      value: "8.2%",
      rawNumber: "2,122 records",
      label: "Potentially Fraudulent Consumers",
      sublabel: "Tampered or anomalous records (FLAG = 1)",
      icon: AlertCircle,
      color: "bg-rose-50 text-rose-700 border-rose-200",
      textColor: "text-rose-700"
    }
  ];

  return (
    <section id="overview" className="py-24 relative bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs font-bold text-sky-800 bg-sky-50 px-2.5 py-1 rounded border border-sky-200">
              SECTION 01 • OVERVIEW
            </span>
            <span className="text-xs font-mono text-slate-500">PROBLEM STATEMENT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Electricity Fraud Detection?
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-sky-500 to-teal-500 rounded-full mt-3" />
        </div>

        {/* Narrative & Problem Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14">
          
          <div className="lg:col-span-7 space-y-4 text-slate-600 leading-relaxed text-base">
            <div className="lab-card p-5 bg-slate-50/70 border border-slate-200">
              <strong className="text-slate-900 block mb-1">Non-Technical Grid Losses (NTL):</strong>
              <p>
                Electricity theft and fraud create financial losses, inaccurate consumption records, and challenges for utility providers worldwide. Unmetered electricity siphoning disrupts power load forecasts, stresses electrical distribution transformers, and drives up tariffs for honest consumers.
              </p>
            </div>
            
            <div className="lab-card p-5 bg-slate-50/70 border border-slate-200">
              <strong className="text-slate-900 block mb-1">The Inspection Bottleneck:</strong>
              <p>
                Manually identifying suspicious consumption patterns can be difficult when dealing with thousands of consumers and large amounts of daily consumption data. Manual field inspections are labor-intensive, costly, and inherently reactive.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-teal-50/80 border border-teal-200 flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-teal-600 text-white shrink-0 shadow-sm">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-teal-950 mb-1">Our Core Objective</h4>
                <p className="text-sm text-teal-900 leading-relaxed">
                  Our objective is to use machine learning to identify potentially fraudulent consumption patterns.
                </p>
              </div>
            </div>
          </div>

          {/* Key Challenges Column */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-3.5">
            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2.5 mb-2 text-rose-700">
                <ZapOff className="w-4 h-4" />
                <h4 className="font-bold text-slate-900 text-sm">Non-Technical Losses (NTL)</h4>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Electricity theft constitutes the vast majority of non-technical losses in modern utility grids, causing billions of dollars in uncollected revenue every year.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2.5 mb-2 text-amber-700">
                <SearchCheck className="w-4 h-4" />
                <h4 className="font-bold text-slate-900 text-sm">High False-Alarm Cost</h4>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Sending field technicians to inspect legitimate households costs valuable time and damages customer trust, requiring models with high precision alongside high recall.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2.5 mb-2 text-sky-700">
                <CheckCircle className="w-4 h-4" />
                <h4 className="font-bold text-slate-900 text-sm">Automated Time-Series Analytics</h4>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Modern smart grids transmit daily and hourly telemetry. ML classification transforms millions of raw kWh numbers into automated behavioral flags.
              </p>
            </div>
          </div>

        </div>

        {/* 4 Animated Statistic Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="lab-card-interactive p-6 bg-white border border-slate-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2.5 rounded-xl border ${card.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    {card.rawNumber && (
                      <span className="text-[11px] font-mono font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {card.rawNumber}
                      </span>
                    )}
                  </div>

                  <h3 className={`text-3xl sm:text-4xl font-extrabold ${card.textColor} tracking-tight font-mono`}>
                    {card.value}
                  </h3>
                  <p className="text-sm font-bold text-slate-900 mt-2">
                    {card.label}
                  </p>
                </div>

                <p className="text-xs text-slate-500 mt-2 leading-relaxed border-t border-slate-100 pt-3">
                  {card.sublabel}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
