// Price Quote Calculator
class QuoteCalculator {
    constructor() {
        this.currentStep = 1;
        this.formData = {};
        this.initializeUI();
        this.attachEventListeners();
        this.currentPrice = 0;
    }

    initializeUI() {
        // Create floating button
        this.floatingBtn = document.createElement('button');
        this.floatingBtn.className = 'floating-quote-btn';
        this.floatingBtn.innerHTML = `
            <span>Get Quote</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
        `;
        document.body.appendChild(this.floatingBtn);

        // Create modal
        this.modal = document.createElement('div');
        this.modal.className = 'quote-modal';
        this.modal.innerHTML = `
            <div class="quote-modal-content">
                <div class="modal-header">
                    <button class="close-modal">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </button>
                    <div class="live-price">
                        <p class="live-price-amount">
                            <span class="currency">$</span>
                            <span class="number">0</span>
                        </p>
                        <p class="live-price-note">Estimated starting price</p>
                    </div>
                    <h2 class="step-title">Project Details</h2>
                </div>

                <div class="steps-indicator">
                    <div class="step active" data-step="1">1</div>
                    <div class="step" data-step="2">2</div>
                    <div class="step" data-step="3">3</div>
                    <div class="step" data-step="4">4</div>
                </div>
                
                <form id="quoteForm">
                    <!-- Step 1: Project Type and Niche -->
                    <div class="step-content" data-step="1">
                        <div class="form-group">
                            <label>Project Type</label>
                            <div class="select-wrapper">
                                <select name="projectType" required>
                                    <option value="">Select a project type</option>
                                    <option value="website">Website</option>
                                    <option value="webapp">Web Application</option>
                                    <option value="mobileapp">Mobile App</option>
                                    <option value="ecommerce">E-commerce</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Project Niche</label>
                            <div class="select-wrapper">
                                <select name="projectNiche" required>
                                    <option value="">Select your industry</option>
                                    <option value="business">Business/Corporate</option>
                                    <option value="ecommerce">E-commerce</option>
                                    <option value="education">Education</option>
                                    <option value="healthcare">Healthcare</option>
                                    <option value="technology">Technology</option>
                                    <option value="creative">Creative/Portfolio</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <!-- Step 2: Additional Services -->
                    <div class="step-content" data-step="2" style="display: none;">
                        <h2>Additional Services</h2>
                        <div class="form-group">
                            <label>Select Additional Services</label>
                            <div class="checkbox-group">
                                <label>
                                    <input type="checkbox" name="services" value="seo">
                                    <span>Search Engine Optimization (SEO)</span>
                                </label>
                                <label>
                                    <input type="checkbox" name="services" value="analytics">
                                    <span>Analytics Integration</span>
                                </label>
                                <label>
                                    <input type="checkbox" name="services" value="hosting">
                                    <span>Hosting Setup</span>
                                </label>
                                <label>
                                    <input type="checkbox" name="services" value="maintenance">
                                    <span>Maintenance Plan</span>
                                </label>
                                <label>
                                    <input type="checkbox" name="services" value="security">
                                    <span>Security Features</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <!-- Step 3: Project Specifications -->
                    <div class="step-content" data-step="3" style="display: none;">
                        <h2>Project Specifications</h2>
                        <div class="form-group">
                            <label>Number of Pages/Screens</label>
                            <input type="number" name="pageCount" min="1" required>
                        </div>
                        <div class="form-group">
                            <label>Time Frame</label>
                            <div class="time-frame-group">
                                <input type="number" name="timeFrameNumber" min="1" required>
                                <div class="select-wrapper">
                                    <select name="timeFrameUnit" required>
                                        <option value="weeks">Weeks</option>
                                        <option value="months">Months</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Number of Revisions</label>
                            <div class="select-wrapper">
                                <select name="revisions" required>
                                    <option value="2">2 Revisions</option>
                                    <option value="3">3 Revisions</option>
                                    <option value="unlimited">Unlimited Revisions</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <!-- Step 4: Project Summary -->
                    <div class="step-content" data-step="4" style="display: none;">
                        <h2>Project Summary</h2>
                        <div class="summary-content"></div>
                        <div class="quote-result">
                            <h3>Detailed Quote Range</h3>
                            <div class="quote-breakdown">
                                <div class="quote-range">
                                    <span class="min-quote">$0</span>
                                    <span>to</span>
                                    <span class="max-quote">$0</span>
                                </div>
                                <p class="quote-note">This is a rough estimate. Final price may vary based on specific requirements.</p>
                            </div>
                        </div>
                    </div>

                    <div class="form-navigation">
                        <button type="button" class="prev-btn" style="display: none;">Previous</button>
                        <button type="button" class="next-btn">Next</button>
                        <button type="submit" class="submit-btn" style="display: none;">Get Quote</button>
                    </div>
                </form>

                <div class="final-actions" style="display: none;">
                    <button class="contact-btn">Contact for Detailed Quote</button>
                    <button class="restart-btn">Start New Quote</button>
                </div>
            </div>
        `;
        document.body.appendChild(this.modal);
    }

