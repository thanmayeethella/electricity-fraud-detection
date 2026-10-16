// Centralized Project Data Source
// All values strictly match the research and project metrics provided.

export const PROJECT_METRICS = {
  totalRecords: 25863,
  totalColumns: 28,
  normalConsumers: 23741,
  fraudConsumers: 2122,
  normalPercentage: 91.8,
  fraudPercentage: 8.2,
  datasetName: "SGCC Electricity Theft Detection Dataset",
  fileName: "datasetsmall.csv",
  trainSplit: "80% (20,690 samples)",
  testSplit: "20% (5,173 samples)",
  smoteBefore: { normal: 18992, fraud: 1698 },
  smoteAfter: { normal: 18992, fraud: 18992 },
};

export const MODEL_RESULTS = [
  {
    id: "logistic-regression",
    name: "Logistic Regression",
    shortName: "LogReg",
    accuracy: 74.04,
    precision: 12.49,
    recall: 36.08,
    f1: 18.56,
    rocAuc: 0.594,
    type: "Linear Baseline",
    badge: "Linear Model",
    description: "Generalized linear model using logistic sigmoid link to predict class probability boundaries."
  },
  {
    id: "decision-tree",
    name: "Decision Tree",
    shortName: "DecTree",
    accuracy: 54.11,
    precision: 11.06,
    recall: 65.33,
    f1: 18.92,
    rocAuc: 0.618,
    type: "Rule-Based Classifier",
    badge: "Tree-Based",
    description: "Non-parametric hierarchical decision tree trained on information gain and entropy splits."
  },
  {
    id: "random-forest-smote",
    name: "Random Forest (SMOTE)",
    shortName: "RF (SMOTE)",
    accuracy: 87.96,
    precision: 20.82,
    recall: 16.75,
    f1: 18.56,
    rocAuc: 0.643,
    type: "Ensemble Classifier",
    badge: "Ensemble",
    description: "Ensemble of decorrelated decision trees trained on SMOTE-balanced training subsets."
  },
  {
    id: "knn",
    name: "K-Nearest Neighbors (KNN)",
    shortName: "KNN",
    accuracy: 68.18,
    precision: 11.91,
    recall: 45.05,
    f1: 18.84,
    rocAuc: 0.597,
    type: "Instance-Based",
    badge: "Distance-Based",
    description: "Instance-based non-parametric classifier predicting labels through Euclidean proximity in normalized feature space."
  },
  {
    id: "svm",
    name: "Support Vector Machine (SVM)",
    shortName: "SVM",
    accuracy: 78.76,
    precision: 14.29,
    recall: 31.84,
    f1: 19.72,
    rocAuc: 0.605,
    type: "Margin Classifier",
    badge: "Kernel Model",
    description: "Determines optimal maximum-margin hyperplane separating normal and fraudulent consumption vectors."
  },
  {
    id: "random-forest-acc",
    name: "Random Forest (Accuracy Optimized)",
    shortName: "RF (Acc-Opt)",
    accuracy: 92.09,
    precision: 72.73,
    recall: 5.66,
    f1: 10.50,
    rocAuc: 0.643,
    type: "Ensemble Classifier",
    badge: "Highest Accuracy",
    isHighestAccuracy: true,
    description: "Random forest model configured for overall accuracy, illustrating the imbalance paradox."
  }
];

export const HYPERPARAMETER_DATA = {
  method: "GridSearchCV",
  modelName: "Random Forest Classifier",
  bestParams: {
    n_estimators: 200,
    max_depth: 20,
    min_samples_split: 2
  },
  cvFolds: "3-Fold Stratified",
  cvScore: {
    metric: "Best CV F1-Score",
    value: "0.7929 (79.29%)"
  },
  testPerformance: {
    accuracy: 69.09,
    precision: 12.99,
    recall: 48.58,
    f1: 20.50,
    rocAuc: 0.6474
  }
};

export const ROC_VALUES = [
  { model: "Random Forest (Tuned)", score: 0.6474, color: "#00e5ff" },
  { model: "Random Forest", score: 0.643, color: "#38bdf8" },
  { model: "Decision Tree", score: 0.618, color: "#818cf8" },
  { model: "SVM", score: 0.605, color: "#a855f7" },
  { model: "KNN", score: 0.597, color: "#ec4899" },
  { model: "Logistic Regression", score: 0.594, color: "#f59e0b" }
];

