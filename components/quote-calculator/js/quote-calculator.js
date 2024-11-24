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
            },
            customProject: {
                basic: {
                    label: 'Basic Package (UI/UX Design, Requirements, Core Features, Testing, Documentation & More)',
                    features: [
                        'UI/UX Design: Custom interface design',
                        'Requirements: Detailed project planning',
                        'Core Features: Essential functionality',
                        'Testing: Basic quality assurance',
                        'Documentation: User guides and manuals'
                    ],
                    description: 'Essential custom project features'
                },
                recommended: {
                    label: 'Recommended Package (Basic + Advanced Features, Performance, Testing Suite, Training, Extended Support & More)',
                    features: [
                        'Advanced Features: Complex functionality',
                        'Performance: Speed and efficiency optimization',
                        'Testing Suite: Comprehensive QA process',
                        'Training: Team onboarding sessions',
                        'Extended Support: Priority assistance'
                    ],
                    description: 'Professional development services'
                },
                premium: {
                    label: 'Premium Package (Recommended + Custom Development, AI Integration, Security Audit, Project Management, VIP Support & More)',
                    features: [
                        'Custom Development: Tailored solutions',
                        'AI Integration: Advanced AI capabilities',
                        'Security Audit: Comprehensive testing',
                        'Project Management: Dedicated manager',
                        'VIP Support: 24/7 priority assistance'
                    ],
                    description: 'Enterprise-level custom solutions'
                }
            }
        };
        this.currentPrice = 0;
        
        // Base prices for different project types
        this.basePrices = {
            'website': 2500,
            'webApplication': 5000,
            'mobileApplication': 7500,
            'ecommerce': 4000,
            'custom': 3500
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
                                                <option value="customProject">Custom Project</option>
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
                    </footer>
                </div>
            `;
            document.body.appendChild(this.modal);
        }
    }

    initializeDropdowns() {
        const dropdowns = this.modal.querySelectorAll('select');
        dropdowns.forEach(select => {
            // Create wrapper
            const wrapper = document.createElement('div');
            wrapper.className = 'mobile-select-wrapper';
            select.parentElement.insertBefore(wrapper, select);

            // Create trigger button
            const trigger = document.createElement('button');
            trigger.className = 'mobile-select-trigger';
            trigger.setAttribute('type', 'button');
            trigger.setAttribute('aria-haspopup', 'listbox');
            trigger.setAttribute('aria-expanded', 'false');

            // Create value display
            const valueSpan = document.createElement('span');
            valueSpan.className = 'mobile-select-value placeholder';
            valueSpan.textContent = select.options[select.selectedIndex]?.textContent || 'Select an option';
            if (select.value) valueSpan.classList.remove('placeholder');

            // Create icon
            const icon = document.createElement('span');
            icon.className = 'mobile-select-icon';
            icon.innerHTML = '▼';

            trigger.appendChild(valueSpan);
            trigger.appendChild(icon);

            // Create dropdown
            const dropdown = document.createElement('div');
            dropdown.className = 'mobile-select-dropdown';
            dropdown.setAttribute('role', 'listbox');

            // Only add search for industry dropdown
            if (select.name === 'industry') {
                const searchWrapper = document.createElement('div');
                searchWrapper.className = 'mobile-select-search';
                const searchInput = document.createElement('input');
                searchInput.type = 'text';
                searchInput.placeholder = 'Search industries...';
                searchInput.setAttribute('aria-label', 'Search industries');
                searchWrapper.appendChild(searchInput);
                dropdown.appendChild(searchWrapper);
            }

            // Create options container
            const optionsContainer = document.createElement('div');
            optionsContainer.className = 'mobile-select-options';
            optionsContainer.setAttribute('role', 'listbox');

            dropdown.appendChild(optionsContainer);

            // Add elements to wrapper
            wrapper.appendChild(trigger);
            wrapper.appendChild(select);
            select.className = 'mobile-select-native';
            wrapper.appendChild(dropdown);

            // Initialize the mobile select functionality
            this.initializeMobileSelect(wrapper);
        });
    }

    initializeMobileSelect(mobileSelect) {
        const trigger = mobileSelect.querySelector('.mobile-select-trigger');
        const nativeSelect = mobileSelect.querySelector('.mobile-select-native');
        const dropdown = mobileSelect.querySelector('.mobile-select-dropdown');
        const optionsContainer = mobileSelect.querySelector('.mobile-select-options');
        const searchInput = mobileSelect.querySelector('.mobile-select-search input');
        const valueSpan = mobileSelect.querySelector('.mobile-select-value');

        // Create and append backdrop
        const backdrop = document.createElement('div');
        backdrop.className = 'mobile-select-backdrop';
        document.body.appendChild(backdrop);

        // Populate options with special sorting only for industry dropdown
        const options = Array.from(nativeSelect.options)
            .map(option => ({
                value: option.value,
                label: option.textContent
            }));

        // Only apply special sorting for the industry dropdown
        if (nativeSelect.name === 'industry') {
            options.sort((a, b) => {
                // "Select your industry" always at top
                if (a.label.toLowerCase() === 'select your industry') return -1;
                if (b.label.toLowerCase() === 'select your industry') return 1;
                
                // "Other" always at bottom
                if (a.label.toLowerCase() === 'other') return 1;
                if (b.label.toLowerCase() === 'other') return -1;
                
                // Everything else alphabetically
                return a.label.localeCompare(b.label);
            });
        }

        const renderOptions = (filterText = '') => {
            let filtered = options;
            
            // Only apply filtering for industry dropdown
            if (nativeSelect.name === 'industry' && filterText) {
                filtered = options.filter(option => 
                    option.label.toLowerCase().includes(filterText.toLowerCase())
                );
            }

            optionsContainer.innerHTML = filtered.map(option => `
                <div class="mobile-select-option" role="option" data-value="${option.value}" 
                    ${nativeSelect.value === option.value ? 'aria-selected="true"' : ''}>
                    ${option.label}
                </div>
            `).join('');

            // Make options focusable
            optionsContainer.querySelectorAll('.mobile-select-option').forEach(option => {
                option.setAttribute('tabindex', '0');
            });
        };

        // Initial render
        renderOptions();

        const openDropdown = () => {
            // Close any other open dropdowns first
            document.querySelectorAll('.mobile-select-dropdown-open').forEach(d => {
                if (d !== dropdown) {
                    d.classList.remove('mobile-select-dropdown-open');
                    d.previousElementSibling.setAttribute('aria-expanded', 'false');
                }
            });

            dropdown.classList.add('mobile-select-dropdown-open');
            backdrop.classList.add('active');
            trigger.setAttribute('aria-expanded', 'true');
            
            // Only reset search for industry dropdown
            if (searchInput) {
                searchInput.value = '';
                searchInput.focus();
            }
            
            renderOptions();
        };

        const closeDropdown = () => {
            dropdown.classList.remove('mobile-select-dropdown-open');
            backdrop.classList.remove('active');
            trigger.setAttribute('aria-expanded', 'false');
            trigger.focus();
        };

        // Handle trigger click
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            if (trigger.getAttribute('aria-expanded') === 'true') {
                closeDropdown();
            } else {
                openDropdown();
            }
        });

        // Handle option selection
        optionsContainer.addEventListener('click', (e) => {
            const option = e.target.closest('.mobile-select-option');
            if (!option) return;

            const value = option.dataset.value;
            const label = option.textContent.trim();

            nativeSelect.value = value;
            valueSpan.textContent = label;
            valueSpan.classList.remove('placeholder');

            // Update native select and trigger change event
            nativeSelect.dispatchEvent(new Event('change', { bubbles: true }));

            // Update aria-selected
            optionsContainer.querySelectorAll('.mobile-select-option').forEach(opt => {
                opt.setAttribute('aria-selected', opt.dataset.value === value);
            });

            closeDropdown();
        });

        // Handle search (only for industry dropdown)
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                renderOptions(e.target.value);
            });
        }

        // Close on backdrop click
        backdrop.addEventListener('click', closeDropdown);

        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && dropdown.classList.contains('mobile-select-dropdown-open')) {
                closeDropdown();
            }
        });

        // Handle keyboard navigation
        optionsContainer.addEventListener('keydown', (e) => {
            const options = optionsContainer.querySelectorAll('.mobile-select-option');
            const currentOption = document.activeElement.closest('.mobile-select-option');
            const currentIndex = Array.from(options).indexOf(currentOption);

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    if (currentIndex < options.length - 1) {
                        options[currentIndex + 1].focus();
                    }
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    if (currentIndex > 0) {
                        options[currentIndex - 1].focus();
                    } else if (searchInput) {
                        searchInput.focus();
                    }
                    break;
                case 'Enter':
                case ' ':
                    e.preventDefault();
                    if (currentOption) {
                        currentOption.click();
                    }
                    break;
            }
        });
    }

    attachEventListeners() {
        // Open modal
        this.floatingBtn.addEventListener('click', () => {
            this.modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = this.getScrollbarWidth() + 'px';
        });

        // Close modal
        const closeBtn = this.modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => {
            this.closeModal();
        });

        // Close on outside click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        const form = this.modal.querySelector('#quoteForm');
        
        // Project type and features
        const projectTypeSelect = form.querySelector('select[name="projectType"]');
        
        projectTypeSelect.addEventListener('change', (e) => {
            const selectedType = e.target.value;
        });

        // Industry change
        const industrySelect = form.querySelector('select[name="industry"]');
        industrySelect.addEventListener('change', (e) => {
            this.formData.industry = e.target.value;
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.modal.classList.contains('active')) {
                if (e.key === 'Escape') {
                    this.closeModal();
                } else if (e.key === 'Enter' && e.target.tagName !== 'BUTTON') {
                    e.preventDefault();
                    if (this.currentStep < 2) {
                        this.nextStep();
                    }
                }
            }
        });

        // Form change handler
        form.addEventListener('change', (e) => this.handleFormChange(e));

        // Initialize custom select for industry dropdown
        // this.initializeMobileSelect();
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
            if (projectType === 'customProject') {
                basePrice = this.basePrices['custom'];
            }
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
        document.body.style.paddingRight = '';
    }

    getScrollbarWidth() {
        return window.innerWidth - document.documentElement.clientWidth;
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
