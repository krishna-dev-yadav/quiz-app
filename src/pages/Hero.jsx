import React, { useState, useEffect } from 'react'
import Questions from '../../Backend/Questions'

const Hero = () => {
    const [questionsHistory, setQuestionsHistory] = useState([]);
    const [selected, setselected] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(0);

    const generateNewQuestion = () => {
        if (currentIndex < questionsHistory.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setselected(questionsHistory[currentIndex + 1]?.selected || null);
            return;
        }
        const NewArray = Object.values(Questions);
        const randomItem = NewArray[Math.floor(Math.random() * NewArray.length)];
        const correctAnswer = randomItem.answer;
        const fakeAnswers = NewArray
            .filter(item => item.answer !== correctAnswer)
            .map(q => q.answer)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);

        const allOptions = [...fakeAnswers, correctAnswer].sort(() => 0.5 - Math.random());
        const labels = ['a', 'b', 'c', 'd'];
        



        const newQuestion = {
            allOptions,
            labels,
            fakeAnswers,
            correctAnswer: correctAnswer,
            question: randomItem.question,
        };

        const updateHistory = [...questionsHistory.slice(0, currentIndex + 1), newQuestion]
        setQuestionsHistory(updateHistory)
        setCurrentIndex(updateHistory.length - 1)
        setselected(null)
    };




    useEffect(() => {
        generateNewQuestion()
    }, [])



    const handleclick = (item) => {
        const updateHistory = [...questionsHistory];
        updateHistory[currentIndex].selected = item;
        setQuestionsHistory(updateHistory);
        setselected(item)
    };
    const goToPrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1)
            setselected(questionsHistory[currentIndex - 1].selected || null)
        }
    }

    if (questionsHistory.length === 0) {
        return <p className='text-2xl'>Loading...</p>;
    }
    


    return (
        <div className=''>
            <div className='flex flex-col m-auto shadow-[0_8px_30px_rgba(59,130,246,0.3)] p-4 overflow-none mt-5 rounded-2xl w-3/4 items-center justify-center'>
                <p className='h-[30px]'>
                    {selected && (
                        <p className={`text-xl ${selected === questionsHistory[currentIndex]?.correctAnswer ? 'text-green-600 ' : 'text-red-500'}`}>
                            {selected === questionsHistory[currentIndex]?.correctAnswer ? '🎉 Congratulations! 🎉' : 'Wrong Answer'}
                        </p>
                    )}
                </p>
                <div className='flex flex-col gap-5 ml-10 mt-5'>
                    <p className=' font-bold text-base text-center'>Q{currentIndex + 1}: {questionsHistory[currentIndex]?.question}</p>
                    <div className='flex flex-col gap-2 items-start mt-5 w-full'>
                        {questionsHistory[currentIndex]?.allOptions.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => handleclick(item)}
                                disabled={selected !== null}
                                className={`w-full px-7 py-3 border text-start flex flex-row rounded-2xl h-[90px] 
                                 ${selected === item && item === questionsHistory[currentIndex]?.correctAnswer
                                        ? 'bg-green-600/20 text-green-800 shadow-[0_4px_20px_rgba(34,197,94,0.5)] border-green-500'
                                        : selected === item && item !== questionsHistory[currentIndex]?.correctAnswer
                                            ? 'bg-red-600/20 text-red-800  border-red-500'
                                            : selected !== null && item === questionsHistory[currentIndex]?.correctAnswer
                                                ? 'bg-green-700/20 text-green-700 border-green-400'
                                                : 'border-gray-600'}`}>
                                <p className='font-bold mr-6'> {questionsHistory[currentIndex]?.labels[index]}:</p>{item}
                            </button>
                        ))}
                    </div>
                </div>
                <div className='w-full px-8 flex justify-between mt-6'>
                    <button onClick={goToPrevious} className=' mt-5 px-5 py-3 w-[150px] bg-blue-700 text-white rounded-2xl'>Previous</button>
                    <button onClick={generateNewQuestion} className={` ${selected === null ? 'hidden' : 'mt-5 px-5 py-3 w-[150px] bg-gray-700 text-white rounded-2xl'} `}>Proceed</button>
                </div>
            </div>
        </div>

    )
}

export default Hero