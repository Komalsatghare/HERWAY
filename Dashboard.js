import React, { useState } from 'react';
import { 
  Heart, 
  MapPin, 
  Users, 
  Calendar, 
  MessageCircle, 
  Bell,
  Search,
  Filter,
  Plus,
  MoreVertical,
  Star,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for demonstration
  const upcomingTrips = [
    {
      id: 1,
      destination: 'Mumbai',
      date: '2024-02-15',
      companion: 'Priya S.',
      status: 'confirmed',
      rating: 4.8
    },
    {
      id: 2,
      destination: 'Bangalore',
      date: '2024-02-20',
      companion: 'Anjali M.',
      status: 'pending',
      rating: 4.9
    }
  ];

  const recentConnections = [
    {
      id: 1,
      name: 'Sarah K.',
      destination: 'Delhi → Mumbai',
      date: '2024-01-28',
      rating: 5.0,
      status: 'completed'
    },
    {
      id: 2,
      name: 'Riya S.',
      destination: 'Pune → Hyderabad',
      date: '2024-01-25',
      rating: 4.7,
      status: 'completed'
    }
  ];

  const notifications = [
    {
      id: 1,
      type: 'trip',
      message: 'Your trip to Mumbai has been confirmed',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'message',
      message: 'New message from Priya S.',
      time: '1 day ago',
      read: false
    },
    {
      id: 3,
      type: 'safety',
      message: 'Safety check-in reminder for your upcoming trip',
      time: '2 days ago',
      read: true
    }
  ];

  const renderOverview = () => (
    <div className="dashboard-overview">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <MapPin />
          </div>
          <div className="stat-content">
            <h3>Total Trips</h3>
            <p className="stat-number">24</p>
            <span className="stat-change positive">+12% this month</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Users />
          </div>
          <div className="stat-content">
            <h3>Travel Companions</h3>
            <p className="stat-number">18</p>
            <span className="stat-change positive">+5 new connections</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Star />
          </div>
          <div className="stat-content">
            <h3>Average Rating</h3>
            <p className="stat-number">4.8</p>
            <span className="stat-change positive">+0.2 this month</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <CheckCircle />
          </div>
          <div className="stat-content">
            <h3>Safety Score</h3>
            <p className="stat-number">98%</p>
            <span className="stat-change positive">+2% improvement</span>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="actions-grid">
          <button className="action-btn">
            <Plus />
            <span>Plan New Trip</span>
          </button>
          <button className="action-btn">
            <Search />
            <span>Find Companions</span>
          </button>
          <button className="action-btn">
            <MessageCircle />
            <span>View Messages</span>
          </button>
          <button className="action-btn">
            <Bell />
            <span>Safety Check-in</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderTrips = () => (
    <div className="dashboard-trips">
      <div className="trips-header">
        <h3>Upcoming Trips</h3>
        <button className="btn btn-primary">
          <Plus />
          Plan Trip
        </button>
      </div>

      <div className="trips-list">
        {upcomingTrips.map(trip => (
          <div key={trip.id} className="trip-card">
            <div className="trip-info">
              <div className="trip-destination">
                <MapPin />
                <h4>{trip.destination}</h4>
              </div>
              <div className="trip-details">
                <span className="trip-date">
                  <Calendar />
                  {trip.date}
                </span>
                <span className="trip-companion">
                  <Users />
                  {trip.companion}
                </span>
              </div>
            </div>
            <div className="trip-status">
              <span className={`status-badge ${trip.status}`}>
                {trip.status === 'confirmed' ? <CheckCircle /> : <Clock />}
                {trip.status}
              </span>
              <div className="trip-rating">
                <Star />
                {trip.rating}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderConnections = () => (
    <div className="dashboard-connections">
      <div className="connections-header">
        <h3>Recent Connections</h3>
        <div className="search-filter">
          <div className="search-box">
            <Search />
            <input
              type="text"
              placeholder="Search connections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="filter-btn">
            <Filter />
            Filter
          </button>
        </div>
      </div>

      <div className="connections-list">
        {recentConnections.map(connection => (
          <div key={connection.id} className="connection-card">
            <div className="connection-avatar">
              {connection.name.charAt(0)}
            </div>
            <div className="connection-info">
              <h4>{connection.name}</h4>
              <p className="connection-route">{connection.destination}</p>
              <span className="connection-date">{connection.date}</span>
            </div>
            <div className="connection-rating">
              <Star />
              {connection.rating}
            </div>
            <div className="connection-status">
              <span className={`status-badge ${connection.status}`}>
                {connection.status === 'completed' ? <CheckCircle /> : <Clock />}
                {connection.status}
              </span>
            </div>
            <button className="connection-menu">
              <MoreVertical />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="dashboard-notifications">
      <div className="notifications-header">
        <h3>Notifications</h3>
        <button className="mark-all-read">Mark all as read</button>
      </div>

      <div className="notifications-list">
        {notifications.map(notification => (
          <div key={notification.id} className={`notification-item ${!notification.read ? 'unread' : ''}`}>
            <div className="notification-icon">
              {notification.type === 'trip' && <MapPin />}
              {notification.type === 'message' && <MessageCircle />}
              {notification.type === 'safety' && <AlertCircle />}
            </div>
            <div className="notification-content">
              <p>{notification.message}</p>
              <span className="notification-time">{notification.time}</span>
            </div>
            {!notification.read && <div className="unread-indicator" />}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="container">
          <div className="dashboard-welcome">
            <div className="welcome-content">
              <h1>Welcome back, Sarah!</h1>
              <p>Ready for your next safe journey?</p>
            </div>
            <div className="dashboard-actions">
              <button className="notification-btn">
                <Bell />
                <span className="notification-count">3</span>
              </button>
              <div className="user-profile">
                <div className="profile-avatar">S</div>
                <span className="profile-name">Sarah K.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="container">
          <div className="dashboard-tabs">
            <button
              className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`tab-btn ${activeTab === 'trips' ? 'active' : ''}`}
              onClick={() => setActiveTab('trips')}
            >
              My Trips
            </button>
            <button
              className={`tab-btn ${activeTab === 'connections' ? 'active' : ''}`}
              onClick={() => setActiveTab('connections')}
            >
              Connections
            </button>
            <button
              className={`tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('notifications')}
            >
              Notifications
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'trips' && renderTrips()}
            {activeTab === 'connections' && renderConnections()}
            {activeTab === 'notifications' && renderNotifications()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
