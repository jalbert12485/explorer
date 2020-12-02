import React, { useEffect, useState, useContext } from "react";
import { loadCharacter } from "../utils/API";
import AuthContext from "../../context/auth/authContext";
import CharacterContext from "../../context/character/CharacterContext";




function Quiz({ questions }) {
  const characterContext = useContext(CharacterContext);
  const authContext = useContext(AuthContext);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  

  let userId;

  useEffect(() => {
    authContext.loadUser();

    if (authContext.user) {
      userId = authContext.user._id;
      characterContext.loadChar(userId);
    }
  }, [authContext.loading]);

  console.log(characterContext.data.credits);
  



 
  
  

  const handleUserAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  if (questions.length == 0) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  } else if (questions.length > 0) {
    return (
      <div className="quiz-section container">
        {showScore ? (
          <div className="score-section">
            You scored {score} out of {questions.length}!
          </div>
        ) : (
          <>
            <div className="question-section">
              <div className="q-count">
                <span>Question {currentQuestion + 1}</span>/{questions.length}
              </div>
              <div className="q-text">
                {questions[currentQuestion].questionText}
              </div>
              <img src={questions[currentQuestion].questionImg} />
            </div>
            <div className="ans-section">
              {questions[currentQuestion].answerChoices.map((answerOption) => (
                <button
                  onClick={() => handleUserAnswer(answerOption.isCorrect)}
                >
                  {answerOption.answerText}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }
}

export default Quiz;
