// Navbar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">CodeEthos</h1>
        <div className="flex space-x-4">
          <Link 
            to="/" 
            className={`px-3 py-2 rounded-md ${
              location.pathname === '/login' ? 'bg-blue-500' : 'hover:bg-gray-700'
            }`}
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className={`px-3 py-2 rounded-md ${
              location.pathname === '/register' ? 'bg-blue-500' : 'hover:bg-gray-700'
            }`}
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
