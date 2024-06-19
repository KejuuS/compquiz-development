import React from 'react';

const InfoBox = ({ onContinue, onExit }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="info_box bg-white p-6 rounded-lg shadow-lg">
      <div className="info-title text-xl font-semibold">Rules of this Quiz</div>
      <div className="info-list mt-4">
        <div className="info">1. You will have only <span className="font-semibold text-green-500">15 seconds</span> per each question.</div>
        <div className="info">2. Once you select your answer, it can't be undone.</div>
        <div className="info">3. You can't select any option once time goes off.</div>
        <div className="info">4. You can't exit from the Quiz while you're playing.</div>
        <div className="info">5. You'll get points on the basis of your correct answers.</div>
      </div>
      <div className="buttons mt-6 flex justify-end space-x-4">
        <button className="quit bg-red-500 text-white py-2 px-4 rounded-lg" onClick={onExit}>Exit Quiz</button>
        <button className="restart bg-green-500 text-white py-2 px-4 rounded-lg" onClick={onContinue}>Continue</button>
      </div>
    </div>
    </div>
  );
};

export default InfoBox;
