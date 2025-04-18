// src/components/common/SpeechSynthesis.js
const speak = (text) => {
  const synth = window.speechSynthesis;
  if (!synth) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  synth.speak(utterance);
};

export default speak;
