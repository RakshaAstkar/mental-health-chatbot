import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const sendMessageToAI = async (message) => {
  try {
    // Correct URL string interpolation in api.js
const response = await axios.post(`${API_BASE}/chat/send`, { message });
    return response.data.reply;
  } catch (err) {
    console.error('Error sending message to AI:', err);
    return 'Sorry, something went wrong.';
  }
};

const api = {
  sendMessageToAI,
};

export default api;