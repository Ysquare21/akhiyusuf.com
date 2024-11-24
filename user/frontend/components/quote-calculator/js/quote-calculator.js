// Price Quote Calculator
class QuoteCalculator {
    constructor() {
        this.modal = null;
        this.floatingBtn = null;
        this.currentStep = 1;
        this.formData = {};
        this.animationFrame = null;
        this.debounceTimeout = null;
        
        // Define complexity levels
        this.complexityLevels = {
            basic: {
                label: 'Basic',
                description: 'Essential features with standard functionality',
                multiplier: 1.0
            },
            recommended: {
                label: 'Recommended: Basic + Pro Features',
                description: 'Enhanced features and functionality building upon the Basic package',
                multiplier: 1.5
            },
            premium: {
                label: 'Premium: Recommended + Advanced Features',
                description: 'Complete solution with all features from Recommended plus advanced capabilities',
                multiplier: 2.0
            }
        };

        // Define feature packages with detailed descriptions
        this.featurePackages = {
            website: {
                basic: {
                    label: 'Basic Package (UI/UX Design, Responsive Design, Contact Form, SEO Basics, Analytics & More)',
                    features: [
                        'UI/UX Design: Professional and user-friendly design',
                        'Responsive Design: Mobile-friendly layout that works on all devices',
                        'Contact Form: Professional contact form with email notifications',
                        'SEO Basics: Essential meta tags and site structure',
                        'Analytics: Basic visitor tracking and insights'
                    ],
                    description: 'Perfect for small businesses and personal websites'
                },
                recommended: {
                    label: 'Recommended Package (Basic + CMS, Blog, Speed Optimization, Security, Custom Domain & More)',
                    features: [
                        'Content Management: Easy content updates without coding',
                        'Blog System: Share news and updates with your audience',
                        'Speed Optimization: Fast loading times and performance',
                        'Security: SSL certificate and security features',
                        'Custom Domain: Professional web address setup'
                    ],
                    description: 'Most popular choice for growing businesses'
                },
                premium: {
                    label: 'Premium Package (Recommended + E-commerce, AI Integration, Multilingual, Custom Features, Priority Support & More)',
                    features: [
                        'E-commerce: Online store with secure payments',
                        'AI Integration: Smart features and automation',
                        'Multilingual: Support for multiple languages',
                        'Custom Features: Tailored functionality for your needs',
                        'Priority Support: 24/7 technical assistance'
                    ],
                    description: 'Complete solution for established businesses'
                }
            },
            webApplication: {
                basic: {
                    label: 'Basic Package (UI/UX Design, Authentication, Dashboard, Database, Error Handling & More)',
                    features: [
                        'UI/UX Design: Intuitive user interface design',
                        'User Authentication: Secure login and registration',
                        'Dashboard: User-friendly control panel',
                        'Data Storage: Secure database integration',
                        'Error Handling: Basic error tracking'
                    ],
                    description: 'Essential features for web applications'
                },
                recommended: {
                    label: 'Recommended Package (Basic + User Roles, Real-time Updates, File Management, Search, Analytics & More)',
                    features: [
                        'User Roles: Advanced permission system',
                        'Real-time Updates: Live data synchronization',
                        'File Management: Upload and download system',
                        'Search System: Advanced search functionality',
                        'Analytics Dashboard: Detailed insights and reports'
                    ],
                    description: 'Advanced features for professional use'
                },
                premium: {
                    label: 'Premium Package (Recommended + Payments, AI Integration, Security, Data Tools, Scalability & More)',
                    features: [
                        'Payment System: Secure payment processing',
                        'AI Integration: Intelligent automation and insights',
                        'Advanced Security: Enhanced protection measures',
                        'Data Tools: Import/export functionality',
                        'Scalability: High-performance optimization'
                    ],
                    description: 'Enterprise-grade solutions'
                }
            },
            mobileApplication: {
                basic: {
                    label: 'Basic Package (UI/UX Design, User Profiles, Push Notifications, Offline Mode, App Distribution & More)',
                    features: [
                        'UI/UX Design: Modern mobile interface design',
                        'User Profiles: Account management system',
                        'Push Notifications: User engagement system',
                        'Offline Mode: Basic offline functionality',
                        'App Distribution: Store submission support'
                    ],
                    description: 'Essential mobile app features'
                },
                recommended: {
                    label: 'Recommended Package (Basic + Social Features, Chat, Analytics, Media Handling, Cloud Storage & More)',
                    features: [
                        'Social Features: User interaction system',
                        'Chat System: In-app messaging',
                        'Analytics: User behavior tracking',
                        'Media Handling: Photo and video support',
                        'Cloud Storage: Data synchronization'
                    ],
                    description: 'Enhanced user engagement features'
                },
                premium: {
                    label: 'Premium Package (Recommended + Monetization, AI Integration, Cross-platform, Custom Features, VIP Support & More)',
                    features: [
                        'Monetization: In-app purchases and subscriptions',
                        'AI Integration: Smart features and machine learning',
                        'Cross-platform: iOS and Android support',
                        'Custom Features: Tailored functionality',
                        'VIP Support: Premium technical assistance'
                    ],
                    description: 'Full-featured mobile solution'
                }
            }
        };
        this.currentPrice = 0;
        
        // Base prices for different project types
        this.basePrices = {
            'website': 2500,
            'webApplication': 5000,
            'mobileApplication': 7500,
            'ecommerce': 4000
        };

        // Multipliers for different options
        this.multipliers = {
            pages: {
                '1-5': 1.0,
                '6-10': 1.4,
                '11-20': 1.8,
                '20+': 2.2
            },
            timeline: {
                'rush': 1.5,
                'standard': 1.3,
                'extended': 1.0
            },
            revisions: {
                'basic': 1.0,
                'recommended': 1.5,
                'premium': 2.0
            },
            complexity: {
                'basic': 1.0,
                'recommended': 1.5,
                'premium': 2.0
            }
        };
    }

