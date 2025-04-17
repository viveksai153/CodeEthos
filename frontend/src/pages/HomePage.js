// HomePage.js
import React from 'react';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-4">Welcome to CodeEthos</h1>
      <p className="text-lg text-center mb-6">
        CodeEthos is your ultimate coding companion. 
        Here, you can review code, learn best practices, and improve your programming skills.
      </p>
      <a
        href="/dashboard" // Adjust this link as needed
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Go to Dashboard
      </a>
    </div>
  );
};

export default HomePage;
