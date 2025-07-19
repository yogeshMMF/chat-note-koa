const socket = io();

// Listen for chat events
socket.on('chat', (data) => {
  const li = document.createElement('li');
  console.log(`Received chat message: ${data.user}: ${data.message} , ${data.time}`); // Debug log
  li.textContent = `${data.user}: ${data.message}`;
  document.getElementById('chat').appendChild(li);
});

// Send message via API
function send() {
  const user = document.getElementById('user').value;
  const message = document.getElementById('msg').value;
  fetch('/api/chat/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user, message }),
  });
  document.getElementById('msg').value = '';
}
