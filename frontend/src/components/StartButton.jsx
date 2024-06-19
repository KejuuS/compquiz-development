import React from 'react';

const StartButton = ({ onStart }) => {
  return (
  <div className="bg-[url(/src/assets/bg.jpg')]"> {/* path buat background */}
  <div className="flex justify-center items-center h-screen">
    <div className="max-w-md mx-auto">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-4 py-6">
          <h2 className="text-4xl font-medium text-center text-green-500 mb-4">Welcome to CompQuiz</h2>
          <p className="text-gray-600 text-center mb-6 text-3xl">Are you ready to test your knowledge?</p>
          <button 
            className="block w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition duration-300 text-2xl"
            onClick={onStart}
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
    </div>
    </div>
    
  );
};

export default StartButton;
