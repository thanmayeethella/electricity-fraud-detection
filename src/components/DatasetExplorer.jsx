import React, { useState } from 'react';
import { Database, Table, Layers, Hash, CheckCircle, AlertTriangle, Search } from 'lucide-react';
import { SAMPLE_CONSUMER_RECORDS } from '../data/projectData';

export default function DatasetExplorer() {
  const [selectedRecord, setSelectedRecord] = useState(SAMPLE_CONSUMER_RECORDS[0]);
  const [filterType, setFilterType] = useState('all'); // 'all' | '0' | '1'
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecords = SAMPLE_CONSUMER_RECORDS.filter(record => {
    const matchesFilter = 
      filterType === 'all' 
        ? true 
        : filterType === '0' 
          ? record.flag === 0 
          : record.flag === 1;
    const matchesSearch = record.cons_no.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section id="dataset" className="py-24 relative bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs font-bold text-sky-800 bg-sky-50 px-2.5 py-1 rounded border border-sky-200">
              SECTION 02 • DATASET
            </span>
            <span className="text-xs font-mono text-slate-500">SGCC TELEMETRY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Inside the Dataset
          </h2>
          <p className="text-slate-600 mt-2 text-base">
            Exploring the State Grid Corporation of China (SGCC) smart meter electricity theft dataset.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-sky-500 to-teal-500 rounded-full mt-3" />
        </div>

        {/* Dataset Metadata Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="lab-card p-6 bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase font-mono tracking-wider text-slate-500 font-bold">Source Dataset</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-sky-50 text-sky-700 border border-sky-200">Benchmark</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">SGCC Electricity Theft Dataset</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              State Grid Corporation of China (SGCC) real-world smart metering telemetry capturing residential and commercial consumer loads.
            </p>
            <div className="pt-3 border-t border-slate-100 text-xs font-mono text-slate-600 flex items-center justify-between">
              <span>File Used:</span>
              <span className="text-sky-700 font-bold bg-slate-50 px-2 py-0.5 rounded border border-slate-200">datasetsmall.csv</span>
            </div>
          </div>

          <div className="lab-card p-6 bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase font-mono tracking-wider text-slate-500 font-bold">Matrix Dimensions</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-sky-50 text-sky-700 border border-sky-200">Shape</span>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-extrabold text-slate-900 font-mono">25,863</span>
              <span className="text-sm text-slate-500 font-medium">Rows</span>
              <span className="text-slate-400 font-bold">×</span>
              <span className="text-3xl font-extrabold text-sky-700 font-mono">28</span>
              <span className="text-sm text-slate-500 font-medium">Columns</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Comprehensive telemetry matrix representing 25,863 consumer accounts recorded continuously across a multi-week observation window.
            </p>
            <div className="pt-3 border-t border-slate-100 text-xs font-mono text-slate-600 flex items-center justify-between">
              <span>Total Matrix Cells:</span>
              <span className="text-slate-900 font-bold">724,164 values</span>
            </div>
          </div>

          <div className="lab-card p-6 bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase font-mono tracking-wider text-slate-500 font-bold">Target Variable</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-sky-50 text-sky-700 border border-sky-200">Binary FLAG</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Supervised Ground Truth</h3>
            <div className="space-y-2 mb-2">
              <div className="flex items-center justify-between text-xs p-2 rounded bg-emerald-50 border border-emerald-200">
                <span className="flex items-center gap-1.5 text-emerald-800 font-mono font-semibold">
                  <CheckCircle className="w-3.5 h-3.5" /> FLAG = 0
                </span>
                <span className="text-emerald-900 text-xs font-medium">Normal Consumer (91.8%)</span>
              </div>
              <div className="flex items-center justify-between text-xs p-2 rounded bg-rose-50 border border-rose-200">
                <span className="flex items-center gap-1.5 text-rose-800 font-mono font-semibold">
                  <AlertTriangle className="w-3.5 h-3.5" /> FLAG = 1
                </span>
                <span className="text-rose-900 text-xs font-medium">Potentially Fraudulent (8.2%)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Visual Structure: CONS_NO | FLAG | Daily Consumption Data */}
        <div className="lab-card p-6 sm:p-8 bg-slate-50/70 border border-slate-200 mb-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-sky-600" />
                Structural Decomposition of datasetsmall.csv
              </h3>
              <p className="text-xs text-slate-500">Three distinct structural partitions make up the 28 columns of the dataset</p>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded bg-white text-slate-700 border border-slate-200 shadow-sm">
              Columns: 1 ID + 1 Target Label + 26 Daily Features
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Column 1: CONS_NO */}
            <div className="md:col-span-3 rounded-xl p-4 bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-slate-500 font-bold">Column 1</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">Identifier</span>
              </div>
              <h4 className="text-base font-bold text-slate-900 font-mono mb-1">CONS_NO</h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Consumer identification number. Unique alphanumeric identifier allocated to each consumer smart meter.
              </p>
              <div className="text-[11px] font-mono text-amber-800 bg-amber-50 p-2 rounded border border-amber-200">
                Excluded from ML training to avoid spurious account memorization.
              </div>
            </div>

            {/* Column 2: FLAG */}
            <div className="md:col-span-3 rounded-xl p-4 bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-rose-700 font-bold">Column 2</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">Target Label</span>
              </div>
              <h4 className="text-base font-bold text-slate-900 font-mono mb-1">FLAG</h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Target variable distinguishing normal consumers from potentially fraudulent patterns.
              </p>
              <div className="text-[11px] font-mono text-slate-700 bg-slate-50 p-2 rounded border border-slate-200 space-y-1">
                <div className="text-emerald-700 font-semibold">0: Normal Consumer (23,741)</div>
                <div className="text-rose-700 font-semibold">1: Potentially Fraudulent (2,122)</div>
              </div>
            </div>

            {/* Columns 3 to 28: Daily Consumption */}
            <div className="md:col-span-6 rounded-xl p-4 bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-teal-700 font-bold">Columns 3 to 28 (26 Columns)</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">Time-Series</span>
              </div>
              <h4 className="text-base font-bold text-slate-900 font-mono mb-1">26 Daily Electricity Consumption Columns</h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Continuous daily electricity consumption readings measured in kilowatt-hours (kWh) across a 26-day observation period.
              </p>
              <div className="grid grid-cols-6 sm:grid-cols-9 gap-1 text-[10px] font-mono text-center">
                {Array.from({ length: 9 }).map((_, i) => (
                  <span key={i} className="bg-slate-50 py-1 rounded border border-slate-200 text-slate-700 font-medium">
                    {`D${i + 1}`}
                  </span>
                ))}
                <span className="bg-slate-50 py-1 rounded border border-slate-200 text-slate-400">...</span>
                <span className="bg-slate-50 py-1 rounded border border-slate-200 text-slate-700 font-medium">D25</span>
                <span className="bg-slate-50 py-1 rounded border border-slate-200 text-slate-700 font-medium">D26</span>
              </div>
            </div>

          </div>
        </div>

        {/* Small Sample Table & Visual Summary */}
        <div className="lab-card bg-white border border-slate-200 shadow-sm overflow-hidden">
          
          <div className="p-5 sm:p-6 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Table className="w-5 h-5 text-sky-600" />
                Sample Consumer Records Preview
              </h3>
              <p className="text-xs text-slate-500">Representative subset of rows from datasetsmall.csv.</p>
            </div>

            {/* Filter buttons & search */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-2.5 py-1 text-xs rounded font-medium transition-all ${
                    filterType === 'all' ? 'bg-sky-600 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterType('0')}
                  className={`px-2.5 py-1 text-xs rounded font-medium transition-all ${
                    filterType === '0' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Normal (0)
                </button>
                <button
                  onClick={() => setFilterType('1')}
                  className={`px-2.5 py-1 text-xs rounded font-medium transition-all ${
                    filterType === '1' ? 'bg-rose-600 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Fraud (1)
                </button>
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter CONS_NO..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white border border-slate-200 rounded-lg pl-8 pr-3 py-1 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/70 text-slate-700 font-mono uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">CONS_NO</th>
                  <th className="py-3 px-4">FLAG</th>
                  <th className="py-3 px-4">Classification</th>
                  <th className="py-3 px-4">Mean (kWh)</th>
                  <th className="py-3 px-4">Std Dev (σ)</th>
                  <th className="py-3 px-4">Zero Days</th>
                  <th className="py-3 px-4">First 5 Days (Sample)</th>
                  <th className="py-3 px-4 text-right">Inspect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {filteredRecords.map((record) => {
                  const isSelected = selectedRecord.cons_no === record.cons_no;
                  return (
                    <tr
                      key={record.cons_no}
                      onClick={() => setSelectedRecord(record)}
                      className={`cursor-pointer transition-colors ${
                        isSelected 
                          ? 'bg-sky-50/70 text-slate-900' 
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <td className="py-3.5 px-4 font-bold text-sky-800 flex items-center gap-1.5">
                        <Hash className="w-3.5 h-3.5 text-slate-400" />
                        {record.cons_no}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded font-bold text-[11px] ${
                          record.flag === 0 
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                            : 'bg-rose-50 text-rose-800 border border-rose-200'
                        }`}>
                          {record.flag}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-sans font-medium">
                        <span className={`flex items-center gap-1.5 ${
                          record.flag === 0 ? 'text-emerald-700' : 'text-rose-700'
                        }`}>
                          {record.flag === 0 ? <CheckCircle className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                          {record.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-900">{record.avg.toFixed(2)}</td>
                      <td className="py-3.5 px-4 text-slate-700">{record.std.toFixed(2)}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-1.5 py-0.5 rounded ${record.zeroDays > 0 ? 'bg-amber-100 text-amber-800 font-bold' : 'text-slate-600'}`}>
                          {record.zeroDays}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                        [{record.readings.slice(0, 5).join(', ')}...]
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <span className={`text-[11px] font-sans px-2.5 py-1 rounded transition-colors ${
                          isSelected ? 'bg-sky-600 text-white font-bold' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {isSelected ? 'Selected' : 'View'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Selected Record Telemetry Drawer */}
          {selectedRecord && (
            <div className="p-5 sm:p-6 bg-slate-50 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <span className="text-xs font-mono text-slate-500 font-bold uppercase">Selected Consumer Telemetry</span>
                  <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    {selectedRecord.cons_no}
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                      selectedRecord.flag === 0 
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                        : 'bg-rose-100 text-rose-800 border border-rose-200'
                    }`}>
                      FLAG {selectedRecord.flag} • {selectedRecord.status}
                    </span>
                  </h4>
                </div>
                <div className="text-xs text-slate-600 bg-white px-3 py-2 rounded-lg border border-slate-200 max-w-md shadow-sm">
                  <span className="text-sky-700 font-semibold">Observed Signature:</span> {selectedRecord.pattern}
                </div>
              </div>

              {/* 26-Day Bar Matrix */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>26-Day Telemetry Sequence (Daily kWh Readings)</span>
                  <span className="text-slate-700 font-bold">Mean: {selectedRecord.avg.toFixed(2)} kWh | Std: {selectedRecord.std.toFixed(2)}</span>
                </div>
                <div className="grid grid-cols-13 sm:grid-cols-26 gap-1 bg-white p-3 rounded-xl border border-slate-200">
                  {selectedRecord.readings.map((kwh, idx) => {
                    const maxLocal = 30;
                    const heightPct = Math.min(100, Math.max(12, (kwh / maxLocal) * 100));
                    return (
                      <div key={idx} className="flex flex-col items-center gap-1 group relative">
                        <div className="h-16 w-full flex items-end justify-center bg-slate-100/70 rounded">
                          <div
                            style={{ height: `${heightPct}%` }}
                            className={`w-full rounded-t transition-all ${
                              kwh === 0 
                                ? 'bg-rose-500 border-t-2 border-rose-700' 
                                : selectedRecord.flag === 1 
                                  ? 'bg-amber-500 hover:bg-amber-600' 
                                  : 'bg-teal-600 hover:bg-teal-700'
                            }`}
                          />
                        </div>
                        <span className="text-[9px] font-mono text-slate-500 group-hover:text-slate-900">
                          {idx + 1}
                        </span>
                        <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 hidden group-hover:block z-30 bg-slate-900 text-white text-[10px] px-2 py-1 rounded shadow-md whitespace-nowrap">
                          Day {idx + 1}: {kwh.toFixed(1)} kWh
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
