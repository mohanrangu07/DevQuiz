import React, { useState } from 'react';
import JavaQuizIntro from './javaintro.jsx';
import PythonQuizIntro from './pythonintro.jsx';
import CQuizIntro from './Cquizintro.jsx';
import CppQuizIntro from './Cppquizintro.jsx';
import { fetchQuizQuestions } from '../../../api/config.js';
import Quiz from '../../Quiz.jsx';

function Programming({ onBack, onSelectLanguage }) {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [showIntro, setShowIntro] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState('');

  const languages = [
    { id: 'python', title: 'Python', icon: '🐍', description: 'Test your Python knowledge', color: 'bg-blue-400', hoverColor: 'hover:bg-blue-500'},
    { id: 'java', title: 'Java', icon: '☕', description: 'Challenge yourself with Java concepts', color: 'bg-orange-400', hoverColor: 'hover:bg-orange-500'},
    { id: 'c', title: 'C', icon: '©️', description: 'Explore the foundations of C language', color: 'bg-gray-500', hoverColor: 'hover:bg-gray-600'},
    { id: 'cpp', title: 'C++', icon: '➕', description: 'Test your C++ skills', color: 'bg-blue-600', hoverColor: 'hover:bg-blue-700'}
  ];

  const handleStartQuiz = (languageId) => {
    console.log(`Starting quiz for language: ${languageId}`);
    setShowIntro(languageId);
  };
  

  // Handler for selecting a language and showing intro
  const startQuiz = async (subCategory, count) => {
    try {
      setIsLoading(true);
      setError(null);
  
      const category = "programming"; // ✅ fixed category
  
      const questions = await fetchQuizQuestions(category, subCategory, count === "all" ? "0" : count);
  
      if (questions && questions.length > 0) {
        setQuizQuestions(questions);
        setShowQuiz(true);
        setCurrentLanguage(subCategory);
        setShowIntro(null);
      } else {
        throw new Error("No questions available for this selection");
      }
    } catch (err) {
      setError(err.message || "Failed to load questions");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  
  
  
  

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black bg-opacity-70">
        <div className="text-white text-xl mb-4">Loading questions...</div>
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black bg-opacity-70">
        <div className="bg-white p-8 rounded-xl shadow-xl max-w-md">
          <div className="text-red-500 text-xl mb-4">Error loading quiz questions</div>
          <p className="text-gray-700 mb-6">{error}</p>
          <button 
            onClick={() => { setError(null); setSelectedLanguage(null); }}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Back to Categories
          </button>
        </div>
      </div>
    );
  }

  // Show quiz if questions are loaded
  if (showQuiz && quizQuestions.length > 0) {
    return (
      <Quiz 
        questions={quizQuestions}
        onComplete={() => { setShowQuiz(false); setSelectedLanguage(null); }}
        onBack={() => { setShowQuiz(false); setSelectedLanguage(null); }}
        languageName={currentLanguage}
      />
    );
  }

  // Show corresponding intro page based on selected language
  if (showIntro) {
    const introComponents = {
      java: <JavaQuizIntro onBack={() => setShowIntro(null)} onStartQuiz={startQuiz} />,
      python: <PythonQuizIntro onBack={() => setShowIntro(null)} onStartQuiz={startQuiz} />,
      c: <CQuizIntro onBack={() => setShowIntro(null)} onStartQuiz={startQuiz} />,
      cpp: <CppQuizIntro onBack={() => setShowIntro(null)} onStartQuiz={startQuiz} />
    };
    return introComponents[showIntro] || null;
  }

  // Default screen: Language selection
  return (
    <>
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
    
      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-white mb-4">Programming Languages</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Select a programming language to test your knowledge
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {languages.map((language) => (
            <div 
              key={language.id}
              className={`rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 cursor-pointer hover:shadow-xl h-full ${selectedLanguage === language.id ? 'ring-4 ring-offset-2 ring-blue-400' : ''}`}
              onClick={() => setSelectedLanguage(language.id)}
            >
              <div className={`p-8 ${language.color} ${language.hoverColor} transition-colors duration-300 h-full flex flex-col`}>
                <div className="text-5xl mb-4">{language.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{language.title}</h3>
                <p className="text-white text-opacity-90 mb-4">{language.description}</p>
                <div className="text-white text-opacity-80 mb-6 mt-auto">
                  
                </div>
                <button 
                  className="font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 bg-white text-black"
                  onClick={(e) => { e.stopPropagation(); handleStartQuiz(language.id); }}
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

export default Programming;
