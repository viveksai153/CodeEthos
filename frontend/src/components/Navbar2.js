// Navbar2.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar2 = () => {
    return (
        <nav className="bg-blue-600 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-xl font-bold">
                    CodeEthos
                </div>
                <ul className="flex space-x-4">
                    <li>
                        <Link to="/homepage" className="text-white hover:text-blue-200 transition duration-200">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard" className="text-white hover:text-blue-200 transition duration-200">
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/codereview" className="text-white hover:text-blue-200 transition duration-200">
                            Code Review
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar2;
