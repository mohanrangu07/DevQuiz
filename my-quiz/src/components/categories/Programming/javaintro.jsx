import React, { useState } from 'react';

function JavaQuizIntro({ onBack, onStartQuiz }) {
  const [questionCount, setQuestionCount] = useState(10);

  const handleStartQuiz = () => {
    onStartQuiz("java", questionCount);

  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat">
      <div className="min-h-screen bg-black bg-opacity-70">
        <header className="bg-black bg-opacity-80 shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">DevQuiz</h1>
            <button 
              onClick={onBack}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              Back to Categories
            </button>
          </div>
        </header>
        
        <main className="max-w-2xl mx-auto px-4 py-8 flex items-center justify-center h-[70vh]">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden w-full max-h-full flex flex-col">
            {/* Header - Fixed at top */}
            <div className="bg-blue-600 px-6 py-4 flex-shrink-0">
              <h2 className="text-2xl font-bold text-white">Java Programming Quiz</h2>
            </div>
            
            {/* Scrollable content */}
            <div className="px-6 py-4 overflow-y-auto flex-grow" style={{ maxHeight: 'calc(70vh - 130px)' }}>
              <div className="flex items-center mb-4">
                <div className="text-4xl mr-3">💻</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">You've selected the Java quiz. Get ready to dive in!</h3>
                  <p className="text-gray-600 mt-1 text-sm">
                    Test your knowledge of Java programming concepts, syntax, and best practices.
                  </p>
                </div>
              </div>
              
              {/* Instructions */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Quiz Instructions</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
                  <li>Each question has four possible answers, but only one is correct.</li>
                  <li>Select the answer you believe is correct by clicking on it.</li>
                  <li>Your score will be calculated based on the number of correct answers.</li>
                  <li>You can review all questions before submitting your final answers.</li>
                  <li>The quiz covers various aspects of Java including syntax, OOP concepts, libraries, and more.</li>
                </ul>
              </div>
              
              {/* Rules */}
              <div className="mb-6 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Rules and Regulations</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
                  <li>Once you start the quiz, the timer will begin and cannot be paused.</li>
                  <li>You can change your answers any time before submitting the quiz.</li>
                  <li>Your final score will be displayed immediately after submission.</li>
                  <li>Challenge yourself and try to improve your score with each attempt!</li>
                </ul>
              </div>
              
              {/* Quiz Options */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-1 text-sm" htmlFor="question-count">
                  Number of Questions
                </label>
                <select 
                  id="question-count"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  value={questionCount}
                  onChange={(e) => setQuestionCount(e.target.value === "all" ? "all" : Number(e.target.value))}
                >
                  <option value={5}>5 Questions</option>
                  <option value={10}>10 Questions</option>
                  <option value={15}>15 Questions</option>
                  <option value={20}>20 Questions</option>
                  <option value="all">All Questions</option>
                </select>
              </div>
            </div>
            
            {/* Action Button - Fixed at bottom */}
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex-shrink-0">
              <div className="flex justify-center">
                <button 
                  onClick={handleStartQuiz}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-sm"
                >
                  Start Quiz Now
                </button>
              </div>
            </div>
          </div>
        </main>
        
        <footer className="bg-black bg-opacity-80 mt-12 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-400 text-sm">© 2025 DevQuiz. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default JavaQuizIntro;
