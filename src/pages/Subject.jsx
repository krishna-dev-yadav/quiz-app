import React from 'react';
import { Link } from 'react-router-dom';

const Subject = () => {
    const subjects = [
        {
            name: 'Biology',
            image: './assets/Biology.jpeg',
        },
        {
            name: 'Physics',
            image: './assets/physics.jpeg',
        },
        {
            name: 'Chemistry',
            image: './assets/Chemistryt.jpeg',
        },
    ];

    return (
        <div>
            <p className='text-xl font-semibold px-5 sm:px-20 mt-10 mb-3'>All Subjects</p>

            <div className='px-4 py-3 overflow-x-auto scrollbar-hide'>
                <div className='flex px-6 py-2 gap-9 w-max'>
                    {subjects.map((subject) => {
                        const card = (
                            <div
                                key={subject.name}
                                className='min-w-[450px] hover:outline hover:outline-2 hover:outline-blue-400 transform hover:scale-105 transition-transform duration-300 cursor-pointer px-4 py-3 rounded-xl shadow-2xl border border-gray-700 bg-white'
                            >
                                <p className='text-xl font-semibold'>{subject.name}</p>
                                <img
                                    className='w-full lg:h-[350px] h-[270px] object-cover rounded-lg mt-2'
                                    src={subject.image}
                                    alt={subject.name}
                                />
                            </div>
                        );

                        return subject.name === 'Biology' ? (
                            <Link to="/Allchapter" key={subject.name}>{card}</Link>
                        ) : (
                            <div key={subject.name}>{card}</div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Subject;
