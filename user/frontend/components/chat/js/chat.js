class ChatComponent extends HTMLElement {
    constructor() {
        super();
        this.projects = [];
        this.isOpen = false;
    }

    connectedCallback() {
        this.innerHTML = `
            <button class="chat-floating-button" aria-label="Open chat">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z" fill="currentColor"/>
                    <path d="M7 9H17M7 13H14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </button>
            <div class="chat-container">
                <div class="chat-header">
                    <h3>Project Chat</h3>
                    <div class="chat-controls">
                        <button class="chat-control-button close-button" aria-label="Close chat">
                            <svg width="16" height="16" viewBox="0 0 16 16">
                                <path d="M4 4L12 12M4 12L12 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="chat-messages"></div>
                <div class="chat-input-container">
                    <div class="chat-input-wrapper">
                        <textarea 
                            class="chat-input" 
                            placeholder="Type your message..."
                            rows="1"
                        ></textarea>
                        <button class="chat-send-button" aria-label="Send message">
                            <svg viewBox="0 0 24 24">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
        this.initializeElements();
        this.attachEventListeners();
        
        // Initially hide the chat container
        this.container.style.display = 'flex';
    }

    initializeElements() {
        this.floatingButton = this.querySelector('.chat-floating-button');
        this.container = this.querySelector('.chat-container');
        this.messagesContainer = this.querySelector('.chat-messages');
        this.input = this.querySelector('.chat-input');
        this.sendButton = this.querySelector('.chat-send-button');
        this.closeButton = this.querySelector('.close-button');
    }

    attachEventListeners() {
        // Floating button click
        this.floatingButton.addEventListener('click', () => {
            this.toggleChat();
        });

        // Send message on button click
        this.sendButton.addEventListener('click', () => this.sendMessage());

        // Send message on Enter (but new line on Shift+Enter)
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Auto-resize input
        this.input.addEventListener('input', () => {
            this.input.style.height = 'auto';
            this.input.style.height = this.input.scrollHeight + 'px';
        });

        // Close chat
        this.closeButton.addEventListener('click', () => {
            this.closeChat();
        });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.openChat();
        } else {
            this.closeChat();
        }
    }

    openChat() {
        this.isOpen = true;
        this.floatingButton.classList.add('active');
        // Delay adding the chat-open class to allow the button animation to start
        setTimeout(() => {
            this.container.classList.add('chat-open');
            this.input.focus();
        }, 150);
    }

    closeChat() {
        this.isOpen = false;
        this.container.classList.remove('chat-open');
        // Delay removing the active class to allow the chat to animate out
        setTimeout(() => {
            this.floatingButton.classList.remove('active');
        }, 150);
    }

    sendMessage() {
        const message = this.input.value.trim();
        if (!message) return;

        // Add user message
        this.addMessage(message, 'user');

        // Clear input
        this.input.value = '';
        this.input.style.height = 'auto';

        // Process message and get response
        this.processMessage(message);
    }

    addMessage(text, type = 'assistant') {
        const messageElement = document.createElement('div');
        messageElement.className = `chat-message ${type}`;
        messageElement.textContent = text;
        this.messagesContainer.appendChild(messageElement);
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    async processMessage(message) {
        setTimeout(() => {
            this.addMessage("I understand you're interested in a project. Would you like to discuss the details or get a quote?");
        }, 500);
    }

    addProject(project) {
        this.projects.push(project);
        this.addProjectPreview(project);
    }

    addProjectPreview(project) {
        const previewHTML = `
            <div class="chat-project-preview">
                <h4>${project.type}</h4>
                <div class="chat-project-details">
                    ${project.description || ''}
                </div>
                <div class="chat-project-price">
                    Estimated: $${project.price}
                </div>
            </div>
        `;
        
        this.addMessage(previewHTML);
    }

    loadFromCalculator(projectDetails) {
        this.openChat();
        
        const message = `I'd like to discuss a ${projectDetails.type} project with the following specifications:
        - Complexity: ${projectDetails.complexity}
        - Timeline: ${projectDetails.timeline}
        - Estimated Budget: $${projectDetails.price}`;
        
        this.addMessage(message, 'user');
        this.addProject(projectDetails);
        
        setTimeout(() => {
            this.addMessage("I'd be happy to discuss your project in detail. What specific features or requirements would you like to explore?");
        }, 500);
    }
}

customElements.define('chat-component', ChatComponent);
