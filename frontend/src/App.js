// App.js
import { Routes, Route, Navigate } from 'react-router-dom';
import  Auth  from './components/auth/Auth';  // Use named import here

import ChatScreen from './components/chat/ChatScreen';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Auth />} />
      <Route path="/chat" element={<ChatScreen />} />
      <Route path="*" element={<Navigate to="/login" />} />
      <Route path="/chat" element={
       localStorage.getItem("token") ? <ChatScreen /> : <Navigate to="/login" />
} />
    </Routes>
  );
}

export default App;
