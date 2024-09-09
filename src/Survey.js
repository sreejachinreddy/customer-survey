import React, { useState, useEffect } from 'react';
import { questions } from './questions';
import './App.css'; // Import the CSS file

const Survey = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const savedAnswers = JSON.parse(localStorage.getItem('surveySession')) || {};
    setAnswers(savedAnswers);
  }, []);

  useEffect(() => {
    localStorage.setItem('surveySession', JSON.stringify(answers));
  }, [answers]);

  const handleAnswerChange = (id, value) => {
    setAnswers(prevAnswers => ({ ...prevAnswers, [id]: value }));
  };

  const handleNext = () => {
    setCurrentQuestionIndex(prevIndex => Math.min(prevIndex + 1, questions.length - 1));
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const handleSkip = () => {
    handleNext();
  };

  const handleSubmit = () => {
    if (window.confirm('Are you sure you want to submit the survey?')) {
      localStorage.setItem('surveySession', JSON.stringify({ ...answers, status: 'COMPLETED' }));
      alert('Thank you for your time!');
      setTimeout(() => window.location.reload(), 5000); // Restart the survey
    }
  };

  const question = questions[currentQuestionIndex];

  return (
    <div className="survey-container">
      <h1>Survey</h1>
      <p>{currentQuestionIndex + 1} / {questions.length}</p>
      <div>
        <h2>{question.text}</h2>
        {question.type === 'rating' && (
          <div>
            {[...Array(question.scale)].map((_, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name={question.id}
                  value={index + 1}
                  checked={answers[question.id] === (index + 1)}
                  onChange={(e) => handleAnswerChange(question.id, parseInt(e.target.value))}
                />
                {index + 1}
              </label>
            ))}
          </div>
        )}
        {question.type === 'text' && (
          <textarea
            value={answers[question.id] || ''}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
          />
        )}
      </div>
      <div>
        {currentQuestionIndex > 0 && (
          <button className="previous-button" onClick={handlePrevious}>Previous</button>
        )}
        <button className="skip-button" onClick={handleSkip}>Skip</button>
        {currentQuestionIndex < questions.length - 1 && (
          <button className="next-button" onClick={handleNext}>Next</button>
        )}
        {currentQuestionIndex === questions.length - 1 && (
          <button className="submit-button" onClick={handleSubmit}>Submit</button>
        )}
      </div>
    </div>
  );
};

export default Survey;
