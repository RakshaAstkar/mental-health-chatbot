// src/components/chat/MessageBubble.js
import React from 'react';

const MessageBubble = ({ sender, text }) => {
  const isUser = sender === 'user';
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        margin: '8px 0',
      }}
    >
      <div
        style={{
          background: isUser ? '#4CAF50' : '#e0e0e0',
          color: isUser ? '#fff' : '#000',
          padding: '10px 14px',
          borderRadius: '18px',
          maxWidth: '70%',
          fontSize: '15px',
          lineHeight: '1.4',
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default MessageBubble;
