import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Load dataset
df = pd.read_csv('CS101_Student_Behavior.csv')

# Convert stringified lists/dicts back to Python objects
df['Weekly_Logins'] = df['Weekly_Logins'].apply(eval)
df['Weekly_Attendance'] = df['Weekly_Attendance'].apply(eval)

# Explode weekly logins for trend plot
logins_records = []
for _, row in df.iterrows():
    for week, value in enumerate(row['Weekly_Logins'], start=1):
        logins_records.append({'Week': week, 'Logins': value, 'Label': row['Label']})
logins_df = pd.DataFrame(logins_records)

# Plot weekly logins trend by risk class
plt.figure(figsize=(10,6))
sns.lineplot(data=logins_df, x='Week', y='Logins', hue='Label', marker='o')
plt.title('Weekly Logins Trend by Risk Class', fontsize=16)
plt.xlabel('Week', fontsize=14)
plt.ylabel('Average Logins', fontsize=14)
plt.xticks(fontsize=12)
plt.yticks(fontsize=12)
plt.legend(title='Risk Class', fontsize=12, title_fontsize=14)
plt.grid(True)
plt.tight_layout()
plt.savefig('static/simple_weekly_logins_trend.png')
plt.close()

print("Simple weekly logins trend visualization generated in 'static/' folder.")
