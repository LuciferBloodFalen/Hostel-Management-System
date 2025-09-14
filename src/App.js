import React, { useState } from 'react';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import './App.css';

/**
 * Main Application Component
 * 
 * This is the root component that manages the overall application state,
 * including authentication status and view routing between login, signup, and dashboard.
 * 
 * @component
 * @returns {JSX.Element} The main application component
 */
function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('login'); // 'login' or 'signup'

  /**
   * Handles user login authentication
   * 
   * @param {Object} userData - User login data containing email, password, and userType
   * @param {string} userData.email - User's email address
   * @param {string} userData.password - User's password
   * @param {string} userData.userType - Type of user (student, admin, warden)
   */
  const handleLogin = (userData) => {
    // In a real application, you would validate credentials with a backend
    // For now, we'll simulate a successful login
    setUser(userData);
    setIsAuthenticated(true);
    
    // Store user data in localStorage for persistence
    localStorage.setItem('hostelUser', JSON.stringify(userData));
  };

  /**
   * Handles user registration and auto-login
   * 
   * @param {Object} userData - Complete user registration data
   * @param {string} userData.firstName - User's first name
   * @param {string} userData.lastName - User's last name
   * @param {string} userData.email - User's email address
   * @param {string} userData.userType - Type of user (student, admin, warden)
   * @param {string} userData.phoneNumber - User's phone number
   * @param {string} userData.usn - University Serial Number (for students)
   * @param {string} userData.dateOfBirth - User's date of birth
   */
  const handleSignUp = (userData) => {
    // In a real application, you would create the account with a backend
    // For now, we'll simulate a successful signup and auto-login
    const loginData = {
      email: userData.email,
      userType: userData.userType,
      firstName: userData.firstName,
      lastName: userData.lastName
    };
    
    setUser(loginData);
    setIsAuthenticated(true);
    
    // Store user data in localStorage for persistence
    localStorage.setItem('hostelUser', JSON.stringify(loginData));
  };

  /**
   * Handles user logout and clears session data
   */
  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setCurrentView('login'); // Reset to login view
    localStorage.removeItem('hostelUser');
  };

  /**
   * Switches the current view to the signup page
   */
  const switchToSignUp = () => {
    setCurrentView('signup');
  };

  /**
   * Switches the current view to the login page
   */
  const switchToLogin = () => {
    setCurrentView('login');
  };

  // Check for existing login on app load
  React.useEffect(() => {
    const savedUser = localStorage.getItem('hostelUser');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('hostelUser');
      }
    }
  }, []);

  return (
    <div className="App">
      {isAuthenticated ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <>
          {currentView === 'login' ? (
            <Login onLogin={handleLogin} onSwitchToSignUp={switchToSignUp} />
          ) : (
            <SignUp onSignUp={handleSignUp} onSwitchToLogin={switchToLogin} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
