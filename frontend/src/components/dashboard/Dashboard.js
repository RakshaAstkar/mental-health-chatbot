import React from 'react';
import ChatAnalysis from '../ChatAnalysis';

const Dashboard = ({ bdiScore }) => {
  // Function to handle button clicks
  const handleButtonClick = (message) => {
    alert(message); // Display "Coming Soon" message in an alert
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>User Mood & Chat Analytics</h2>

      {/* User Info Section */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>User Info</h3>
        <p style={styles.text}>Name: Harry Potter</p>
        <p style={styles.text}>Mood: 😊 Happy</p>
      </div>

      {/* BDI Test Score Section */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>BDI Test Score</h3>
        <p style={styles.text}>
          {bdiScore !== null ? `Your BDI Test Score: ${bdiScore}` : 'No score available.'}
        </p>
      </div>

      {/* Mood Tracker Section */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Mood Tracker</h3>
        <p style={styles.text}>Track your mood over time to identify patterns.</p>
        <button
          style={styles.button}
          onClick={() => handleButtonClick('Mood Tracker: Coming Soon!')}
        >
          Track Mood
        </button>
      </div>

      {/* Analytics Section */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Chat Analytics</h3>
        <p style={styles.text}>Analyze your chat history for insights.</p>
        {/* Integrate ChatAnalysis component */}
        <ChatAnalysis />
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: '"Segoe UI", sans-serif',
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: 'auto',
    textAlign: 'center',
    height: '100%', // Ensure it takes the full height of the parent container
    overflowY: 'auto', // Add vertical scroll bar
  },
  title: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '20px',
  },
  section: {
    marginBottom: '20px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  sectionTitle: {
    fontSize: '18px',
    color: '#555',
    marginBottom: '10px',
  },
  text: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Dashboard;
