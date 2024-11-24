// Footer component functionality
class Footer extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    render() {
        const currentYear = new Date().getFullYear();
        this.innerHTML = `
            <footer class="site-footer">
                <div class="footer-content">
                    <div class="footer-grid">
                        <div class="footer-section">
                            <h3>Contact</h3>
                            <ul>
                                <li><a href="mailto:contact@akhiyusuf.com">contact@akhiyusuf.com</a></li>
                                <li><a href="tel:+1234567890">+1 (234) 567-890</a></li>
                            </ul>
                        </div>
                        <div class="footer-section">
                            <h3>Social</h3>
                            <ul>
                                <li><a href="https://github.com/yourusername" target="_blank">GitHub</a></li>
                                <li><a href="https://linkedin.com/in/yourusername" target="_blank">LinkedIn</a></li>
                                <li><a href="https://twitter.com/yourusername" target="_blank">Twitter</a></li>
                            </ul>
                        </div>
                        <div class="footer-section">
                            <h3>Quick Links</h3>
                            <ul>
                                <li><a href="#work">Work</a></li>
                                <li><a href="#about">About</a></li>
                                <li><a href="#contact">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="footer-bottom">
                        <p>&copy; ${currentYear} Akhi Yusuf. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        `;
    }
}

// Register the custom element
customElements.define('site-footer', Footer);

// Initialize footer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add dynamic year to copyright
    const copyright = document.querySelector('.footer-bottom p');
    if (copyright) {
        copyright.innerHTML = copyright.innerHTML.replace('{year}', new Date().getFullYear());
    }
});
