console.log('Main JS loaded');

document.addEventListener('DOMContentLoaded', function() {

    // Handle mobile navigation
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        if (window.innerWidth < 768) {
            dropdown.addEventListener('click', function(e) {
                const content = this.querySelector('.dropdown-content');
                content.style.display = content.style.display === 'block' ? 'none' : 'block';
                e.preventDefault();
            });
        }
    });

    // Add scroll effect to header
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(31, 31, 31, 0.95)';
        } else {
            header.style.background = 'rgba(31, 31, 31, 0.8)';
        }
    });

    // Mouse tracking for bento grid
    const bentoGrid = document.querySelector('.services-bento-grid');
    const bentoCards = document.querySelectorAll('.bento-service');

    if (bentoGrid && bentoCards.length) {
        bentoGrid.addEventListener('mousemove', e => {
            const gridRect = bentoGrid.getBoundingClientRect();
            const mouseX = e.clientX - gridRect.left;
            const mouseY = e.clientY - gridRect.top;

            bentoCards.forEach(card => {
                const cardRect = card.getBoundingClientRect();
                const cardX = cardRect.left - gridRect.left + cardRect.width / 2;
                const cardY = cardRect.top - gridRect.top + cardRect.height / 2;
                
                // Calculate distance from mouse to card center
                const distance = Math.hypot(mouseX - cardX, mouseY - cardY);
                
                // Add 'near' class based on proximity (increased radius)
                if (distance < 600) { // Increased from 400
                    card.classList.add('near');
                    
                    // Calculate relative mouse position for the card
                    const relativeX = mouseX - (cardRect.left - gridRect.left);
                    const relativeY = mouseY - (cardRect.top - gridRect.top);
                    
                    requestAnimationFrame(() => {
                        card.style.setProperty('--mouse-x', `${relativeX}px`);
                        card.style.setProperty('--mouse-y', `${relativeY}px`);
                    });
                } else {
                    card.classList.remove('near');
                }
            });
        });

        // Remove 'near' class when mouse leaves grid
        bentoGrid.addEventListener('mouseleave', () => {
            bentoCards.forEach(card => {
                card.classList.remove('near');
            });
        });
    }

    // Process section animations
    const processSteps = document.querySelectorAll('.process-step');
    const dots = document.querySelectorAll('.dot');
    let currentStep = 0;

    function updateProcessStep(index) {
        // Update steps
        processSteps.forEach((step, i) => {
            if (i === index) {
                step.classList.add('active');
                step.style.opacity = '1';
                step.style.visibility = 'visible';
            } else {
                step.classList.remove('active');
                step.style.opacity = '0';
                step.style.visibility = 'hidden';
            }
        });

        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    // Add click handlers for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentStep = index;
            updateProcessStep(currentStep);
        });
    });

    // Auto advance process steps
    let autoAdvance = setInterval(() => {
        currentStep = (currentStep + 1) % processSteps.length;
        updateProcessStep(currentStep);
    }, 5000);

    // Pause auto-advance when interacting with dots
    dots.forEach(dot => {
        dot.addEventListener('mouseenter', () => clearInterval(autoAdvance));
        dot.addEventListener('mouseleave', () => {
            autoAdvance = setInterval(() => {
                currentStep = (currentStep + 1) % processSteps.length;
                updateProcessStep(currentStep);
            }, 5000);
        });
    });

    // Initialize first step
    updateProcessStep(0);

    // Add mouse tracking for Impact Section
    const impactSection = document.querySelector('.impact-section');
    if (impactSection) {
        impactSection.addEventListener('mousemove', e => {
            const rect = impactSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            requestAnimationFrame(() => {
                impactSection.style.setProperty('--mouse-x', `${x}px`);
                impactSection.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    }

    // Project carousel functionality
    const projectCards = document.querySelectorAll('.project-card');
    const projectDots = document.querySelectorAll('.carousel-dots .dot');
    let currentProject = 0;

    function updateProject(index) {
        projectCards.forEach((card, i) => {
            if (i === index) {
                card.style.opacity = '0';
                card.style.zIndex = '1';
                
                requestAnimationFrame(() => {
                    card.classList.add('active');
                    card.style.opacity = '1';
                });
            } else {
                card.classList.remove('active');
                card.style.opacity = '0';
                card.style.zIndex = '0';
            }
        });

        projectDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    // Add click handlers for project dots
    projectDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentProject = index;
            updateProject(currentProject);
        });
    });

    // Auto advance projects
    let projectAutoAdvance = setInterval(() => {
        currentProject = (currentProject + 1) % projectCards.length;
        updateProject(currentProject);
    }, 5000);

    // Pause auto-advance when interacting with dots
    projectDots.forEach(dot => {
        dot.addEventListener('mouseenter', () => clearInterval(projectAutoAdvance));
        dot.addEventListener('mouseleave', () => {
            projectAutoAdvance = setInterval(() => {
                currentProject = (currentProject + 1) % projectCards.length;
                updateProject(currentProject);
            }, 5000);
        });
    });

    // Add click functionality for tech items
    const techItems = document.querySelectorAll('.tech-item');
    let activeTooltip = null;

    techItems.forEach(item => {
        // Handle click
        item.addEventListener('click', (e) => {
            // If there's an active tooltip and it's not this one, hide it
            if (activeTooltip && activeTooltip !== item) {
                activeTooltip.classList.remove('tooltip-active');
            }
            
            // Toggle tooltip for clicked item
            item.classList.toggle('tooltip-active');
            activeTooltip = item.classList.contains('tooltip-active') ? item : null;
            
            // Pause carousel animation
            const carousel = item.closest('.tech-carousel');
            if (carousel) {
                const row = carousel.querySelector('.tech-row');
                row.style.animationPlayState = 'paused';
            }
        });

        // Handle hover
        item.addEventListener('mouseenter', () => {
            const carousel = item.closest('.tech-carousel');
            if (carousel) {
                const row = carousel.querySelector('.tech-row');
                row.style.animationPlayState = 'paused';
            }
        });

        item.addEventListener('mouseleave', () => {
            const carousel = item.closest('.tech-carousel');
            if (carousel) {
                const row = carousel.querySelector('.tech-row');
                row.style.animationPlayState = 'running';
            }
        });
    });

    // Close tooltip when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.tech-item') && activeTooltip) {
            activeTooltip.classList.remove('tooltip-active');
            activeTooltip = null;
        }
    });

    // Initialize skill bars with animated numbers
    document.querySelectorAll('.skill-fill').forEach(fill => {
        const level = parseInt(fill.dataset.level);
        const levelDisplay = fill.parentElement.nextElementSibling;
        fill.style.setProperty('--skill-level', '0%');
        levelDisplay.textContent = '0%';

        // Create animation function
        function animateSkill(element, display, targetLevel) {
            let currentLevel = 0;
            const duration = 1000; // 1 second
            const interval = 16; // ~60fps
            const steps = duration / interval;
            const increment = targetLevel / steps;

            const animation = setInterval(() => {
                currentLevel += increment;
                if (currentLevel >= targetLevel) {
                    currentLevel = targetLevel;
                    clearInterval(animation);
                }
                element.style.width = `${currentLevel}%`; // Direct width update
                display.textContent = `${Math.round(currentLevel)}%`;
            }, interval);
        }

        // Add hover listener to parent card
        const card = fill.closest('.bento-service');
        card.addEventListener('mouseenter', () => {
            fill.style.transition = 'none'; // Remove transition temporarily
            animateSkill(fill, levelDisplay, level);
        });

        // Reset on mouseleave
        card.addEventListener('mouseleave', () => {
            fill.style.transition = 'width 0.3s ease'; // Add transition back
            fill.style.width = '0%';
            levelDisplay.textContent = '0%';
        });
    });

}); 
