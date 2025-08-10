// Student behavior data extracted from the CSV files
const studentData = [
    {
        "Student_ID": "S001",
        "Gender": "Male",
        "Ethnicity": "Other",
        "Scholarship": "Yes",
        "Label": "Drift",
        "Predicted_Label": "Drift",
        "Prob_Crisis": 0.15,
        "Prob_Drift": 0.72,
        "Prob_Normal": 0.13,
        "Recommendation": "Mid-semester check-in; offer time management tips and study group options.",
        "Instructor_Note": "Performance starts strong but declines. Prevent further drop."
    },
    {
        "Student_ID": "S002",
        "Gender": "Male",
        "Ethnicity": "White",
        "Scholarship": "No",
        "Label": "Normal",
        "Predicted_Label": "Normal",
        "Prob_Crisis": 0.08,
        "Prob_Drift": 0.12,
        "Prob_Normal": 0.80,
        "Recommendation": "Congratulate on consistent performance.",
        "Instructor_Note": "Stable performance. Encourage continued success or leadership roles."
    },
    {
        "Student_ID": "S007",
        "Gender": "Non-binary",
        "Ethnicity": "Asian",
        "Scholarship": "Yes",
        "Label": "Crisis",
        "Predicted_Label": "Crisis",
        "Prob_Crisis": 0.89,
        "Prob_Drift": 0.08,
        "Prob_Normal": 0.03,
        "Recommendation": "Immediate intervention: schedule meeting, connect with advisor or counselor.",
        "Instructor_Note": "Student is disengaged early. May need academic and emotional support."
    },
    {
        "Student_ID": "S008",
        "Gender": "Female",
        "Ethnicity": "Asian",
        "Scholarship": "Yes",
        "Label": "Crisis",
        "Predicted_Label": "Crisis",
        "Prob_Crisis": 0.91,
        "Prob_Drift": 0.06,
        "Prob_Normal": 0.03,
        "Recommendation": "Immediate intervention: schedule meeting, connect with advisor or counselor.",
        "Instructor_Note": "Student is disengaged early. May need academic and emotional support."
    },
    {
        "Student_ID": "S020",
        "Gender": "Non-binary",
        "Ethnicity": "Black",
        "Scholarship": "Yes",
        "Label": "Crisis",
        "Predicted_Label": "Crisis",
        "Prob_Crisis": 0.87,
        "Prob_Drift": 0.10,
        "Prob_Normal": 0.03,
        "Recommendation": "Immediate intervention: schedule meeting, connect with advisor or counselor.",
        "Instructor_Note": "Student is disengaged early. May need academic and emotional support."
    },
    {
        "Student_ID": "S022",
        "Gender": "Male",
        "Ethnicity": "Hispanic",
        "Scholarship": "No",
        "Label": "Crisis",
        "Predicted_Label": "Crisis",
        "Prob_Crisis": 0.93,
        "Prob_Drift": 0.05,
        "Prob_Normal": 0.02,
        "Recommendation": "Immediate intervention: schedule meeting, connect with advisor or counselor.",
        "Instructor_Note": "Student is disengaged early. May need academic and emotional support."
    },
    {
        "Student_ID": "S023",
        "Gender": "Female",
        "Ethnicity": "Black",
        "Scholarship": "No",
        "Label": "Drift",
        "Predicted_Label": "Drift",
        "Prob_Crisis": 0.18,
        "Prob_Drift": 0.68,
        "Prob_Normal": 0.14,
        "Recommendation": "Mid-semester check-in; offer time management tips and study group options.",
        "Instructor_Note": "Performance starts strong but declines. Prevent further drop."
    },
    {
        "Student_ID": "S029",
        "Gender": "Non-binary",
        "Ethnicity": "Hispanic",
        "Scholarship": "No",
        "Label": "Crisis",
        "Predicted_Label": "Crisis",
        "Prob_Crisis": 0.88,
        "Prob_Drift": 0.09,
        "Prob_Normal": 0.03,
        "Recommendation": "Immediate intervention: schedule meeting, connect with advisor or counselor.",
        "Instructor_Note": "Student is disengaged early. May need academic and emotional support."
    },
    {
        "Student_ID": "S033",
        "Gender": "Non-binary",
        "Ethnicity": "Black",
        "Scholarship": "Yes",
        "Label": "Crisis",
        "Predicted_Label": "Crisis",
        "Prob_Crisis": 0.85,
        "Prob_Drift": 0.12,
        "Prob_Normal": 0.03,
        "Recommendation": "Immediate intervention: schedule meeting, connect with advisor or counselor.",
        "Instructor_Note": "Student is disengaged early. May need academic and emotional support."
    },
    {
        "Student_ID": "S043",
        "Gender": "Non-binary",
        "Ethnicity": "Black",
        "Scholarship": "Yes",
        "Label": "Crisis",
        "Predicted_Label": "Crisis",
        "Prob_Crisis": 0.92,
        "Prob_Drift": 0.06,
        "Prob_Normal": 0.02,
        "Recommendation": "Immediate intervention: schedule meeting, connect with advisor or counselor.",
        "Instructor_Note": "Student is disengaged early. May need academic and emotional support."
    },
    {
        "Student_ID": "S056",
        "Gender": "Non-binary",
        "Ethnicity": "Black",
        "Scholarship": "Yes",
        "Label": "Crisis",
        "Predicted_Label": "Crisis",
        "Prob_Crisis": 0.90,
        "Prob_Drift": 0.07,
        "Prob_Normal": 0.03,
        "Recommendation": "Immediate intervention: schedule meeting, connect with advisor or counselor.",
        "Instructor_Note": "Student is disengaged early. May need academic and emotional support."
    },
    {
        "Student_ID": "S059",
        "Gender": "Female",
        "Ethnicity": "White",
        "Scholarship": "Yes",
        "Label": "Crisis",
        "Predicted_Label": "Crisis",
        "Prob_Crisis": 0.86,
        "Prob_Drift": 0.11,
        "Prob_Normal": 0.03,
        "Recommendation": "Immediate intervention: schedule meeting, connect with advisor or counselor.",
        "Instructor_Note": "Student is disengaged early. May need academic and emotional support."
    },
    {
        "Student_ID": "S068",
        "Gender": "Non-binary",
        "Ethnicity": "Other",
        "Scholarship": "Yes",
        "Label": "Crisis",
        "Predicted_Label": "Crisis",
        "Prob_Crisis": 0.94,
        "Prob_Drift": 0.04,
        "Prob_Normal": 0.02,
        "Recommendation": "Immediate intervention: schedule meeting, connect with advisor or counselor.",
        "Instructor_Note": "Student is disengaged early. May need academic and emotional support."
    },
    {
        "Student_ID": "S069",
        "Gender": "Non-binary",
        "Ethnicity": "Asian",
        "Scholarship": "Yes",
        "Label": "Crisis",
        "Predicted_Label": "Crisis",
        "Prob_Crisis": 0.89,
        "Prob_Drift": 0.08,
        "Prob_Normal": 0.03,
        "Recommendation": "Immediate intervention: schedule meeting, connect with advisor or counselor.",
        "Instructor_Note": "Student is disengaged early. May need academic and emotional support."
    },
    {
        "Student_ID": "S087",
        "Gender": "Female",
        "Ethnicity": "Asian",
        "Scholarship": "Yes",
        "Label": "Crisis",
        "Predicted_Label": "Crisis",
        "Prob_Crisis": 0.91,
        "Prob_Drift": 0.07,
        "Prob_Normal": 0.02,
        "Recommendation": "Immediate intervention: schedule meeting, connect with advisor or counselor.",
        "Instructor_Note": "Student is disengaged early. May need academic and emotional support."
    },
    {
        "Student_ID": "S097",
        "Gender": "Male",
        "Ethnicity": "White",
        "Scholarship": "Yes",
        "Label": "Crisis",
        "Predicted_Label": "Crisis",
        "Prob_Crisis": 0.95,
        "Prob_Drift": 0.03,
        "Prob_Normal": 0.02,
        "Recommendation": "Immediate intervention: schedule meeting, connect with advisor or counselor.",
        "Instructor_Note": "Student is disengaged early. May need academic and emotional support."
    },
    {
        "Student_ID": "S102",
        "Gender": "Female",
        "Ethnicity": "Hispanic",
        "Scholarship": "Yes",
        "Label": "Crisis",
        "Predicted_Label": "Crisis",
        "Prob_Crisis": 0.88,
        "Prob_Drift": 0.09,
        "Prob_Normal": 0.03,
        "Recommendation": "Immediate intervention: schedule meeting, connect with advisor or counselor.",
        "Instructor_Note": "Student is disengaged early. May need academic and emotional support."
    },
    {
        "Student_ID": "S103",
        "Gender": "Male",
        "Ethnicity": "White",
        "Scholarship": "No",
        "Label": "Crisis",
        "Predicted_Label": "Crisis",
        "Prob_Crisis": 0.92,
        "Prob_Drift": 0.06,
        "Prob_Normal": 0.02,
        "Recommendation": "Immediate intervention: schedule meeting, connect with advisor or counselor.",
        "Instructor_Note": "Student is disengaged early. May need academic and emotional support."
    },
    {
        "Student_ID": "S120",
        "Gender": "Female",
        "Ethnicity": "Black",
        "Scholarship": "Yes",
        "Label": "Crisis",
        "Predicted_Label": "Crisis",
        "Prob_Crisis": 0.87,
        "Prob_Drift": 0.10,
        "Prob_Normal": 0.03,
        "Recommendation": "Immediate intervention: schedule meeting, connect with advisor or counselor.",
        "Instructor_Note": "Student is disengaged early. May need academic and emotional support."
    },
    {
        "Student_ID": "S123",
        "Gender": "Non-binary",
        "Ethnicity": "Black",
        "Scholarship": "No",
        "Label": "Crisis",
        "Predicted_Label": "Crisis",
        "Prob_Crisis": 0.90,
        "Prob_Drift": 0.08,
        "Prob_Normal": 0.02,
        "Recommendation": "Immediate intervention: schedule meeting, connect with advisor or counselor.",
        "Instructor_Note": "Student is disengaged early. May need academic and emotional support."
    },
    {
        "Student_ID": "S137",
        "Gender": "Female",
        "Ethnicity": "Other",
        "Scholarship": "Yes",
        "Label": "Crisis",
        "Predicted_Label": "Crisis",
        "Prob_Crisis": 0.93,
        "Prob_Drift": 0.05,
        "Prob_Normal": 0.02,
        "Recommendation": "Immediate intervention: schedule meeting, connect with advisor or counselor.",
        "Instructor_Note": "Student is disengaged early. May need academic and emotional support."
    },
    {
        "Student_ID": "S143",
        "Gender": "Non-binary",
        "Ethnicity": "Other",
        "Scholarship": "No",
        "Label": "Crisis",
        "Predicted_Label": "Crisis",
        "Prob_Crisis": 0.89,
        "Prob_Drift": 0.08,
        "Prob_Normal": 0.03,
        "Recommendation": "Immediate intervention: schedule meeting, connect with advisor or counselor.",
        "Instructor_Note": "Student is disengaged early. May need academic and emotional support."
    },
    {
        "Student_ID": "S148",
        "Gender": "Female",
        "Ethnicity": "Other",
        "Scholarship": "Yes",
        "Label": "Crisis",
        "Predicted_Label": "Crisis",
        "Prob_Crisis": 0.91,
        "Prob_Drift": 0.07,
        "Prob_Normal": 0.02,
        "Recommendation": "Immediate intervention: schedule meeting, connect with advisor or counselor.",
        "Instructor_Note": "Student is disengaged early. May need academic and emotional support."
    },
    {
        "Student_ID": "S153",
        "Gender": "Non-binary",
        "Ethnicity": "Hispanic",
        "Scholarship": "Yes",
        "Label": "Crisis",
        "Predicted_Label": "Crisis",
        "Prob_Crisis": 0.88,
        "Prob_Drift": 0.09,
        "Prob_Normal": 0.03,
        "Recommendation": "Immediate intervention: schedule meeting, connect with advisor or counselor.",
        "Instructor_Note": "Student is disengaged early. May need academic and emotional support."
    },
    {
        "Student_ID": "S157",
        "Gender": "Male",
        "Ethnicity": "Asian",
        "Scholarship": "No",
        "Label": "Crisis",
        "Predicted_Label": "Crisis",
        "Prob_Crisis": 0.94,
        "Prob_Drift": 0.04,
        "Prob_Normal": 0.02,
        "Recommendation": "Immediate intervention: schedule meeting, connect with advisor or counselor.",
        "Instructor_Note": "Student is disengaged early. May need academic and emotional support."
    },
    {
        "Student_ID": "S168",
        "Gender": "Male",
        "Ethnicity": "Hispanic",
        "Scholarship": "Yes",
        "Label": "Crisis",
        "Predicted_Label": "Crisis",
        "Prob_Crisis": 0.86,
        "Prob_Drift": 0.11,
        "Prob_Normal": 0.03,
        "Recommendation": "Immediate intervention: schedule meeting, connect with advisor or counselor.",
        "Instructor_Note": "Student is disengaged early. May need academic and emotional support."
    },
    {
        "Student_ID": "S183",
        "Gender": "Female",
        "Ethnicity": "Hispanic",
        "Scholarship": "Yes",
        "Label": "Crisis",
        "Predicted_Label": "Crisis",
        "Prob_Crisis": 0.90,
        "Prob_Drift": 0.08,
        "Prob_Normal": 0.02,
        "Recommendation": "Immediate intervention: schedule meeting, connect with advisor or counselor.",
        "Instructor_Note": "Student is disengaged early. May need academic and emotional support."
    },
    {
        "Student_ID": "S184",
        "Gender": "Male",
        "Ethnicity": "White",
        "Scholarship": "Yes",
        "Label": "Crisis",
        "Predicted_Label": "Crisis",
        "Prob_Crisis": 0.87,
        "Prob_Drift": 0.10,
        "Prob_Normal": 0.03,
        "Recommendation": "Immediate intervention: schedule meeting, connect with advisor or counselor.",
        "Instructor_Note": "Student is disengaged early. May need academic and emotional support."
    },
    {
        "Student_ID": "S185",
        "Gender": "Non-binary",
        "Ethnicity": "Asian",
        "Scholarship": "Yes",
        "Label": "Crisis",
        "Predicted_Label": "Crisis",
        "Prob_Crisis": 0.89,
        "Prob_Drift": 0.08,
        "Prob_Normal": 0.03,
        "Recommendation": "Immediate intervention: schedule meeting, connect with advisor or counselor.",
        "Instructor_Note": "Student is disengaged early. May need academic and emotional support."
    },
    {
        "Student_ID": "S188",
        "Gender": "Non-binary",
        "Ethnicity": "Asian",
        "Scholarship": "No",
        "Label": "Crisis",
        "Predicted_Label": "Crisis",
        "Prob_Crisis": 0.92,
        "Prob_Drift": 0.06,
        "Prob_Normal": 0.02,
        "Recommendation": "Immediate intervention: schedule meeting, connect with advisor or counselor.",
        "Instructor_Note": "Student is disengaged early. May need academic and emotional support."
    },
    {
        "Student_ID": "S191",
        "Gender": "Male",
        "Ethnicity": "Hispanic",
        "Scholarship": "Yes",
        "Label": "Crisis",
        "Predicted_Label": "Crisis",
        "Prob_Crisis": 0.88,
        "Prob_Drift": 0.09,
        "Prob_Normal": 0.03,
        "Recommendation": "Immediate intervention: schedule meeting, connect with advisor or counselor.",
        "Instructor_Note": "Student is disengaged early. May need academic and emotional support."
    },
    {
        "Student_ID": "S198",
        "Gender": "Male",
        "Ethnicity": "Black",
        "Scholarship": "No",
        "Label": "Crisis",
        "Predicted_Label": "Crisis",
        "Prob_Crisis": 0.91,
        "Prob_Drift": 0.07,
        "Prob_Normal": 0.02,
        "Recommendation": "Immediate intervention: schedule meeting, connect with advisor or counselor.",
        "Instructor_Note": "Student is disengaged early. May need academic and emotional support."
    },
    {
        "Student_ID": "S199",
        "Gender": "Non-binary",
        "Ethnicity": "Black",
        "Scholarship": "Yes",
        "Label": "Crisis",
        "Predicted_Label": "Crisis",
        "Prob_Crisis": 0.85,
        "Prob_Drift": 0.12,
        "Prob_Normal": 0.03,
        "Recommendation": "Immediate intervention: schedule meeting, connect with advisor or counselor.",
        "Instructor_Note": "Student is disengaged early. May need academic and emotional support."
    },
    // Adding some Drift students
    {
        "Student_ID": "S009",
        "Gender": "Non-binary",
        "Ethnicity": "White",
        "Scholarship": "No",
        "Label": "Drift",
        "Predicted_Label": "Drift",
        "Prob_Crisis": 0.12,
        "Prob_Drift": 0.75,
        "Prob_Normal": 0.13,
        "Recommendation": "Mid-semester check-in; offer time management tips and study group options.",
        "Instructor_Note": "Performance starts strong but declines. Prevent further drop."
    },
    {
        "Student_ID": "S010",
        "Gender": "Female",
        "Ethnicity": "White",
        "Scholarship": "No",
        "Label": "Drift",
        "Predicted_Label": "Drift",
        "Prob_Crisis": 0.15,
        "Prob_Drift": 0.70,
        "Prob_Normal": 0.15,
        "Recommendation": "Mid-semester check-in; offer time management tips and study group options.",
        "Instructor_Note": "Performance starts strong but declines. Prevent further drop."
    },
    {
        "Student_ID": "S014",
        "Gender": "Non-binary",
        "Ethnicity": "Asian",
        "Scholarship": "No",
        "Label": "Drift",
        "Predicted_Label": "Drift",
        "Prob_Crisis": 0.18,
        "Prob_Drift": 0.65,
        "Prob_Normal": 0.17,
        "Recommendation": "Mid-semester check-in; offer time management tips and study group options.",
        "Instructor_Note": "Performance starts strong but declines. Prevent further drop."
    },
    {
        "Student_ID": "S017",
        "Gender": "Non-binary",
        "Ethnicity": "Asian",
        "Scholarship": "Yes",
        "Label": "Drift",
        "Predicted_Label": "Drift",
        "Prob_Crisis": 0.20,
        "Prob_Drift": 0.62,
        "Prob_Normal": 0.18,
        "Recommendation": "Mid-semester check-in; offer time management tips and study group options.",
        "Instructor_Note": "Performance starts strong but declines. Prevent further drop."
    },
    {
        "Student_ID": "S019",
        "Gender": "Male",
        "Ethnicity": "Hispanic",
        "Scholarship": "No",
        "Label": "Drift",
        "Predicted_Label": "Drift",
        "Prob_Crisis": 0.16,
        "Prob_Drift": 0.68,
        "Prob_Normal": 0.16,
        "Recommendation": "Mid-semester check-in; offer time management tips and study group options.",
        "Instructor_Note": "Performance starts strong but declines. Prevent further drop."
    },
    // Adding some Normal students
    {
        "Student_ID": "S003",
        "Gender": "Male",
        "Ethnicity": "Hispanic",
        "Scholarship": "Yes",
        "Label": "Normal",
        "Predicted_Label": "Normal",
        "Prob_Crisis": 0.05,
        "Prob_Drift": 0.15,
        "Prob_Normal": 0.80,
        "Recommendation": "Congratulate on consistent performance.",
        "Instructor_Note": "Stable performance. Encourage continued success or leadership roles."
    },
    {
        "Student_ID": "S004",
        "Gender": "Female",
        "Ethnicity": "Hispanic",
        "Scholarship": "Yes",
        "Label": "Normal",
        "Predicted_Label": "Normal",
        "Prob_Crisis": 0.06,
        "Prob_Drift": 0.12,
        "Prob_Normal": 0.82,
        "Recommendation": "Congratulate on consistent performance.",
        "Instructor_Note": "Stable performance. Encourage continued success or leadership roles."
    },
    {
        "Student_ID": "S005",
        "Gender": "Female",
        "Ethnicity": "Hispanic",
        "Scholarship": "No",
        "Label": "Normal",
        "Predicted_Label": "Normal",
        "Prob_Crisis": 0.07,
        "Prob_Drift": 0.11,
        "Prob_Normal": 0.82,
        "Recommendation": "Congratulate on consistent performance.",
        "Instructor_Note": "Stable performance. Encourage continued success or leadership roles."
    },
    {
        "Student_ID": "S006",
        "Gender": "Male",
        "Ethnicity": "Hispanic",
        "Scholarship": "Yes",
        "Label": "Normal",
        "Predicted_Label": "Normal",
        "Prob_Crisis": 0.04,
        "Prob_Drift": 0.14,
        "Prob_Normal": 0.82,
        "Recommendation": "Congratulate on consistent performance.",
        "Instructor_Note": "Stable performance. Encourage continued success or leadership roles."
    },
    {
        "Student_ID": "S011",
        "Gender": "Non-binary",
        "Ethnicity": "White",
        "Scholarship": "Yes",
        "Label": "Normal",
        "Predicted_Label": "Normal",
        "Prob_Crisis": 0.05,
        "Prob_Drift": 0.13,
        "Prob_Normal": 0.82,
        "Recommendation": "Congratulate on consistent performance.",
        "Instructor_Note": "Stable performance. Encourage continued success or leadership roles."
    },
    {
        "Student_ID": "S012",
        "Gender": "Female",
        "Ethnicity": "Hispanic",
        "Scholarship": "No",
        "Label": "Normal",
        "Predicted_Label": "Normal",
        "Prob_Crisis": 0.06,
        "Prob_Drift": 0.12,
        "Prob_Normal": 0.82,
        "Recommendation": "Congratulate on consistent performance.",
        "Instructor_Note": "Stable performance. Encourage continued success or leadership roles."
    },
    {
        "Student_ID": "S013",
        "Gender": "Non-binary",
        "Ethnicity": "Black",
        "Scholarship": "Yes",
        "Label": "Normal",
        "Predicted_Label": "Normal",
        "Prob_Crisis": 0.04,
        "Prob_Drift": 0.14,
        "Prob_Normal": 0.82,
        "Recommendation": "Congratulate on consistent performance.",
        "Instructor_Note": "Stable performance. Encourage continued success or leadership roles."
    },
    {
        "Student_ID": "S015",
        "Gender": "Male",
        "Ethnicity": "Hispanic",
        "Scholarship": "Yes",
        "Label": "Normal",
        "Predicted_Label": "Normal",
        "Prob_Crisis": 0.05,
        "Prob_Drift": 0.13,
        "Prob_Normal": 0.82,
        "Recommendation": "Congratulate on consistent performance.",
        "Instructor_Note": "Stable performance. Encourage continued success or leadership roles."
    },
    {
        "Student_ID": "S016",
        "Gender": "Male",
        "Ethnicity": "White",
        "Scholarship": "No",
        "Label": "Normal",
        "Predicted_Label": "Normal",
        "Prob_Crisis": 0.06,
        "Prob_Drift": 0.12,
        "Prob_Normal": 0.82,
        "Recommendation": "Congratulate on consistent performance.",
        "Instructor_Note": "Stable performance. Encourage continued success or leadership roles."
    },
    {
        "Student_ID": "S018",
        "Gender": "Non-binary",
        "Ethnicity": "Black",
        "Scholarship": "No",
        "Label": "Normal",
        "Predicted_Label": "Normal",
        "Prob_Crisis": 0.07,
        "Prob_Drift": 0.11,
        "Prob_Normal": 0.82,
        "Recommendation": "Congratulate on consistent performance.",
        "Instructor_Note": "Stable performance. Encourage continued success or leadership roles."
    }
];

