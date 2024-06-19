import React from 'react';

const ResultBox = ({ score, totalQuestions, onRestart, onQuit }) => {
  return (
      <div className="flex justify-center items-center bg-primary min-h-screen">
    <div className="result_box bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
      <div className="icon text-green-400 text-6xl mb-4">
        <i className="fas fa-crown"></i>
      </div>
      <div className="complete_text text-xl font-medium mb-4">You've completed the Quiz!</div>
      <div className="score_text text-lg font-medium mb-4">
        {score > (totalQuestions / 2) ? (
          <span>and congrats! 🎉, You got <p className="inline font-bold">{score}</p> out of <p className="inline font-bold">{totalQuestions}</p></span>
        ) : score > 1 ? (
          <span>and nice 😎, You got <p className="inline font-bold">{score}</p> out of <p className="inline font-bold">{totalQuestions}</p></span>
        ) : (
          <span>and sorry 😐, You got only <p className="inline font-bold">{score}</p> out of <p className="inline font-bold">{totalQuestions}</p></span>
        )}
      </div>
      <div className="buttons flex space-x-4 mt-4">
        <button className="restart bg-green-500 text-white py-2 px-4 rounded-lg" onClick={onRestart}>Replay Quiz</button>
        <button className="quit bg-red-500 text-white py-2 px-4 rounded-lg" onClick={onQuit}>Quit Quiz</button>
      </div>
    </div>
    </div>
  );
};

export default ResultBox;