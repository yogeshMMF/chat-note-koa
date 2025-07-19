exports.handleChat = (socket, data, io) => {
    // Broadcast message to all clients
    console.log('Handling chat message:', data);
    io.emit('chat', {
      user: data.user,
      message: data.message,
      time: new Date().toISOString(),
    });
    console.log(`[${data.user}] ${data.message}`);
  };
  