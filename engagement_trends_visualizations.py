import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.express as px
import plotly.io as pio

# Load dataset
df = pd.read_csv('CS101_Student_Behavior.csv')

# Convert stringified lists/dicts back to Python objects
df['Weekly_Logins'] = df['Weekly_Logins'].apply(eval)
df['Weekly_Attendance'] = df['Weekly_Attendance'].apply(eval)
df['Assignments'] = df['Assignments'].apply(eval)
df['Quizzes'] = df['Quizzes'].apply(eval)
df['Programming_Projects'] = df['Programming_Projects'].apply(eval)

# Explode weekly data for trend lines
def explode_weekly(df, column):
    records = []
    for _, row in df.iterrows():
        for week, value in enumerate(row[column], start=1):
            records.append({
                'Student_ID': row['Student_ID'],
                'Week': week,
                'Value': value,
                'Label': row['Label']
            })
    return pd.DataFrame(records)

# Prepare data for weekly trends
logins_df = explode_weekly(df, 'Weekly_Logins')
attendance_df = explode_weekly(df, 'Weekly_Attendance')

# Plot weekly trend lines per metric segmented by risk class (Plotly)
fig_logins = px.line(logins_df, x='Week', y='Value', color='Label', title='Weekly Logins by Risk Class')
fig_attendance = px.line(attendance_df, x='Week', y='Value', color='Label', title='Weekly Attendance by Risk Class')

pio.write_html(fig_logins, 'static/engagement_weekly_logins.html', auto_open=False)
pio.write_html(fig_attendance, 'static/engagement_weekly_attendance.html', auto_open=False)

# Heatmap of student × week engagement (logins)
pivot_logins = logins_df.pivot(index='Student_ID', columns='Week', values='Value')
plt.figure(figsize=(12, 8))
sns.heatmap(pivot_logins, cmap='YlGnBu')
plt.title('Heatmap of Student Weekly Logins')
plt.xlabel('Week')
plt.ylabel('Student ID')
plt.tight_layout()
plt.savefig('static/engagement_logins_heatmap.png')
plt.close()

# Boxplots of metric distributions by risk category (logins)
plt.figure(figsize=(10, 6))
sns.boxplot(x='Label', y='Value', data=logins_df)
plt.title('Distribution of Weekly Logins by Risk Category')
plt.savefig('static/engagement_logins_boxplot.png')
plt.close()

print("Engagement trends visualizations generated in 'static/' folder.")
