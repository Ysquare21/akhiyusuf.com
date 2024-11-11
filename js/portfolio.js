document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const loadMoreBtn = document.querySelector('.load-more');
    
    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Lazy loading simulation
    let currentItems = 8;
    const increment = 4;
    
    // Initially hide items beyond the first 8
    portfolioItems.forEach((item, index) => {
        if (index >= currentItems) {
            item.style.display = 'none';
        }
    });

    loadMoreBtn.addEventListener('click', () => {
        for (let i = currentItems; i < currentItems + increment; i++) {
            if (portfolioItems[i]) {
                portfolioItems[i].style.display = 'block';
            }
        }
        currentItems += increment;

        // Hide load more button if no more items
        if (currentItems >= portfolioItems.length) {
            loadMoreBtn.style.display = 'none';
        }
    });
}); 