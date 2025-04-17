// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Navbar from '../components/Navbar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage({ type: 'success', text: 'Login successful!' });
        // Redirect to homepage
        navigate('/homepage'); // Change this if your homepage route is different
      } else {
        setMessage({ type: 'error', text: data.message || 'Invalid login. Please check your credentials.' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      setMessage({ type: 'error', text: 'An unexpected error occurred. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-10 max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login to CodeEthos</h2>
        
        {message && (
          <div
            className={`p-4 mb-4 text-center rounded-lg ${
              message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}
          >
            {message.text}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-4">
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
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
