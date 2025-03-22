import React, { useState } from 'react';
import HtmlQuizIntro from './HtmlQuiz';
import CssQuizIntro from './CssQuiz';
import JavaScriptQuizIntro from './JavaScript';
import ReactQuizIntro from './React';
import Quiz from '../../Quiz';
import { fetchQuizQuestions } from '../../../api/config';

function Frontend({ onBack }) {
  const [selectedTech, setSelectedTech] = useState(null);
  const [showIntro, setShowIntro] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentTech, setCurrentTech] = useState('');

  const technologies = [
    { id: 'html', title: 'HTML', icon: '🌐', description: 'Test your knowledge of HTML tags and structure', color: 'bg-orange-500', hoverColor: 'hover:bg-orange-600'},
    { id: 'css', title: 'CSS', icon: '🎨', description: 'Challenge yourself with CSS styling questions', color: 'bg-blue-500', hoverColor: 'hover:bg-blue-600'},
    { id: 'javascript', title: 'JavaScript', icon: '⚡', description: 'Test your JavaScript programming skills', color: 'bg-yellow-500', hoverColor: 'hover:bg-yellow-600'},
    { id: 'react', title: 'React', icon: '⚛️', description: 'Prove your React component knowledge', color: 'bg-cyan-500', hoverColor: 'hover:bg-cyan-600'}
  ];

  const handleStartQuiz = (techId) => {
    setShowIntro(techId);
  };

  const startQuiz = async (subCategory, count) => {
    try {
      setIsLoading(true);
      setError(null);
      const questions = await fetchQuizQuestions("frontend", subCategory, count === "all" ? "0" : count);

      if (questions && questions.length > 0) {
        setQuizQuestions(questions);
        setShowQuiz(true);
        setCurrentTech(subCategory);
        setShowIntro(null);
      } else {
        throw new Error("No questions available for this selection");
      }
    } catch (err) {
      setError(err?.message || "Failed to load questions");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black bg-opacity-70">
        <div className="text-white text-xl mb-4">Loading questions...</div>
        <div className="w-16 h-16 border-t-4 border-orange-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black bg-opacity-70">
        <div className="bg-white p-8 rounded-xl shadow-xl max-w-md">
          <div className="text-red-500 text-xl mb-4">Error loading quiz questions</div>
          <p className="text-gray-700 mb-6">{error}</p>
          <button 
            onClick={() => { setError(null); setSelectedTech(null); }}
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors duration-300"
          >
            Back to Categories
          </button>
        </div>
      </div>
    );
  }

  if (showQuiz && quizQuestions.length > 0) {
    return (
      <Quiz 
        questions={quizQuestions}
        onComplete={() => { setShowQuiz(false); setSelectedTech(null); }}
        onBack={() => { setShowQuiz(false); setSelectedTech(null); }}
        languageName={currentTech}
      />
    );
  }

  if (showIntro === 'html') {
    return <HtmlQuizIntro onBack={() => setShowIntro(null)} onStartQuiz={startQuiz} />;
  }

  if (showIntro === 'css') {
    return <CssQuizIntro onBack={() => setShowIntro(null)} onStartQuiz={startQuiz} />;
  }

  if (showIntro === 'javascript') {
    return <JavaScriptQuizIntro onBack={() => setShowIntro(null)} onStartQuiz={startQuiz} />;
  }

  if (showIntro === 'react') {
    return <ReactQuizIntro onBack={() => setShowIntro(null)} onStartQuiz={startQuiz} />;
  }

  return (
    <>
      <header className="bg-black bg-opacity-80 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">DevQuiz</h1>
          {onBack && (
            <button 
              onClick={onBack}
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors duration-300"
            >
              Back to Categories
            </button>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-white mb-4">Frontend Technologies</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Select a technology to test your knowledge
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologies.map((tech) => (
            <div 
              key={tech.id}
              className={`rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 cursor-pointer hover:shadow-xl h-full ${selectedTech === tech.id ? 'ring-4 ring-offset-2 ring-orange-400' : ''}`}
              onClick={() => setSelectedTech(tech.id)}
            >
              <div className={`p-8 ${tech.color} ${tech.hoverColor} transition-colors duration-300 h-full flex flex-col`}>
                <div className="text-5xl mb-4">{tech.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{tech.title}</h3>
                <p className="text-white text-opacity-90 mb-4">{tech.description}</p>
                <div className="text-white text-opacity-80 mb-6 mt-auto">
                  
                </div>
                <button 
                  className="font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 bg-white text-black"
                  onClick={(e) => { e.stopPropagation(); handleStartQuiz(tech.id); }}
                >
                  Start Quiz
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-black bg-opacity-80 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-400">© 2025 DevQuiz. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default Frontend;