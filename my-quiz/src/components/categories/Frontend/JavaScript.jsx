import React, { useState } from 'react';

function JavaScriptQuizIntro({ onBack, onStartQuiz }) {
  const [questionCount, setQuestionCount] = useState(10);

  const handleStartQuiz = () => {
    onStartQuiz("javascript", questionCount);
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat">
      <div className="min-h-screen bg-black bg-opacity-70">
        <header className="bg-black bg-opacity-80 shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">DevQuiz</h1>
            <button 
              onClick={onBack}
              className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors duration-300"
            >
              Back to Categories
            </button>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-8 flex items-center justify-center h-[70vh]">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden w-full max-h-full flex flex-col">
            <div className="bg-yellow-500 px-6 py-4 flex-shrink-0">
              <h2 className="text-2xl font-bold text-white">JavaScript Quiz</h2>
            </div>

            <div className="px-6 py-4 overflow-y-auto flex-grow" style={{ maxHeight: 'calc(70vh - 130px)' }}>
              <div className="flex items-center mb-4">
                <div className="text-4xl mr-3">⚡</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">You've selected the JavaScript quiz. Let's get started!</h3>
                  <p className="text-gray-600 mt-1 text-sm">
                    Test your knowledge of JavaScript fundamentals, ES6+, DOM manipulation, and async programming.
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Quiz Instructions</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
                  <li>Only one answer is correct per question.</li>
                  <li>You’ll see your score after completing the quiz.</li>
                  <li>You can revisit and change answers before submitting.</li>
                </ul>
              </div>

              <div className="mb-6 p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Rules</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
                  <li>The timer will begin once you start the quiz.</li>
                  <li>You're allowed to change answers before submission.</li>
                  <li>Topics include variables, functions, scope, closures, promises, and event handling.</li>
                </ul>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-1 text-sm" htmlFor="question-count">
                  Number of Questions
                </label>
                <select 
                  id="question-count"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
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

            <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex-shrink-0">
              <div className="flex justify-center">
                <button 
                  onClick={handleStartQuiz}
                  className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors duration-300 font-bold text-sm"
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

export default JavaScriptQuizIntro;
