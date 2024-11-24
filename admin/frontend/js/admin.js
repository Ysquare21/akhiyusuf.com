// Admin Dashboard JavaScript
class AdminDashboard {
    constructor() {
        this.init();
        this.setupEventListeners();
    }

    init() {
        // Initialize state
        this.state = {
            isLoggedIn: false,
            currentSection: 'projects',
            projects: [],
            messages: []
        };

        // Cache DOM elements
        this.loginContainer = document.querySelector('.login-container');
        this.dashboardContainer = document.querySelector('.dashboard-container');
        this.loginForm = document.getElementById('loginForm');
        this.navItems = document.querySelectorAll('.nav-item');
        this.sections = document.querySelectorAll('.dashboard-section');
        this.logoutButton = document.querySelector('.logout-button');
        this.settingsForm = document.getElementById('settingsForm');
    }

    setupEventListeners() {
        // Login form submission
        this.loginForm?.addEventListener('submit', (e) => this.handleLogin(e));

        // Navigation items
        this.navItems.forEach(item => {
            item.addEventListener('click', () => this.switchSection(item.dataset.section));
        });

        // Logout button
        this.logoutButton?.addEventListener('click', () => this.handleLogout());

        // Settings form submission
        this.settingsForm?.addEventListener('submit', (e) => this.handleSettingsSave(e));
    }

    async handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            // TODO: Implement actual authentication
            if (email === 'admin@example.com' && password === 'password') {
                this.state.isLoggedIn = true;
                this.showDashboard();
            } else {
                this.showError('Invalid email or password');
            }
        } catch (error) {
            this.showError('An error occurred during login');
        }
    }

    handleLogout() {
        this.state.isLoggedIn = false;
        this.hideDashboard();
    }

    async handleSettingsSave(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        try {
            // TODO: Implement settings update
            console.log('Settings saved:', Object.fromEntries(formData));
            this.showSuccess('Settings saved successfully');
        } catch (error) {
            this.showError('Failed to save settings');
        }
    }

    switchSection(sectionId) {
        // Update navigation
        this.navItems.forEach(item => {
            item.classList.toggle('active', item.dataset.section === sectionId);
        });

        // Update sections
        this.sections.forEach(section => {
            section.classList.toggle('active', section.id === sectionId);
        });

        this.state.currentSection = sectionId;
    }

    showDashboard() {
        this.loginContainer.style.display = 'none';
        this.dashboardContainer.style.display = 'flex';
        this.loadDashboardData();
    }

    hideDashboard() {
        this.dashboardContainer.style.display = 'none';
        this.loginContainer.style.display = 'flex';
        this.loginForm.reset();
    }

    async loadDashboardData() {
        try {
            // TODO: Implement data loading
            await this.loadProjects();
            await this.loadMessages();
        } catch (error) {
            console.error('Error loading dashboard data:', error);
        }
    }

    async loadProjects() {
        // TODO: Implement project loading
        const projects = [
            { id: 1, title: 'Project 1', status: 'In Progress' },
            { id: 2, title: 'Project 2', status: 'Completed' }
        ];

        const projectsGrid = document.querySelector('.projects-grid');
        projectsGrid.innerHTML = projects.map(project => `
            <div class="project-card">
                <h3>${project.title}</h3>
                <p>Status: ${project.status}</p>
            </div>
        `).join('');
    }

    async loadMessages() {
        // TODO: Implement message loading
        const messages = [
            { id: 1, from: 'John Doe', subject: 'Project Inquiry', date: '2024-01-20' },
            { id: 2, from: 'Jane Smith', subject: 'Collaboration Request', date: '2024-01-19' }
        ];

        const messagesList = document.querySelector('.messages-list');
        messagesList.innerHTML = messages.map(message => `
            <div class="message-item">
                <h3>${message.subject}</h3>
                <p>From: ${message.from}</p>
                <p>Date: ${message.date}</p>
            </div>
        `).join('');
    }

    showError(message) {
        const errorDiv = document.querySelector('.error-message') || document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        if (!document.querySelector('.error-message')) {
            this.loginForm.appendChild(errorDiv);
        }

        errorDiv.classList.add('show');
        setTimeout(() => errorDiv.classList.remove('show'), 3000);
    }

    showSuccess(message) {
        // TODO: Implement success message
        console.log('Success:', message);
    }
}

// Initialize the admin dashboard when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AdminDashboard();
});
