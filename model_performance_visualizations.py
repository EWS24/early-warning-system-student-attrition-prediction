import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.preprocessing import LabelEncoder, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay, roc_curve, auc, precision_recall_curve, average_precision_score
from sklearn.model_selection import cross_val_score, StratifiedKFold
import plotly.graph_objects as go
import plotly.io as pio

# Load dataset
df = pd.read_csv('CS101_Student_Behavior.csv')

# Convert stringified lists/dicts back to Python objects
df['Weekly_Logins'] = df['Weekly_Logins'].apply(eval)
df['Weekly_Attendance'] = df['Weekly_Attendance'].apply(eval)
df['Assignments'] = df['Assignments'].apply(eval)
df['Quizzes'] = df['Quizzes'].apply(eval)
df['Programming_Projects'] = df['Programming_Projects'].apply(eval)

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

# Prepare dataset
features_df = df.apply(calculate_features, axis=1)
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

# Encode target
label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)

# Train model
model = RandomForestClassifier(random_state=42)
model.fit(X_processed, y_encoded)

# Cross-validation scores
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
cv_scores = cross_val_score(model, X_processed, y_encoded, cv=cv, scoring='accuracy')

# Confusion matrix
y_pred = model.predict(X_processed)
cm = confusion_matrix(y_encoded, y_pred)
cmd = ConfusionMatrixDisplay(cm, display_labels=label_encoder.classes_)

# Plot confusion matrix
plt.figure(figsize=(8,8))
cmd.plot(cmap='Blues', values_format='d')
plt.title('Confusion Matrix', fontsize=16)
plt.xlabel('Predicted Label', fontsize=14)
plt.ylabel('True Label', fontsize=14)
plt.xticks(rotation=45, fontsize=12)
plt.yticks(rotation=45, fontsize=12)
plt.tight_layout()
plt.savefig('static/model_confusion_matrix.png')
plt.close()

# ROC curves (One-vs-Rest)
from sklearn.preprocessing import label_binarize
from sklearn.metrics import RocCurveDisplay

y_bin = label_binarize(y_encoded, classes=np.arange(len(label_encoder.classes_)))
plt.figure(figsize=(10,8))
for i, class_label in enumerate(label_encoder.classes_):
    fpr, tpr, _ = roc_curve(y_bin[:, i], model.predict_proba(X_processed)[:, i])
    roc_auc = auc(fpr, tpr)
    plt.plot(fpr, tpr, lw=4, label=f'{class_label} (AUC = {roc_auc:.2f})')
plt.plot([0,1], [0,1], 'k--', lw=2)
plt.xlabel('False Positive Rate', fontsize=14)
plt.ylabel('True Positive Rate', fontsize=14)
plt.title('Multi-class ROC Curve', fontsize=16)
plt.legend(loc='lower right', fontsize=12)
plt.grid(True)
plt.tight_layout()
plt.savefig('static/model_roc_curve.png')
plt.close()

# Precision-Recall curves
plt.figure(figsize=(10,8))
for i, class_label in enumerate(label_encoder.classes_):
    precision, recall, _ = precision_recall_curve(y_bin[:, i], model.predict_proba(X_processed)[:, i])
    avg_precision = average_precision_score(y_bin[:, i], model.predict_proba(X_processed)[:, i])
    plt.plot(recall, precision, lw=4, label=f'{class_label} (AP = {avg_precision:.2f})')
plt.xlabel('Recall', fontsize=14)
plt.ylabel('Precision', fontsize=14)
plt.title('Multi-class Precision-Recall Curve', fontsize=16)
plt.legend(loc='lower left', fontsize=12)
plt.grid(True)
plt.tight_layout()
plt.savefig('static/model_precision_recall_curve.png')
plt.close()

# Cross-validation score bar chart (Plotly)
fig = go.Figure(data=[go.Bar(
    x=[f'Fold {i+1}' for i in range(len(cv_scores))],
    y=cv_scores,
    marker_color='indianred'
)])
fig.update_layout(
    title='Cross-validation Accuracy Scores',
    yaxis=dict(title='Accuracy'),
    xaxis=dict(title='Fold')
)
pio.write_html(fig, 'static/model_cv_scores.html', auto_open=False)

# Feature importance plot (Plotly)
importances = model.feature_importances_
indices = np.argsort(importances)[::-1]
feature_names = list(preprocessor.named_transformers_['cat'].get_feature_names_out(categorical_features)) + ['Avg_Attendance', 'Avg_Logins', 'Pct_OnTime_Assignments', 'Avg_Quiz_Grade']

fig2 = go.Figure(data=[go.Bar(
    x=[feature_names[i] for i in indices],
    y=importances[indices],
    marker_color='lightsalmon'
)])
fig2.update_layout(
    title='Feature Importances',
    yaxis=dict(title='Importance'),
    xaxis=dict(title='Feature', tickangle=45)
)
pio.write_html(fig2, 'static/model_feature_importance.html', auto_open=False)

print("Model performance visualizations generated in 'static/' folder.")
