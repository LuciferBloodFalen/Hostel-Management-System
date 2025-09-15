import React, { useState } from 'react';
import './WardenDashboard.css';

/**
 * Warden Dashboard Component
 * 
 * Provides a comprehensive dashboard specifically designed for wardens,
 * including student management, room monitoring, complaint handling,
 * and daily operations management.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.user - Current warden user data
 * @param {Function} props.onLogout - Callback function to handle user logout
 * @returns {JSX.Element} The warden dashboard component
 */
const WardenDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [assignedStudents, setAssignedStudents] = useState([
    { id: 1, name: 'John Doe', usn: '1MS20CS001', room: '205', block: 'A', status: 'Active', attendance: 95 },
    { id: 2, name: 'Jane Smith', usn: '1MS20CS002', room: '206', block: 'A', status: 'Active', attendance: 88 },
    { id: 3, name: 'Mike Johnson', usn: '1MS20CS003', room: '301', block: 'B', status: 'Active', attendance: 92 },
    { id: 4, name: 'Sarah Wilson', usn: '1MS20CS004', room: '302', block: 'B', status: 'Warning', attendance: 75 }
  ]);

  const [complaints, setComplaints] = useState([
    { id: 1, student: 'John Doe', type: 'Noise', status: 'Open', date: '2024-01-15', priority: 'Medium', description: 'Loud music from room 205' },
    { id: 2, student: 'Jane Smith', type: 'Cleanliness', status: 'Resolved', date: '2024-01-10', priority: 'Low', description: 'Bathroom cleaning issue' },
    { id: 3, student: 'Mike Johnson', type: 'Facilities', status: 'In Progress', date: '2024-01-12', priority: 'High', description: 'Broken AC in room 301' }
  ]);

  const [events, setEvents] = useState([
    { id: 1, title: 'Hostel Meeting', date: '2024-01-25', time: '6:00 PM', location: 'Common Hall', type: 'Meeting' },
    { id: 2, title: 'Sports Day', date: '2024-02-10', time: '9:00 AM', location: 'Sports Ground', type: 'Event' },
    { id: 3, title: 'Room Inspection', date: '2024-01-30', time: '10:00 AM', location: 'All Blocks', type: 'Inspection' }
  ]);

  const wardenStats = {
    assignedStudents: 156,
    totalRooms: 78,
    activeComplaints: 12,
    resolvedComplaints: 45,
    upcomingEvents: 3,
    attendanceRate: 89.5
  };

  /**
   * Handles updating complaint status
   * 
   * @param {number} complaintId - ID of the complaint to update
   * @param {string} newStatus - New status for the complaint
   */
  const handleComplaintStatusUpdate = (complaintId, newStatus) => {
    setComplaints(complaints.map(complaint => 
      complaint.id === complaintId 
        ? { ...complaint, status: newStatus }
        : complaint
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
            <h3>Assigned Students</h3>
            <p className="stat-number">{wardenStats.assignedStudents}</p>
            <span className="stat-change positive">+3 this week</span>
          </div>
        </div>

        <div className="stat-card secondary">
          <div className="stat-icon">🏠</div>
          <div className="stat-info">
            <h3>Managed Rooms</h3>
            <p className="stat-number">{wardenStats.totalRooms}</p>
            <span className="stat-change neutral">No change</span>
          </div>
        </div>

        <div className="stat-card warning">
          <div className="stat-icon">📢</div>
          <div className="stat-info">
            <h3>Active Complaints</h3>
            <p className="stat-number">{wardenStats.activeComplaints}</p>
            <span className="stat-change negative">+2 today</span>
          </div>
        </div>

        <div className="stat-card success">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <h3>Attendance Rate</h3>
            <p className="stat-number">{wardenStats.attendanceRate}%</p>
            <span className="stat-change positive">+1.2% this month</span>
          </div>
        </div>
      </div>

      <div className="quick-actions-section">
        <h3>Quick Actions</h3>
        <div className="quick-actions">
          <button className="action-btn primary" onClick={() => setActiveTab('students')}>
            👥 Manage Students
          </button>
          <button className="action-btn secondary" onClick={() => setActiveTab('complaints')}>
            📢 Handle Complaints
          </button>
          <button className="action-btn secondary" onClick={() => setActiveTab('rooms')}>
            🏠 Room Status
          </button>
          <button className="action-btn secondary" onClick={() => setActiveTab('events')}>
            📅 Manage Events
          </button>
        </div>
      </div>

      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon">📢</div>
            <div className="activity-content">
              <p>New complaint received from John Doe</p>
              <span className="activity-time">1 hour ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">✅</div>
            <div className="activity-content">
              <p>Complaint resolved: Room 206 cleaning issue</p>
              <span className="activity-time">3 hours ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">👥</div>
            <div className="activity-content">
              <p>Room inspection completed for Block A</p>
              <span className="activity-time">5 hours ago</span>
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
          <option value="Warning">Warning</option>
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
              <th>Attendance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignedStudents.map(student => (
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
                  <span className={`attendance-badge ${student.attendance >= 90 ? 'excellent' : student.attendance >= 80 ? 'good' : 'poor'}`}>
                    {student.attendance}%
                  </span>
                </td>
                <td>
                  <button className="action-btn-small">View</button>
                  <button className="action-btn-small">Warn</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  /**
   * Renders the complaints management tab
   * 
   * @returns {JSX.Element} Complaints management tab content
   */
  const renderComplaints = () => (
    <div className="complaints-content">
      <div className="section-header">
        <h3>Complaint Management</h3>
        <div className="header-actions">
          <button className="btn-secondary">Export Data</button>
        </div>
      </div>

      <div className="complaints-list">
        {complaints.map(complaint => (
          <div key={complaint.id} className="complaint-card">
            <div className="complaint-header">
              <div className="complaint-info">
                <h4>{complaint.type} Complaint</h4>
                <p>From: {complaint.student}</p>
                <span className="complaint-date">{complaint.date}</span>
              </div>
              <div className="complaint-meta">
                <span className={`priority-badge ${complaint.priority.toLowerCase()}`}>
                  {complaint.priority}
                </span>
                <span className={`status-badge ${complaint.status.toLowerCase().replace(' ', '-')}`}>
                  {complaint.status}
                </span>
              </div>
            </div>
            <div className="complaint-description">
              <p>{complaint.description}</p>
            </div>
            <div className="complaint-actions">
              {complaint.status === 'Open' && (
                <>
                  <button 
                    className="btn-warning"
                    onClick={() => handleComplaintStatusUpdate(complaint.id, 'In Progress')}
                  >
                    Start Investigation
                  </button>
                  <button 
                    className="btn-success"
                    onClick={() => handleComplaintStatusUpdate(complaint.id, 'Resolved')}
                  >
                    Resolve
                  </button>
                </>
              )}
              {complaint.status === 'In Progress' && (
                <button 
                  className="btn-success"
                  onClick={() => handleComplaintStatusUpdate(complaint.id, 'Resolved')}
                >
                  Mark Resolved
                </button>
              )}
              <button className="btn-secondary">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  /**
   * Renders the rooms status tab
   * 
   * @returns {JSX.Element} Rooms status tab content
   */
  const renderRooms = () => (
    <div className="rooms-content">
      <div className="section-header">
        <h3>Room Status Monitoring</h3>
        <div className="header-actions">
          <button className="btn-secondary">Export Data</button>
          <button className="btn-primary">Schedule Inspection</button>
        </div>
      </div>

      <div className="room-status-grid">
        <div className="room-status-card">
          <h4>Block A - Floor 2</h4>
          <div className="room-list">
            <div className="room-item occupied">
              <span className="room-number">205</span>
              <span className="room-status">Occupied</span>
              <span className="room-students">2 students</span>
            </div>
            <div className="room-item partially-occupied">
              <span className="room-number">206</span>
              <span className="room-status">Partially Occupied</span>
              <span className="room-students">1 student</span>
            </div>
          </div>
        </div>

        <div className="room-status-card">
          <h4>Block B - Floor 3</h4>
          <div className="room-list">
            <div className="room-item occupied">
              <span className="room-number">301</span>
              <span className="room-status">Occupied</span>
              <span className="room-students">2 students</span>
            </div>
            <div className="room-item available">
              <span className="room-number">302</span>
              <span className="room-status">Available</span>
              <span className="room-students">0 students</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  /**
   * Renders the events management tab
   * 
   * @returns {JSX.Element} Events management tab content
   */
  const renderEvents = () => (
    <div className="events-content">
      <div className="section-header">
        <h3>Event Management</h3>
        <div className="header-actions">
          <button className="btn-secondary">Export Data</button>
          <button className="btn-primary">Create Event</button>
        </div>
      </div>

      <div className="events-list">
        {events.map(event => (
          <div key={event.id} className="event-card">
            <div className="event-header">
              <h4>{event.title}</h4>
              <span className={`event-type ${event.type.toLowerCase()}`}>
                {event.type}
              </span>
            </div>
            <div className="event-details">
              <div className="event-detail">
                <span className="event-label">Date:</span>
                <span className="event-value">{event.date}</span>
              </div>
              <div className="event-detail">
                <span className="event-label">Time:</span>
                <span className="event-value">{event.time}</span>
              </div>
              <div className="event-detail">
                <span className="event-label">Location:</span>
                <span className="event-value">{event.location}</span>
              </div>
            </div>
            <div className="event-actions">
              <button className="btn-primary">Edit</button>
              <button className="btn-secondary">View Details</button>
              <button className="btn-danger">Cancel</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="warden-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>🛡️ Warden Dashboard</h1>
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
            className={`nav-btn ${activeTab === 'complaints' ? 'active' : ''}`}
            onClick={() => setActiveTab('complaints')}
          >
            📢 Complaints
          </button>
          <button 
            className={`nav-btn ${activeTab === 'rooms' ? 'active' : ''}`}
            onClick={() => setActiveTab('rooms')}
          >
            🏠 Rooms
          </button>
          <button 
            className={`nav-btn ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            📅 Events
          </button>
        </nav>

        <main className="dashboard-main">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'students' && renderStudents()}
          {activeTab === 'complaints' && renderComplaints()}
          {activeTab === 'rooms' && renderRooms()}
          {activeTab === 'events' && renderEvents()}
        </main>
      </div>
    </div>
  );
};

export default WardenDashboard;
