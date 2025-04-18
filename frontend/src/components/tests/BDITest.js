import React, { useState } from 'react';

const questions = [
  'I feel sad',
  'I feel discouraged about the future',
  'I feel like a failure',
  'I have lost pleasure in things I used to enjoy',
];

const BDITest = () => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(0));

  const handleChange = (index, value) => {
    const updated = [...answers];
    updated[index] = parseInt(value, 10);
    setAnswers(updated);
  };

  const handleSubmit = () => {
    const score = answers.reduce((a, b) => a + b, 0);
    alert(`Your BDI score is: ${score}`);
  };

  return (
    <div className="bdi-test">
      <h2>Beck Depression Inventory (BDI)</h2>
      {questions.map((q, i) => (
        <div key={i}>
          <p>{q}</p>
          <select onChange={(e) => handleChange(i, e.target.value)}>
            {[0, 1, 2, 3].map((val) => (
              <option key={val} value={val}>{val}</option>
            ))}
          </select>
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default BDITest;
