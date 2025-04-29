import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatAnalysis = () => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchChatAnalysis = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/chat/analysis', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setAnalysis(response.data);
    } catch (error) {
      console.error('Error fetching chat analysis:', error); // Debugging log
    }
  };

  useEffect(() => {
    fetchChatAnalysis();
  }, []);

  if (loading) {
    return <p>Loading analysis...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!analysis || !analysis.sentiment || !analysis.frequent_words) {
    return <p>No analysis data available.</p>;
  }

  return (
    <div>
      <h2>Chat Analysis</h2>
      <h3>Sentiment Analysis</h3>
      <p>Average Sentiment: {analysis.sentiment.average_sentiment.toFixed(2)}</p>
      <h3>Frequent Words</h3>
      <ul>
        {analysis.frequent_words.map(([word, count], index) => (
          <li key={index}>
            {word}: {count} times
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatAnalysis;