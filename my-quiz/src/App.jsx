import React, { useState } from 'react';
import natureBackground from './assets/nature.jpg';
import ProgrammingLanguage from './components/categories/Programming/Programming.jsx';
import Frontend from './components/categories/Frontend/frontend.jsx';
import Backend from './components/categories/Backend/backend.jsx'; // ✅ still in Programming

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const categories = [
    { id: 'programming', title: 'Programming Languages', icon: '💻', description: 'Test your knowledge of various programming languages', color: 'bg-blue-500', hoverColor: 'hover:bg-blue-600' },
    { id: 'frontend', title: 'Front End', icon: '🎨', description: 'Challenge yourself with front-end development concepts', color: 'bg-pink-500', hoverColor: 'hover:bg-pink-600' },
    { id: 'backend', title: 'Back End', icon: '⚙️', description: 'Explore your understanding of back-end technologies', color: 'bg-green-500', hoverColor: 'hover:bg-green-600' }
  ];

  // Handle returning to main categories
  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSelectedTopic(null);
  };

  // Handle selecting a category or topic
  const handleSelectTopic = (topicId) => {
    setSelectedTopic(topicId);
  };

  // Render content based on selected category
  const renderContent = () => {
    if (selectedCategory === 'programming') return <ProgrammingLanguage onBack={handleBackToCategories} onSelectLanguage={handleSelectTopic} />;
    if (selectedCategory === 'frontend') return <Frontend onBack={handleBackToCategories} onSelectTopic={handleSelectTopic} />;
    if (selectedCategory === 'backend') return <Backend onBack={handleBackToCategories} onSelectTopic={handleSelectTopic} />;

    // Main category selection screen
    return (
      <>
        <header className="bg-black bg-opacity-80 shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-white">DevQuiz</h1>
          </div>
        </header>
      
        <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-white mb-4">Choose a Category</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">Select one of our quiz categories to test your development knowledge</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <div 
                key={category.id}
                className={`rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 cursor-pointer hover:shadow-xl h-full ${selectedCategory === category.id ? 'ring-4 ring-offset-2 ring-blue-400' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className={`p-8 ${category.color} ${category.hoverColor} transition-colors duration-300 h-full flex flex-col`}>
                  <div className="text-5xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{category.title}</h3>
                  <p className="text-white text-opacity-90 mb-6">{category.description}</p>
                  <button 
                    className={`mt-auto font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 
                      ${category.id === 'programming' && 'bg-blue-200 text-blue-800 hover:bg-blue-300'}
                      ${category.id === 'frontend' && 'bg-pink-200 text-pink-800 hover:bg-pink-300'}
                      ${category.id === 'backend' && 'bg-green-200 text-green-800 hover:bg-green-300'}
                      border-2 border-white border-opacity-30 backdrop-filter backdrop-blur-sm`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCategory(category.id);
                    }}
                  >
                    Start
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
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${natureBackground})`, backgroundSize: 'cover' }}>
      <div className="min-h-screen bg-black bg-opacity-70">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