export const FEATURES_LIST = [
  {
    id: "avg_consumption",
    name: "Average Consumption",
    summary: "Represents typical electricity usage.",
    formula: "\\mu = \\frac{1}{N}\\sum_{i=1}^{N} x_i",
    importance: "High",
    rationale: "Fraudulent consumers frequently display abnormally reduced mean daily consumption compared to legitimate households in similar demographics."
  },
  {
    id: "min_consumption",
    name: "Minimum Consumption",
    summary: "Lowest observed consumption.",
    formula: "x_{min} = \\min(x_1, x_2, ..., x_N)",
    importance: "Medium",
    rationale: "Highlights sustained periods of zero or near-zero power draw, indicating metering bypasses or partial tampering."
  },
  {
    id: "max_consumption",
    name: "Maximum Consumption",
    summary: "Highest observed consumption.",
    formula: "x_{max} = \\max(x_1, x_2, ..., x_N)",
    importance: "Medium",
    rationale: "Captures load peaks during unbypassed intervals or heavy industrial equipment usage."
  },
  {
    id: "std_consumption",
    name: "Standard Deviation",
    summary: "Measures variation in consumption.",
    formula: "\\sigma = \\sqrt{\\frac{1}{N}\\sum_{i=1}^{N} (x_i - \\mu)^2}",
    importance: "High",
    rationale: "Normal consumers exhibit predictable daily cycles, whereas tampered meters often register unnaturally suppressed variance or erratic spikes."
  },
  {
    id: "var_consumption",
    name: "Variance",
    summary: "Measures spread of consumption values.",
    formula: "\\sigma^2 = \\frac{1}{N}\\sum_{i=1}^{N} (x_i - \\mu)^2",
    importance: "Medium",
    rationale: "Second-order dispersion metric indicating extreme volatility or artificial line stabilization."
  },
  {
    id: "peak_ratio",
    name: "Peak Ratio",
    summary: "Compares peak consumption with average consumption.",
    formula: "R_{peak} = \\frac{x_{max}}{\\mu}",
    importance: "High",
    rationale: "Unusually high peak-to-average ratios point to fraudulent users who connect heavy loads intermittently without steady billing."
  },
  {
    id: "rate_of_change",
    name: "Rate of Change",
    summary: "Measures changes between consecutive consumption readings.",
    formula: "\\Delta_{avg} = \\frac{1}{N-1}\\sum_{i=2}^{N} |x_i - x_{i-1}|",
    importance: "High",
    rationale: "Detects sharp step-drops when physical meter bypass switches are engaged and sudden jumps when disengaged."
  },
  {
    id: "consumption_trend",
    name: "Consumption Trend",
    summary: "Represents change from the beginning to the end of the observation period.",
    formula: "T = x_{end} - x_{start} \\text{ (or linear slope)}",
    importance: "Medium",
    rationale: "Tracks progressive meter degradation, illegal hardware insertions, or gradual drop in recorded kWh."
  },
  {
    id: "zero_days",
    name: "Zero Days",
    summary: "Counts days with zero consumption.",
    formula: "Z = \\sum_{i=1}^{N} \\mathbb{I}(x_i = 0)",
    importance: "High",
    rationale: "Repeated zero-reading days for occupied properties are strong empirical flags of line tapping or shunt bypass."
  }
];

