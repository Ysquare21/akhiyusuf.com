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

}); 
