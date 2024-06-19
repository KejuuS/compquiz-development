import React, { useState, useEffect } from 'react';
import './App.css';
import LoginPage from './components/LoginPage';
import Signup from './components/Signup';
import StartButton from './components/StartButton';
import InfoBox from './components/InfoBox';
import QuizBox from './components/QuizBox';
import ResultBox from './components/ResultBox';
import { useQuestions } from './data/question';

const App = () => {
  const { questions, loading, error, reloadQuestions } = useQuestions();
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showInfoBox, setShowInfoBox] = useState(false);
  const [showResultBox, setShowResultBox] = useState(false);
  const [score, setScore] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('login');
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Check if user is logged in on initial load
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      setCurrentPage('start');
    }
  }, []);

  const handleSignupClick = () => {
    setCurrentPage('signup');
  };

  const handleLoginClick = () => {
    setCurrentPage('login');
  };

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setCurrentPage('start');
    setUsername(username);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('login');
    setUsername('');
    localStorage.removeItem('token');
  };

  const handleStartQuiz = async () => {
    if (questions.length === 0) {
      await reloadQuestions();
    }
    setCurrentQuestion(0);
    setScore(0);
    setShowInfoBox(true);
    setQuizStarted(true);
  };

  const handleContinue = () => {
    setShowInfoBox(false);
  };

  const handleExit = () => {
    setQuizStarted(false);
    setShowInfoBox(false);
  };

  const handleOptionSelect = (selectedOption) => {
    const currentQuestionObj = questions[currentQuestion];
    if (selectedOption === currentQuestionObj.answer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResultBox(true);
    }
  };

  const handleRestartQuiz = async () => {
    await reloadQuestions();
    setCurrentQuestion(0);
    setScore(0);
    setQuizStarted(true);
    setShowResultBox(false);
  };

  const handleQuitQuiz = () => {
    setQuizStarted(false);
    setShowResultBox(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="App">
      {!isLoggedIn ? (
        <>
          {currentPage === 'login' && <LoginPage onSignupClick={handleSignupClick} onLogin={handleLogin} />}
          {currentPage === 'signup' && <Signup onLoginClick={handleLoginClick} />}
        </>
      ) : (
        <>
          <header>
            <h1>Welcome, {username}</h1>
            <button onClick={handleLogout} className="bg-red-500 text-white font-medium py-2 px-4 rounded-md hover:bg-red-600">Logout</button>
          </header>
          {currentPage === 'start' && (
            <>
              {!quizStarted && <StartButton onStart={handleStartQuiz} />}
              {quizStarted && showInfoBox && (
                <InfoBox onContinue={handleContinue} onExit={handleExit} />
              )}
              {quizStarted && !showInfoBox && !showResultBox && (
                <QuizBox
                  question={questions[currentQuestion].question}
                  options={questions[currentQuestion].options}
                  answer={questions[currentQuestion].answer}
                  timer={15}
                  currentQuestionNumber={currentQuestion + 1}
                  totalQuestions={questions.length}
                  onOptionSelect={handleOptionSelect}
                  onNext={handleNextQuestion}
                  isLastQuestion={currentQuestion === questions.length - 1}
                />
              )}
              {showResultBox && (
                <ResultBox
                  score={score}
                  totalQuestions={questions.length}
                  onRestart={handleRestartQuiz}
                  onQuit={handleQuitQuiz}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default App;
