import React, { useState } from "react";

function Quiz() {

    const testQuestions = [
        {
            questionText: "What is the largest city in North America?",
            answerChoices: [
                { answerText: "New York", isCorrect: false },
                { answerText: "Toronto", isCorrect: false },
                { answerText: "Los Angeles", isCorrect: false},
                { answerText: "Mexico City", isCorrect: true }
            ]
        }
    ]

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    
    const handleUserAnswer = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < testQuestions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    }

    return (
		<div className='quiz'>
			{showScore ? (
				<div className='score-section'>
					You scored {score} out of {testQuestions.length}!
				</div>
			) : (
				<>
					<div className='question-section'>
						<div className='q-count'>
							<span>Question {currentQuestion + 1}</span>/{testQuestions.length}
						</div>
						<div className='question-text'>{testQuestions[currentQuestion].questionText}</div>
					</div>
					<div className='answer-section'>
						{testQuestions[currentQuestion].answerChoices.map((answerOption) => (
							<button onClick={() => handleUserAnswer(answerOption.isCorrect)}>{answerOption.answerText}</button>
						))}
					</div>
				</>
			)}
		</div>
	);

}

export default Quiz;