export const PREPROCESSING_STEPS = [
  {
    step: 1,
    title: "Raw Dataset Ingestion",
    tag: "Input",
    description: "Loaded 25,863 consumer records with 28 columns (CONS_NO, FLAG, and 26 daily consumption metrics) from datasetsmall.csv.",
    details: "Verifying schema consistency and datatypes across all daily series."
  },
  {
    step: 2,
    title: "Missing Value Detection",
    tag: "Audit",
    description: "Identified null, NaN, and sensor communication dropouts in the smart meter readings.",
    details: "Null values in automated metering infrastructure occur due to network latency, power outages, and transmission drops."
  },
  {
    step: 3,
    title: "Median Imputation",
    tag: "Cleaning",
    description: "Handled missing numerical consumption values using robust median imputation.",
    details: "Median is non-sensitive to extreme outliers compared to mean, preserving natural consumption medians."
  },
  {
    step: 4,
    title: "Duplicate Check",
    tag: "Verification",
    description: "Audited unique identifier CONS_NO records to guarantee zero duplicate consumer entries.",
    details: "Ensures every observation corresponds to an independent smart meter account."
  },
  {
    step: 5,
    title: "Outlier Detection",
    tag: "Inspection",
    description: "Identified anomalous extreme consumption values using Interquartile Range (IQR = Q3 - Q1).",
    details: "Points exceeding [Q1 - 1.5×IQR, Q3 + 1.5×IQR] boundaries were flagged as physical transmission artifacts."
  },
  {
    step: 6,
    title: "IQR-based Outlier Treatment",
    tag: "Clipping",
    description: "Treated extreme outliers through upper and lower threshold clipping (Winsorization).",
    details: "Prevents distortion of variance calculations while retaining valuable continuous sequence structure."
  },
  {
    step: 7,
    title: "Feature Scaling",
    tag: "Standardization",
    description: "Applied StandardScaler to transform features into zero mean and unit variance (z = (x - μ) / σ).",
    details: "Crucial for distance and gradient-based algorithms such as KNN, SVM, and Logistic Regression."
  },
  {
    step: 8,
    title: "Feature Exclusion & Clean Dataset",
    tag: "Finalization",
    description: "CONS_NO excluded from model training because it is an arbitrary identifier rather than a predictive feature.",
    details: "Prevents target leakage and spurious memorization of account IDs."
  }
];

export const SAMPLE_CONSUMER_RECORDS = [
  {
    cons_no: "CONS_004921",
    flag: 0,
    status: "Normal",
    readings: [12.4, 11.8, 13.1, 12.9, 14.0, 13.5, 12.8, 13.2, 12.1, 13.7, 14.2, 13.0, 12.6, 13.3, 14.5, 13.8, 12.9, 13.1, 14.0, 13.4, 12.7, 13.9, 14.1, 13.5, 12.8, 13.2],
    avg: 13.2,
    std: 0.65,
    zeroDays: 0,
    pattern: "Consistent diurnal cycle, steady residential load"
  },
  {
    cons_no: "CONS_008314",
    flag: 0,
    status: "Normal",
    readings: [24.1, 26.5, 25.8, 27.2, 28.0, 29.1, 23.9, 25.4, 26.8, 27.0, 28.5, 29.4, 25.0, 26.2, 27.9, 28.1, 29.8, 24.5, 25.7, 26.9, 27.4, 28.8, 29.0, 25.2, 26.1, 27.5],
    avg: 26.9,
    std: 1.62,
    zeroDays: 0,
    pattern: "Commercial load with weekday/weekend variance"
  },
  {
    cons_no: "CONS_012903",
    flag: 1,
    status: "Potentially Fraudulent",
    readings: [18.2, 17.9, 19.1, 2.1, 0.0, 0.0, 1.4, 0.0, 0.8, 1.2, 0.0, 0.5, 1.1, 0.0, 0.0, 0.9, 1.3, 0.0, 0.0, 1.5, 0.0, 0.7, 1.0, 0.0, 0.0, 1.2],
    avg: 2.65,
    std: 5.72,
    zeroDays: 14,
    pattern: "Abrupt drop from day 4 onwards, frequent zero-readings (shunt bypass)"
  },
  {
    cons_no: "CONS_019482",
    flag: 1,
    status: "Potentially Fraudulent",
    readings: [0.2, 0.1, 0.3, 0.0, 0.2, 0.1, 0.0, 0.3, 0.1, 0.2, 0.0, 0.1, 0.2, 0.3, 0.1, 0.0, 0.2, 0.1, 0.0, 0.2, 0.3, 0.1, 0.2, 0.0, 0.1, 0.2],
    avg: 0.15,
    std: 0.10,
    zeroDays: 8,
    pattern: "Unnaturally suppressed continuous draw (line tapping)"
  },
  {
    cons_no: "CONS_023771",
    flag: 0,
    status: "Normal",
    readings: [8.5, 9.1, 8.8, 9.4, 8.9, 10.2, 9.7, 8.6, 9.0, 9.3, 8.8, 9.5, 10.0, 8.7, 9.2, 9.6, 9.1, 8.9, 9.4, 9.8, 8.6, 9.0, 9.5, 9.2, 8.8, 9.3],
    avg: 9.18,
    std: 0.46,
    zeroDays: 0,
    pattern: "Stable moderate residential baseline"
  }
];

