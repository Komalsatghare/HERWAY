import React from 'react';
import { 
  Heart, 
  Users, 
  Shield, 
  MapPin, 
  Star, 
  Award,
  Target,
  Globe,
  Clock,
  TrendingUp
} from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <h1>About Herway</h1>
            <p>
              Empowering women to travel safely and confidently by connecting 
              them with verified travel companions on the same route.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section mission-section">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2>Our Mission</h2>
              <p>
                At Herway, we believe that every woman should have the freedom 
                to travel without fear. Our mission is to create a safe, 
                supportive community where women can find travel companions, 
                share journeys, and explore the world together.
              </p>
              <p>
                We're committed to breaking down the barriers that prevent 
                women from traveling independently, while ensuring their safety 
                through advanced verification systems and community support.
              </p>
            </div>
            <div className="mission-image">
              <div className="mission-illustration">
                <Heart className="heart-icon" />
                <span>Empowering Women Travelers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section story-section">
        <div className="container">
          <h2 className="section-title">Our Story</h2>
          <p className="section-subtitle">
            How Herway came to life and evolved into a trusted platform for women travelers
          </p>

          <div className="story-timeline">
            <div className="timeline-item">
              <div className="timeline-marker">2020</div>
              <div className="timeline-content">
                <h3>The Beginning</h3>
                <p>
                  Founded by a group of women who experienced the challenges 
                  of traveling alone, Herway was born from a simple idea: 
                  what if women could connect with each other for safe travel?
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker">2021</div>
              <div className="timeline-content">
                <h3>First Launch</h3>
                <p>
                  We launched our beta platform with basic features and 
                  a small community of women travelers in major Indian cities.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker">2022</div>
              <div className="timeline-content">
                <h3>Growth & Innovation</h3>
                <p>
                  Introduced advanced safety features including face verification, 
                  real-time tracking, and expanded to 50+ cities across India.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker">2023</div>
              <div className="timeline-content">
                <h3>Community Milestone</h3>
                <p>
                  Reached 10,000+ verified women travelers and expanded 
                  our safety features with 24/7 support and emergency response.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker">2024</div>
              <div className="timeline-content">
                <h3>Future Forward</h3>
                <p>
                  Continuing to innovate with AI-powered route matching, 
                  enhanced security, and expanding our reach across South Asia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section values-section">
        <div className="container">
          <h2 className="section-title">Our Core Values</h2>
          <p className="section-subtitle">
            The principles that guide everything we do at Herway
          </p>

          <div className="values-grid">
            <div className="value-card card">
              <div className="value-icon">
                <Shield />
              </div>
              <h3>Safety First</h3>
              <p>
                Every feature we build prioritizes the safety and security 
                of our community members above all else.
              </p>
            </div>

            <div className="value-card card">
              <div className="value-icon">
                <Users />
              </div>
              <h3>Community Trust</h3>
              <p>
                We believe in building a supportive network where women 
                can trust and rely on each other for safe travel.
              </p>
            </div>

            <div className="value-card card">
              <div className="value-icon">
                <Heart />
              </div>
              <h3>Empowerment</h3>
              <p>
                Our goal is to empower women to travel confidently and 
                independently, breaking down traditional barriers.
              </p>
            </div>

            <div className="value-card card">
              <div className="value-icon">
                <Globe />
              </div>
              <h3>Inclusivity</h3>
              <p>
                We welcome women from all backgrounds, cultures, and 
                walks of life to join our community.
              </p>
            </div>

            <div className="value-card card">
              <div className="value-icon">
                <Target />
              </div>
              <h3>Innovation</h3>
              <p>
                We continuously innovate and improve our platform to 
                provide the best possible experience for our users.
              </p>
            </div>

            <div className="value-card card">
              <div className="value-icon">
                <Star />
              </div>
              <h3>Excellence</h3>
              <p>
                We strive for excellence in everything we do, from 
                user experience to safety features and support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section team-section">
        <div className="container">
          <h2 className="section-title">Meet Our Team</h2>
          <p className="section-subtitle">
            The passionate individuals behind Herway's mission
          </p>

          <div className="team-grid">
            <div className="team-member card">
              <div className="member-avatar">P</div>
              <h3>Priya Sharma</h3>
              <p className="member-role">Founder & CEO</p>
              <p className="member-bio">
                Former travel blogger who experienced the challenges of 
                solo travel firsthand. Passionate about women's safety and empowerment.
              </p>
            </div>

            <div className="team-member card">
              <div className="member-avatar">A</div>
              <h3>Anjali Patel</h3>
              <p className="member-role">CTO & Head of Security</p>
              <p className="member-bio">
                Tech expert with 10+ years in cybersecurity. Leads our 
                safety features and verification systems development.
              </p>
            </div>

            <div className="team-member card">
              <div className="member-avatar">R</div>
              <h3>Riya Singh</h3>
              <p className="member-role">Head of Community</p>
              <p className="member-bio">
                Community builder who ensures every member feels safe, 
                supported, and connected within our platform.
              </p>
            </div>

            <div className="team-member card">
              <div className="member-avatar">S</div>
              <h3>Sarah Khan</h3>
              <p className="member-role">Head of Operations</p>
              <p className="member-bio">
                Operations expert who manages our day-to-day activities 
                and ensures smooth platform operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section stats-section">
        <div className="container">
          <h2 className="section-title">Herway by the Numbers</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon">
                <Users />
              </div>
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Verified Women Travelers</div>
            </div>

            <div className="stat-item">
              <div className="stat-icon">
                <MapPin />
              </div>
              <div className="stat-number">500+</div>
              <div className="stat-label">Cities Covered</div>
            </div>

            <div className="stat-item">
              <div className="stat-icon">
                <Clock />
              </div>
              <div className="stat-number">24/7</div>
              <div className="stat-label">Safety Support</div>
            </div>

            <div className="stat-item">
              <div className="stat-icon">
                <TrendingUp />
              </div>
              <div className="stat-number">99%</div>
              <div className="stat-label">Safety Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="section awards-section">
        <div className="container">
          <h2 className="section-title">Recognition & Awards</h2>
          <div className="awards-grid">
            <div className="award-item">
              <Award className="award-icon" />
              <h3>Best Women Safety App 2023</h3>
              <p>Digital India Awards</p>
            </div>
            <div className="award-item">
              <Award className="award-icon" />
              <h3>Innovation in Travel Tech</h3>
              <p>Startup India Awards</p>
            </div>
            <div className="award-item">
              <Award className="award-icon" />
              <h3>Community Impact Award</h3>
              <p>Women in Tech Awards</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section about-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Join the Herway Community</h2>
            <p>Be part of a movement that's changing how women travel</p>
            <div className="cta-actions">
              <a href="/register" className="btn btn-primary">
                Get Started Today
              </a>
              <a href="/safety" className="btn btn-secondary">
                Learn About Safety
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
