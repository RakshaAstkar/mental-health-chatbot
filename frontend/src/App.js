import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./components/auth/Auth";
import ChatScreen from "./components/chat/ChatScreen";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Auth />} />
      <Route
        path="/chat"
        element={
          localStorage.getItem("token")
            ? (console.log("Token found, navigating to ChatScreen"), <ChatScreen />)
            : (console.log("Token not found, redirecting to login"), <Navigate to="/login" />)
        }
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
