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

    // Enhanced carousel functionality
    const timeline = document.querySelector('.process-timeline');
    const steps = document.querySelectorAll('.process-step');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;

    function updateContent(index) {
        const stepNumber = document.querySelector('.step-number');
        const stepTitle = document.querySelector('.step-content h3');
        const stepText = document.querySelector('.step-content p');
        
        const steps = [
            { number: '01', title: 'Discovery', text: 'Understanding project goals' },
            { number: '02', title: 'Strategy', text: 'Creating strategies for success' },
            { number: '03', title: 'Creation', text: 'Implementing creative solutions' },
            { number: '04', title: 'Refinement', text: 'Refining details to perfection' }
        ];

        // Fade out
        [stepNumber, stepTitle, stepText].forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(10px)';
        });

        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        // Update content after fade out
        setTimeout(() => {
            stepNumber.textContent = steps[index].number;
            stepTitle.textContent = steps[index].title;
            stepText.textContent = steps[index].text;

            // Fade in
            [stepNumber, stepTitle, stepText].forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
        }, 300);
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateContent(currentIndex);
        });
    });

    // Auto advance
    setInterval(() => {
        currentIndex = (currentIndex + 1) % 4;
        updateContent(currentIndex);
    }, 5000);

    // Event listeners for navigation
    prevBtn?.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + steps.length) % steps.length;
        updateContent(currentIndex);
    });

    nextBtn?.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % steps.length;
        updateContent(currentIndex);
    });

    // Pause auto-advance on hover
    timeline.addEventListener('mouseenter', () => {
        clearInterval(autoAdvance);
    });

    timeline.addEventListener('mouseleave', () => {
        autoAdvance = setInterval(nextSlide, 5000);
    });

}); 
