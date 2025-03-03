import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">GiftLink</a>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    {/* Task 1: Add links to Home and Gifts below*/}
                    <li className='nav-item'><NavLink className='nav-link' to="/home.html">Home</NavLink></li>
                    <li className='nav-item'><NavLink className='nav-link' to="/app">Gifts</NavLink></li>
                    <li className='nav-item'><NavLink className='nav-link' to="/app/search">Search</NavLink></li>
                    <li className='nav-item'><NavLink className='nav-link' to="/app/login">Login</NavLink></li>
                    <li className='nav-item'><NavLink className='nav-link' to="/app/register">Register</NavLink></li>

                </ul>
            </div>
        </nav>
    );
}
