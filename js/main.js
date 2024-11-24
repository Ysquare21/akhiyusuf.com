// Main JavaScript file
document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    initializeComponents();

    // Smooth scrolling with custom easing
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;
            
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            let startTime = null;

            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / 1000, 1);
                
                // Easing function for smooth deceleration
                const ease = t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
                
                window.scrollTo(0, startPosition + (distance * ease(progress)));

                if (timeElapsed < 1000) {
                    requestAnimationFrame(animation);
                }
            }

            requestAnimationFrame(animation);
        });
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
