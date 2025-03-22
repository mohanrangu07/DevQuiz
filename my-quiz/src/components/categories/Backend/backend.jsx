import React, { useState } from 'react';
import { fetchQuizQuestions } from '../../../api/config.js';
import Quiz from '../../Quiz.jsx';
import NodeQuizIntro from './Node.jsx';
import SpringBootQuizIntro from './SpringBoot.jsx';
import DjangoFlaskQuizIntro from './DjangoFlask.jsx';
import RailsQuizIntro from './RubyOnRails.jsx';

function Backend({ onBack }) {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showIntro, setShowIntro] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentTopic, setCurrentTopic] = useState('');

  const topics = [
    { id: 'nodejs', title: 'Node.js', icon: '🟢', description: 'Test your knowledge of Node.js, Express, and server-side JavaScript', color: 'bg-green-600', hoverColor: 'hover:bg-green-700'},
    { id: 'springboot', title: 'Spring Boot', icon: '🍃', description: 'Challenge yourself with Spring Boot, Java backend development, and microservices', color: 'bg-green-500', hoverColor: 'hover:bg-green-600'},
    { id: 'dj_fl', title: 'Django/Flask', icon: '🐍', description: 'Test your Python web framework knowledge with Django and Flask questions', color: 'bg-teal-500', hoverColor: 'hover:bg-teal-600'},
    { id: 'rails', title: 'Ruby on Rails', icon: '💎', description: 'Explore your understanding of Ruby on Rails conventions and best practices', color: 'bg-red-600', hoverColor: 'hover:bg-red-700'}
  ];

  const handleStartQuiz = (topicId) => {
    console.log(`Starting quiz for backend topic: ${topicId}`);
    setShowIntro(topicId);
  };

  // Handler for starting the quiz after intro
  const startQuiz = async (subCategory, count) => {
    try {
      setIsLoading(true);
      setError(null);
  
      const category = "backend"; // fixed category
  
      const questions = await fetchQuizQuestions(category, subCategory, count === "all" ? "0" : count);
  
      if (questions && questions.length > 0) {
        setQuizQuestions(questions);
        setShowQuiz(true);
        setCurrentTopic(subCategory);
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
        <div className="w-16 h-16 border-t-4 border-green-500 border-solid rounded-full animate-spin"></div>
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
            onClick={() => { setError(null); setSelectedTopic(null); }}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300"
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
        onBack={() => { setShowQuiz(false); setSelectedTopic(null); }}
        onComplete={() => { setShowQuiz(false); setSelectedTopic(null); }}
        languageName={currentTopic}
      />
    );
  }

  // Show corresponding intro page based on selected topic
  if (showIntro) {
    console.log("Showing intro for:", showIntro);
    
    if (showIntro === 'nodejs') {
      return <NodeQuizIntro onBack={() => setShowIntro(null)} onStartQuiz={startQuiz} />;
    } 
    else if (showIntro === 'springboot') {
      return <SpringBootQuizIntro onBack={() => setShowIntro(null)} onStartQuiz={startQuiz} />;
    }
    else if (showIntro === 'dj_fl') {
      return <DjangoFlaskQuizIntro onBack={() => setShowIntro(null)} onStartQuiz={startQuiz} />;
    }
    else if (showIntro === 'rails') {
      return <RailsQuizIntro onBack={() => setShowIntro(null)} onStartQuiz={startQuiz} />;
    }
    else {
      // Fallback for any future topics
      return (
        <div className="min-h-screen bg-black bg-opacity-70 flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl shadow-xl max-w-md">
            <h2 className="text-2xl font-bold mb-4">
              {topics.find(t => t.id === showIntro)?.title || showIntro} Quiz
            </h2>
            <p className="mb-6">This quiz intro is under development.</p>
            <div className="flex gap-4">
              <button 
                onClick={() => setShowIntro(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-300"
              >
                Back
              </button>
              <button 
                onClick={() => startQuiz(showIntro, 10)}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300"
              >
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <>
      <header className="bg-black bg-opacity-80 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">DevQuiz</h1>
          <button 
            onClick={onBack}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300"
          >
            Back to Categories
          </button>
        </div>
      </header>
    
      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-white mb-4">Backend Development</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Select a backend technology to test your server-side development knowledge
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {topics.map((topic) => (
            <div 
              key={topic.id}
              className={`rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 cursor-pointer hover:shadow-xl h-full ${selectedTopic === topic.id ? 'ring-4 ring-offset-2 ring-green-400' : ''}`}
              onClick={() => setSelectedTopic(topic.id)}
            >
              <div className={`p-8 ${topic.color} ${topic.hoverColor} transition-colors duration-300 h-full flex flex-col`}>
                <div className="text-5xl mb-4">{topic.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{topic.title}</h3>
                <p className="text-white text-opacity-90 mb-4">{topic.description}</p>
                <div className="text-white text-opacity-80 mb-6 mt-auto">
                  
                </div>
                <button 
                  className={`font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 
                    ${topic.id === 'nodejs' && 'bg-green-200 text-green-800 hover:bg-green-300'}
                    ${topic.id === 'springboot' && 'bg-green-200 text-green-800 hover:bg-green-300'}
                    ${topic.id === 'dj_fl' && 'bg-teal-200 text-teal-800 hover:bg-teal-300'}
                    ${topic.id === 'rails' && 'bg-red-200 text-red-800 hover:bg-red-300'}
                    border-2 border-white border-opacity-30 backdrop-filter backdrop-blur-sm`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStartQuiz(topic.id);
                  }}
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

export default Backend;