import React from 'react';
import { User, LayoutDashboard, MapPin, Shield, Settings, LogOut, Bell, MessageCircle } from 'lucide-react';
import './Profile.css';

const Profile = () => {
  return (
    <div className="profile-page">
      <div className="profile-layout">
        <aside className="profile-sidebar">
          <div className="brand">
            <div className="brand-mark">💜</div>
            <span className="brand-name">Herway</span>
          </div>

          <nav className="side-nav" aria-label="Profile navigation">
            <button className="nav-item active" type="button">
              <User />
              <span>Profile</span>
            </button>
            <button className="nav-item" type="button">
              <LayoutDashboard />
              <span>Dashboard</span>
            </button>
            <button className="nav-item" type="button">
              <MapPin />
              <span>Trips</span>
            </button>
            <button className="nav-item" type="button">
              <MessageCircle />
              <span>Messages</span>
            </button>
            <button className="nav-item" type="button">
              <Bell />
              <span>Notifications</span>
            </button>
            <button className="nav-item" type="button">
              <Shield />
              <span>Safety</span>
            </button>

            <div className="nav-separator" />

            <button className="nav-item" type="button">
              <Settings />
              <span>Settings</span>
            </button>
            <button className="nav-item danger" type="button">
              <LogOut />
              <span>Logout</span>
            </button>
          </nav>
        </aside>

        <section className="profile-content">
          <header className="profile-header">
            <h1>Welcome to Herway</h1>
            <p>Your safe space to manage your journeys and profile</p>
          </header>

          <div className="profile-card-grid">
            <div className="profile-card">
              <div className="card-title">Profile Overview</div>
              <div className="profile-row">
                <div className="avatar">H</div>
                <div className="profile-basic">
                  <h3 className="name">Herway Traveler</h3>
                  <p className="meta">Verified Member</p>
                </div>
              </div>
              <div className="quick-stats">
                <div className="stat">
                  <span className="stat-number">24</span>
                  <span className="stat-label">Trips</span>
                </div>
                <div className="stat">
                  <span className="stat-number">4.8</span>
                  <span className="stat-label">Rating</span>
                </div>
                <div className="stat">
                  <span className="stat-number">98%</span>
                  <span className="stat-label">Safety</span>
                </div>
              </div>
            </div>

            <div className="profile-card">
              <div className="card-title">Account Details</div>
              <div className="details-list">
                <div className="detail">
                  <span className="label">Email</span>
                  <span className="value">user@example.com</span>
                </div>
                <div className="detail">
                  <span className="label">Phone</span>
                  <span className="value">+91 90000 00000</span>
                </div>
                <div className="detail">
                  <span className="label">Location</span>
                  <span className="value">India</span>
                </div>
              </div>
            </div>

            <div className="profile-card">
              <div className="card-title">Security & Safety</div>
              <ul className="bulleted">
                <li>Face verification completed</li>
                <li>Gender verification completed</li>
                <li>Emergency contact added</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;


