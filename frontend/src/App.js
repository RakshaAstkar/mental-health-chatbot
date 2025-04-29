import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./components/auth/Auth";
import ChatScreen from "./components/chat/ChatScreen";
import BDITest from "./components/tests/BDITest";

function App() {
  const [isBDITestCompleted, setIsBDITestCompleted] = useState(false);
  const [bdiScore, setBdiScore] = useState(null); // State to store BDI Test score

  // Callback to handle BDI test completion
  const handleBDITestCompletion = (testScore) => {
    console.log("BDI Test Completed with Score:", testScore); // Debugging log
    setBdiScore(testScore); // Store the score
    setIsBDITestCompleted(true);
  };

  return (
    <Routes>
      <Route path="/login" element={<Auth />} />
      <Route
        path="/chat"
        element={
          localStorage.getItem("token") ? (
            !isBDITestCompleted ? (
              (console.log("Redirecting to BDI Test"), <Navigate to="/bdi-test" />)
            ) : (
              (console.log("Token found, navigating to ChatScreen"), <ChatScreen bdiScore={bdiScore} />)
            )
          ) : (
            (console.log("Token not found, redirecting to login"), <Navigate to="/login" />)
          )
        }
      />
      <Route
        path="/bdi-test"
        element={
          !isBDITestCompleted ? (
            (console.log("Rendering BDI Test"), <BDITest onComplete={handleBDITestCompletion} />)
          ) : (
            (console.log("BDI Test completed, redirecting to ChatScreen"), <Navigate to="/chat" />)
          )
        }
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
