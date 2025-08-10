import pandas as pd
import numpy as np
import ast
from sklearn.preprocessing import LabelEncoder, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestClassifier
from shapash.explainer.smart_explainer import SmartExplainer

# Load dataset
df = pd.read_csv('CS101_Student_Behavior.csv')

# Convert stringified lists/dicts back to Python objects
df['Weekly_Logins'] = df['Weekly_Logins'].apply(ast.literal_eval)
df['Weekly_Attendance'] = df['Weekly_Attendance'].apply(ast.literal_eval)
df['Assignments'] = df['Assignments'].apply(ast.literal_eval)
df['Quizzes'] = df['Quizzes'].apply(ast.literal_eval)
df['Programming_Projects'] = df['Programming_Projects'].apply(ast.literal_eval)

# Feature engineering function (simplified)
def calculate_features(df_row):
    grade_map = {'A': 4, 'B': 3, 'C': 2, 'D': 1, 'E': 0.5, 'F': 0}
    attendance = np.mean(df_row['Weekly_Attendance'])
    logins = np.mean(df_row['Weekly_Logins'])
    assignments_on_time = sum(1 for a in df_row['Assignments'] if a['Submission_Status'] == 'On Time') / len(df_row['Assignments'])
    avg_quiz_grade = np.mean([grade_map[g] for g in df_row['Quizzes']])
    return pd.Series({
        'Avg_Attendance': attendance,
        'Avg_Logins': logins,
        'Pct_OnTime_Assignments': assignments_on_time,
        'Avg_Quiz_Grade': avg_quiz_grade
    })

# Apply feature engineering
features_df = df.apply(calculate_features, axis=1)

# Prepare final dataset
X = pd.concat([df[['Gender', 'Ethnicity', 'Scholarship']], features_df], axis=1)
y = df['Label']

# Encode categorical features
categorical_features = ['Gender', 'Ethnicity', 'Scholarship']
preprocessor = ColumnTransformer(
    transformers=[
        ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
    ],
    remainder='passthrough'
)
X_processed = preprocessor.fit_transform(X)

# Get feature names after encoding
ohe_feature_names = preprocessor.named_transformers_['cat'].get_feature_names_out(categorical_features)
all_feature_names = list(ohe_feature_names) + list(features_df.columns)

# Convert X_processed to DataFrame with feature names
X_processed_df = pd.DataFrame(X_processed, columns=all_feature_names)

# Encode target
label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)

# Train a RandomForestClassifier
model = RandomForestClassifier(random_state=42)
model.fit(X_processed_df, y_encoded)

# Prepare features dict for Shapash
features_dict = {
    'Gender_Male': 'Gender: Male',
    'Gender_Female': 'Gender: Female',
    'Gender_Non-binary': 'Gender: Non-binary',
    'Ethnicity_Asian': 'Ethnicity: Asian',
    'Ethnicity_Black': 'Ethnicity: Black',
    'Ethnicity_Hispanic': 'Ethnicity: Hispanic',
    'Ethnicity_White': 'Ethnicity: White',
    'Ethnicity_Other': 'Ethnicity: Other',
    'Scholarship_Yes': 'Scholarship: Yes',
    'Scholarship_No': 'Scholarship: No',
    'Avg_Attendance': 'Average Weekly Attendance',
    'Avg_Logins': 'Average Weekly Logins',
    'Pct_OnTime_Assignments': 'Percentage of On-Time Assignments',
    'Avg_Quiz_Grade': 'Average Quiz Grade'
}

# Create SmartExplainer
xpl = SmartExplainer(model=model, features_dict=features_dict)

# Compile explainer
import pandas as pd

y_pred_series = pd.Series(model.predict(X_processed_df))
y_target_series = pd.Series(y_encoded)

xpl.compile(
    x=X_processed_df,
    y_pred=y_pred_series,
    y_target=y_target_series
)

# Generate global feature importance plot as HTML
xpl.plot.features_importance().write_html('static/shapash_feature_importance.html')

# Generate local explanation for first 10 samples as HTML
local_exp = xpl.to_pandas().head(10)
local_exp.to_html('static/shapash_local_explanations.html')

print("Shapash visualizations generated in 'static/' folder.")
