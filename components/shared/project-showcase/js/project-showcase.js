// Project showcase component
class ProjectShowcase extends HTMLElement {
    constructor() {
        super();
        this.projects = [
            {
                title: 'Project 1',
                description: 'Description of project 1',
                image: '/assets/images/project1.jpg',
                tags: ['Web Development', 'UI/UX'],
                link: '#'
            },
            {
                title: 'Project 2',
                description: 'Description of project 2',
                image: '/assets/images/project2.jpg',
                tags: ['Mobile App', 'React Native'],
                link: '#'
            },
            // Add more projects as needed
        ];
        this.render();
        this.attachEventListeners();
    }

    render() {
        this.innerHTML = `
            <section class="project-showcase">
                <div class="project-grid">
                    ${this.projects.map(project => this.createProjectCard(project)).join('')}
                </div>
                <div class="project-modal hidden">
                    <div class="modal-content">
                        <button class="modal-close">&times;</button>
                        <div class="modal-body"></div>
                    </div>
                </div>
            </section>
        `;
    }

    createProjectCard(project) {
        return `
            <article class="project-card" data-project='${JSON.stringify(project)}'>
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}" loading="lazy">
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </article>
        `;
    }

    attachEventListeners() {
        // Project card click handler
        this.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', () => {
                const project = JSON.parse(card.dataset.project);
                this.showProjectModal(project);
            });
        });

        // Modal close handler
        const modal = this.querySelector('.project-modal');
        const closeBtn = this.querySelector('.modal-close');
        
        if (closeBtn && modal) {
            closeBtn.addEventListener('click', () => {
                modal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            });

            // Close modal when clicking outside
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.add('hidden');
                    document.body.style.overflow = 'auto';
                }
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
                modal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });
    }

    showProjectModal(project) {
        const modal = this.querySelector('.project-modal');
        const modalBody = this.querySelector('.modal-body');
        
        if (modal && modalBody) {
            modalBody.innerHTML = `
                <div class="modal-image">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                <div class="modal-details">
                    <h2>${project.title}</h2>
                    <p>${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <a href="${project.link}" class="project-link" target="_blank">View Project</a>
                </div>
            `;
            
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    }
}

// Register the custom element
customElements.define('project-showcase', ProjectShowcase);
