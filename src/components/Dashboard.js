import React from 'react';
import './Dashboard.css';

/**
 * Dashboard Component
 * 
 * Provides role-specific dashboards with customized views for students,
 * administrators, and wardens. Each role sees relevant statistics,
 * quick actions, and information tailored to their responsibilities.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.user - Current user data
 * @param {string} props.user.email - User's email address
 * @param {string} props.user.userType - Type of user (student, admin, warden)
 * @param {string} props.user.firstName - User's first name
 * @param {string} props.user.lastName - User's last name
 * @param {Function} props.onLogout - Callback function to handle user logout
 * @returns {JSX.Element} The dashboard component
 */
const Dashboard = ({ user, onLogout }) => {
  /**
   * Generates a personalized welcome message based on user role
   * 
   * @returns {string} Welcome message for the current user
   */
  const getWelcomeMessage = () => {
    switch (user.userType) {
      case 'admin':
        return 'Welcome, Administrator!';
      case 'warden':
        return 'Welcome, Warden!';
      case 'student':
        return 'Welcome, Student!';
      default:
        return 'Welcome!';
    }
  };

  /**
   * Generates role-specific dashboard content with relevant statistics
   * and information for each user type
   * 
   * @returns {JSX.Element} Dashboard content specific to user role
   */
  const getDashboardContent = () => {
    switch (user.userType) {
      case 'admin':
        return (
          <div className="dashboard-grid">
            <div className="dashboard-card">
              <h3>📊 Total Students</h3>
              <p className="stat-number">1,247</p>
            </div>
            <div className="dashboard-card">
              <h3>🏠 Total Rooms</h3>
              <p className="stat-number">312</p>
            </div>
            <div className="dashboard-card">
              <h3>✅ Occupied Rooms</h3>
              <p className="stat-number">298</p>
            </div>
            <div className="dashboard-card">
              <h3>⚠️ Pending Requests</h3>
              <p className="stat-number">23</p>
            </div>
          </div>
        );
      case 'warden':
        return (
          <div className="dashboard-grid">
            <div className="dashboard-card">
              <h3>👥 My Students</h3>
              <p className="stat-number">156</p>
            </div>
            <div className="dashboard-card">
              <h3>🏠 My Rooms</h3>
              <p className="stat-number">78</p>
            </div>
            <div className="dashboard-card">
              <h3>📝 Complaints</h3>
              <p className="stat-number">12</p>
            </div>
            <div className="dashboard-card">
              <h3>📅 Events Today</h3>
              <p className="stat-number">3</p>
            </div>
          </div>
        );
      case 'student':
        return (
          <div className="dashboard-grid">
            <div className="dashboard-card">
              <h3>🏠 My Room</h3>
              <p className="stat-number">Room 205</p>
            </div>
            <div className="dashboard-card">
              <h3>💰 Monthly Fee</h3>
              <p className="stat-number">₹8,500</p>
            </div>
            <div className="dashboard-card">
              <h3>📅 Next Payment</h3>
              <p className="stat-number">Dec 15</p>
            </div>
            <div className="dashboard-card">
              <h3>📝 My Requests</h3>
              <p className="stat-number">2</p>
            </div>
          </div>
        );
      default:
        return <div>Welcome to the Hostel Management System!</div>;
    }
  };

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
          <h2>{getWelcomeMessage()}</h2>
          <p>Here's your dashboard overview</p>
        </div>
        
        {getDashboardContent()}
        
        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="actions-grid">
            {user.userType === 'admin' && (
              <>
                <button className="action-button">Manage Students</button>
                <button className="action-button">Room Allocation</button>
                <button className="action-button">View Reports</button>
                <button className="action-button">System Settings</button>
              </>
            )}
            {user.userType === 'warden' && (
              <>
                <button className="action-button">Student List</button>
                <button className="action-button">Room Status</button>
                <button className="action-button">Complaints</button>
                <button className="action-button">Events</button>
              </>
            )}
            {user.userType === 'student' && (
              <>
                <button className="action-button">Room Details</button>
                <button className="action-button">Payment History</button>
                <button className="action-button">Submit Request</button>
                <button className="action-button">View Notices</button>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
