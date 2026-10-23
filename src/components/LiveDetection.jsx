import React, { useState, useRef, useEffect } from 'react';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Play, 
  Download, 
  Eye, 
  Layers, 
  Activity, 
  Cpu, 
  Sliders, 
  Info, 
  RefreshCw,
  Search,
  CheckCircle,
  XCircle,
  FileCheck2,
  Server,
  Zap
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const API_BASE_URL = 'https://electricity-fraud-detection-vf3z.onrender.com';

export default function LiveDetection() {
  const [file, setFile] = useState(null);
  const [parsedData, setParsedData] = useState(null);
  const [fileStats, setFileStats] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [results, setResults] = useState(null);
  const [selectedConsumer, setSelectedConsumer] = useState(null);
  const [backendStatus, setBackendStatus] = useState({ online: false, checking: true });
  const [searchQuery, setSearchQuery] = useState('');
  const [resultFilter, setResultFilter] = useState('ALL'); // 'ALL' | 'NORMAL' | 'FRAUD'
  const [isDragOver, setIsDragOver] = useState(false);

  const fileInputRef = useRef(null);

  // Check Backend Health on mount
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/health`);
        if (res.ok) {
          const data = await res.json();
          setBackendStatus({ online: true, checking: false, details: data });
        } else {
          setBackendStatus({ online: false, checking: false });
        }
      } catch (err) {
        setBackendStatus({ online: false, checking: false });
      }
    };
    checkHealth();
  }, []);

  // Parse CSV client-side for immediate inspection
  const parseCSVFile = (csvText, fileName) => {
    const lines = csvText.trim().split(/\r\n|\n/);
    if (lines.length < 2) return null;

    const headers = lines[0].split(',').map(h => h.trim());
    const rows = [];
    let nullCount = 0;

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      const values = line.split(',').map(v => v.trim());
      const rowObj = {};
      headers.forEach((h, idx) => {
        const val = values[idx];
        if (val === '' || val === undefined || val.toLowerCase() === 'nan' || val.toLowerCase() === 'null') {
          nullCount++;
          rowObj[h] = null;
        } else {
          rowObj[h] = isNaN(Number(val)) ? val : Number(val);
        }
      });
      rows.push(rowObj);
    }

    const consumptionCols = headers.filter(h => {
      const lower = h.toLowerCase();
      return !lower.includes('cons') && !lower.includes('flag') && !lower.includes('id') && !lower.includes('label');
    });

    const hasFlag = headers.some(h => h.toUpperCase() === 'FLAG');

    return {
      fileName,
      headers,
      rows,
      hasFlag,
      totalConsumers: rows.length,
      totalColumns: headers.length,
      consumptionColsCount: consumptionCols.length,
      missingValues: nullCount,
      previewRows: rows.slice(0, 8),
      rawText: csvText
    };
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      processSelectedFile(uploadedFile);
    }
  };

  const processSelectedFile = (selectedFile) => {
    setFile(selectedFile);
    setResults(null);
    setSelectedConsumer(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      const parsed = parseCSVFile(event.target.result, selectedFile.name);
      setParsedData(parsed);
      setFileStats(parsed);
    };
    reader.readAsText(selectedFile);
  };

  // Quick Load Demo Files for Teacher / Evaluator
  const loadDemoFile = async (type) => {
    try {
      let path = '/sample_datasets/teacher_demo_test.csv';
      let demoName = 'teacher_demo_test.csv';
      if (type === 'with_flag') {
        path = '/sample_datasets/sample_test_with_flag.csv';
        demoName = 'sample_test_with_flag.csv';
      } else if (type === 'without_flag') {
        path = '/sample_datasets/sample_test_without_flag.csv';
        demoName = 'sample_test_without_flag.csv';
      } else if (type === 'teacher_demo') {
        path = '/sample_datasets/teacher_demo_test.csv';
        demoName = 'teacher_demo_test.csv';
      }
      
      const response = await fetch(path);
      const csvText = await response.text();
      
      const blob = new Blob([csvText], { type: 'text/csv' });
      const demoFile = new File([blob], demoName, { type: 'text/csv' });
      
      setFile(demoFile);
      setResults(null);
      setSelectedConsumer(null);
      const parsed = parseCSVFile(csvText, demoName);
      setParsedData(parsed);
      setFileStats(parsed);
    } catch (err) {
      console.error('Failed to load demo dataset:', err);
    }
  };

  // Drag and Drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  // RUN FRAUD DETECTION WITH REAL SAVED RANDOM FOREST
  const handleRunInference = async () => {
    if (!file && !parsedData) return;

    setIsProcessing(true);
    setProcessingStep(0);
    setResults(null);

    // Realistic processing animation stages
    const stepMessages = [
      "VALIDATING DATA...",
      "PREPROCESSING VIA MEDIAN & SCALER...",
      "LOADING PRE-TRAINED RANDOM FOREST MODEL...",
      "ANALYZING 26-DAY CONSUMPTION SEQUENCES...",
      "GENERATING PREDICTIONS & PROBABILITIES...",
      "COMPLETE ✓"
    ];

    for (let i = 0; i < stepMessages.length - 1; i++) {
      setProcessingStep(i);
      await new Promise(r => setTimeout(r, 350));
    }

    try {
      // Send real file to FastAPI backend
      const formData = new FormData();
      if (file) {
        formData.append('file', file);
      } else {
        const blob = new Blob([parsedData.rawText], { type: 'text/csv' });
        formData.append('file', blob, parsedData.fileName || 'test.csv');
      }

      const response = await fetch(`${API_BASE_URL}/api/predict`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errJson = await response.json();
        throw new Error(errJson.detail || 'Prediction failed on backend');
      }

      const data = await response.json();
      setProcessingStep(5);
      await new Promise(r => setTimeout(r, 200));

      setResults(data);
      if (data.predictions && data.predictions.length > 0) {
        setSelectedConsumer(data.predictions[0]);
      }
    } catch (error) {
      console.error("Backend error:", error);
      alert(`Backend Error: ${error.message}\nUnable to connect to the backend server at ${API_BASE_URL}.`);
    } finally {
      setIsProcessing(false);
    }
  };

  // Export CSV of predictions (CONS_NO, Prediction, Fraud_Probability, FLAG)
  const handleDownloadPredictions = () => {
    if (!results || !results.predictions) return;

    const headers = results.has_ground_truth 
      ? ['CONS_NO', 'Prediction', 'Fraud_Probability', 'FLAG']
      : ['CONS_NO', 'Prediction', 'Fraud_Probability'];

    const csvRows = [headers.join(',')];

    results.predictions.forEach(p => {
      const prob = p.fraud_probability !== null && p.fraud_probability !== undefined 
        ? `${p.fraud_probability}%` 
        : (p.predicted_probability !== null && p.predicted_probability !== undefined ? `${p.predicted_probability}%` : 'N/A');

      const row = results.has_ground_truth
        ? [p.cons_no, p.prediction, prob, p.actual_flag]
        : [p.cons_no, p.prediction, prob];
      csvRows.push(row.join(','));
    });

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fraud_predictions_${results.file_name || 'dataset'}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredPredictions = results?.predictions?.filter(p => {
    const matchesSearch = p.cons_no.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = 
      resultFilter === 'ALL' 
        ? true 
        : resultFilter === 'NORMAL' 
          ? p.predicted_flag === 0 
          : p.predicted_flag === 1;
    return matchesSearch && matchesFilter;
  }) || [];

  return (
    <section id="live-detection" className="py-24 relative bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded border border-teal-200">
              MODULE 00 • INTERACTIVE
            </span>
            <span className="text-xs font-mono text-slate-500">LIVE PREDICTIVE ENGINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            LIVE FRAUD DETECTION
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Test unseen electricity consumption data using our pre-trained machine learning model.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-sky-600 rounded-full mt-3" />
        </div>

        {/* Visual Pipeline Banner (01 UPLOAD -> 02 PREPROCESS -> 03 RANDOM FOREST -> 04 PREDICT -> 05 RESULT) */}
        <div className="lab-card p-6 mb-10 bg-white border border-slate-200 shadow-sm">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold mb-4">
            Inference Architecture Workflow
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative text-center">
            
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-mono font-bold text-sky-700 block mb-1">01</span>
              <h4 className="text-xs font-bold text-slate-900 leading-tight">UPLOAD TEST DATA</h4>
              <p className="text-[10px] text-slate-500 font-mono mt-1">Unseen CSV Telemetry</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-mono font-bold text-sky-700 block mb-1">02</span>
              <h4 className="text-xs font-bold text-slate-900 leading-tight">PREPROCESS</h4>
              <p className="text-[10px] text-slate-500 font-mono mt-1">Saved Scaler.transform()</p>
            </div>

            <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-950">
              <span className="text-xs font-mono font-bold text-teal-700 block mb-1">03</span>
              <h4 className="text-xs font-bold text-teal-900 leading-tight">PRE-TRAINED RF</h4>
              <p className="text-[10px] text-teal-700 font-mono mt-1">random_forest_model.joblib</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-mono font-bold text-sky-700 block mb-1">04</span>
              <h4 className="text-xs font-bold text-slate-900 leading-tight">PREDICT</h4>
              <p className="text-[10px] text-slate-500 font-mono mt-1">Class + Probabilities</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-mono font-bold text-sky-700 block mb-1">05</span>
              <h4 className="text-xs font-bold text-slate-900 leading-tight">RESULT</h4>
              <p className="text-[10px] text-slate-500 font-mono mt-1">Normal / Potentially Fraud</p>
            </div>

          </div>
        </div>

        {/* Backend & Model Status Card */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-10 items-stretch">
          
          {/* Pre-Trained Model Card */}
          <div className="md:col-span-8 lab-card p-6 bg-white border border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-teal-600" />
                <h3 className="text-base font-bold text-slate-900">PRE-TRAINED MODEL: Random Forest</h3>
              </div>
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200 font-semibold">
                Trained on SGCC Benchmark
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-3">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-center font-mono">
                <span className="text-[10px] text-slate-500 font-sans uppercase">Accuracy</span>
                <p className="text-xl font-extrabold text-slate-900 mt-0.5">92.09%</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-center font-mono">
                <span className="text-[10px] text-slate-500 font-sans uppercase">Precision</span>
                <p className="text-xl font-extrabold text-emerald-700 mt-0.5">72.73%</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-center font-mono">
                <span className="text-[10px] text-slate-500 font-sans uppercase">Recall</span>
                <p className="text-xl font-extrabold text-amber-700 mt-0.5">5.66%</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-center font-mono">
                <span className="text-[10px] text-slate-500 font-sans uppercase">F1-Score</span>
                <p className="text-xl font-extrabold text-sky-700 mt-0.5">10.50%</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 mt-3 italic leading-relaxed bg-amber-50/70 p-3 rounded-lg border border-amber-200 text-amber-900">
              <strong>Academic note:</strong> "Because the dataset is highly imbalanced, accuracy alone does not fully represent fraud-detection performance."
            </p>
          </div>

          {/* Backend Connection Status */}
          <div className="md:col-span-4 lab-card p-6 bg-white border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase text-slate-500 font-bold">FastAPI Server</span>
                <div className="flex items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${backendStatus.online ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                  <span className="text-xs font-mono font-bold text-slate-700">
                    {backendStatus.online ? 'ONLINE' : 'OFFLINE'}
                  </span>
                </div>
              </div>

              <div className="text-xs text-slate-600 space-y-1.5 font-mono">
                <div>Artifact: <span className="text-slate-800 font-semibold">random_forest_model.joblib</span></div>
                <div>Scaler: <span className="text-slate-800 font-semibold">scaler.joblib</span></div>
                <div>API: <span className="text-sky-700 font-semibold break-all">{API_BASE_URL}</span></div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500">
              {backendStatus.online ? (
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Ready for live test inference
                </span>
              ) : (
                <span className="text-rose-700 font-mono text-[10px]">
                  Connecting to {API_BASE_URL}...
                </span>
              )}
            </div>
          </div>

        </div>

        {/* Upload Drag & Drop Area */}
        <div className="lab-card p-6 sm:p-8 bg-white border border-slate-200 shadow-sm mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">01. Provide Test Dataset</h3>
              <p className="text-xs text-slate-500">Upload an unseen CSV dataset with daily consumption readings.</p>
            </div>

            {/* Quick Demo Buttons for Evaluator / Professor */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => loadDemoFile('teacher_demo')}
                className="px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <FileCheck2 className="w-3.5 h-3.5 text-teal-600" />
                <span>Load Teacher Demo Test (teacher_demo_test.csv)</span>
              </button>

              <button
                type="button"
                onClick={() => loadDemoFile('without_flag')}
                className="px-3 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-sky-600" />
                <span>Load Blind Demo (No FLAG)</span>
              </button>
            </div>
          </div>

          {/* Drag & Drop Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all ${
              isDragOver 
                ? 'border-teal-500 bg-teal-50/50' 
                : 'border-slate-300 hover:border-teal-400 bg-slate-50/60 hover:bg-slate-50'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".csv"
              className="hidden"
            />
            <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-teal-600 mx-auto mb-3 shadow-sm">
              <UploadCloud className="w-7 h-7" />
            </div>
            <h4 className="text-base font-bold text-slate-800 uppercase tracking-wide">
              DROP YOUR TEST DATASET HERE
            </h4>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Supports CSV containing CONS_NO, optional ground-truth FLAG, and 26 daily kWh consumption columns.
            </p>
            <div className="mt-4">
              <span className="inline-block px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-semibold shadow-sm hover:bg-slate-100 transition-colors">
                Browse Files
              </span>
            </div>
          </div>

          {/* Uploaded File Statistics Bar */}
          {fileStats && (
            <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-teal-600" />
                  <span className="font-bold text-slate-800">{fileStats.fileName}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                    CSV Ready
                  </span>
                </div>
                <div className="font-mono text-[11px] text-slate-600">
                  Ground Truth Status: <span className="font-bold text-slate-900">{fileStats.hasFlag ? 'FLAG Column Present' : 'No FLAG (Unsupervised)'}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-600 font-mono">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-sans">Consumers</span>
                  <span className="font-bold text-slate-900 text-sm">{fileStats.totalConsumers.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-sans">Total Columns</span>
                  <span className="font-bold text-slate-900 text-sm">{fileStats.totalColumns}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-sans">Consumption Features</span>
                  <span className="font-bold text-teal-700 text-sm">{fileStats.consumptionColsCount} cols</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-sans">Missing Values</span>
                  <span className="font-bold text-slate-900 text-sm">{fileStats.missingValues} (Imputed)</span>
                </div>
              </div>

              {/* Data Preview Table */}
              <div className="mt-4 pt-3 border-t border-slate-200">
                <span className="font-mono text-[11px] text-slate-500 uppercase font-semibold block mb-2">
                  First {fileStats.previewRows.length} Rows Preview
                </span>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[11px] font-mono text-slate-600">
                    <thead className="bg-slate-100/80 text-slate-700 uppercase border-b border-slate-200">
                      <tr>
                        {fileStats.headers.slice(0, 8).map((h, i) => (
                          <th key={i} className="py-2 px-2.5">{h}</th>
                        ))}
                        {fileStats.headers.length > 8 && <th className="py-2 px-2.5">...</th>}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/60">
                      {fileStats.previewRows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-100/50">
                          {fileStats.headers.slice(0, 8).map((h, cIdx) => (
                            <td key={cIdx} className="py-1.5 px-2.5">{row[h] !== null ? row[h] : 'null'}</td>
                          ))}
                          {fileStats.headers.length > 8 && <td className="py-1.5 px-2.5 text-slate-400">...</td>}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Big Action Bar */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
            <div className="text-xs text-slate-500 font-mono">
              {fileStats 
                ? "Dataset ready. Click below to execute live inference via loaded Random Forest joblib model."
                : "Select or drop a test CSV above, or click 'Load Demo' to test immediately."}
            </div>

            <button
              type="button"
              onClick={fileStats ? handleRunInference : () => fileInputRef.current?.click()}
              disabled={isProcessing}
              className={`w-full sm:w-auto px-8 py-4 rounded-xl text-white font-extrabold text-sm sm:text-base tracking-wide shadow-md hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2.5 ${
                fileStats 
                  ? 'bg-teal-600 hover:bg-teal-700 cursor-pointer' 
                  : 'bg-teal-600/80 hover:bg-teal-700 cursor-pointer'
              }`}
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>PROCESSING TELEMETRY...</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-white" />
                  <span>RUN FRAUD DETECTION</span>
                </>
              )}
            </button>
          </div>

          {/* Processing Animation Stages */}
          {isProcessing && (
            <div className="mt-6 p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs space-y-1.5 animate-pulse">
              <div className="text-teal-400 font-bold uppercase tracking-wider mb-2">
                Execution Pipeline Progress:
              </div>
              <div className={processingStep >= 0 ? "text-emerald-400 font-bold" : "text-slate-500"}>
                {processingStep >= 0 ? "✓ " : "• "}VALIDATING DATA
              </div>
              <div className={processingStep >= 1 ? "text-emerald-400 font-bold" : "text-slate-500"}>
                {processingStep >= 1 ? "✓ " : "• "}PREPROCESSING (Median Imputation & StandardScaler)
              </div>
              <div className={processingStep >= 2 ? "text-emerald-400 font-bold" : "text-slate-500"}>
                {processingStep >= 2 ? "✓ " : "• "}LOADING TRAINED MODEL (random_forest_model.joblib)
              </div>
              <div className={processingStep >= 3 ? "text-teal-300 font-bold" : "text-slate-500"}>
                {processingStep >= 3 ? "✓ " : "• "}ANALYZING CONSUMPTION...
              </div>
              <div className={processingStep >= 4 ? "text-teal-300 font-bold" : "text-slate-500"}>
                {processingStep >= 4 ? "✓ " : "• "}GENERATING PREDICTIONS...
              </div>
              {processingStep >= 5 && (
                <div className="text-emerald-400 font-bold">
                  ✓ COMPLETE
                </div>
              )}
            </div>
          )}
        </div>

        {/* RESULTS SECTION */}
        {results && (
          <div className="space-y-10 animate-in fade-in duration-300">
            
            {/* Top Aggregate Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              <div className="lab-card p-6 bg-white border border-slate-200 text-center">
                <span className="text-xs uppercase font-mono text-slate-500 font-bold">TOTAL CONSUMERS ANALYZED</span>
                <p className="text-4xl font-black text-slate-900 font-mono mt-2">
                  {results.total_consumers.toLocaleString()}
                </p>
                <span className="text-xs text-slate-500 mt-1 block">Inference records processed</span>
              </div>

              <div className="lab-card p-6 bg-emerald-50/50 border border-emerald-200 text-center">
                <span className="text-xs uppercase font-mono text-emerald-800 font-bold">NORMAL</span>
                <p className="text-4xl font-black text-emerald-700 font-mono mt-2">
                  {results.normal_count.toLocaleString()}
                </p>
                <span className="text-xs text-emerald-800 mt-1 block font-mono font-semibold">
                  {((results.normal_count / results.total_consumers) * 100).toFixed(1)}% of test batch
                </span>
              </div>

              <div className="lab-card p-6 bg-rose-50/50 border border-rose-200 text-center">
                <span className="text-xs uppercase font-mono text-rose-800 font-bold">POTENTIALLY FRAUDULENT</span>
                <p className="text-4xl font-black text-rose-700 font-mono mt-2">
                  {results.fraud_count.toLocaleString()}
                </p>
                <span className="text-xs text-rose-800 mt-1 block font-mono font-semibold">
                  {((results.fraud_count / results.total_consumers) * 100).toFixed(1)}% flagged for audit
                </span>
              </div>

            </div>

            {/* EVALUATION METRICS (ONLY IF FLAG IS PRESENT) */}
            {results.has_ground_truth && results.evaluation_metrics ? (
              <div className="lab-card p-6 sm:p-8 bg-white border border-slate-200 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-200">
                  <div>
                    <span className="text-[11px] font-mono uppercase text-teal-700 font-bold">Supervised Verification</span>
                    <h3 className="text-xl font-bold text-slate-900">Evaluation against uploaded ground truth</h3>
                  </div>
                  <span className="text-xs font-mono px-3 py-1 rounded bg-teal-50 text-teal-800 border border-teal-200 font-semibold">
                    Evaluated Against Uploaded FLAG Ground Truth
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono my-4">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <span className="text-[10px] text-slate-500 font-sans uppercase">Accuracy</span>
                    <p className="text-2xl font-black text-slate-900 mt-0.5">{results.evaluation_metrics.accuracy}%</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <span className="text-[10px] text-slate-500 font-sans uppercase">Precision</span>
                    <p className="text-2xl font-black text-emerald-700 mt-0.5">{results.evaluation_metrics.precision}%</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <span className="text-[10px] text-slate-500 font-sans uppercase">Recall</span>
                    <p className="text-2xl font-black text-amber-700 mt-0.5">{results.evaluation_metrics.recall}%</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <span className="text-[10px] text-slate-500 font-sans uppercase">F1-Score</span>
                    <p className="text-2xl font-black text-sky-700 mt-0.5">{results.evaluation_metrics.f1}%</p>
                  </div>
                </div>

                {/* Confusion Matrix breakdown for this specific test file */}
                {results.evaluation_metrics.confusion_matrix && (
                  <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-mono text-xs font-bold text-slate-700 uppercase block mb-3">
                      Confusion Matrix (TP, FP, TN, FN):
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono text-xs">
                      <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                        <span className="text-slate-500 block text-[10px]">True Positives (TP)</span>
                        <span className="text-base font-bold text-emerald-700">{results.evaluation_metrics.confusion_matrix.tp}</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                        <span className="text-slate-500 block text-[10px]">True Negatives (TN)</span>
                        <span className="text-base font-bold text-sky-700">{results.evaluation_metrics.confusion_matrix.tn}</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                        <span className="text-slate-500 block text-[10px]">False Positives (FP)</span>
                        <span className="text-base font-bold text-amber-700">{results.evaluation_metrics.confusion_matrix.fp}</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                        <span className="text-slate-500 block text-[10px]">False Negatives (FN)</span>
                        <span className="text-base font-bold text-rose-700">{results.evaluation_metrics.confusion_matrix.fn}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono text-slate-600">
                <Info className="w-4 h-4 inline-block mr-1 text-sky-700" />
                Ground truth FLAG column was not provided, so evaluation metrics cannot be calculated.
              </div>
            )}

            {/* Individual Consumer Telemetry Inspector */}
            {selectedConsumer && (
              <div className="lab-card p-6 sm:p-8 bg-white border border-slate-200 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
                  <div>
                    <span className="text-[11px] font-mono uppercase text-teal-700 font-bold">Selected Record Inspector</span>
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      Consumer ID: <span className="font-mono text-sky-700">{selectedConsumer.cons_no}</span>
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full ${
                      selectedConsumer.predicted_flag === 1
                        ? 'bg-rose-100 text-rose-800 border border-rose-200'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}>
                      {selectedConsumer.prediction}
                    </span>

                    {(selectedConsumer.fraud_probability !== null && selectedConsumer.fraud_probability !== undefined) ? (
                      <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        Fraud Probability: {selectedConsumer.fraud_probability}%
                      </span>
                    ) : selectedConsumer.predicted_probability !== null && selectedConsumer.predicted_probability !== undefined ? (
                      <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        Fraud Probability: {selectedConsumer.predicted_probability}%
                      </span>
                    ) : null}

                    {selectedConsumer.actual_flag !== null && (
                      <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                        Ground Truth FLAG: {selectedConsumer.actual_flag}
                      </span>
                    )}
                  </div>
                </div>

                {/* Line Chart of 26 Daily Consumption Values */}
                <div>
                  <h4 className="text-xs font-bold text-slate-700 font-mono uppercase mb-2">
                    Daily Electricity Consumption
                  </h4>
                  <div className="h-64 w-full bg-slate-50/50 rounded-xl p-3 border border-slate-200">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart 
                        data={(selectedConsumer.readings || selectedConsumer.daily_consumption || []).map((val, idx) => ({
                          date: (selectedConsumer.feature_names && selectedConsumer.feature_names[idx]) ? selectedConsumer.feature_names[idx] : `Day ${idx + 1}`,
                          day: `Day ${idx + 1}`,
                          kwh: val
                        }))}
                        margin={{ top: 10, right: 20, left: -10, bottom: 25 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis 
                          dataKey="date" 
                          stroke="#64748b" 
                          fontSize={9} 
                          tickLine={false}
                          angle={-35}
                          textAnchor="end"
                          height={35}
                        />
                        <YAxis stroke="#64748b" fontSize={10} unit=" kWh" />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '8px', fontSize: '12px' }}
                          labelStyle={{ fontWeight: 'bold', color: '#0f172a' }}
                          formatter={(value) => [`${value} kWh`, 'Consumption']}
                          labelFormatter={(label) => `Date: ${label}`}
                        />
                        <Line
                          type="monotone"
                          dataKey="kwh"
                          name="Electricity Consumption"
                          stroke={selectedConsumer.predicted_flag === 1 ? "#e11d48" : "#0f766e"}
                          strokeWidth={2.5}
                          dot={{ r: 3, fill: selectedConsumer.predicted_flag === 1 ? "#e11d48" : "#0f766e" }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-[11px] text-slate-500 font-mono mt-2 text-right">
                    Showing all 26 daily readings recorded in kilowatt-hours (kWh)
                  </p>
                </div>
              </div>
            )}

            {/* Results Table */}
            <div className="lab-card p-6 bg-white border border-slate-200 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Predictions Data Table</h3>
                  <p className="text-xs text-slate-500">Click any row to inspect its 26-day consumption waveform above.</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Filter tabs */}
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-medium">
                    <button
                      onClick={() => setResultFilter('ALL')}
                      className={`px-2.5 py-1 rounded transition-colors ${
                        resultFilter === 'ALL' ? 'bg-white text-slate-900 font-bold shadow-sm' : 'text-slate-600'
                      }`}
                    >
                      All ({results.predictions.length})
                    </button>
                    <button
                      onClick={() => setResultFilter('NORMAL')}
                      className={`px-2.5 py-1 rounded transition-colors ${
                        resultFilter === 'NORMAL' ? 'bg-white text-emerald-800 font-bold shadow-sm' : 'text-slate-600'
                      }`}
                    >
                      Normal ({results.normal_count})
                    </button>
                    <button
                      onClick={() => setResultFilter('FRAUD')}
                      className={`px-2.5 py-1 rounded transition-colors ${
                        resultFilter === 'FRAUD' ? 'bg-white text-rose-800 font-bold shadow-sm' : 'text-slate-600'
                      }`}
                    >
                      Fraud ({results.fraud_count})
                    </button>
                  </div>

                  {/* Search */}
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search ID..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1 text-xs text-slate-800 focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  {/* Download Button */}
                  <button
                    type="button"
                    onClick={handleDownloadPredictions}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-sm transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>DOWNLOAD PREDICTIONS</span>
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto max-h-96">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-100 text-slate-700 uppercase border-b border-slate-200 sticky top-0 z-10">
                    <tr>
                      <th className="py-2.5 px-4 font-sans font-bold">Consumer ID</th>
                      <th className="py-2.5 px-4 font-sans font-bold">Prediction</th>
                      <th className="py-2.5 px-4 font-sans font-bold">Fraud Probability</th>
                      {results.has_ground_truth && (
                        <th className="py-2.5 px-4 font-sans font-bold">Ground Truth FLAG</th>
                      )}
                      <th className="py-2.5 px-4 text-right font-sans font-bold">Inspect</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredPredictions.map((row) => {
                      const isSelected = selectedConsumer?.cons_no === row.cons_no;
                      return (
                        <tr
                          key={row.cons_no}
                          onClick={() => setSelectedConsumer(row)}
                          className={`cursor-pointer transition-colors ${
                            isSelected 
                              ? 'bg-teal-50/70 text-slate-900 font-bold' 
                              : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <td className="py-2.5 px-4 text-sky-800 font-semibold">{row.cons_no}</td>
                          <td className="py-2.5 px-4">
                            <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${
                              row.predicted_flag === 1
                                ? 'bg-rose-100 text-rose-800 border border-rose-200'
                                : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            }`}>
                              {row.prediction}
                            </span>
                          </td>
                          <td className="py-2.5 px-4 text-slate-700 font-semibold">
                            {row.fraud_probability !== null && row.fraud_probability !== undefined 
                              ? `${row.fraud_probability}%` 
                              : (row.predicted_probability !== null && row.predicted_probability !== undefined ? `${row.predicted_probability}%` : 'N/A')}
                          </td>
                          {results.has_ground_truth && (
                            <td className="py-2.5 px-4">
                              <span className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-bold ${
                                row.actual_flag === 1 ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-slate-100 text-slate-700 border border-slate-200'
                              }`}>
                                FLAG {row.actual_flag}
                              </span>
                            </td>
                          )}
                          <td className="py-2.5 px-4 text-right">
                            <span className={`text-[10px] px-2 py-0.5 rounded ${
                              isSelected ? 'bg-teal-600 text-white font-bold' : 'text-slate-400 bg-slate-100'
                            }`}>
                              {isSelected ? 'Viewing' : 'Select'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
