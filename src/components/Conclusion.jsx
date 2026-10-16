import React from 'react';
import { BookmarkCheck, FileText, CheckCircle2 } from 'lucide-react';

export default function Conclusion() {
  return (
    <section id="conclusion" className="py-24 relative bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs font-bold text-sky-800 bg-sky-50 px-2.5 py-1 rounded border border-sky-200">
              SECTION 16 • SYNTHESIS
            </span>
            <span className="text-xs font-mono text-slate-500">ACADEMIC CONCLUSION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Project Conclusion
          </h2>
          <p className="text-slate-600 mt-2 text-base">
            Formal summarization and final scientific evaluation of the machine learning study.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-sky-500 to-teal-500 rounded-full mt-3" />
        </div>

        {/* Central Conclusion Glass Container */}
        <div className="lab-card p-8 sm:p-12 bg-white border border-slate-200 shadow-md relative overflow-hidden">
          
          <div className="flex items-start gap-4 mb-8">
            <div className="p-3.5 rounded-2xl bg-sky-50 text-sky-700 border border-sky-200 shrink-0 shadow-2xs">
              <FileText className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase text-sky-800 font-bold tracking-wider">
                Formal Project Synthesis
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                Detection of Potentially Fraudulent Electricity Consumption Patterns Using Machine Learning
              </h3>
            </div>
          </div>

          {/* Official synthesis statement */}
          <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 text-slate-800 text-base sm:text-lg leading-relaxed shadow-inner">
            <p className="italic text-slate-800">
              "This project demonstrates an end-to-end machine learning approach for detecting potentially fraudulent electricity consumption patterns. The SGCC dataset was preprocessed, explored and transformed through feature engineering before applying multiple classification algorithms. SMOTE was used to address class imbalance in the training data, and GridSearchCV was used for hyperparameter optimization. Random Forest achieved the highest observed accuracy of 92.09%; however, the low recall of the accuracy-optimized model highlights the importance of evaluating fraud detection models using multiple performance metrics rather than accuracy alone."
            </p>
          </div>

          {/* Key Takeaway Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-100">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span className="text-xs text-slate-700 font-medium">End-to-End Pipeline Demonstrated</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0" />
              <span className="text-xs text-slate-700 font-medium">Rigorous SMOTE + GridSearch Optimization</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
              <span className="text-xs text-slate-700 font-medium">Comprehensive Multi-Metric Evaluation</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
