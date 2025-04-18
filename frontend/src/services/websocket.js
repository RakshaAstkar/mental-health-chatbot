let socket;

export const connectWebSocket = (onMessage) => {
  socket = new WebSocket('ws://localhost:8000/ws/chat');

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };

  socket.onclose = () => {
    console.log('WebSocket connection closed');
  };

  return socket;
};

export const sendWebSocketMessage = (message) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({ message }));
  }
};
