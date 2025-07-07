import React, { useEffect, useState } from 'react';
import { FiArrowLeft, FiArrowRight, FiClock } from 'react-icons/fi';
import { BsQuestionCircle } from 'react-icons/bs';
import { GiBrain } from 'react-icons/gi';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30); // 🕒 Start from 30 seconds

  // Decode HTML entities from API
  const decodeHTML = (str) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
  };

  // Shuffle options
  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await fetch("https://opentdb.com/api.php?amount=10&type=multiple");
      const data = await res.json();
      const formatted = data.results.map((q) => ({
        question: decodeHTML(q.question),
        options: shuffle([...q.incorrect_answers, q.correct_answer].map(decodeHTML)),
        correct: decodeHTML(q.correct_answer),
      }));
      setQuestions(formatted);
    };
    fetchQuestions();
  }, []);

  // Countdown timer effect
  useEffect(() => {
    if (questions.length === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 1) {
          handleNext(); // move to next when time is up
          return 30; // reset timer for next question
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, questions]);

  // Reset selection & timer on question change
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setTimeLeft(30);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setSelectedOption(null);
      setTimeLeft(30);
    }
  };

  if (questions.length === 0) {
    return <div className='text-center text-2xl mt-2'>Loading...</div>;
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className='bg-gradient-to-br from-gray-100 via-pink-200 to-red-300 min-h-screen relative'>
      <nav className='flex items-center justify-start gap-3 p-4 shadow-xl w-full bg-white/30 backdrop-blur-md fixed top-1 left-3 right-3 z-10'>
        <GiBrain className="w-10 h-10 text-purple-700" />
        <span className='text-2xl font-bold text-gray-900 tracking-wide'>Brain Root</span>
      </nav>

      <main className='flex flex-col justify-center items-center min-h-screen pt-20 px-4'>
        <div className='backdrop-blur-md text-center max-w-md shadow-2xl w-full rounded-2xl bg-white/80 p-6'>
          <h1 className='font-extrabold text-gray-800 mb-6 text-4xl flex items-center justify-center gap-2'>
            <BsQuestionCircle />
            Quiz
          </h1>
          <p className='flex flex-col items-center mb-5 text-gray-700'>
            <span className='mb-1 text-sm'>
              {currentIndex + 1} / {questions.length}
            </span>
            <span className='font-semibold text-lg'>{currentQuestion.question}</span>
          </p>

          <section className='p-2 space-y-4'>
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedOption(option)}
                className={`w-full p-3 rounded-lg border transition-all duration-200 ${
                  selectedOption === option
                    ? 'bg-blue-100 border-blue-400 text-blue-800 font-semibold'
                    : 'bg-white/50 text-gray-800 border-gray-300 hover:bg-blue-50 hover:border-blue-300'
                }`}
              >
                {option}
              </button>
            ))}
          </section>

          <footer className='flex justify-between items-center mt-6 space-x-4 px-1'>
            <button
              className='flex items-center justify-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-md w-1/4 text-sm'
              disabled={currentIndex === 0}
              onClick={handlePrev}
            >
              <FiArrowLeft />
              Prev
            </button>
            <div className='flex items-center gap-1 font-medium text-gray-700'>
              <FiClock className="text-gray-600" />
              <span>{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</span>
            </div>
            <button
              className='flex items-center justify-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-3 py-2 rounded-md w-1/4 text-sm'
              disabled={currentIndex === questions.length - 1}
              onClick={handleNext}
            >
              Next
              <FiArrowRight />
            </button>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default App;
