import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectOverview from './components/ProjectOverview';
import LiveDetection from './components/LiveDetection';
import PipelineTimeline from './components/PipelineTimeline';
import DatasetExplorer from './components/DatasetExplorer';
import DataDistribution from './components/DataDistribution';
import DataPreprocessing from './components/DataPreprocessing';
import EdaDashboard from './components/EdaDashboard';
import FeatureEngineering from './components/FeatureEngineering';
import SmoteSection from './components/SmoteSection';
import ModelsOverview from './components/ModelsOverview';
import TrainingPipeline from './components/TrainingPipeline';
import ModelComparison from './components/ModelComparison';
import HighestAccuracySection from './components/HighestAccuracySection';
import ConfusionMatrixSection from './components/ConfusionMatrixSection';
import RocAucSection from './components/RocAucSection';
import OptimizationSection from './components/OptimizationSection';
import KeyFindings from './components/KeyFindings';
import Conclusion from './components/Conclusion';
import FutureScope from './components/FutureScope';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

export default function App() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 selection:bg-sky-500/20 selection:text-sky-900 relative font-sans">
      {/* Sticky Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero / Landing Section */}
        <Hero />

        {/* 2. Project Overview */}
        <ProjectOverview />

        {/* NEW: Live Fraud Detection with Real Saved Random Forest Model */}
        <LiveDetection />

        {/* Methodology Timeline Navigator */}
        <PipelineTimeline />

        {/* 3. Dataset Explorer */}
        <DatasetExplorer />

        {/* 4. Data Distribution & Class Imbalance */}
        <DataDistribution />

        {/* 5. Data Preprocessing */}
        <DataPreprocessing />

        {/* 6. Exploratory Data Analysis Dashboard */}
        <EdaDashboard />

        {/* 7. Feature Engineering */}
        <FeatureEngineering />

        {/* 8. Class Imbalance + SMOTE */}
        <SmoteSection />

        {/* 9. Machine Learning Models Suite */}
        <ModelsOverview />

        {/* 10. Model Training Pipeline */}
        <TrainingPipeline />

        {/* 11. Model Benchmark Comparison */}
        <ModelComparison />

        {/* 12. Highest Accuracy Model Spotlight (92.09% + Caveat) */}
        <HighestAccuracySection />

        {/* 13. Confusion Matrix Diagnostics */}
        <ConfusionMatrixSection />

        {/* 14. ROC-AUC Evaluation */}
        <RocAucSection />

        {/* 15. Hyperparameter Optimization (GridSearchCV) */}
        <OptimizationSection />

        {/* 17. Key Findings */}
        <KeyFindings />

        {/* 18. Conclusion */}
        <Conclusion />

        {/* 19. Future Scope */}
        <FutureScope />
      </main>

      {/* 20. Project Credits & Footer */}
      <Footer />

      {/* Floating Back to Top Button */}
      <BackToTop />
    </div>
  );
}
