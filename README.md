\# Electricity Fraud Detection Using Machine Learning



A Machine Learning-based web application for detecting potentially fraudulent electricity consumption patterns from historical consumer electricity usage data.



The system analyzes daily electricity consumption patterns and classifies consumers as \*\*Normal\*\* or \*\*Potentially Fraudulent\*\* using a trained Random Forest classifier. The project also provides an interactive web interface for CSV-based predictions and result analysis.



\---



\## Overview



Electricity theft and abnormal consumption are major challenges for power distribution companies. Identifying suspicious consumption manually becomes difficult when dealing with thousands of consumers and large volumes of historical electricity data.



This project uses Machine Learning techniques to analyze electricity consumption patterns and identify consumers whose usage behavior may indicate potential fraudulent activity.



The solution combines:



\- Data preprocessing

\- Exploratory Data Analysis

\- Feature engineering

\- Class imbalance handling

\- Multiple Machine Learning algorithms

\- Model evaluation and comparison

\- A trained Random Forest model

\- FastAPI backend

\- React-based frontend

\- Real-time CSV-based prediction



\---



\## Problem Statement



\*\*Detection of Potentially Fraudulent Electricity Consumption Patterns Using Machine Learning\*\*



The objective is to develop a Machine Learning system capable of identifying potentially fraudulent electricity consumption patterns based on historical daily consumption data.



The system takes consumer electricity consumption data as input and predicts whether the consumption pattern is:



\- \*\*Normal\*\*

\- \*\*Potentially Fraudulent\*\*



\---



\## Dataset



The project uses the \*\*SGCC (State Grid Corporation of China) electricity consumption dataset\*\*.



\### Dataset Characteristics



| Property | Value |

|---|---:|

| Total Records | 25,863 |

| Total Columns | 28 |

| Consumer Identifier | `CONS\_NO` |

| Target Variable | `FLAG` |

| Consumption Features | 26 daily values |

| Normal Consumers | 23,741 |

| Potentially Fraudulent Consumers | 2,122 |



\### Class Distribution



| FLAG | Class | Count | Percentage |

|---:|---|---:|---:|

| 0 | Normal | 23,741 | 91.8% |

| 1 | Potentially Fraudulent | 2,122 | 8.2% |



The dataset is highly imbalanced, with normal consumption patterns forming the majority class.



\---



\## Methodology



The project follows the following Machine Learning pipeline:



```text

Raw Dataset

&#x20;    ↓

Data Cleaning

&#x20;    ↓

Missing Value Handling

&#x20;    ↓

Exploratory Data Analysis

&#x20;    ↓

Feature Engineering

&#x20;    ↓

Train-Test Split

&#x20;    ↓

Feature Scaling

&#x20;    ↓

Class Imbalance Handling

&#x20;    ↓

Model Training

&#x20;    ↓

Model Evaluation

&#x20;    ↓

Best Model Selection

&#x20;    ↓

Model Serialization

&#x20;    ↓

Web-Based Prediction

