import React from 'react';
import { Link } from 'react-router-dom';



const Allchapter = () => {

    return (
        <div>
            <p className='text-xl font-semibold px-5 sm:px-20 mt-10 mb-3'>All Chapters</p>

            <div className='px-4 py-3 overflow-x-auto scrollbar-hide'>
                <div className='flex px-6 py-2 gap-9 w-max'>
                    {[1, 2, 3, 4, 5, 6, 7].map((item) => {
                        const card = (
                            <div
                                key={item}
                                className='min-w-[250px] hover:outline hover:outline-2 hover:outline-blue-400 transform hover:scale-105 transition-transform duration-300 cursor-pointer px-4 py-3 rounded-xl shadow-2xl border border-gray-700 bg-white'
                            >
                                <p className='text-xl font-semibold'>Chapter {item}</p>
                                <p>Human Reproduction</p>
                                <img
                                    className='w-full lg:h-[350px] h-[270px] object-cover rounded-lg mt-2'
                                    src='./assets/human_reproduction.jpeg'
                                    alt=''
                                />
                            </div>
                        );

                        return item === 1 ? (
                            <Link to="/Hero" key={item}>{card}</Link>
                        ) : (
                            <div key={item}>{card}</div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Allchapter;
