import React, { useState } from "react";

const BDITest = ({ onComplete = () => {} }) => {
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(null);

  const questions = [
    "I do not feel sad.",
    "I feel sad much of the time.",
    "I am sad all the time.",
    "I am so sad or unhappy that I can't stand it.",
    "I am not particularly discouraged about the future.",
    "I feel discouraged about the future.",
    "I feel I have nothing to look forward to.",
    "I feel the future is hopeless and that things cannot improve.",
    "I do not feel like a failure.",
    "I feel I have failed more than the average person.",
    "As I look back on my life, all I can see is a lot of failures.",
    "I feel I am a complete failure as a person.",
    "I get as much satisfaction out of things as I used to.",
    "I don't enjoy things the way I used to.",
    "I don't get real satisfaction out of anything anymore.",
    "I am dissatisfied or bored with everything.",
    "I don't feel particularly guilty.",
    "I feel guilty a good part of the time.",
    "I feel quite guilty most of the time.",
    "I feel guilty all of the time.",
    "I don't feel I am being punished.",
    "I feel I may be punished.",
    "I expect to be punished.",
    "I feel I am being punished.",
    "I don't feel disappointed in myself.",
    "I am disappointed in myself.",
    "I am disgusted with myself.",
    "I hate myself.",
    "I don't feel I am any worse than anybody else.",
    "I am critical of myself for my weaknesses or mistakes.",
    "I blame myself all the time for my faults.",
    "I blame myself for everything bad that happens.",
    "I don't have any thoughts of killing myself.",
    "I have thoughts of killing myself, but I would not carry them out.",
    "I would like to kill myself.",
    "I would kill myself if I had the chance.",
    "I don't cry any more than usual.",
    "I cry more now than I used to.",
    "I cry all the time now.",
    "I used to be able to cry, but now I can't cry even though I want to.",
    "I am no more irritated by things than I ever was.",
    "I am slightly more irritated now than usual.",
    "I am quite annoyed or irritated a good deal of the time.",
    "I feel irritated all the time.",
    "I have not lost interest in other people.",
    "I am less interested in other people than I used to be.",
    "I have lost most of my interest in other people.",
    "I have lost all of my interest in other people.",
    "I make decisions about as well as I ever could.",
    "I put off making decisions more than I used to.",
    "I have greater difficulty in making decisions than before.",
    "I can't make decisions at all anymore.",
    "I don't feel that I look any worse than I used to.",
    "I am worried that I am looking old or unattractive.",
    "I feel there are permanent changes in my appearance that make me look unattractive.",
    "I believe that I look ugly.",
    "I can work about as well as before.",
    "It takes an extra effort to get started at doing something.",
    "I have to push myself very hard to do anything.",
    "I can't do any work at all.",
    "I can sleep as well as usual.",
    "I don't sleep as well as I used to.",
    "I wake up 1-2 hours earlier than usual and find it hard to get back to sleep.",
    "I wake up several hours earlier than I used to and cannot get back to sleep.",
    "I don't get more tired than usual.",
    "I get tired more easily than I used to.",
    "I get tired from doing almost anything.",
    "I am too tired to do anything.",
    "My appetite is no worse than usual.",
    "My appetite is not as good as it used to be.",
    "My appetite is much worse now.",
    "I have no appetite at all anymore.",
    "I haven't lost much weight, if any, lately.",
    "I have lost more than five pounds.",
    "I have lost more than ten pounds.",
    "I have lost more than fifteen pounds.",
    "I am no more worried about my health than usual.",
    "I am worried about physical problems like aches, pains, upset stomach, or constipation.",
    "I am very worried about physical problems and it's hard to think of much else.",
    "I am so worried about my physical problems that I cannot think of anything else.",
    "I have not noticed any recent change in my interest in sex.",
    "I am less interested in sex than I used to be.",
    "I am much less interested in sex now.",
    "I have lost interest in sex completely.",
  ];

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
    console.log("Current Question:", currentQuestion, "Answer:", answer); // Debugging log
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const totalScore = Object.values({ ...answers, [currentQuestion]: answer }).reduce(
        (sum, value) => sum + value,
        0
      );
      console.log("Total Score Calculated:", totalScore); // Debugging log
      setScore(totalScore);
      onComplete(totalScore); // Notify parent component with the score
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const containerStyle = {
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    margin: "180px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
    backgroundColor: "#f9f9f9",
  };

  const questionStyle = {
    fontSize: "18px",
    margin: "20px 0",
    color: "#333",
  };

  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "white",
    cursor: "pointer",
    margin: "5px",
  };

  const buttonHoverStyle = {
    backgroundColor: "#0056b3",
  };

  if (score !== null) {
    console.log("Score State:", score); // Debugging log
    return (
      <div style={containerStyle}>
        <h2>BDI Test Completed</h2>
        <p>Your total score is: <strong>{score}</strong></p>
        <p>
          {score <= 10 && "These ups and downs are considered normal."}
          {score > 10 && score <= 16 && "Mild mood disturbance."}
          {score > 16 && score <= 20 && "Borderline clinical depression."}
          {score > 20 && score <= 30 && "Moderate depression."}
          {score > 30 && score <= 40 && "Severe depression."}
          {score > 40 && "Extreme depression."}
        </p>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h2>Beck Depression Inventory (BDI) Test</h2>
      <p style={questionStyle}>{questions[currentQuestion]}</p>
      <div>
        <button
          style={buttonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
          onClick={() => handleAnswer(0)}
        >
          Not at all
        </button>
        <button
          style={buttonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
          onClick={() => handleAnswer(1)}
        >
          Somewhat
        </button>
        <button
          style={buttonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
          onClick={() => handleAnswer(2)}
        >
          Moderately
        </button>
        <button
          style={buttonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
          onClick={() => handleAnswer(3)}
        >
          Severely
        </button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <button
          style={buttonStyle}
          onClick={goToPreviousQuestion}
          disabled={currentQuestion === 0}
        >
          Previous Question
        </button>
        <button
          style={buttonStyle}
          onClick={() => setCurrentQuestion(currentQuestion + 1)}
          disabled={currentQuestion === questions.length - 1}
        >
          Next Question
        </button>
      </div>
    </div>
  );
};

export default BDITest;
