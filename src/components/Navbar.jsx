import React from 'react';
import { GiBrain } from 'react-icons/gi';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <nav className='flex items-center justify-start gap-3 px-10 py-4 w-full backdrop-blur-md'>
                <GiBrain className="w-10 h-10 text-blue-700 cursor-pointer" />
                <Link to="/">
                    <span className='text-2xl font-bold text-black tracking-wide'>Brain Root</span>
                </Link>
            </nav>
        </div>
    );
};

export default Navbar;
