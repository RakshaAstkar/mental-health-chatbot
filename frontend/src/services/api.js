import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000'; // Replace with your backend URL

const api = {
  sendMessage: async ({ message }) => {
    try {
      console.log("Sending message to backend:", message); // Debugging log
      const response = await axios.post(`${API_URL}/chat`, { message });
      console.log("Response from backend:", response.data); // Debugging log
      return response.data; // Ensure the backend returns { reply: "response text" }
    } catch (error) {
      console.error("Error in API call:", error); // Debugging log
      throw error;
    }
  },
};

const handleSend = async (textToSend = input) => {
  if (!textToSend.trim()) return;

  const newMessage = { sender: 'user', text: textToSend };
  setMessages((prev) => [...prev, newMessage]);
  setInput('');
  setIsTyping(true);

  try {
    console.log("Sending message to API:", textToSend); // Debugging log
    const response = await api.sendMessage({ message: textToSend });
    console.log("Response from API:", response); // Debugging log

    const botMessage = { sender: 'bot', text: response.reply };
    setMessages((prev) => [...prev, botMessage]);
  } catch (err) {
    console.error("Error in handleSend:", err); // Debugging log
    const errorMessage = { sender: 'bot', text: "An error occurred. Please try again later." };
    setMessages((prev) => [...prev, errorMessage]);
  } finally {
    setIsTyping(false);
  }
};

export default api;