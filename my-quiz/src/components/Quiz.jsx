import React, { useState } from 'react';

function Quiz({ questions, onComplete, onBack, languageName }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(null));
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (answerText) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerText;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    return selectedAnswers.filter(
      (answer, index) => answer === questions[index].rightAnswer
    ).length;
  };

  const currentOptions = [
    questions[currentQuestion].option1,
    questions[currentQuestion].option2,
    questions[currentQuestion].option3,
    questions[currentQuestion].option4
  ];

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <div className="min-h-screen bg-cover bg-center bg-no-repeat">
        <div className="min-h-screen bg-black bg-opacity-70 flex flex-col">
          <header className="bg-black bg-opacity-80 shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
              <h1 className="text-3xl font-bold text-white">DevQuiz</h1>
            </div>
          </header>

          <main className="flex-grow flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden w-full max-w-2xl mx-4">
              <div className="bg-blue-600 px-6 py-4">
                <h2 className="text-2xl font-bold text-white">{languageName} Quiz Results</h2>
              </div>

              <div className="p-6 text-center">
                <div className="text-5xl font-bold mb-2">{percentage}%</div>
                <p className="text-xl">You scored {score} out of {questions.length} questions</p>

                <div className="mt-4">
                  {percentage >= 80 ? (
                    <p className="text-green-600">Excellent! You have a strong understanding of {languageName}!</p>
                  ) : percentage >= 60 ? (
                    <p className="text-blue-600">Good job! You know {languageName} quite well.</p>
                  ) : (
                    <p className="text-orange-500">Keep practicing! You're on your way to mastering {languageName}.</p>
                  )}
                </div>

                <div className="mt-6 flex justify-between">
                  <button onClick={onBack} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                    Back to Categories
                  </button>

                  <button 
                    onClick={() => {
                      setCurrentQuestion(0);
                      setShowResults(false);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Review Questions
                  </button>
                </div>
              </div>
            </div>
          </main>

          <footer className="bg-black bg-opacity-80 py-4 text-center text-gray-400">
            © 2025 DevQuiz. All rights reserved.
          </footer>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat">
      <div className="min-h-screen bg-black bg-opacity-70 flex flex-col">
        <header className="bg-black bg-opacity-80 shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">DevQuiz</h1>
            <button 
              onClick={onBack}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Quit Quiz
            </button>
          </div>
        </header>

        <main className="flex-grow flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden w-full max-w-2xl mx-4">
            <div className="bg-blue-600 px-6 py-4 flex justify-between items-center">
              <h2 className="text-lg font-bold text-white">{languageName} Quiz</h2>
              <span className="text-white text-sm">Question {currentQuestion + 1} of {questions.length}</span>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">{questions[currentQuestion].question}</h3>

              <div className="space-y-3 mb-8">
                {currentOptions.map((option, index) => (
                  <div 
                    key={index}
                    className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 
                      ${selectedAnswers[currentQuestion] === option 
                        ? 'bg-blue-100 border-blue-500' 
                        : 'hover:bg-gray-50 border-gray-300'}`}
                    onClick={() => handleAnswerSelect(option)}
                  >
                    <div className="flex items-center">
                      <div className={`h-5 w-5 rounded-full border flex items-center justify-center mr-3
                        ${selectedAnswers[currentQuestion] === option 
                          ? 'border-blue-500 bg-blue-500 text-white' 
                          : 'border-gray-400'}`}
                      >
                        {selectedAnswers[currentQuestion] === option && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <span>{option}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between">
                <button 
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className={`px-4 py-2 rounded-md ${currentQuestion === 0 ? 'bg-gray-100 text-gray-400' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                >
                  Previous
                </button>

                <button 
                  onClick={handleNext}
                  className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 
                    ${selectedAnswers[currentQuestion] === null ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={selectedAnswers[currentQuestion] === null}
                >
                  {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                </button>
              </div>
            </div>
          </div>
        </main>

        <footer className="bg-black bg-opacity-80 py-4 text-center text-gray-400">
          © 2025 DevQuiz. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

export default Quiz;
