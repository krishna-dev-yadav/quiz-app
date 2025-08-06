import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Subject from './pages/Subject';
import Allchapter from './pages/Allchapter';
import Hero from './pages/Hero';

const App = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path='/' element={<Subject />} />
                <Route path='/Allchapter' element={<Allchapter />} />
                <Route path='/Hero' element={<Hero/>} />
            </Routes>
        </div>
    );
};

export default App;
