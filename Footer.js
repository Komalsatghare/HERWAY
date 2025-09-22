import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Shield, Users, MapPin, Mail, Phone, Instagram, Twitter, Facebook } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-brand">
              <div className="brand-logo">
                <Heart className="heart-icon" />
                <span className="brand-text">Herway</span>
              </div>
              <p className="footer-description">
                Connecting women travelers for safe and secure journeys. 
                Travel together, stay safe together.
              </p>
            </div>
            <div className="social-links">
              <a href="#" className="social-link">
                <Instagram />
              </a>
              <a href="#" className="social-link">
                <Twitter />
              </a>
              <a href="#" className="social-link">
                <Facebook />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/safety">Safety & Security</Link></li>
              <li><Link to="/register">Join Now</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Features</h3>
            <ul className="footer-links">
              <li>
                <Shield className="feature-icon" />
                Face Verification
              </li>
              <li>
                <Users className="feature-icon" />
                Gender Verification
              </li>
              <li>
                <MapPin className="feature-icon" />
                Route Matching
              </li>
              <li>
                <Heart className="feature-icon" />
                Safe Travel
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact Us</h3>
            <div className="contact-info">
              <div className="contact-item">
                <Mail className="contact-icon" />
                <span>support@herway.com</span>
              </div>
              <div className="contact-item">
                <Phone className="contact-icon" />
                <span>+91 98765 43210</span>
              </div>
            </div>
            <div className="emergency-info">
              <p>Emergency: 100</p>
              <p>Women Helpline: 1091</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2024 Herway. All rights reserved.</p>
            <div className="footer-bottom-links">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
              <Link to="/safety">Safety Guidelines</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