    init() {
        // Create floating button if it doesn't exist
        const existingBtn = document.querySelector('.floating-quote-btn');
        if (existingBtn) {
            this.floatingBtn = existingBtn;
        } else {
            this.floatingBtn = document.createElement('button');
            this.floatingBtn.className = 'floating-quote-btn';
            this.floatingBtn.innerHTML = 'Calculate Project Cost';
            document.body.appendChild(this.floatingBtn);
        }
        
        // Create modal if it doesn't exist
        if (!this.modal) {
            this.createModal();
        }
        
        // Add form change listener for price updates
        const form = this.modal.querySelector('form');
        if (form) {
            form.addEventListener('change', (e) => this.handleFormChange(e));
        }
        
        // Initialize price display
        this.calculatePrice();
        
        // Attach event listeners
        this.attachEventListeners();
        
        // Initialize dropdowns
        this.initializeDropdowns();
        
        // Initialize form
        this.initializeForm();
    }

    createFloatingButton() {
        // Check if button already exists
        const existingBtn = document.querySelector('.floating-quote-btn');
        if (existingBtn) {
            this.floatingBtn = existingBtn;
            return;
        }

        // Create new button
        this.floatingBtn = document.createElement('button');
        this.floatingBtn.className = 'floating-quote-btn';
        this.floatingBtn.innerHTML = 'Get a Quote';
        document.body.appendChild(this.floatingBtn);
    }

