import React from 'react';
import { 
  Shield, 
  Camera, 
  UserCheck, 
  MapPin, 
  Phone, 
  AlertTriangle, 
  CheckCircle,
  Heart,
  Users,
  Lock
} from 'lucide-react';
import './Safety.css';

const Safety = () => {
  return (
    <div className="safety-page">
      {/* Hero Section */}
      <section className="safety-hero">
        <div className="container">
          <div className="safety-hero-content">
            <h1>Your Safety is Our Priority</h1>
            <p>
              At Herway, we've built multiple layers of security to ensure 
              every woman traveler feels safe and protected throughout their journey.
            </p>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="section security-features">
        <div className="container">
          <h2 className="section-title">Multi-Layer Security System</h2>
          <p className="section-subtitle">
            Our comprehensive security measures protect you at every step
          </p>

          <div className="security-grid">
            <div className="security-card card">
              <div className="security-icon">
                <Camera />
              </div>
              <h3>Face Verification</h3>
              <p>
                Advanced facial recognition technology ensures only verified 
                women can join our community. Your photo is securely stored 
                and encrypted.
              </p>
              <ul className="security-features-list">
                <li>AI-powered face detection</li>
                <li>Liveness detection to prevent fake photos</li>
                <li>Secure encryption of biometric data</li>
              </ul>
            </div>

            <div className="security-card card">
              <div className="security-icon">
                <UserCheck />
              </div>
              <h3>Gender Verification</h3>
              <p>
                Multiple verification layers ensure the platform remains 
                exclusively for women travelers, maintaining community safety.
              </p>
              <ul className="security-features-list">
                <li>Document verification process</li>
                <li>Manual review by our safety team</li>
                <li>Regular verification checks</li>
              </ul>
            </div>

            <div className="security-card card">
              <div className="security-icon">
                <MapPin />
              </div>
              <h3>Real-Time Location Tracking</h3>
              <p>
                Share your journey with trusted contacts and get real-time 
                updates for enhanced safety during travel.
              </p>
              <ul className="security-features-list">
                <li>Live location sharing</li>
                <li>Journey progress updates</li>
                <li>Emergency location alerts</li>
              </ul>
            </div>

            <div className="security-card card">
              <div className="security-icon">
                <Phone />
              </div>
              <h3>24/7 Safety Support</h3>
              <p>
                Round-the-clock safety monitoring and emergency response 
                system for immediate assistance when you need it.
              </p>
              <ul className="security-features-list">
                <li>Emergency hotline support</li>
                <li>Local law enforcement coordination</li>
                <li>Safety team monitoring</li>
              </ul>
            </div>

            <div className="security-card card">
              <div className="security-icon">
                <Users />
              </div>
              <h3>Community Trust System</h3>
              <p>
                Build trust through ratings, reviews, and community feedback 
                to ensure safe travel companions.
              </p>
              <ul className="security-features-list">
                <li>User rating system</li>
                <li>Travel history verification</li>
                <li>Community reporting system</li>
              </ul>
            </div>

            <div className="security-card card">
              <div className="security-icon">
                <Lock />
              </div>
              <h3>Data Protection</h3>
              <p>
                Your personal information is protected with enterprise-grade 
                encryption and strict privacy controls.
              </p>
              <ul className="security-features-list">
                <li>End-to-end encryption</li>
                <li>GDPR compliance</li>
                <li>Regular security audits</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Guidelines */}
      <section className="section safety-guidelines">
        <div className="container">
          <h2 className="section-title">Safety Guidelines</h2>
          <p className="section-subtitle">
            Follow these guidelines to ensure a safe and secure journey
          </p>

          <div className="guidelines-container">
            <div className="guideline-section">
              <h3>Before Your Journey</h3>
              <div className="guideline-list">
                <div className="guideline-item">
                  <CheckCircle className="guideline-icon" />
                  <div className="guideline-content">
                    <h4>Verify Your Travel Companion</h4>
                    <p>Always check the verification status and reviews of your travel companion</p>
                  </div>
                </div>
                <div className="guideline-item">
                  <CheckCircle className="guideline-icon" />
                  <div className="guideline-content">
                    <h4>Share Your Itinerary</h4>
                    <p>Inform trusted contacts about your travel plans and route</p>
                  </div>
                </div>
                <div className="guideline-item">
                  <CheckCircle className="guideline-icon" />
                  <div className="guideline-content">
                    <h4>Meet in Public Places</h4>
                    <p>Choose well-lit, public locations for meeting your travel companion</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="guideline-section">
              <h3>During Your Journey</h3>
              <div className="guideline-list">
                <div className="guideline-item">
                  <CheckCircle className="guideline-icon" />
                  <div className="guideline-content">
                    <h4>Stay Connected</h4>
                    <p>Keep your phone charged and share your location with trusted contacts</p>
                  </div>
                </div>
                <div className="guideline-item">
                  <CheckCircle className="guideline-icon" />
                  <div className="guideline-content">
                    <h4>Trust Your Instincts</h4>
                    <p>If something feels wrong, don't hesitate to seek help or change plans</p>
                  </div>
                </div>
                <div className="guideline-item">
                  <CheckCircle className="guideline-icon" />
                  <div className="guideline-content">
                    <h4>Use Emergency Features</h4>
                    <p>Utilize the SOS button and emergency contacts if needed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="section emergency-section">
        <div className="container">
          <h2 className="section-title">Emergency Contacts</h2>
          <p className="section-subtitle">
            Save these important numbers for emergency situations
          </p>

          <div className="emergency-grid">
            <div className="emergency-card card">
              <div className="emergency-icon emergency">
                <AlertTriangle />
              </div>
              <h3>Emergency Services</h3>
              <p className="emergency-number">100</p>
              <p>Police, Fire, Ambulance</p>
            </div>

            <div className="emergency-card card">
              <div className="emergency-icon women-helpline">
                <Heart />
              </div>
              <h3>Women Helpline</h3>
              <p className="emergency-number">1091</p>
              <p>24/7 Women Safety Support</p>
            </div>

            <div className="emergency-card card">
              <div className="emergency-icon herway-support">
                <Shield />
              </div>
              <h3>Herway Support</h3>
              <p className="emergency-number">+91 98765 43210</p>
              <p>Our Safety Team</p>
            </div>

            <div className="emergency-card card">
              <div className="emergency-icon cyber-crime">
                <Lock />
              </div>
              <h3>Cyber Crime</h3>
              <p className="emergency-number">1930</p>
              <p>Report Online Harassment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Tips */}
      <section className="section safety-tips">
        <div className="container">
          <h2 className="section-title">Additional Safety Tips</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <h4>Travel During Daytime</h4>
              <p>Whenever possible, plan your journey during daylight hours for better visibility and safety.</p>
            </div>
            <div className="tip-card">
              <h4>Keep Emergency Contacts Ready</h4>
              <p>Have important numbers saved and easily accessible on your phone.</p>
            </div>
            <div className="tip-card">
              <h4>Share Live Location</h4>
              <p>Use the app's location sharing feature to keep loved ones informed of your whereabouts.</p>
            </div>
            <div className="tip-card">
              <h4>Trust Your Community</h4>
              <p>Read reviews and ratings to choose reliable travel companions from our verified community.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section safety-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Travel Safely?</h2>
            <p>Join thousands of women who trust Herway for secure and protected journeys</p>
            <div className="cta-actions">
              <a href="/register" className="btn btn-primary">
                Get Started
              </a>
              <a href="/about" className="btn btn-secondary">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Safety;
