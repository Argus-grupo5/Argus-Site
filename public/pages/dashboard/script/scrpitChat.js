function toggleChat() {
    const chatContainer = document.getElementById('chat-container');
    const toggleButton = document.getElementById('toggle-button');
    
    chatContainer.classList.toggle('expanded');
    
    if (chatContainer.classList.contains('expanded')) {
        toggleButton.textContent = 'X';
    } else {
        toggleButton.textContent = '_';
    }
}