// Main JavaScript file
document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    initializeComponents();

    // Simple smooth scrolling with easing
    class SmoothScroll {
        constructor() {
            this.currentY = window.scrollY;
            this.targetY = window.scrollY;
            this.isScrolling = false;
            this.ease = 0.1;
            
            this.init();
        }

        init() {
            window.addEventListener('wheel', (e) => {
                // Check if we're scrolling inside the modal
                if (this.isInsideModal(e.target)) {
                    return; // Let default scrolling happen inside modal
                }

                e.preventDefault();
                
                let delta = e.deltaY;
                if (e.deltaMode === 1) delta *= 33.3;
                if (e.deltaMode === 2) delta *= 100;
                
                this.targetY = Math.max(
                    0,
                    Math.min(
                        this.targetY + delta,
                        document.documentElement.scrollHeight - window.innerHeight
                    )
                );
                
                if (!this.isScrolling) {
                    this.isScrolling = true;
                    requestAnimationFrame(this.update.bind(this));
                }
            }, { passive: false });

            // Touch device support
            let touchStartY = 0;
            let lastTouchY = 0;
            
            window.addEventListener('touchstart', (e) => {
                if (this.isInsideModal(e.target)) {
                    return; // Let default touch behavior happen inside modal
                }
                touchStartY = e.touches[0].clientY;
                lastTouchY = touchStartY;
            }, { passive: false });

            window.addEventListener('touchmove', (e) => {
                if (this.isInsideModal(e.target)) {
                    return; // Let default touch behavior happen inside modal
                }

                e.preventDefault();
                const touchY = e.touches[0].clientY;
                const deltaY = (lastTouchY - touchY) * 2;
                lastTouchY = touchY;
                
                this.targetY = Math.max(
                    0,
                    Math.min(
                        this.targetY + deltaY,
                        document.documentElement.scrollHeight - window.innerHeight
                    )
                );
                
                if (!this.isScrolling) {
                    this.isScrolling = true;
                    requestAnimationFrame(this.update.bind(this));
                }
            }, { passive: false });
        }

        isInsideModal(element) {
            // Check if the element is inside the quote calculator modal
            while (element && element !== document.body) {
                if (element.classList.contains('quote-calculator-modal') ||
                    element.classList.contains('modal-content') ||
                    element.classList.contains('form-content')) {
                    return true;
                }
                element = element.parentElement;
            }
            return false;
        }

        update() {
            const diff = this.targetY - this.currentY;
            
            if (Math.abs(diff) > 0.5) {
                this.currentY += diff * this.ease;
                window.scrollTo(0, this.currentY);
                requestAnimationFrame(this.update.bind(this));
            } else {
                this.isScrolling = false;
                this.currentY = this.targetY;
                window.scrollTo(0, this.currentY);
            }
        }
    }

    // Initialize smooth scroll
    new SmoothScroll();

    // Function to initialize smooth scroll for popup content
    function initializePopupScroll() {
        // Wait for the popup content to be fully rendered
        setTimeout(() => {
            const popupContent = document.querySelector('.modal-content');
            if (popupContent) {
                const popupScroll = new SmoothScroll(popupContent, { ease: 0.1 });
            }
        }, 100);
    }

    // Watch for popup opening
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) { // Element node
                    if (node.classList && 
                        (node.classList.contains('modal-content') || 
                         node.querySelector('.modal-content'))) {
                        initializePopupScroll();
                    }
                }
            });
        });
    });

    // Start observing the document for popup changes
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Parallax effect for hero section
    const heroContent = document.querySelector('.hero-content');
    const heroBackdrop = document.querySelector('.hero-backdrop');

    if (heroContent && heroBackdrop) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            
            heroContent.style.transform = `translateY(${rate * 0.5}px)`;
            heroBackdrop.style.transform = `translate(-50%, -50%) scale(${1 + scrolled * 0.0005})`;
        });
    }

    // Navbar transparency
    const nav = document.querySelector('nav');
    let lastScroll = 0;

    if (nav) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                nav.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            } else if (currentScroll > lastScroll) {
                nav.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
            } else {
                nav.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            }
            
            lastScroll = currentScroll;
        });
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInElements = document.querySelectorAll('.project-card, .skill, .section-tag, section h2');

    if (fadeInElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = entry.target.classList.contains('project-card') 
                        ? 'scale(1)' 
                        : 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        fadeInElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = element.classList.contains('project-card') 
                ? 'scale(0.95)' 
                : 'translateY(20px)';
            element.style.transition = 'opacity 0.6s cubic-bezier(0.5, 0, 0, 1), transform 0.6s cubic-bezier(0.5, 0, 0, 1)';
            observer.observe(element);
        });
    }

    // Form interaction effects
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');

    if (formInputs.length > 0) {
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.style.transform = 'scale(1.01)';
                input.style.transition = 'all 0.3s cubic-bezier(0.5, 0, 0, 1)';
            });

            input.addEventListener('blur', () => {
                input.style.transform = 'scale(1)';
            });
        });
    }

    // Contact form submission with animation
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const button = this.querySelector('button');
            if (!button) return;
            
            const originalText = button.textContent;
            
            // Animate button
            button.style.width = button.offsetWidth + 'px';
            button.textContent = '•••';
            button.disabled = true;
            
            // Simulate sending (replace with actual form submission)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Success animation
            button.textContent = '✓';
            button.style.backgroundColor = '#2ecc71';
            
            // Reset form
            this.reset();
            
            // Reset button after delay
            setTimeout(() => {
                button.textContent = originalText;
                button.style.width = '';
                button.style.backgroundColor = '';
                button.disabled = false;
            }, 2000);
        });
    }
});

function initializeComponents() {
    // Load component scripts
    loadScript('/components/shared/navigation/js/navigation.js');
    loadScript('/components/layout/hero/js/hero.js');
    loadScript('/components/quote-calculator/js/quote-calculator.js');
    loadScript('/components/shared/footer/js/footer.js');
    loadScript('/components/shared/contact-form/js/contact-form.js');
    loadScript('/components/shared/project-showcase/js/project-showcase.js');
}

function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}
