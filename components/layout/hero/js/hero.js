// Hero section parallax effect
document.addEventListener('DOMContentLoaded', () => {
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
});