    createModal() {
        // Create modal if it doesn't exist
        if (!this.modal) {
            this.modal = document.createElement('div');
            this.modal.className = 'quote-calculator-modal';
            this.modal.innerHTML = `
                <div class="modal-content">
                    <header class="modal-header">
                        <div class="header-content">
                            <h2>Project Calculator</h2>
                            <div class="live-price">
                                <span class="price-label">Cost:</span>
                                <span class="price-amount">$0</span>
                            </div>
                        </div>
                        <button class="close-modal">&times;</button>
                    </header>
                    <form id="quoteForm">
                        <div class="form-content">
                            <div class="step-content" data-step="1">
                                <div class="price-breakdown">
                                    <h3>Price Breakdown</h3>
                                    <div class="formula-display"></div>
                                </div>
                                <div class="form-grid">
                                    <div class="form-group">
                                        <label>Project Type</label>
                                        <div class="select-wrapper">
                                            <select name="projectType" required>
                                                <option value="">Select Type</option>
                                                <option value="website">Website</option>
                                                <option value="webApplication">Web Application</option>
                                                <option value="mobileApplication">Mobile Application</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label>Industry/Niche</label>
                                        <div class="mobile-select-wrapper">
                                            <select name="industry" required>
                                                <option value="">Select your industry</option>
                                                <option value="technology">Technology & Software</option>
                                                <option value="healthcare">Healthcare & Medical</option>
                                                <option value="education">Education & E-learning</option>
                                                <option value="retail">Retail & E-commerce</option>
                                                <option value="finance">Finance & Banking</option>
                                                <option value="realEstate">Real Estate</option>
                                                <option value="hospitality">Hospitality & Tourism</option>
                                                <option value="automotive">Automotive</option>
                                                <option value="manufacturing">Manufacturing</option>
                                                <option value="construction">Construction</option>
                                                <option value="professional">Professional Services</option>
                                                <option value="creative">Creative & Design</option>
                                                <option value="fitness">Fitness & Wellness</option>
                                                <option value="food">Food & Restaurant</option>
                                                <option value="entertainment">Entertainment & Media</option>
                                                <option value="nonprofit">Non-profit & Charity</option>
                                                <option value="agriculture">Agriculture</option>
                                                <option value="energy">Energy & Utilities</option>
                                                <option value="environmental">Environmental</option>
                                                <option value="logistics">Logistics & Transportation</option>
                                                <option value="legal">Legal Services</option>
                                                <option value="government">Government</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label>Pages/Screens</label>
                                        <div class="select-wrapper">
                                            <select name="pageCount" required>
                                                <option value="">Select Count</option>
                                                <option value="1-5">1-5 pages</option>
                                                <option value="6-10">6-10 pages</option>
                                                <option value="11-20">11-20 pages</option>
                                                <option value="20+">20+ pages</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label>Timeline</label>
                                        <div class="select-wrapper">
                                            <select name="timeline" required>
                                                <option value="">Select Timeline</option>
                                                <option value="rush">Rush (1-2 weeks)</option>
                                                <option value="standard">Standard (2-4 weeks)</option>
                                                <option value="extended">Extended (1-2 months)</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label>Revision Package</label>
                                        <div class="select-wrapper">
                                            <select name="revisionPackage" required>
                                                <option value="">Select Package</option>
                                                <option value="basic">Basic (5 revisions)</option>
                                                <option value="recommended">Recommended (10 revisions)</option>
                                                <option value="premium">Premium (Unlimited)</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label>Complexity Level</label>
                                        <div class="select-wrapper">
                                            <select name="complexityLevel" required>
                                                <option value="">Select Level</option>
                                                <option value="basic">Basic</option>
                                                <option value="recommended">Recommended: Basic + Pro Features</option>
                                                <option value="premium">Premium: Recommended + Advanced Features</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <footer class="modal-footer">
                        <button type="button" class="download-quote">Download Quote</button>
                        <button type="submit" class="start-project">Start Project</button>
                        <button type="button" class="discuss-project-button">
                            Discuss Project Details
                        </button>
                    </footer>
                </div>
            `;
            document.body.appendChild(this.modal);
        }
    }

    populateOptions(select, optionsContainer) {
        console.log('Populating options for select:', select);
        optionsContainer.innerHTML = '';
        Array.from(select.options).forEach(option => {
            if (option.value) {  // Skip empty/placeholder options
                const optionElement = document.createElement('div');
                optionElement.className = 'mobile-select-option';
                optionElement.setAttribute('data-value', option.value);
                optionElement.textContent = option.textContent;
                console.log('Created option element:', optionElement);
                optionsContainer.appendChild(optionElement);
            }
        });
    }