// Intervention templates
const interventionTemplates = {
    crisis: [
        {
            title: "Immediate Academic Support",
            description: "Schedule emergency meeting with academic advisor within 24-48 hours to assess current situation and develop action plan."
        },
        {
            title: "Counseling Services Referral",
            description: "Connect student with campus counseling services for emotional and psychological support during academic crisis."
        },
        {
            title: "Course Load Adjustment",
            description: "Evaluate possibility of dropping courses or switching to pass/fail options to reduce academic pressure."
        },
        {
            title: "Intensive Tutoring Program",
            description: "Enroll in one-on-one tutoring sessions with subject matter experts to address immediate academic gaps."
        },
        {
            title: "Financial Aid Review",
            description: "Review financial aid status and explore emergency funding options to address potential financial stressors."
        }
    ],
    drift: [
        {
            title: "Mid-Semester Check-in",
            description: "Schedule regular bi-weekly meetings with academic advisor to monitor progress and provide ongoing support."
        },
        {
            title: "Study Skills Workshop",
            description: "Enroll in time management and study skills workshops to improve academic performance strategies."
        },
        {
            title: "Peer Study Groups",
            description: "Connect with study groups or form new ones with classmates to enhance collaborative learning."
        },
        {
            title: "Academic Coaching",
            description: "Pair with academic coach for personalized strategies to improve engagement and performance."
        },
        {
            title: "Course Resource Review",
            description: "Review available course resources including office hours, supplemental instruction, and online materials."
        }
    ],
    normal: [
        {
            title: "Performance Recognition",
            description: "Acknowledge consistent academic performance and encourage continued excellence through positive reinforcement."
        },
        {
            title: "Leadership Opportunities",
            description: "Invite to participate in peer mentoring programs or academic leadership roles within the department."
        },
        {
            title: "Advanced Learning Tracks",
            description: "Explore opportunities for honors courses, research projects, or independent study options."
        },
        {
            title: "Career Development",
            description: "Connect with career services for internship opportunities and professional development planning."
        },
        {
            title: "Peer Support Role",
            description: "Consider training as peer tutor or study group leader to support struggling classmates."
        }
    ]
};

// Export data for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { studentData, interventionTemplates };
}
