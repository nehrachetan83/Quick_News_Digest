import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Spinner state
  const { setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Show spinner

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setAuthState({ isLoggedIn: true, userName: data.fullName });

        // Trigger forced reload after successful login
        navigate('/');
        window.location.reload(); // Force reload to reflect new state
      } else {
        alert('Login failed!');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false); // Hide spinner
    }
  };

  return (
    <div className={`flex justify-center items-center min-h-screen bg-gray-100 py-8 ${isLoading ? 'pointer-events-none' : ''}`}>
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="Enter your password"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white font-semibold rounded-md hover:from-gray-800 hover:via-gray-700 hover:to-gray-800 focus:outline-none transition"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
