// Navigation component functionality
document.addEventListener('DOMContentLoaded', () => {
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
});
