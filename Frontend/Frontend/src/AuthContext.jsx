// AuthProvider.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    userName: '',
  });

  useEffect(() => {
    // Check if user is authenticated by making a request to `/auth/me`
    const checkAuthStatus = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/me`, {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setAuthState({
            isLoggedIn: true,
            userName: data.fullName,
          });
        } else {
          setAuthState({
            isLoggedIn: false,
            userName: '',
          });
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
        setAuthState({ isLoggedIn: false, userName: '' });
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};