export const MODELS_INFO = [
  {
    name: "Logistic Regression",
    badge: "Classification Model",
    icon: "Activity",
    category: "Linear Probabilistic",
    description: "Applies a linear combination of scaled features followed by the sigmoid activation function to output a fraud probability score."
  },
  {
    name: "Decision Tree",
    badge: "Classification Model",
    icon: "GitBranch",
    category: "Rule-Based Partitioning",
    description: "Splits consumption data recursively based on Gini impurity / information gain, generating orthogonal decision boundaries."
  },
  {
    name: "Random Forest",
    badge: "Classification Model",
    icon: "Trees",
    category: "Bagging Ensemble",
    description: "Constructs a forest of decorrelated decision trees using bootstrap aggregating (bagging) and random subspace feature selection."
  },
  {
    name: "K-Nearest Neighbors (KNN)",
    badge: "Classification Model",
    icon: "Network",
    category: "Distance-Based Instance",
    description: "Classifies each unseen test sample based on the majority class among its k closest neighbors in normalized feature space."
  },
  {
    name: "Support Vector Machine (SVM)",
    badge: "Classification Model",
    icon: "ShieldAlert",
    category: "Maximal Margin",
    description: "Identifies the optimal hyper-plane maximizing the geometric margin between normal consumers and fraudulent instances."
  },
  {
    name: "Gradient Boosting",
    badge: "Classification Model",
    icon: "Zap",
    category: "Sequential Boosting",
    description: "Sequentially builds shallow decision trees where each subsequent tree fits the negative gradient pseudo-residuals of earlier models."
  }
];

export const KEY_FINDINGS = [
  {
    number: "01",
    title: "Class Imbalance is a Major Challenge",
    summary: "With fraudulent consumers comprising only 8.2% of total records, standard loss functions disproportionately favor the majority class, necessitating SMOTE oversampling."
  },
  {
    number: "02",
    title: "Feature Engineering Converts Raw Consumption into Behavioural Indicators",
    summary: "Derived metrics like Rate of Change, Peak Ratio, and Zero Days effectively expose tampering signatures that raw daily series numbers obscure."
  },
  {
    number: "03",
    title: "Random Forest Achieved the Highest Observed Accuracy of 92.09%",
    summary: "The accuracy-optimized Random Forest model produced 92.09% overall test accuracy, outperforming all baseline and distance-based architectures."
  },
  {
    number: "04",
    title: "Accuracy Alone Can Be Misleading in Imbalanced Fraud Detection",
    summary: "At 92.09% accuracy, the model caught only 5.66% of actual frauds (Recall). In utility security, high Recall and F1-score are vital to prevent massive unmetered losses."
  }
];

export const FUTURE_SCOPE_ITEMS = [
  {
    title: "Advanced Feature Engineering",
    description: "Integration of Wavelet Transforms, Fast Fourier Transform (FFT) frequency spectrums, and Shannon entropy to capture non-linear harmonic meter tampering."
  },
  {
    title: "Ensemble Learning",
    description: "Multi-level stacking architectures combining XGBoost, LightGBM, and Deep Dense Networks with meta-learners to balance precision and recall."
  },
  {
    title: "Cost-Sensitive Learning",
    description: "Incorporation of asymmetric penalty loss matrices penalizing false negatives (unmetered theft loss) exponentially higher than false positives (inspection cost)."
  },
  {
    title: "Better Handling of Class Imbalance",
    description: "Exploration of Focal Loss, Adaptive Synthetic Sampling (ADASYN), and Conditional GANs (CTGAN) for high-fidelity synthetic fraud pattern synthesis."
  },
  {
    title: "Larger Datasets",
    description: "Scaling across multi-year smart meter telemetry incorporating seasonal climate indicators, temperature, and socioeconomic geographical zoning."
  },
  {
    title: "Real-Time Electricity Monitoring",
    description: "Edge-computed streaming anomaly detectors running on smart grid concentrators for instant sub-hourly tampering alerts."
  },
  {
    title: "Explainable AI (XAI)",
    description: "Utilizing SHAP (SHapley Additive exPlanations) and LIME to generate verifiable inspection dossiers for field technicians and utility legal audits."
  },
  {
    title: "Deployment as Real-World System",
    description: "Microservice-based REST/gRPC API pipeline connecting directly with Advanced Metering Infrastructure (AMI) head-end systems and utility billing databases."
  }
];
