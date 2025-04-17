// Register.js
import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const Register = () => {
  const [name, setName] = useState(''); // State for the name
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }), // Include name in the request
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage({ type: 'success', text: 'Registration successful! Please log in.' });
        // Optionally clear the form fields after successful registration
        setName('');
        setEmail('');
        setPassword('');
      } else {
        setMessage({ type: 'error', text: data.message || 'Registration failed. Try again.' });
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setMessage({ type: 'error', text: 'An unexpected error occurred. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-10 max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Register for CodeEthos</h2>
        
        {message && (
          <div
            className={`p-4 mb-4 text-center rounded-lg ${
              message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}
          >
            {message.text}
          </div>
        )}
        
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
            placeholder="Name"
            required
          />
          
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
            placeholder="Email"
            required
          />
          
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
            placeholder="Password"
            required
          />
          
          <button
            type="submit"
            className={`w-full p-3 rounded-lg text-white font-semibold ${
              loading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'
            } transition duration-200`}
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
