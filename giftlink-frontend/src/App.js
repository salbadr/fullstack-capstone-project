import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import RegisterPage from './components/RegisterPage/RegisterPage';
import LoginPage from './components/LoginPage/LoginPage';

function App() {

    return (
        <>
            <Navbar />
            <Routes>
                {/* the final code will not pass the products to every page, but each page will call the server API */}
                <Route path="/" element={<MainPage />} />
                <Route path="/app" element={<MainPage />} />
                <Route path="/app/product/:productId" element={<>Details Page</>} />
                <Route path="/app/register" element={<RegisterPage/>} />
                <Route path="/app/login" element={<LoginPage/>} />

            </Routes>
        </>
    );
}

export default App;
