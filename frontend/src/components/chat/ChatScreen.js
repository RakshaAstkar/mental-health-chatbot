// src/components/chat/ChatScreen.js
import React, { useState } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import  api  from '../../services/api';
import useSpeechRecognition from '../common/SpeechRecognition';
import speak from '../common/SpeechSynthesis';

const ChatScreen = () => {
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
      const response = await api.sendMessage({ message: textToSend });
      const botMessage = { sender: 'bot', text: response.reply };
      setMessages((prev) => [...prev, botMessage]);
      speak(response.reply);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chat-screen-container" style={styles.container}>
      <div className="messages" style={styles.messages}>
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} sender={msg.sender} text={msg.text} />
        ))}
        {isTyping && <TypingIndicator />}
      </div>

      <div className="input-area" style={styles.inputArea}>
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
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    height: '100vh',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f9f9fb',
    padding: '16px',
    borderRadius: '12px',
    boxShadow: '0 0 20px rgba(0,0,0,0.05)',
    fontFamily: '"Segoe UI", sans-serif',
  },
  messages: {
    flex: 1,
    overflowY: 'auto',
    marginBottom: '12px',
    padding: '8px',
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
