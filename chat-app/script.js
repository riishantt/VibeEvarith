// Chat App using BroadcastChannel for cross-tab communication

class ChatApp {
    constructor() {
        this.currentChannel = null;
        this.channels = JSON.parse(localStorage.getItem('channels')) || {};
        this.username = this.getUsername();
        this.broadcastChannel = new BroadcastChannel('chat-app');
        this.typingTimeout = null;
        this.isTyping = false;

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderChannels();
        this.setupBroadcastChannel();
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

    setupBroadcastChannel() {
        this.broadcastChannel.onmessage = (event) => {
            const data = event.data;
            switch (data.type) {
                case 'message':
                    if (data.channel === this.currentChannel) {
                        this.displayMessage(data);
                    }
                    break;
                case 'channel-created':
                    this.channels[data.channel] = [];
                    this.saveChannels();
                    this.renderChannels();
                    break;
                case 'typing':
                    if (data.channel === this.currentChannel && data.username !== this.username) {
                        this.showTypingIndicator(data.username);
                    }
                    break;
                case 'stop-typing':
                    if (data.channel === this.currentChannel) {
                        this.hideTypingIndicator();
                    }
                    break;
            }
        };
    }

    createChannel() {
        const channelName = prompt('Enter channel name:');
        if (channelName && !this.channels[channelName]) {
            this.channels[channelName] = [];
            this.saveChannels();
            this.renderChannels();
            this.broadcastChannel.postMessage({ type: 'channel-created', channel: channelName });
        }
    }

    joinChannel(channelName) {
        this.currentChannel = channelName;
        this.renderChannels();
        this.renderMessages();
    }

    sendMessage() {
        const input = document.getElementById('message-input');
        const message = input.value.trim();
        if (message && this.currentChannel) {
            const messageData = {
                type: 'message',
                channel: this.currentChannel,
                username: this.username,
                text: message,
                timestamp: new Date().toLocaleTimeString()
            };
            this.channels[this.currentChannel].push(messageData);
            this.saveChannels();
            this.displayMessage(messageData);
            this.broadcastChannel.postMessage(messageData);
            input.value = '';
            this.stopTyping();
        }
    }

    handleTyping() {
        if (!this.isTyping && this.currentChannel) {
            this.isTyping = true;
            this.broadcastChannel.postMessage({
                type: 'typing',
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
            this.broadcastChannel.postMessage({
                type: 'stop-typing',
                channel: this.currentChannel,
                username: this.username
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

    renderChannels() {
        const channelsList = document.getElementById('channels-list');
        channelsList.innerHTML = '';
        Object.keys(this.channels).forEach(channel => {
            const channelDiv = document.createElement('div');
            channelDiv.className = `channel ${channel === this.currentChannel ? 'active' : ''}`;
            channelDiv.textContent = `#${channel}`;
            channelDiv.addEventListener('click', () => this.joinChannel(channel));
            channelsList.appendChild(channelDiv);
        });
    }

    renderMessages() {
        const messagesDiv = document.getElementById('chat-messages');
        messagesDiv.innerHTML = '';
        if (this.currentChannel && this.channels[this.currentChannel]) {
            this.channels[this.currentChannel].forEach(msg => this.displayMessage(msg));
        }
    }

    saveChannels() {
        localStorage.setItem('channels', JSON.stringify(this.channels));
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ChatApp();
});