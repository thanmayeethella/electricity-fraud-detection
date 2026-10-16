import os
import io
import pandas as pd
import numpy as np
import joblib
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix

app = FastAPI(
    title="Electricity Fraud Detection - ML Inference Engine",
    description="Live prediction API using saved Random Forest, StandardScaler, and feature_columns joblib artifacts",
    version="1.1.0"
)

# Enable CORS for local Vite dev server and preview ports
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODELS_DIR = os.path.join(BASE_DIR, "models")
MODEL_PATH = os.path.join(MODELS_DIR, "random_forest_model.joblib")
SCALER_PATH = os.path.join(MODELS_DIR, "scaler.joblib")
FEATURE_COLS_PATH = os.path.join(MODELS_DIR, "feature_columns.joblib")

# In-memory artifact references (loaded once at startup)
model = None
scaler = None
feature_columns = None

def load_artifacts():
    global model, scaler, feature_columns
    missing = []
    if not os.path.exists(MODEL_PATH):
        missing.append("random_forest_model.joblib")
    if not os.path.exists(SCALER_PATH):
        missing.append("scaler.joblib")
    if not os.path.exists(FEATURE_COLS_PATH):
        missing.append("feature_columns.joblib")

    if missing:
        print(f"[BACKEND WARNING] Missing model artifact(s): {missing} in {MODELS_DIR}")
        return False

    try:
        model = joblib.load(MODEL_PATH)
        scaler = joblib.load(SCALER_PATH)
        feature_columns = joblib.load(FEATURE_COLS_PATH)
        print(f"[BACKEND SUCCESS] Loaded pre-trained Random Forest model, scaler, and {len(feature_columns)} feature columns.")
        return True
    except Exception as e:
        print(f"[BACKEND ERROR] Error loading joblib artifacts: {e}")
        return False

# Load artifacts on startup
load_artifacts()

@app.get("/")
def root():
    return {
        "service": "Electricity Fraud Detection API",
        "status": "online",
        "model_loaded": model is not None,
        "scaler_loaded": scaler is not None,
        "feature_columns_loaded": feature_columns is not None,
        "feature_count": len(feature_columns) if feature_columns else 0
    }

@app.get("/api/health")
def health_check():
    loaded = model is not None and scaler is not None and feature_columns is not None
    if not loaded:
        loaded = load_artifacts()

    return {
        "status": "healthy" if loaded else "artifacts_missing",
        "model_loaded": model is not None,
        "scaler_loaded": scaler is not None,
        "feature_columns_loaded": feature_columns is not None,
        "model_type": type(model).__name__ if model else None,
        "feature_count": len(feature_columns) if feature_columns else 0,
        "feature_columns": list(feature_columns) if feature_columns else []
    }

@app.get("/api/debug")
def debug_model():
    global model, scaler, feature_columns
    if model is None or scaler is None or feature_columns is None:
        load_artifacts()
    
    return {
        "model_type": type(model).__name__ if model else None,
        "model_params": {
            "n_estimators": getattr(model, "n_estimators", None),
            "max_depth": getattr(model, "max_depth", None),
            "min_samples_split": getattr(model, "min_samples_split", None),
            "random_state": getattr(model, "random_state", None)
        } if model else {},
        "model_classes": list(map(int, model.classes_)) if hasattr(model, "classes_") else [],
        "model_n_features_in": getattr(model, "n_features_in_", None),
        "scaler_type": type(scaler).__name__ if scaler else None,
        "scaler_n_features_in": getattr(scaler, "n_features_in_", None),
        "feature_columns_length": len(feature_columns) if feature_columns else 0,
        "feature_columns": list(feature_columns) if feature_columns else [],
        "features_match_scaler": (len(feature_columns) == getattr(scaler, "n_features_in_", None)) if (feature_columns and scaler) else False,
        "features_match_model": (len(feature_columns) == getattr(model, "n_features_in_", None)) if (feature_columns and model) else False
    }

