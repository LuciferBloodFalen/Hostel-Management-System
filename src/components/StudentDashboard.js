import React, { useState } from 'react';
import './StudentDashboard.css';

/**
 * Student Dashboard Component
 * 
 * Provides a comprehensive dashboard specifically designed for students,
 * including room details, payment information, requests, notices, and
 * hostel-related services.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.user - Current student user data
 * @param {Function} props.onLogout - Callback function to handle user logout
 * @returns {JSX.Element} The student dashboard component
 */
const StudentDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [requests, setRequests] = useState([
    { id: 1, type: 'Room Change', status: 'Pending', date: '2024-01-15', description: 'Request for room change due to noise issues' },
    { id: 2, type: 'Maintenance', status: 'Approved', date: '2024-01-10', description: 'Fix broken AC in room 205' }
  ]);

  const [notices] = useState([
    { id: 1, title: 'Hostel Rules Update', date: '2024-01-20', priority: 'high', content: 'New hostel rules effective from February 1st' },
    { id: 2, title: 'Payment Due Reminder', date: '2024-01-18', priority: 'medium', content: 'Monthly payment due by January 25th' },
    { id: 3, title: 'Sports Day Event', date: '2024-01-15', priority: 'low', content: 'Annual sports day on February 10th' }
  ]);

  const studentData = {
    roomNumber: '205',
    block: 'A',
    floor: '2',
    roommate: 'John Doe',
    monthlyFee: 8500,
    nextPayment: '2024-02-15',
    paymentStatus: 'Paid',
    attendance: 95,
    complaints: 0,
    requests: 2
  };

  /**
   * Handles creating a new request
   * 
   * @param {string} type - Type of request
   * @param {string} description - Request description
   */
  const handleCreateRequest = (type, description) => {
    const newRequest = {
      id: requests.length + 1,
      type,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
      description
    };
    setRequests([...requests, newRequest]);
  };

  /**
   * Renders the overview tab content
   * 
   * @returns {JSX.Element} Overview tab content
   */
  const renderOverview = () => (
    <div className="overview-content">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🏠</div>
          <div className="stat-info">
            <h3>Room Details</h3>
            <p>Room {studentData.roomNumber}, Block {studentData.block}</p>
            <span className="stat-detail">Floor {studentData.floor}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>Payment Status</h3>
            <p className={`status ${studentData.paymentStatus.toLowerCase()}`}>
              {studentData.paymentStatus}
            </p>
            <span className="stat-detail">Next: ₹{studentData.monthlyFee}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>Roommate</h3>
            <p>{studentData.roommate}</p>
            <span className="stat-detail">Room {studentData.roomNumber}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <h3>Attendance</h3>
            <p>{studentData.attendance}%</p>
            <span className="stat-detail">This Month</span>
          </div>
        </div>
      </div>

      <div className="quick-actions-section">
        <h3>Quick Actions</h3>
        <div className="quick-actions">
          <button className="action-btn primary" onClick={() => setActiveTab('requests')}>
            📝 Submit Request
          </button>
          <button className="action-btn secondary" onClick={() => setActiveTab('payments')}>
            💳 Make Payment
          </button>
          <button className="action-btn secondary" onClick={() => setActiveTab('complaints')}>
            📢 File Complaint
          </button>
          <button className="action-btn secondary" onClick={() => setActiveTab('notices')}>
            📢 View Notices
          </button>
        </div>
      </div>
    </div>
  );

  /**
   * Renders the requests tab content
   * 
   * @returns {JSX.Element} Requests tab content
   */
  const renderRequests = () => (
    <div className="requests-content">
      <div className="section-header">
        <h3>My Requests</h3>
        <button className="btn-primary" onClick={() => setActiveTab('new-request')}>
          + New Request
        </button>
      </div>

      <div className="requests-list">
        {requests.map(request => (
          <div key={request.id} className="request-item">
            <div className="request-header">
              <h4>{request.type}</h4>
              <span className={`status-badge ${request.status.toLowerCase()}`}>
                {request.status}
              </span>
            </div>
            <p className="request-description">{request.description}</p>
            <div className="request-footer">
              <span className="request-date">Submitted: {request.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  /**
   * Renders the new request form
   * 
   * @returns {JSX.Element} New request form
   */
  const renderNewRequest = () => {
    const [requestType, setRequestType] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      if (requestType && description) {
        handleCreateRequest(requestType, description);
        setRequestType('');
        setDescription('');
        setActiveTab('requests');
      }
    };

    return (
      <div className="new-request-content">
        <div className="section-header">
          <h3>Submit New Request</h3>
          <button className="btn-secondary" onClick={() => setActiveTab('requests')}>
            ← Back to Requests
          </button>
        </div>

        <form onSubmit={handleSubmit} className="request-form">
          <div className="form-group">
            <label htmlFor="requestType">Request Type</label>
            <select
              id="requestType"
              value={requestType}
              onChange={(e) => setRequestType(e.target.value)}
              required
            >
              <option value="">Select request type</option>
              <option value="Room Change">Room Change</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Guest Permission">Guest Permission</option>
              <option value="Leave Application">Leave Application</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please describe your request in detail..."
              rows="4"
              required
            />
          </div>

          <button type="submit" className="btn-primary">
            Submit Request
          </button>
        </form>
      </div>
    );
  };

  /**
   * Renders the payments tab content
   * 
   * @returns {JSX.Element} Payments tab content
   */
  const renderPayments = () => (
    <div className="payments-content">
      <div className="payment-summary">
        <h3>Payment Summary</h3>
        <div className="payment-card">
          <div className="payment-info">
            <h4>Monthly Hostel Fee</h4>
            <p className="amount">₹{studentData.monthlyFee}</p>
            <p className="due-date">Due: {studentData.nextPayment}</p>
            <span className={`payment-status ${studentData.paymentStatus.toLowerCase()}`}>
              {studentData.paymentStatus}
            </span>
          </div>
          <button className="btn-primary">Pay Now</button>
        </div>
      </div>

      <div className="payment-history">
        <h3>Payment History</h3>
        <div className="history-list">
          <div className="history-item">
            <div className="history-date">Jan 2024</div>
            <div className="history-amount">₹8,500</div>
            <div className="history-status paid">Paid</div>
          </div>
          <div className="history-item">
            <div className="history-date">Dec 2023</div>
            <div className="history-amount">₹8,500</div>
            <div className="history-status paid">Paid</div>
          </div>
          <div className="history-item">
            <div className="history-date">Nov 2023</div>
            <div className="history-amount">₹8,500</div>
            <div className="history-status paid">Paid</div>
          </div>
        </div>
      </div>
    </div>
  );

  /**
   * Renders the notices tab content
   * 
   * @returns {JSX.Element} Notices tab content
   */
  const renderNotices = () => (
    <div className="notices-content">
      <h3>Hostel Notices</h3>
      <div className="notices-list">
        {notices.map(notice => (
          <div key={notice.id} className={`notice-item ${notice.priority}`}>
            <div className="notice-header">
              <h4>{notice.title}</h4>
              <span className="notice-date">{notice.date}</span>
            </div>
            <p className="notice-content">{notice.content}</p>
            <div className="notice-priority">
              Priority: <span className={`priority-badge ${notice.priority}`}>
                {notice.priority.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  /**
   * Renders the complaints tab content
   * 
   * @returns {JSX.Element} Complaints tab content
   */
  const renderComplaints = () => (
    <div className="complaints-content">
      <div className="section-header">
        <h3>File a Complaint</h3>
      </div>

      <div className="complaint-form">
        <form>
          <div className="form-group">
            <label htmlFor="complaintType">Complaint Type</label>
            <select id="complaintType">
              <option value="">Select complaint type</option>
              <option value="Noise">Noise Issues</option>
              <option value="Cleanliness">Cleanliness</option>
              <option value="Facilities">Facility Issues</option>
              <option value="Security">Security Concerns</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="complaintDescription">Description</label>
            <textarea
              id="complaintDescription"
              placeholder="Please describe your complaint in detail..."
              rows="4"
            />
          </div>

          <button type="submit" className="btn-primary">
            Submit Complaint
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="student-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>🏠 Student Dashboard</h1>
          <div className="user-info">
            <span className="user-name">Welcome, {user.firstName}!</span>
            <span className="user-email">{user.email}</span>
            <button onClick={onLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        <nav className="dashboard-nav">
          <button 
            className={`nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📊 Overview
          </button>
          <button 
            className={`nav-btn ${activeTab === 'requests' ? 'active' : ''}`}
            onClick={() => setActiveTab('requests')}
          >
            📝 Requests
          </button>
          <button 
            className={`nav-btn ${activeTab === 'payments' ? 'active' : ''}`}
            onClick={() => setActiveTab('payments')}
          >
            💳 Payments
          </button>
          <button 
            className={`nav-btn ${activeTab === 'notices' ? 'active' : ''}`}
            onClick={() => setActiveTab('notices')}
          >
            📢 Notices
          </button>
          <button 
            className={`nav-btn ${activeTab === 'complaints' ? 'active' : ''}`}
            onClick={() => setActiveTab('complaints')}
          >
            📢 Complaints
          </button>
        </nav>

        <main className="dashboard-main">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'requests' && renderRequests()}
          {activeTab === 'new-request' && renderNewRequest()}
          {activeTab === 'payments' && renderPayments()}
          {activeTab === 'notices' && renderNotices()}
          {activeTab === 'complaints' && renderComplaints()}
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
