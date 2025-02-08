import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignIn() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Spinner state
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    setIsLoading(true); // Show spinner

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, {
        fullName,
        email,
        password,
        confirmPassword,
      });
      console.log('Sign In Successful:', response.data);
      alert('Account created successfully! You can now login.');
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Sign In Error:', error.response?.data || error.message);
      alert(error.response?.data?.error || 'Something went wrong!');
    } finally {
      setIsLoading(false); // Hide spinner
    }
  };

  return (
    <div className={`flex justify-center items-center min-h-screen bg-gray-100 py-8 ${isLoading ? 'pointer-events-none' : ''}`}>
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>

        <form onSubmit={handleSignIn} className="space-y-6">
          {/* Inputs */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="Your full name"
            />
          </div>

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
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="Confirm your password"
            />
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white font-semibold rounded-md hover:from-gray-800 hover:via-gray-700 hover:to-gray-800 focus:outline-none transition"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