@app.post("/api/predict")
async def predict_fraud(file: UploadFile = File(...)):
    global model, scaler, feature_columns

    # 1. Ensure artifacts are loaded
    if model is None or scaler is None or feature_columns is None:
        if not load_artifacts():
            raise HTTPException(
                status_code=503,
                detail=f"Pre-trained model artifacts are not available in {MODELS_DIR}. Ensure random_forest_model.joblib, scaler.joblib, and feature_columns.joblib are present."
            )

    # 2. Read CSV file
    try:
        contents = await file.read()
        df = pd.read_csv(io.BytesIO(contents))
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to parse uploaded CSV file: {str(e)}")

    if df.empty:
        raise HTTPException(status_code=400, detail="Uploaded CSV file is empty.")

    # 3. Preserve CONS_NO for displaying the consumer ID
    cons_col = None
    for col in df.columns:
        if col.strip().upper() == "CONS_NO" or "cons" in col.lower() or "consumer" in col.lower() or col.lower() == "id":
            cons_col = col
            break

    if cons_col:
        consumer_ids = df[cons_col].astype(str).tolist()
    else:
        # If no explicit ID column, generate synthetic sequential IDs
        consumer_ids = [f"CONS_{10000 + i}" for i in range(len(df))]

    # 4. Check for ground-truth FLAG (separate from prediction features)
    flag_col = None
    actual_flags = None
    for col in df.columns:
        if col.strip().upper() == "FLAG" or col.strip().lower() == "target" or col.strip().lower() == "label":
            flag_col = col
            break

    if flag_col:
        actual_flags = df[flag_col].tolist()

    # 5. Verify that every required feature from feature_columns.joblib exists
    missing_cols = [c for c in feature_columns if c not in df.columns]
    if missing_cols:
        raise HTTPException(
            status_code=400,
            detail=f"Uploaded CSV is missing {len(missing_cols)} required consumption column(s): {', '.join(missing_cols[:5])}{'...' if len(missing_cols) > 5 else ''}"
        )

    # 6. Select input columns using the EXACT order stored in feature_columns.joblib
    # Note: FLAG and CONS_NO are explicitly NOT selected
    X_df = df[feature_columns].copy()

    # 7. Convert consumption values to numeric values
    X_numeric = X_df.apply(pd.to_numeric, errors='coerce')

    # 8. Handle missing values appropriately without fitting a new scaler
    X_clean = X_numeric.fillna(X_numeric.median()).fillna(0.0)

    # 9. Apply saved scaler: scaler.transform(X) (never fit_transform)
    try:
        X_scaled = scaler.transform(X_clean)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error applying saved scaler.transform(): {str(e)}"
        )

    # 10. Generate model predictions: model.predict(X_scaled)
    try:
        raw_predictions = model.predict(X_scaled)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error executing model.predict(): {str(e)}"
        )

    # 11. Calculate fraud probabilities if predict_proba is supported
    probabilities_class_1 = None
    if hasattr(model, "predict_proba"):
        try:
            probas = model.predict_proba(X_scaled)
            classes_list = list(model.classes_)
            fraud_idx = classes_list.index(1) if 1 in classes_list else -1
            if fraud_idx != -1:
                probabilities_class_1 = [round(float(p[fraud_idx]) * 100, 1) for p in probas]
            else:
                # If class 1 not found explicitly in classes
                probabilities_class_1 = [round(float(p[0]) * 100, 1) for p in probas]
        except Exception as e:
            print(f"[BACKEND WARNING] Error calculating predict_proba: {e}")
            probabilities_class_1 = None

    # Comprehensive Logging for Verification
    print("\n" + "="*50)
    print(f"[PREDICTION PIPELINE DEBUG] Processing: {file.filename}")
    print(f"1. CSV Columns ({len(df.columns)}): {list(df.columns)}")
    print(f"2. Number of rows: {len(df)}")
    print(f"3. Exact feature columns selected ({len(feature_columns)}): {list(feature_columns)}")
    print(f"4. Exact order matches feature_columns.joblib: {list(X_df.columns) == list(feature_columns)}")
    print(f"5. First row raw feature values:\n{X_clean.iloc[0].values}")
    print(f"6. First row after scaler.transform():\n{X_scaled[0]}")
    print(f"7. Raw model predictions: {raw_predictions.tolist()}")
    if probabilities_class_1:
        print(f"8. Fraud probabilities (Class 1): {probabilities_class_1}")
    print("="*50 + "\n")

    # Map predictions: 0 = Normal, 1 = Potentially Fraudulent
    total_consumers = len(raw_predictions)
    normal_count = int(np.sum(raw_predictions == 0))
    fraud_count = int(np.sum(raw_predictions == 1))

    # 12. Evaluation against uploaded ground truth (ONLY IF FLAG IS PRESENT)
    evaluation_metrics = None
    evaluation_message = None

    if actual_flags is not None:
        try:
            y_true = [1 if str(f).strip() in ['1', '1.0', 'true', 'True'] else 0 for f in actual_flags]
            y_pred = [int(p) for p in raw_predictions]

            acc = float(accuracy_score(y_true, y_pred)) * 100
            prec = float(precision_score(y_true, y_pred, zero_division=0)) * 100
            rec = float(recall_score(y_true, y_pred, zero_division=0)) * 100
            f1 = float(f1_score(y_true, y_pred, zero_division=0)) * 100

            cm = confusion_matrix(y_true, y_pred, labels=[0, 1])
            tn, fp, fn, tp = int(cm[0][0]), int(cm[0][1]), int(cm[1][0]), int(cm[1][1])

            evaluation_metrics = {
                "label": "Evaluation against uploaded ground truth",
                "accuracy": round(acc, 2),
                "precision": round(prec, 2),
                "recall": round(rec, 2),
                "f1": round(f1, 2),
                "confusion_matrix": {
                    "tp": tp,
                    "tn": tn,
                    "fp": fp,
                    "fn": fn
                }
            }
        except Exception as eval_err:
            print(f"[BACKEND WARNING] Could not evaluate metrics: {eval_err}")
            evaluation_metrics = None
    else:
        evaluation_message = "Ground truth FLAG column was not provided, so evaluation metrics cannot be calculated."

    # 13. Build individual consumer results
    consumer_results = []
    for i in range(total_consumers):
        pred_label = "Normal" if raw_predictions[i] == 0 else "Potentially Fraudulent"
        fraud_prob = probabilities_class_1[i] if probabilities_class_1 is not None else None
        
        # Original 26 daily consumption readings for clean chart
        daily_vals = [round(float(v), 2) for v in X_clean.iloc[i].values]

        record = {
            "consumer_id": consumer_ids[i],
            "cons_no": consumer_ids[i],
            "prediction": pred_label,
            "predicted_flag": int(raw_predictions[i]),
            "fraud_probability": fraud_prob,
            "predicted_probability": fraud_prob,
            "actual_flag": int(actual_flags[i]) if actual_flags is not None else None,
            "daily_consumption": daily_vals,
            "readings": daily_vals,
            "feature_names": list(feature_columns)
        }
        consumer_results.append(record)

    return {
        "status": "success",
        "file_name": file.filename,
        "total_consumers": total_consumers,
        "normal_count": normal_count,
        "fraud_count": fraud_count,
        "has_ground_truth": actual_flags is not None,
        "evaluation_metrics": evaluation_metrics,
        "evaluation_message": evaluation_message,
        "feature_columns_used": list(feature_columns),
        "predictions": consumer_results
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("backend.main:app", host="0.0.0.0", port=port, reload=True)
