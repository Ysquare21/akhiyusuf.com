// Contact form component
class ContactForm extends HTMLElement {
    constructor() {
        super();
        this.render();
        this.attachEventListeners();
    }

    render() {
        this.innerHTML = `
            <form class="contact-form" id="contactForm">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" required 
                           placeholder="Enter your name"
                           class="form-control">
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required 
                           placeholder="Enter your email"
                           class="form-control">
                </div>
                <div class="form-group">
                    <label for="subject">Subject</label>
                    <input type="text" id="subject" name="subject" required 
                           placeholder="Enter subject"
                           class="form-control">
                </div>
                <div class="form-group">
                    <label for="message">Message</label>
                    <textarea id="message" name="message" required 
                              placeholder="Enter your message"
                              class="form-control" rows="5"></textarea>
                </div>
                <button type="submit" class="submit-button">
                    <span class="button-text">Send Message</span>
                    <div class="button-loader hidden"></div>
                </button>
            </form>
        `;
    }

    attachEventListeners() {
        const form = this.querySelector('#contactForm');
        if (form) {
            form.addEventListener('submit', this.handleSubmit.bind(this));
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const button = form.querySelector('.submit-button');
        const buttonText = button.querySelector('.button-text');
        const buttonLoader = button.querySelector('.button-loader');

        // Disable button and show loader
        button.disabled = true;
        buttonText.classList.add('hidden');
        buttonLoader.classList.remove('hidden');

        try {
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Here you would typically send the data to your backend
            // For now, we'll simulate an API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Show success message
            this.showNotification('Message sent successfully!', 'success');
            form.reset();
        } catch (error) {
            // Show error message
            this.showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            // Re-enable button and hide loader
            button.disabled = false;
            buttonText.classList.remove('hidden');
            buttonLoader.classList.add('hidden');
        }
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Register the custom element
customElements.define('contact-form', ContactForm);