    initializeDropdowns() {
        const selectElements = document.querySelectorAll('select:not(.mobile-select-native)');
        
        selectElements.forEach(select => {
            console.log('Initializing dropdown for select:', select);
            
            const wrapper = document.createElement('div');
            wrapper.className = 'mobile-select-wrapper';
            
            const trigger = document.createElement('button');
            trigger.className = 'mobile-select-trigger';
            trigger.type = 'button';
            
            const placeholder = select.getAttribute('data-placeholder') || 
                              (select.options[0]?.textContent || 'Select Option');
            
            trigger.innerHTML = `
                <span class="mobile-select-value placeholder">${placeholder}</span>
                <span class="mobile-select-icon">▼</span>
            `;
            
            const dropdown = document.createElement('div');
            dropdown.className = 'mobile-select-dropdown';
            
            const optionsContainer = document.createElement('div');
            optionsContainer.className = 'mobile-select-options';
            
            // Add click handler for options
            optionsContainer.addEventListener('click', function(e) {
                console.log('Options container clicked', e.target);
                const option = e.target.closest('.mobile-select-option');
                console.log('Found option:', option);
                
                if (option) {
                    console.log('Option clicked:', option.textContent);
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const value = option.getAttribute('data-value');
                    const text = option.textContent;
                    console.log('Selected value:', value, 'text:', text);
                    
                    // Update trigger text and remove placeholder class
                    const valueSpan = trigger.querySelector('.mobile-select-value');
                    valueSpan.textContent = text;
                    valueSpan.classList.remove('placeholder');
                    
                    // Update original select and trigger change event
                    select.value = value;
                    console.log('Updated select value to:', value);
                    
                    const changeEvent = new Event('change', {
                        bubbles: true,
                        cancelable: true
                    });
                    select.dispatchEvent(changeEvent);
                    console.log('Dispatched change event');
                    
                    // Update formula table and price
                    this.updateFormulaTable();
                    this.calculatePrice();
                    this.updateLivePrice();
                    
                    console.log('About to close dropdown');
                    // Close dropdown
                    optionsContainer.innerHTML = '';
                    trigger.setAttribute('aria-expanded', 'false');
                    dropdown.classList.remove('mobile-select-dropdown-open');
                    console.log('Dropdown closed');
                }
            }.bind(this));  // Bind this to the class instance
            
            // Add click handler for trigger
            trigger.addEventListener('click', (e) => {
                console.log('Trigger clicked');
                e.preventDefault();
                e.stopPropagation();
                
                const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
                console.log('Current expanded state:', isExpanded);
                
                // Toggle current dropdown
                trigger.setAttribute('aria-expanded', !isExpanded);
                dropdown.classList.toggle('mobile-select-dropdown-open');
                
                // Populate options only when opening
                if (!isExpanded) {
                    console.log('Populating options');
                    this.populateOptions(select, optionsContainer);
                }
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!wrapper.contains(e.target)) {
                    console.log('Outside click detected');
                    optionsContainer.innerHTML = '';
                    trigger.setAttribute('aria-expanded', 'false');
                    dropdown.classList.remove('mobile-select-dropdown-open');
                }
            });
            
            // Assemble the custom select
            dropdown.appendChild(optionsContainer);
            wrapper.appendChild(trigger);
            wrapper.appendChild(dropdown);
            
            // Insert the custom select before the original
            select.parentNode.insertBefore(wrapper, select);
            
            // Hide the original select
            select.style.display = 'none';
        });
    }

    initializeForm() {
        const selects = document.querySelectorAll('select');
        selects.forEach(select => {
            // Set initial state
            select.size = 1;
            
            // Handle opening dropdown
            select.addEventListener('mousedown', function(e) {
                if (this.size === 1) {
                    e.preventDefault();
                    this.size = 8; // Set size larger than needed to ensure 4 are visible
                    this.focus();
                }
            });

            // Handle closing dropdown
            select.addEventListener('change', function() {
                this.blur();
            });

            select.addEventListener('blur', function() {
                this.size = 1;
            });

            // Prevent mousewheel from changing value when closed
            select.addEventListener('wheel', function(e) {
                if (this.size === 1) {
                    e.preventDefault();
                }
            });
        });
    }

    attachEventListeners() {
        // Open modal
        this.floatingBtn.addEventListener('click', () => {
            this.modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        // Close modal
        const closeBtn = this.modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => {
            this.modal.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Handle form changes
        const form = this.modal.querySelector('#quoteForm');
        form.addEventListener('change', (e) => {
            const target = e.target;
            if (target.tagName === 'SELECT') {
                // Store the value in formData
                this.formData[target.name] = target.value;
                
                // Update UI
                this.updateFormulaTable();
                this.calculatePrice();
                this.updateLivePrice();
                
                // Handle specific field updates
                if (target.name === 'projectType') {
                    this.updateComplexityDescription();
                }
            }
        });

        // Handle complexity description updates
        const complexitySelect = this.modal.querySelector('select[name="complexity"]');
        if (complexitySelect) {
            complexitySelect.addEventListener('change', () => {
                this.updateComplexityDescription();
            });
        }

        // Add discuss project button handler
        const discussButton = this.modal.querySelector('.discuss-project-button');
        if (discussButton) {
            discussButton.addEventListener('click', () => {
                this.openProjectChat();
            });
        }
    }

    handleFormChange(e) {
        // Prevent rapid-fire updates
        if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
        }

        this.debounceTimeout = setTimeout(() => {
            const form = e.target.form;
            if (!form) return;

            // Calculate and update price
            this.calculatePrice();
        }, 100); // Debounce for 100ms
    }

    calculatePrice() {
        // Get form values
        const form = this.modal.querySelector('#quoteForm');
        if (!form) return;

        const projectType = form.querySelector('[name="projectType"]').value;
        const pageCount = form.querySelector('[name="pageCount"]').value;
        const timeline = form.querySelector('[name="timeline"]').value;
        const revisionPackage = form.querySelector('[name="revisionPackage"]').value;
        const complexityLevel = form.querySelector('[name="complexityLevel"]').value;

        // Get base price based on project type
        let basePrice = 0;
        if (projectType) {
            basePrice = this.basePrices[projectType] || 0;
        }
        
        // Calculate multipliers
        const pagesMultiplier = pageCount ? (this.multipliers.pages[pageCount] || 1) : 1;
        const timelineMultiplier = timeline ? (this.multipliers.timeline[timeline] || 1) : 1;
        const revisionMultiplier = revisionPackage ? (this.multipliers.revisions[revisionPackage] || 1) : 1;
        const complexityMultiplier = complexityLevel ? (this.complexityLevels[complexityLevel]?.multiplier || 1) : 1;

        // Calculate final price
        const price = Math.floor(basePrice * pagesMultiplier * timelineMultiplier * revisionMultiplier * complexityMultiplier);

        // Update displays
        this.updatePriceDisplay(price);
        this.updateFormulaDisplay({
            basePrice,
            pagesMultiplier,
            timelineMultiplier,
            revisionMultiplier,
            complexityMultiplier,
            finalPrice: price
        });
    }

    updatePriceDisplay(newPrice) {
        const priceElement = this.modal.querySelector('.price-amount');
        if (!priceElement) {
            console.error('Price element not found');
            return;
        }

        // Cancel any existing animation
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }

        // Initialize animation variables
        const startPrice = this.currentPrice || 0;
        const priceDiff = newPrice - startPrice;
        const startTime = performance.now();
        const duration = 800;

        // Animation function
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Use easeOutExpo for smooth animation
            const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const currentValue = Math.floor(startPrice + (priceDiff * easeOutExpo));

            // Update display with formatted price
            priceElement.textContent = `$${currentValue.toLocaleString('en-US')}`;

            // Continue animation if not complete
            if (progress < 1) {
                this.animationFrame = requestAnimationFrame(animate);
            } else {
                this.animationFrame = null;
                this.currentPrice = newPrice;
            }
        };

        // Start animation
        this.animationFrame = requestAnimationFrame(animate);
    }

    updateFormulaDisplay(values) {
        const formulaDisplay = this.modal.querySelector('.formula-display');
        if (!formulaDisplay) return;

        const formulaHTML = `
            <div class="formula-container">
                <div class="formula-row">
                    <span class="formula-label">Base</span>
                    <span class="formula-operator">×</span>
                    <span class="formula-label">Pages</span>
                    <span class="formula-operator">×</span>
                    <span class="formula-label">Timeline</span>
                    <span class="formula-operator">×</span>
                    <span class="formula-label">Revisions</span>
                    <span class="formula-operator">×</span>
                    <span class="formula-label">Complexity</span>
                </div>
                <div class="formula-row">
                    <span class="formula-value">$${values.basePrice}</span>
                    <span class="formula-operator">×</span>
                    <span class="formula-value">${values.pagesMultiplier}x</span>
                    <span class="formula-operator">×</span>
                    <span class="formula-value">${values.timelineMultiplier}x</span>
                    <span class="formula-operator">×</span>
                    <span class="formula-value">${values.revisionMultiplier}x</span>
                    <span class="formula-operator">×</span>
                    <span class="formula-value">${values.complexityMultiplier}x</span>
                </div>
            </div>
        `;

        formulaDisplay.innerHTML = formulaHTML;
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    getScrollbarWidth() {
        return window.innerWidth - document.documentElement.clientWidth;
    }

    openProjectChat() {
        const chatComponent = document.querySelector('chat-component');
        if (chatComponent) {
            const projectDetails = {
                type: this.formData.projectType || 'Website',
                complexity: this.formData.complexity || 'Basic',
                timeline: this.formData.timeline || 'Standard',
                price: this.currentPrice,
                description: this.getProjectDescription()
            };
            chatComponent.loadFromCalculator(projectDetails);
        }
    }

    getProjectDescription() {
        const type = this.formData.projectType;
        const complexity = this.formData.complexity || 'basic';
        
        if (type && this.featurePackages[type] && this.featurePackages[type][complexity]) {
            return this.featurePackages[type][complexity].description;
        }
        return '';
    }
}

// Initialize calculator when DOM is loaded
if (typeof window.quoteCalculatorInstance === 'undefined') {
    window.quoteCalculatorInstance = new QuoteCalculator();
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.quoteCalculatorInstance.init();
        });
    } else {
        window.quoteCalculatorInstance.init();
    }
}

export default QuoteCalculator;
