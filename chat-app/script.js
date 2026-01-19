// Chat App using Socket.io for real-time communication

class ChatApp {
    constructor() {
        this.currentChannel = null;
        this.username = this.getUsername();
        this.socket = io();
        this.typingTimeout = null;
        this.isTyping = false;

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupSocketListeners();
    }

    getUsername() {
        let username = localStorage.getItem('username');
        if (!username) {
            username = prompt('Enter your username:') || 'Anonymous';
            localStorage.setItem('username', username);
        }
        return username;
    }

    setupEventListeners() {
        document.getElementById('create-channel-btn').addEventListener('click', () => this.createChannel());
        document.getElementById('send-btn').addEventListener('click', () => this.sendMessage());
        document.getElementById('message-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        document.getElementById('message-input').addEventListener('input', () => this.handleTyping());
    }

    setupSocketListeners() {
        this.socket.on('channels', (existingChannels) => {
            existingChannels.forEach(channel => {
                this.addChannelToUI(channel);
            });
        });

        this.socket.on('channelCreated', (channelName) => {
            this.addChannelToUI(channelName);
        });

        this.socket.on('channelHistory', (messages) => {
            messages.forEach(msg => this.displayMessage(msg));
        });

        this.socket.on('message', (message) => {
            this.displayMessage(message);
        });

        this.socket.on('typing', (data) => {
            this.showTypingIndicator(data.username);
        });

        this.socket.on('stopTyping', () => {
            this.hideTypingIndicator();
        });

        this.socket.on('userJoined', (data) => {
            this.displayMessage({
                username: 'System',
                text: `${data.username} joined ${data.channel}`,
                timestamp: new Date().toLocaleTimeString()
            });
        });

        this.socket.on('userLeft', (data) => {
            this.displayMessage({
                username: 'System',
                text: `${data.username} left the channel`,
                timestamp: new Date().toLocaleTimeString()
            });
        });
    }

    createChannel() {
        const channelName = prompt('Enter channel name:');
        if (channelName) {
            this.socket.emit('createChannel', channelName);
        }
    }

    joinChannel(channelName) {
        this.currentChannel = channelName;
        this.updateChannelHighlight();
        this.clearMessages();
        this.socket.emit('join', { username: this.username, channel: channelName });
    }

    sendMessage() {
        const input = document.getElementById('message-input');
        const message = input.value.trim();
        if (message && this.currentChannel) {
            const messageData = {
                channel: this.currentChannel,
                username: this.username,
                text: message,
                timestamp: new Date().toLocaleTimeString()
            };
            this.socket.emit('message', messageData);
            input.value = '';
            this.stopTyping();
        }
    }

    handleTyping() {
        if (!this.isTyping && this.currentChannel) {
            this.isTyping = true;
            this.socket.emit('typing', {
                channel: this.currentChannel,
                username: this.username
            });
        }
        clearTimeout(this.typingTimeout);
        this.typingTimeout = setTimeout(() => this.stopTyping(), 1000);
    }

    stopTyping() {
        if (this.isTyping && this.currentChannel) {
            this.isTyping = false;
            this.socket.emit('stopTyping', {
                channel: this.currentChannel
            });
        }
    }

    showTypingIndicator(username) {
        const indicator = document.getElementById('typing-indicator');
        indicator.textContent = `${username} is typing...`;
        indicator.style.display = 'block';
    }

    hideTypingIndicator() {
        document.getElementById('typing-indicator').style.display = 'none';
    }

    displayMessage(messageData) {
        const messagesDiv = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';
        messageDiv.innerHTML = `
            <strong>${messageData.username}</strong> [${messageData.timestamp}]: ${messageData.text}
        `;
        messagesDiv.appendChild(messageDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    addChannelToUI(channelName) {
        const channelsList = document.getElementById('channels-list');
        // Check if channel already exists in UI
        if (document.querySelector(`[data-channel="${channelName}"]`)) return;

        const channelDiv = document.createElement('div');
        channelDiv.className = 'channel';
        channelDiv.textContent = `#${channelName}`;
        channelDiv.dataset.channel = channelName;
        channelDiv.addEventListener('click', () => this.joinChannel(channelName));
        channelsList.appendChild(channelDiv);
        this.updateChannelHighlight();
    }

    updateChannelHighlight() {
        document.querySelectorAll('.channel').forEach(el => {
            el.classList.toggle('active', el.dataset.channel === this.currentChannel);
        });
    }

    clearMessages() {
        document.getElementById('chat-messages').innerHTML = '';
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ChatApp();
});