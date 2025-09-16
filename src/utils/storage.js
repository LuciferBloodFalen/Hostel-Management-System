// Simple localStorage-based shared store for requests and complaints

const REQUESTS_KEY = 'hms_requests';
const COMPLAINTS_KEY = 'hms_complaints';

function safeParse(json, fallback) {
  try {
    const value = JSON.parse(json);
    return Array.isArray(value) ? value : fallback;
  } catch (e) {
    return fallback;
  }
}

// Requests
export function getAllRequests() {
  const raw = localStorage.getItem(REQUESTS_KEY);
  return safeParse(raw, []);
}

export function addRequest(newRequest) {
  const existing = getAllRequests();
  const withId = {
    id: existing.length > 0 ? Math.max(...existing.map(r => r.id || 0)) + 1 : 1,
    status: 'Pending',
    date: new Date().toISOString().split('T')[0],
    ...newRequest
  };
  const updated = [...existing, withId];
  localStorage.setItem(REQUESTS_KEY, JSON.stringify(updated));
  return withId;
}

export function updateRequestStatus(requestId, newStatus) {
  const existing = getAllRequests();
  const updated = existing.map(r => r.id === requestId ? { ...r, status: newStatus } : r);
  localStorage.setItem(REQUESTS_KEY, JSON.stringify(updated));
  return updated;
}

// Complaints
export function getAllComplaints() {
  const raw = localStorage.getItem(COMPLAINTS_KEY);
  return safeParse(raw, []);
}

export function addComplaint(newComplaint) {
  const existing = getAllComplaints();
  const withId = {
    id: existing.length > 0 ? Math.max(...existing.map(c => c.id || 0)) + 1 : 1,
    status: 'Open',
    date: new Date().toISOString().split('T')[0],
    priority: newComplaint.priority || 'Medium',
    ...newComplaint
  };
  const updated = [...existing, withId];
  localStorage.setItem(COMPLAINTS_KEY, JSON.stringify(updated));
  return withId;
}

export function updateComplaintStatus(complaintId, newStatus) {
  const existing = getAllComplaints();
  const updated = existing.map(c => c.id === complaintId ? { ...c, status: newStatus } : c);
  localStorage.setItem(COMPLAINTS_KEY, JSON.stringify(updated));
  return updated;
}


