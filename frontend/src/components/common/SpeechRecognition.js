// src/components/common/SpeechRecognition.js
import { useState } from 'react';

const useSpeechRecognition = ({ onResult }) => {
  const [listening, setListening] = useState(false);
  const recognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!recognition) {
    console.error('Speech recognition not supported');
    return { listening: false, startListening: () => {}, stopListening: () => {} };
  }

  const recognizer = new recognition();
  recognizer.continuous = false;
  recognizer.lang = 'en-US';

  recognizer.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    onResult(transcript);
    stopListening();
  };

  recognizer.onerror = (e) => {
    console.error('Speech recognition error:', e);
    stopListening();
  };

  const startListening = () => {
    setListening(true);
    recognizer.start();
  };

  const stopListening = () => {
    setListening(false);
    recognizer.stop();
  };

  return { listening, startListening, stopListening };
};

export default useSpeechRecognition;