    attachEventListeners() {
        // Open modal
        this.floatingBtn.addEventListener('click', () => {
            this.modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        // Close modal
        const closeBtn = this.modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => this.closeModal());

        // Close on outside click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Navigation buttons
        const form = this.modal.querySelector('#quoteForm');
        const prevBtn = form.querySelector('.prev-btn');
        const nextBtn = form.querySelector('.next-btn');
        const submitBtn = form.querySelector('.submit-btn');

        nextBtn.addEventListener('click', () => this.nextStep());
        prevBtn.addEventListener('click', () => this.prevStep());
        form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Final actions
        const contactBtn = this.modal.querySelector('.contact-btn');
        const restartBtn = this.modal.querySelector('.restart-btn');

        contactBtn.addEventListener('click', () => {
            window.location.href = 'mailto:contact@akhiyusuf.com?subject=Project Quote Request';
        });

        restartBtn.addEventListener('click', () => {
            this.resetForm();
        });

        // Add live price update listeners
        form.addEventListener('change', () => this.updateLivePrice());
        form.addEventListener('input', () => this.updateLivePrice());

        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.modal.classList.contains('active')) {
                if (e.key === 'Escape') {
                    this.closeModal();
                } else if (e.key === 'Enter' && e.target.tagName !== 'BUTTON') {
                    e.preventDefault();
                    if (this.currentStep < 4) {
                        this.nextStep();
                    }
                }
            }
        });
    }

    nextStep() {
        if (this.validateStep()) {
            this.saveStepData();
            if (this.currentStep < 4) {
                this.currentStep++;
                this.updateStepUI();
                this.updateStepTitle();
                this.updateNavigationButtons();
            }
        }
    }

    prevStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateStepUI();
            this.updateStepTitle();
            this.updateNavigationButtons();
        }
    }

    updateStepTitle() {
        const titles = {
            1: 'Project Details',
            2: 'Additional Services',
            3: 'Project Specifications',
            4: 'Project Summary'
        };
        const titleElement = this.modal.querySelector('.step-title');
        titleElement.textContent = titles[this.currentStep];
    }

    validateStep() {
        const currentStepContent = this.modal.querySelector(`.step-content[data-step="${this.currentStep}"]`);
        const requiredFields = currentStepContent.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value) {
                isValid = false;
                field.classList.add('error');
                
                // Add error message if it doesn't exist
                let errorMsg = field.parentElement.querySelector('.error-message');
                if (!errorMsg) {
                    errorMsg = document.createElement('p');
                    errorMsg.className = 'error-message';
                    errorMsg.textContent = 'This field is required';
                    field.parentElement.appendChild(errorMsg);
                }
            } else {
                field.classList.remove('error');
                const errorMsg = field.parentElement.querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.remove();
                }
            }
        });

        return isValid;
    }

    saveStepData() {
        const currentStepContent = this.modal.querySelector(`.step-content[data-step="${this.currentStep}"]`);
        const inputs = currentStepContent.querySelectorAll('input, select');
        inputs.forEach(input => {
            if (input.type === 'checkbox') {
                if (!this.formData[input.name]) {
                    this.formData[input.name] = [];
                }
                if (input.checked) {
                    this.formData[input.name].push(input.value);
                }
            } else {
                this.formData[input.name] = input.value;
            }
        });
    }

    updateStepUI() {
        // Update step indicators
        const steps = this.modal.querySelectorAll('.step');
        steps.forEach(step => {
            const stepNum = parseInt(step.dataset.step);
            step.classList.toggle('active', stepNum === this.currentStep);
            step.classList.toggle('completed', stepNum < this.currentStep);
        });

        // Show/hide step content
        const stepContents = this.modal.querySelectorAll('.step-content');
        stepContents.forEach(content => {
            content.style.display = content.dataset.step === this.currentStep.toString() ? 'block' : 'none';
        });

        // Update navigation buttons
        this.updateNavigationButtons();
    }

    updateNavigationButtons() {
        const form = this.modal.querySelector('#quoteForm');
        const prevBtn = form.querySelector('.prev-btn');
        const nextBtn = form.querySelector('.next-btn');
        const submitBtn = form.querySelector('.submit-btn');

        // Show/hide previous button
        prevBtn.style.display = this.currentStep > 1 ? 'block' : 'none';

        // Show/hide next and submit buttons
        nextBtn.style.display = this.currentStep < 4 ? 'block' : 'none';
        submitBtn.style.display = this.currentStep === 4 ? 'block' : 'none';
    }

    updateSummary() {
        const summaryContent = this.modal.querySelector('.summary-content');
        summaryContent.innerHTML = `
            <div class="summary-item">
                <h4>Project Type</h4>
                <p>${this.formData.projectType} (${this.formData.projectNiche})</p>
            </div>
            <div class="summary-item">
                <h4>Additional Services</h4>
                <p>${this.formData.services ? this.formData.services.join(', ') : 'None'}</p>
            </div>
            <div class="summary-item">
                <h4>Specifications</h4>
                <ul>
                    <li>Pages/Screens: ${this.formData.pageCount}</li>
                    <li>Time Frame: ${this.formData.timeFrameNumber} ${this.formData.timeFrameUnit}</li>
                    <li>Revisions: ${this.formData.revisions}</li>
                </ul>
            </div>
        `;
        this.calculateQuote();
    }

    calculateQuote() {
        let basePrice = 0;
        let multiplier = 1;

        // Project Type base prices
        const projectTypePrices = {
            website: 5000,
            webapp: 8000,
            mobileapp: 12000,
            ecommerce: 15000
        };
        basePrice = projectTypePrices[this.formData.projectType] || 0;

        // Additional services
        const servicePrices = {
            seo: 1500,
            analytics: 800,
            hosting: 500,
            maintenance: 1200,
            security: 1000
        };
        
        const servicesTotal = (this.formData.services || [])
            .reduce((sum, service) => sum + (servicePrices[service] || 0), 0);

        // Pages/Screens multiplier
        multiplier += (this.formData.pageCount - 1) * 0.15;

        // Time frame adjustment
        const timeInWeeks = this.formData.timeFrameUnit === 'months' 
            ? this.formData.timeFrameNumber * 4 
            : this.formData.timeFrameNumber;
        
        if (timeInWeeks < 4) multiplier *= 1.3;

        // Revisions multiplier
        const revisionMultipliers = {
            '2': 1,
            '3': 1.2,
            'unlimited': 1.5
        };
        multiplier *= revisionMultipliers[this.formData.revisions] || 1;

        const totalPrice = (basePrice + servicesTotal) * multiplier;
        const minQuote = Math.round(totalPrice * 0.9);
        const maxQuote = Math.round(totalPrice * 1.1);

        // Update quote display
        const minQuoteEl = this.modal.querySelector('.min-quote');
        const maxQuoteEl = this.modal.querySelector('.max-quote');
        minQuoteEl.textContent = `$${minQuote.toLocaleString()}`;
        maxQuoteEl.textContent = `$${maxQuote.toLocaleString()}`;
    }

    updateLivePrice() {
        const newPrice = this.calculateBasePrice();
        const priceDisplay = this.modal.querySelector('.live-price .number');
        
        // Animate the price change
        if (this.currentPrice !== newPrice) {
            const startValue = this.currentPrice;
            const endValue = newPrice;
            const duration = 500; // Animation duration in ms
            const startTime = performance.now();
            
            const animatePrice = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function for smooth animation
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const currentValue = Math.round(startValue + (endValue - startValue) * easeOutQuart);
                
                priceDisplay.textContent = currentValue.toLocaleString();
                
                if (progress < 1) {
                    requestAnimationFrame(animatePrice);
                }
            };
            
            requestAnimationFrame(animatePrice);
            this.currentPrice = newPrice;
        }
    }

    calculateBasePrice() {
        let basePrice = 0;

        // Project Type base prices
        const projectTypePrices = {
            website: 5000,
            webapp: 8000,
            mobileapp: 12000,
            ecommerce: 15000
        };
        basePrice = projectTypePrices[this.formData.projectType] || 0;

        // Additional services
        const servicePrices = {
            seo: 1500,
            analytics: 800,
            hosting: 500,
            maintenance: 1200,
            security: 1000
        };
        
        const servicesTotal = (this.formData.services || [])
            .reduce((sum, service) => sum + (servicePrices[service] || 0), 0);

        // Pages/Screens multiplier
        const pageMultiplier = this.formData.pageCount ? 1 + (this.formData.pageCount - 1) * 0.15 : 1;

        return Math.round((basePrice + servicesTotal) * pageMultiplier);
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.currentStep === 4) {
            this.modal.querySelector('.form-navigation').style.display = 'none';
            this.modal.querySelector('.final-actions').style.display = 'flex';
        }
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            this.resetForm();
        }, 300); // Wait for animation to complete
    }

    resetForm() {
        const form = this.modal.querySelector('#quoteForm');
        form.reset();
        this.currentStep = 1;
        this.formData = {};
        this.updateStepUI();
        this.updateStepTitle();
        this.modal.querySelector('.form-navigation').style.display = 'flex';
        this.modal.querySelector('.final-actions').style.display = 'none';
    }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new QuoteCalculator();
});
