// src/components/chat/ChatScreen.js
import React, { useState } from 'react';
import Dashboard from '../dashboard/Dashboard';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import api from '../../services/api';
import useSpeechRecognition from '../common/SpeechRecognition';

const ChatScreen = ({ bdiScore }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const { listening, startListening, stopListening } = useSpeechRecognition({
    onResult: (text) => handleSend(text),
  });

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
      const errorMessage = {
        sender: 'bot',
        text: "I'm sorry, the service is currently unavailable. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Dashboard Section */}
      <div style={styles.dashboard}>
        <Dashboard bdiScore={bdiScore} />
      </div>

      {/* Chat Section */}
      <div style={styles.chat}>
        <div style={styles.messages}>
          {messages.map((msg, idx) => (
            <MessageBubble key={idx} sender={msg.sender} text={msg.text} />
          ))}
          {isTyping && <TypingIndicator />}
        </div>

        <div style={styles.inputArea}>
          <input
            style={styles.input}
            type="text"
            placeholder="How are you feeling today?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button style={styles.sendButton} onClick={() => handleSend()}>
            ➤
          </button>
          <button
            style={styles.micButton}
            onClick={listening ? stopListening : startListening}
          >
            {listening ? '🛑' : '🎤'}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    fontFamily: '"Segoe UI", sans-serif',
    backgroundColor: '#f9f9fb',
  },
  dashboard: {
    width: '25%',
    backgroundColor: '#ffffff',
    padding: '16px',
    boxShadow: '0 0 20px rgba(0,0,0,0.05)',
    borderRight: '1px solid #ddd',
  },
  chat: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
  },
  messages: {
    flex: 1,
    overflowY: 'auto',
    marginBottom: '12px',
    padding: '8px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
  },
  inputArea: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: '30px',
    padding: '10px 16px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
  },
  input: {
    flex: 1,
    border: 'none',
    fontSize: '16px',
    outline: 'none',
    padding: '6px 10px',
    backgroundColor: 'transparent',
  },
  sendButton: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    fontSize: '18px',
    padding: '6px 12px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
  },
  micButton: {
    backgroundColor: '#2196F3',
    color: '#fff',
    fontSize: '18px',
    padding: '6px 12px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
  },
};

export default ChatScreen;
