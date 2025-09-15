import React from 'react';
import StudentDashboard from './StudentDashboard';
import AdminDashboard from './AdminDashboard';
import WardenDashboard from './WardenDashboard';
import './Dashboard.css';

/**
 * Main Dashboard Component
 * 
 * Routes users to their role-specific dashboard based on their user type.
 * This component acts as a router that determines which specialized
 * dashboard to display for each user role.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.user - Current user data
 * @param {string} props.user.email - User's email address
 * @param {string} props.user.userType - Type of user (student, admin, warden)
 * @param {string} props.user.firstName - User's first name
 * @param {string} props.user.lastName - User's last name
 * @param {Function} props.onLogout - Callback function to handle user logout
 * @returns {JSX.Element} The appropriate role-specific dashboard component
 */
const Dashboard = ({ user, onLogout }) => {
  /**
   * Renders the appropriate dashboard based on user role
   * 
   * @returns {JSX.Element} Role-specific dashboard component
   */
  const renderRoleDashboard = () => {
    switch (user.userType) {
      case 'student':
        return <StudentDashboard user={user} onLogout={onLogout} />;
      case 'admin':
        return <AdminDashboard user={user} onLogout={onLogout} />;
      case 'warden':
        return <WardenDashboard user={user} onLogout={onLogout} />;
      default:
        return (
          <div className="dashboard-container">
            <header className="dashboard-header">
              <div className="header-content">
                <h1>🏠 Hostel Management System</h1>
                <div className="user-info">
                  <span className="user-email">{user.email}</span>
                  <span className="user-type">{user.userType}</span>
                  <button onClick={onLogout} className="logout-button">
                    Logout
                  </button>
                </div>
              </div>
            </header>
            
            <main className="dashboard-main">
              <div className="welcome-section">
                <h2>Welcome to the Hostel Management System!</h2>
                <p>Please contact the administrator to set up your dashboard.</p>
              </div>
            </main>
          </div>
        );
    }
  };

  return renderRoleDashboard();
};

export default Dashboard;
