import React, { useState } from 'react';
import './AdminDashboard.css';

/**
 * Admin Dashboard Component
 * 
 * Provides a comprehensive administrative dashboard with system-wide
 * management capabilities including student management, room allocation,
 * financial oversight, and system analytics.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.user - Current admin user data
 * @param {Function} props.onLogout - Callback function to handle user logout
 * @returns {JSX.Element} The admin dashboard component
 */
const AdminDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', usn: '1MS20CS001', room: '205', block: 'A', status: 'Active', fees: 'Paid' },
    { id: 2, name: 'Jane Smith', usn: '1MS20CS002', room: '206', block: 'A', status: 'Active', fees: 'Pending' },
    { id: 3, name: 'Mike Johnson', usn: '1MS20CS003', room: '301', block: 'B', status: 'Active', fees: 'Paid' },
    { id: 4, name: 'Sarah Wilson', usn: '1MS20CS004', room: '302', block: 'B', status: 'Inactive', fees: 'Overdue' }
  ]);

  const [rooms, setRooms] = useState([
    { number: '205', block: 'A', floor: '2', capacity: 2, occupied: 2, status: 'Occupied', type: 'Double' },
    { number: '206', block: 'A', floor: '2', capacity: 2, occupied: 1, status: 'Partially Occupied', type: 'Double' },
    { number: '301', block: 'B', floor: '3', capacity: 2, occupied: 2, status: 'Occupied', type: 'Double' },
    { number: '302', block: 'B', floor: '3', capacity: 2, occupied: 0, status: 'Available', type: 'Double' }
  ]);

  const [requests, setRequests] = useState([
    { id: 1, student: 'John Doe', type: 'Room Change', status: 'Pending', date: '2024-01-15', priority: 'Medium' },
    { id: 2, student: 'Jane Smith', type: 'Maintenance', status: 'Approved', date: '2024-01-10', priority: 'High' },
    { id: 3, student: 'Mike Johnson', type: 'Leave Application', status: 'Pending', date: '2024-01-12', priority: 'Low' }
  ]);

  const systemStats = {
    totalStudents: 1247,
    totalRooms: 312,
    occupiedRooms: 298,
    availableRooms: 14,
    pendingRequests: 23,
    monthlyRevenue: 10599500,
    occupancyRate: 95.5
  };

  /**
   * Handles updating request status
   * 
   * @param {number} requestId - ID of the request to update
   * @param {string} newStatus - New status for the request
   */
  const handleRequestStatusUpdate = (requestId, newStatus) => {
    setRequests(requests.map(request => 
      request.id === requestId 
        ? { ...request, status: newStatus }
        : request
    ));
  };

  /**
   * Renders the overview tab content
   * 
   * @returns {JSX.Element} Overview tab content
   */
  const renderOverview = () => (
    <div className="overview-content">
      <div className="stats-grid">
        <div className="stat-card primary">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>Total Students</h3>
            <p className="stat-number">{systemStats.totalStudents.toLocaleString()}</p>
            <span className="stat-change positive">+5.2% from last month</span>
          </div>
        </div>

        <div className="stat-card secondary">
          <div className="stat-icon">🏠</div>
          <div className="stat-info">
            <h3>Total Rooms</h3>
            <p className="stat-number">{systemStats.totalRooms}</p>
            <span className="stat-change neutral">No change</span>
          </div>
        </div>

        <div className="stat-card success">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <h3>Occupancy Rate</h3>
            <p className="stat-number">{systemStats.occupancyRate}%</p>
            <span className="stat-change positive">+2.1% from last month</span>
          </div>
        </div>

        <div className="stat-card warning">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>Monthly Revenue</h3>
            <p className="stat-number">₹{systemStats.monthlyRevenue.toLocaleString()}</p>
            <span className="stat-change positive">+8.3% from last month</span>
          </div>
        </div>
      </div>

      <div className="quick-actions-section">
        <h3>Quick Actions</h3>
        <div className="quick-actions">
          <button className="action-btn primary" onClick={() => setActiveTab('students')}>
            👥 Manage Students
          </button>
          <button className="action-btn secondary" onClick={() => setActiveTab('rooms')}>
            🏠 Room Allocation
          </button>
          <button className="action-btn secondary" onClick={() => setActiveTab('requests')}>
            📝 Handle Requests
          </button>
          <button className="action-btn secondary" onClick={() => setActiveTab('reports')}>
            📊 Generate Reports
          </button>
        </div>
      </div>

      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon">👤</div>
            <div className="activity-content">
              <p>New student registration: Sarah Wilson</p>
              <span className="activity-time">2 hours ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">🏠</div>
            <div className="activity-content">
              <p>Room 205 maintenance completed</p>
              <span className="activity-time">4 hours ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">💰</div>
            <div className="activity-content">
              <p>Payment received from John Doe</p>
              <span className="activity-time">6 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  /**
   * Renders the students management tab
   * 
   * @returns {JSX.Element} Students management tab content
   */
  const renderStudents = () => (
    <div className="students-content">
      <div className="section-header">
        <h3>Student Management</h3>
        <div className="header-actions">
          <button className="btn-secondary">Export Data</button>
          <button className="btn-primary">Add Student</button>
        </div>
      </div>

      <div className="filters">
        <select className="filter-select">
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <select className="filter-select">
          <option value="">All Blocks</option>
          <option value="A">Block A</option>
          <option value="B">Block B</option>
        </select>
        <input type="text" placeholder="Search students..." className="search-input" />
      </div>

      <div className="students-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>USN</th>
              <th>Room</th>
              <th>Block</th>
              <th>Status</th>
              <th>Fees</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.usn}</td>
                <td>{student.room}</td>
                <td>{student.block}</td>
                <td>
                  <span className={`status-badge ${student.status.toLowerCase()}`}>
                    {student.status}
                  </span>
                </td>
                <td>
                  <span className={`fees-badge ${student.fees.toLowerCase()}`}>
                    {student.fees}
                  </span>
                </td>
                <td>
                  <button className="action-btn-small">Edit</button>
                  <button className="action-btn-small danger">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  /**
   * Renders the rooms management tab
   * 
   * @returns {JSX.Element} Rooms management tab content
   */
  const renderRooms = () => (
    <div className="rooms-content">
      <div className="section-header">
        <h3>Room Management</h3>
        <div className="header-actions">
          <button className="btn-secondary">Export Data</button>
          <button className="btn-primary">Add Room</button>
        </div>
      </div>

      <div className="room-stats">
        <div className="room-stat">
          <h4>Total Rooms</h4>
          <p>{systemStats.totalRooms}</p>
        </div>
        <div className="room-stat">
          <h4>Occupied</h4>
          <p>{systemStats.occupiedRooms}</p>
        </div>
        <div className="room-stat">
          <h4>Available</h4>
          <p>{systemStats.availableRooms}</p>
        </div>
        <div className="room-stat">
          <h4>Occupancy Rate</h4>
          <p>{systemStats.occupancyRate}%</p>
        </div>
      </div>

      <div className="rooms-grid">
        {rooms.map(room => (
          <div key={`${room.block}-${room.number}`} className="room-card">
            <div className="room-header">
              <h4>Room {room.number}</h4>
              <span className={`room-status ${room.status.toLowerCase().replace(' ', '-')}`}>
                {room.status}
              </span>
            </div>
            <div className="room-details">
              <p><strong>Block:</strong> {room.block}</p>
              <p><strong>Floor:</strong> {room.floor}</p>
              <p><strong>Type:</strong> {room.type}</p>
              <p><strong>Capacity:</strong> {room.capacity}</p>
              <p><strong>Occupied:</strong> {room.occupied}</p>
            </div>
            <div className="room-actions">
              <button className="btn-small">View Details</button>
              <button className="btn-small">Allocate</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  /**
   * Renders the requests management tab
   * 
   * @returns {JSX.Element} Requests management tab content
   */
  const renderRequests = () => (
    <div className="requests-content">
      <div className="section-header">
        <h3>Request Management</h3>
        <div className="header-actions">
          <button className="btn-secondary">Export Data</button>
        </div>
      </div>

      <div className="requests-list">
        {requests.map(request => (
          <div key={request.id} className="request-card">
            <div className="request-header">
              <div className="request-info">
                <h4>{request.type}</h4>
                <p>From: {request.student}</p>
                <span className="request-date">{request.date}</span>
              </div>
              <div className="request-meta">
                <span className={`priority-badge ${request.priority.toLowerCase()}`}>
                  {request.priority}
                </span>
                <span className={`status-badge ${request.status.toLowerCase()}`}>
                  {request.status}
                </span>
              </div>
            </div>
            <div className="request-actions">
              {request.status === 'Pending' && (
                <>
                  <button 
                    className="btn-success"
                    onClick={() => handleRequestStatusUpdate(request.id, 'Approved')}
                  >
                    Approve
                  </button>
                  <button 
                    className="btn-danger"
                    onClick={() => handleRequestStatusUpdate(request.id, 'Rejected')}
                  >
                    Reject
                  </button>
                </>
              )}
              <button className="btn-secondary">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  /**
   * Renders the reports tab content
   * 
   * @returns {JSX.Element} Reports tab content
   */
  const renderReports = () => (
    <div className="reports-content">
      <div className="section-header">
        <h3>Reports & Analytics</h3>
        <div className="header-actions">
          <button className="btn-secondary">Export Report</button>
          <button className="btn-primary">Generate Report</button>
        </div>
      </div>

      <div className="reports-grid">
        <div className="report-card">
          <h4>Financial Report</h4>
          <p>Monthly revenue and expense analysis</p>
          <button className="btn-primary">Generate</button>
        </div>
        <div className="report-card">
          <h4>Occupancy Report</h4>
          <p>Room occupancy and utilization statistics</p>
          <button className="btn-primary">Generate</button>
        </div>
        <div className="report-card">
          <h4>Student Report</h4>
          <p>Student demographics and status overview</p>
          <button className="btn-primary">Generate</button>
        </div>
        <div className="report-card">
          <h4>Maintenance Report</h4>
          <p>Maintenance requests and completion status</p>
          <button className="btn-primary">Generate</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>⚙️ Admin Dashboard</h1>
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
            className={`nav-btn ${activeTab === 'students' ? 'active' : ''}`}
            onClick={() => setActiveTab('students')}
          >
            👥 Students
          </button>
          <button 
            className={`nav-btn ${activeTab === 'rooms' ? 'active' : ''}`}
            onClick={() => setActiveTab('rooms')}
          >
            🏠 Rooms
          </button>
          <button 
            className={`nav-btn ${activeTab === 'requests' ? 'active' : ''}`}
            onClick={() => setActiveTab('requests')}
          >
            📝 Requests
          </button>
          <button 
            className={`nav-btn ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            📊 Reports
          </button>
        </nav>

        <main className="dashboard-main">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'students' && renderStudents()}
          {activeTab === 'rooms' && renderRooms()}
          {activeTab === 'requests' && renderRequests()}
          {activeTab === 'reports' && renderReports()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
