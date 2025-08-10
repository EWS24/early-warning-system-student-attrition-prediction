// Early Warning System - Main JavaScript File

class EarlyWarningSystem {
    constructor() {
        this.currentTab = 'dashboard';
        this.filteredStudents = [...studentData];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateStats();
        this.renderDashboard();
        this.renderStudentTable();
        this.renderInterventions();
        this.setupModal();
    }

    setupEventListeners() {
        // Tab navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Search functionality
        const searchInput = document.getElementById('student-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterStudents();
            });
        }

        // Filter functionality
        const riskFilter = document.getElementById('risk-filter');
        const genderFilter = document.getElementById('gender-filter');
        
        if (riskFilter) {
            riskFilter.addEventListener('change', () => {
                this.filterStudents();
            });
        }
        
        if (genderFilter) {
            genderFilter.addEventListener('change', () => {
                this.filterStudents();
            });
        }

        // Modal close functionality
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-close') || e.target.classList.contains('modal')) {
                this.closeModal();
            }
        });

        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    switchTab(tabName) {
        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tabName).classList.add('active');

        this.currentTab = tabName;

        // Trigger animations
        document.getElementById(tabName).classList.add('fade-in');
        setTimeout(() => {
            document.getElementById(tabName).classList.remove('fade-in');
        }, 300);
    }

    updateStats() {
        const stats = this.calculateStats();
        
        document.getElementById('crisis-count').textContent = stats.crisis;
        document.getElementById('drift-count').textContent = stats.drift;
        document.getElementById('normal-count').textContent = stats.normal;

        // Update risk chart
        this.updateRiskChart(stats);
    }

    calculateStats() {
        const stats = {
            crisis: 0,
            drift: 0,
            normal: 0,
            total: studentData.length
        };

        studentData.forEach(student => {
            const label = student.Label.toLowerCase();
            if (stats.hasOwnProperty(label)) {
                stats[label]++;
            }
        });

        return stats;
    }

    updateRiskChart(stats) {
        const total = stats.total;
        
        // Update bar widths based on percentages
        const crisisBar = document.querySelector('[data-risk="crisis"]');
        const driftBar = document.querySelector('[data-risk="drift"]');
        const normalBar = document.querySelector('[data-risk="normal"]');

        if (crisisBar) {
            const crisisPercent = (stats.crisis / total) * 100;
            crisisBar.style.width = `${crisisPercent}%`;
        }

        if (driftBar) {
            const driftPercent = (stats.drift / total) * 100;
            driftBar.style.width = `${driftPercent}%`;
        }

        if (normalBar) {
            const normalPercent = (stats.normal / total) * 100;
            normalBar.style.width = `${normalPercent}%`;
        }
    }

    renderDashboard() {
        this.renderRecentAlerts();
    }

    renderRecentAlerts() {
        const alertsContainer = document.getElementById('recent-alerts');
        if (!alertsContainer) return;

        // Get high-risk students for alerts
        const highRiskStudents = studentData
            .filter(student => student.Label === 'Crisis' || (student.Label === 'Drift' && student.Prob_Drift > 0.7))
            .slice(0, 5);

        if (highRiskStudents.length === 0) {
            alertsContainer.innerHTML = '<p class="text-gray-500">No recent alerts</p>';
            return;
        }

        const alertsHTML = highRiskStudents.map(student => {
            const alertClass = student.Label.toLowerCase();
            const urgency = student.Label === 'Crisis' ? 'High Priority' : 'Medium Priority';
            
            return `
                <div class="alert-item ${alertClass}">
                    <div class="alert-student">${student.Student_ID} - ${urgency}</div>
                    <div class="alert-message">${student.Recommendation}</div>
                </div>
            `;
        }).join('');

        alertsContainer.innerHTML = alertsHTML;
    }

    filterStudents() {
        const searchTerm = document.getElementById('student-search')?.value.toLowerCase() || '';
        const riskFilter = document.getElementById('risk-filter')?.value || '';
        const genderFilter = document.getElementById('gender-filter')?.value || '';

        this.filteredStudents = studentData.filter(student => {
            const matchesSearch = student.Student_ID.toLowerCase().includes(searchTerm) ||
                                student.Ethnicity.toLowerCase().includes(searchTerm);
            const matchesRisk = !riskFilter || student.Label === riskFilter;
            const matchesGender = !genderFilter || student.Gender === genderFilter;

            return matchesSearch && matchesRisk && matchesGender;
        });

        this.renderStudentTable();
    }

    renderStudentTable() {
        const tableBody = document.getElementById('student-table-body');
        if (!tableBody) return;

        if (this.filteredStudents.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="7" style="text-align: center; padding: 2rem; color: #64748b;">
                        No students found matching the current filters.
                    </td>
                </tr>
            `;
            return;
        }

        const tableHTML = this.filteredStudents.map(student => {
            const riskClass = student.Label.toLowerCase();
            const maxProb = Math.max(student.Prob_Crisis, student.Prob_Drift, student.Prob_Normal);
            const maxProbPercent = Math.round(maxProb * 100);

            return `
                <tr>
                    <td><strong>${student.Student_ID}</strong></td>
                    <td>
                        <span class="risk-badge ${riskClass}">${student.Label}</span>
                    </td>
                    <td>
                        <div class="probability-bar">
                            <div class="probability-fill ${riskClass}" style="width: ${maxProbPercent}%"></div>
                        </div>
                        <small>${maxProbPercent}%</small>
                    </td>
                    <td>${student.Gender}</td>
                    <td>${student.Ethnicity}</td>
                    <td>${student.Scholarship}</td>
                    <td>
                        <button class="action-btn" onclick="ews.showStudentDetails('${student.Student_ID}')">
                            View Details
                        </button>
                    </td>
                </tr>
            `;
        }).join('');

        tableBody.innerHTML = tableHTML;
    }

    renderInterventions() {
        this.renderInterventionCategory('crisis', 'crisis-interventions');
        this.renderInterventionCategory('drift', 'drift-interventions');
        this.renderInterventionCategory('normal', 'normal-interventions');
    }

    renderInterventionCategory(category, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const interventions = interventionTemplates[category];
        if (!interventions) return;

        const interventionsHTML = interventions.map(intervention => `
            <div class="intervention-item ${category}">
                <div class="intervention-title">${intervention.title}</div>
                <div class="intervention-description">${intervention.description}</div>
            </div>
        `).join('');

        container.innerHTML = interventionsHTML;
    }

    showStudentDetails(studentId) {
        const student = studentData.find(s => s.Student_ID === studentId);
        if (!student) return;

        // Populate modal content
        document.getElementById('modal-student-id').textContent = `${student.Student_ID} - Risk Assessment`;
        
        // Risk details
        const riskDetailsHTML = `
            <div class="risk-detail-item">
                <span>Predicted Risk Level:</span>
                <span class="risk-badge ${student.Predicted_Label.toLowerCase()}">${student.Predicted_Label}</span>
            </div>
            <div class="risk-detail-item">
                <span>Crisis Probability:</span>
                <span>${Math.round(student.Prob_Crisis * 100)}%</span>
            </div>
            <div class="risk-detail-item">
                <span>Drift Probability:</span>
                <span>${Math.round(student.Prob_Drift * 100)}%</span>
            </div>
            <div class="risk-detail-item">
                <span>Normal Probability:</span>
                <span>${Math.round(student.Prob_Normal * 100)}%</span>
            </div>
            <div class="risk-detail-item">
                <span>Demographics:</span>
                <span>${student.Gender}, ${student.Ethnicity}, Scholarship: ${student.Scholarship}</span>
            </div>
        `;
        document.getElementById('modal-risk-details').innerHTML = riskDetailsHTML;

        // Intervention details
        document.getElementById('modal-intervention').innerHTML = `
            <strong>Recommended Action:</strong><br>
            ${student.Recommendation}
        `;

        // Notes
        document.getElementById('modal-notes').innerHTML = student.Instructor_Note;

        // Show modal
        document.getElementById('student-modal').classList.add('active');
    }

    closeModal() {
        document.getElementById('student-modal').classList.remove('active');
    }

    setupModal() {
        // Modal is already set up in showStudentDetails and closeModal methods
        // This method can be used for additional modal setup if needed
    }

    // Utility method to format numbers
    formatNumber(num) {
        return new Intl.NumberFormat().format(num);
    }

    // Utility method to format percentages
    formatPercentage(num) {
        return `${Math.round(num * 100)}%`;
    }

    // Method to export data (for future use)
    exportData() {
        const dataStr = JSON.stringify(this.filteredStudents, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'student_risk_data.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    // Method to refresh data (for future API integration)
    async refreshData() {
        try {
            // In a real application, this would fetch from an API
            // const response = await fetch('/api/students');
            // const newData = await response.json();
            // studentData = newData;
            
            this.filteredStudents = [...studentData];
            this.updateStats();
            this.renderDashboard();
            this.renderStudentTable();
            
            // Show success message
            this.showNotification('Data refreshed successfully', 'success');
        } catch (error) {
            console.error('Error refreshing data:', error);
            this.showNotification('Error refreshing data', 'error');
        }
    }

    // Method to show notifications
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '9999',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });

        // Set background color based on type
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6'
        };
        notification.style.backgroundColor = colors[type] || colors.info;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Method to handle keyboard shortcuts
    handleKeyboardShortcuts(event) {
        // Ctrl/Cmd + K to focus search
        if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
            event.preventDefault();
            const searchInput = document.getElementById('student-search');
            if (searchInput) {
                searchInput.focus();
            }
        }

        // Number keys to switch tabs
        const tabKeys = {
            '1': 'dashboard',
            '2': 'students',
            '3': 'interventions',
            '4': 'analytics'
        };

        if (tabKeys[event.key] && !event.target.matches('input, textarea')) {
            this.switchTab(tabKeys[event.key]);
        }
    }
}

// Initialize the Early Warning System when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.ews = new EarlyWarningSystem();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (event) => {
        window.ews.handleKeyboardShortcuts(event);
    });

    // Add loading states for better UX
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.style.opacity = '0.7';
            setTimeout(() => {
                btn.style.opacity = '1';
            }, 200);
        });
    });

    // Add smooth scrolling for better UX
    document.documentElement.style.scrollBehavior = 'smooth';

    // Add focus management for accessibility
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });

    // Add CSS for keyboard navigation
    const style = document.createElement('style');
    style.textContent = `
        .keyboard-navigation *:focus {
            outline: 2px solid #3b82f6 !important;
            outline-offset: 2px !important;
        }
        
        body:not(.keyboard-navigation) *:focus {
            outline: none !important;
        }
    `;
    document.head.appendChild(style);

    console.log('Early Warning System initialized successfully');
    console.log(`Loaded ${studentData.length} student records`);
});

// Error handling for uncaught errors
window.addEventListener('error', (event) => {
    console.error('Uncaught error:', event.error);
    if (window.ews) {
        window.ews.showNotification('An unexpected error occurred', 'error');
    }
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    if (window.ews) {
        window.ews.showNotification('An unexpected error occurred', 'error');
    }
});
