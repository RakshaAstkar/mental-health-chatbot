import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/auth';

// Define styles object before the component
const styles = {
  container: {
    maxWidth: '400px',
    margin: '100px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },
  formGroup: {
    marginBottom: '15px',
    textAlign: 'left',
  },
  input: {
    width: '100%',
    padding: '8px',
    fontSize: '16px',
    marginTop: '5px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
};

const Auth = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const response = await loginUser(username, password);
      if (response.token) {
        localStorage.setItem('token', response.token);
        navigate('/chat');
      } else {
        setErrorMsg('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMsg('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login to Your Account</h2>
      <div style={styles.formGroup}>
        <label>Username</label>
        <input
          type="text"
          value={username}
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
      </div>
      <div style={styles.formGroup}>
        <label>Password</label>
        <input
          type="password"
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
      </div>
      {errorMsg && <p style={styles.error}>{errorMsg}</p>}
      <button 
        onClick={handleLogin} 
        style={styles.button} 
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </div>
  );
};

export default Auth;