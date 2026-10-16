import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
import joblib
import os

# Set seed for reproducible model artifacts
np.random.seed(42)

print("Synthesizing baseline smart meter consumption profiles matching SGCC characteristics...")

# 26 daily consumption columns
feature_names = [f"Day_{i+1}" for i in range(26)]

# Generate training distribution: 91.8% Normal, 8.2% Fraudulent
n_normal = 2500
n_fraud = 223
n_total = n_normal + n_fraud

# Normal consumers: baseline ~10-18 kWh, diurnal cycle with small noise
normal_data = []
for _ in range(n_normal):
    base = np.random.uniform(9.0, 16.0)
    variance = np.random.uniform(0.5, 1.8)
    cycle = np.sin(np.linspace(0, 4 * np.pi, 26)) * variance
    noise = np.random.normal(0, 0.4, 26)
    readings = np.clip(base + cycle + noise, 1.0, 35.0)
    normal_data.append(readings)

# Fraudulent consumers: tampering patterns (sudden step-drops, zero days, line taps)
fraud_data = []
for _ in range(n_fraud):
    pattern_type = np.random.choice(["bypass", "line_tap", "partial_shunt"])
    if pattern_type == "bypass":
        # Sudden drop to near zero or intermittent zeroes
        base = np.random.uniform(10.0, 18.0)
        readings = base + np.random.normal(0, 0.8, 26)
        drop_start = np.random.randint(3, 12)
        readings[drop_start:] = np.random.choice([0.0, 0.3, 0.7, 1.2], size=26-drop_start, p=[0.5, 0.2, 0.2, 0.1])
    elif pattern_type == "line_tap":
        # Unnaturally suppressed continuous draw
        readings = np.random.uniform(0.05, 0.8, 26)
    else:
        # Partial shunt: 70-80% reduction
        base = np.random.uniform(10.0, 16.0)
        readings = (base + np.random.normal(0, 0.5, 26)) * 0.22
    
    fraud_data.append(np.clip(readings, 0.0, 35.0))

X = np.vstack([normal_data, fraud_data])
y = np.array([0] * n_normal + [1] * n_fraud)

# Shuffle
perm = np.random.permutation(len(y))
X = X[perm]
y = y[perm]

print(f"Fitting StandardScaler on {X.shape[0]} samples with 26 features...")
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

print("Training RandomForestClassifier (n_estimators=200, max_depth=20, min_samples_split=2)...")
rf_model = RandomForestClassifier(
    n_estimators=200,
    max_depth=20,
    min_samples_split=2,
    random_state=42,
    n_jobs=-1
)
rf_model.fit(X_scaled, y)

# Save artifacts
models_dir = os.path.join("backend", "models")
os.makedirs(models_dir, exist_ok=True)

model_path = os.path.join(models_dir, "random_forest_model.joblib")
scaler_path = os.path.join(models_dir, "scaler.joblib")

joblib.dump(rf_model, model_path)
joblib.dump(scaler, scaler_path)
print(f"[SUCCESS] Saved pre-trained model to {model_path}")
print(f"[SUCCESS] Saved fitted scaler to {scaler_path}")

# Now generate sample test CSV files for the user/teacher to upload and test
sample_dir = os.path.join("backend", "sample_test_datasets")
os.makedirs(sample_dir, exist_ok=True)

# 1. Test set with FLAG (30 normal, 10 fraud)
test_normal = []
test_fraud = []

for i in range(30):
    base = np.random.uniform(9.0, 15.0)
    cycle = np.sin(np.linspace(0, 4 * np.pi, 26)) * 1.2
    noise = np.random.normal(0, 0.4, 26)
    readings = np.clip(base + cycle + noise, 1.0, 32.0)
    test_normal.append(np.round(readings, 2))

for i in range(10):
    base = np.random.uniform(10.0, 16.0)
    readings = base + np.random.normal(0, 0.6, 26)
    drop_idx = np.random.randint(4, 10)
    readings[drop_idx:] = np.random.choice([0.0, 0.2, 0.6], size=26-drop_idx, p=[0.6, 0.2, 0.2])
    test_fraud.append(np.round(np.clip(readings, 0.0, 30.0), 2))

all_test_readings = np.vstack([test_normal, test_fraud])
all_test_flags = [0] * 30 + [1] * 10
cons_ids = [f"CONS_{10000 + i}" for i in range(40)]

test_df_with_flag = pd.DataFrame(all_test_readings, columns=feature_names)
test_df_with_flag.insert(0, "CONS_NO", cons_ids)
test_df_with_flag.insert(1, "FLAG", all_test_flags)

# Shuffle test set
test_df_with_flag = test_df_with_flag.sample(frac=1, random_state=42).reset_index(drop=True)

test_with_flag_path = os.path.join(sample_dir, "sample_test_with_flag.csv")
test_df_with_flag.to_csv(test_with_flag_path, index=False)
print(f"[SUCCESS] Created sample test dataset with FLAG: {test_with_flag_path} ({len(test_df_with_flag)} rows)")

# 2. Test set without FLAG (blind production test)
test_df_without_flag = test_df_with_flag.drop(columns=["FLAG"])
test_without_flag_path = os.path.join(sample_dir, "sample_test_without_flag.csv")
test_df_without_flag.to_csv(test_without_flag_path, index=False)
print(f"[SUCCESS] Created sample test dataset without FLAG: {test_without_flag_path} ({len(test_df_without_flag)} rows)")

# Copy the sample files to public/ so the frontend can download or load them instantly
public_dir = os.path.join("public", "sample_datasets")
os.makedirs(public_dir, exist_ok=True)
test_df_with_flag.to_csv(os.path.join(public_dir, "sample_test_with_flag.csv"), index=False)
test_df_without_flag.to_csv(os.path.join(public_dir, "sample_test_without_flag.csv"), index=False)
print(f"[SUCCESS] Copied sample datasets to {public_dir}")

print("All artifacts generated successfully.")
