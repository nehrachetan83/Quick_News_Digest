import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

function Navbar() {
  const { authState, setAuthState } = useContext(AuthContext);
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (authState.isLoggedIn && !authState.userName) {
        try {
          const response = await fetch('/auth/user', { credentials: 'include' });
          if (response.ok) {
            const data = await response.json();
            setAuthState((prev) => ({ ...prev, userName: data.userName }));
          } else {
            console.error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [authState.isLoggedIn, authState.userName, setAuthState]);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, { method: 'POST', credentials: 'include' });
      if (response.ok) {
        setAuthState({ isLoggedIn: false, userName: '' });
        navigate('/'); // Redirect to home after logout
      } else {
        console.error('Failed to logout');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginRedirect = () => navigate('/login');

  // Redirect to the category page
  const handleCategoryClick = (category) => navigate(`/news/${category}`);

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white w-full">
      <div className="w-full px-4 py-4 flex justify-between items-center">
        {/* Left Links */}
        <div className="flex space-x-6">
          <Link to="/" className="text-lg font-semibold italic hover:text-gray-300 transition-all">
            Home
          </Link>
        </div>

        {/* Center Title */}
        <div className="text-center">
          <h1 className="text-2xl font-extrabold italic tracking-wider">
            <span className="text-orange-400">Quick</span>
            <span className="text-white"> News </span>
            <span className="text-green-400">Digest</span>
          </h1>
        </div>

        {/* Right Links */}
        <div className="flex space-x-6 items-center">
          {authState.isLoggedIn ? (
            <>
              <span className="text-lg font-semibold italic">
                {authState.userName || 'Fetching...'}
              </span>
              <button
                onClick={handleLogout}
                disabled={loading}
                className="text-lg font-semibold italic hover:text-gray-300 transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleLoginRedirect}
                className="text-lg font-semibold italic hover:text-gray-300 transition-all"
              >
                Login
              </button>
              <Link to="/signin" className="text-lg font-semibold italic hover:text-gray-300 transition-all">
                SignIn
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Category Buttons */}
      <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-white py-3">
        <div className="w-full px-4 flex flex-wrap justify-center gap-4">
          {['top_stories', 'india', 'sports', 'tech', 'education'].map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className="py-2 px-6 rounded-full bg-gray-600 hover:bg-gray-500 text-lg font-bold italic transition-all"
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
