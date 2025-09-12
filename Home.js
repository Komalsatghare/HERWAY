import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Shield, 
  Users, 
  MapPin, 
  ArrowRight, 
  Star, 
  CheckCircle,
  Camera,
  UserCheck,
  Navigation,
  MessageCircle
} from 'lucide-react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Travel <span className="text-gradient">Together</span>, 
                Stay <span className="text-gradient">Safe</span>
              </h1>
              <p className="hero-subtitle">
                Connect with fellow women travelers on the same route. 
                Find travel companions, share rides, and ensure your safety 
                with our verified community of women travelers.
              </p>
              <div className="hero-actions">
                <Link to="/register" className="btn btn-primary">
                  Get Started
                  <ArrowRight />
                </Link>
                <Link to="/about" className="btn btn-secondary">
                  Learn More
                </Link>
              </div>
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-number">10K+</span>
                  <span className="stat-label">Women Travelers</span>
                </div>
                <div className="stat">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Cities Covered</span>
                </div>
                <div className="stat">
                  <span className="stat-number">99%</span>
                  <span className="stat-label">Safety Rate</span>
                </div>
              </div>
            </div>
                           <div className="hero-image">
                 <div className="hero-illustration">
                   {/* Map background with route lines */}
                   <div className="map-background">
                     <div className="route-lines">
                       <div className="route-line line-1"></div>
                       <div className="route-line line-2"></div>
                       <div className="route-line line-3"></div>
                     </div>
                     
                     {/* Location pins */}
                     <div className="location-pins">
                       <div className="pin pin-1">
                         <div className="pin-dot"></div>
                         <span className="pin-label">Delhi</span>
                       </div>
                       <div className="pin pin-2">
                         <div className="pin-dot"></div>
                         <span className="pin-label">Mumbai</span>
                       </div>
                       <div className="pin pin-3">
                         <div className="pin-dot"></div>
                         <span className="pin-label">Pune</span>
                       </div>
                       <div className="pin pin-4">
                         <div className="pin-dot"></div>
                         <span className="pin-label">Nagpur</span>
                       </div>
                     </div>
                   </div>
                   
                   {/* Central route matching illustration */}
                   <div className="route-match-illustration">
                     <div className="match-circle">
                       <div className="match-icon">🚗</div>
                       <div className="match-text">Route Match</div>
                     </div>
                     
                     {/* Simple connection dots */}
                     <div className="connection-dots">
                       <div className="dot dot-1"></div>
                       <div className="dot dot-2"></div>
                       <div className="dot dot-3"></div>
                       <div className="dot dot-4"></div>
                     </div>
                   </div>
                   
                                       {/* Interactive feature cards below */}
                    <div className="feature-cards-container">
                      <div className="feature-card interactive-card verified-card">
                        <div className="card-icon-wrapper">
                          <div className="card-icon">✓</div>
                          <div className="icon-illustration">👩</div>
                        </div>
                        <div className="card-content">
                          <h3>Verified Profiles</h3>
                          <p>Every traveler is face + ID verified. Your safety first.</p>
                        </div>
                        <div className="card-accent"></div>
                      </div>
                      
                      <div className="feature-card interactive-card route-card">
                        <div className="card-icon-wrapper">
                          <div className="card-icon">🚗</div>
                          <div className="icon-illustration">🗺️</div>
                        </div>
                        <div className="card-content">
                          <h3>Route Match</h3>
                          <p>Find trusted women on the same route instantly.</p>
                        </div>
                        <div className="card-accent"></div>
                      </div>
                      
                      <div className="feature-card interactive-card safety-card">
                        <div className="card-icon-wrapper">
                          <div className="card-icon">🛡️</div>
                          <div className="icon-illustration">🔒</div>
                        </div>
                        <div className="card-content">
                          <h3>Safe Travel</h3>
                          <p>Travel together with 24/7 support and SOS features.</p>
                        </div>
                        <div className="card-accent"></div>
                      </div>
                    </div>
                 </div>
               </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section features-section">
        <div className="container">
          <h2 className="section-title">Why Choose Herway?</h2>
          <p className="section-subtitle">
            Our platform is designed specifically for women travelers with 
            advanced safety features and verification systems.
          </p>
          
          <div className="features-grid">
            <div className="feature-card card">
              <div className="feature-icon">
                <Camera />
              </div>
              <h3>Face Verification</h3>
              <p>
                Advanced facial recognition technology ensures that only 
                verified women can join our community.
              </p>
            </div>

            <div className="feature-card card">
              <div className="feature-icon">
                <UserCheck />
              </div>
              <h3>Gender Verification</h3>
              <p>
                Multiple verification layers to ensure the platform 
                remains exclusively for women travelers.
              </p>
            </div>

            <div className="feature-card card">
              <div className="feature-icon">
                <Navigation />
              </div>
              <h3>Smart Route Matching</h3>
              <p>
                AI-powered algorithm matches you with travelers 
                going on the same or similar routes.
              </p>
            </div>

            <div className="feature-card card">
              <div className="feature-icon">
                <MessageCircle />
              </div>
              <h3>Safe Communication</h3>
              <p>
                Built-in chat system with safety features and 
                emergency contact integration.
              </p>
            </div>

            <div className="feature-card card">
              <div className="feature-icon">
                <Shield />
              </div>
              <h3>24/7 Safety Support</h3>
              <p>
                Round-the-clock safety monitoring and emergency 
                response system for your peace of mind.
              </p>
            </div>

            <div className="feature-card card">
              <div className="feature-icon">
                <Heart />
              </div>
              <h3>Community Trust</h3>
              <p>
                Build trust through ratings, reviews, and 
                community feedback system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section how-it-works-section">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Get started with Herway in just a few simple steps
          </p>

          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Create Your Profile</h3>
                <p>Sign up and complete your profile with face and gender verification</p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Find Your Route</h3>
                <p>Search for travelers going to the same destination or along your route</p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Connect & Travel</h3>
                <p>Send requests, chat safely, and travel together with verified companions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section testimonials-section">
        <div className="container">
          <h2 className="section-title">What Our Travelers Say</h2>
          <p className="section-subtitle">
            Real stories from women who found safe travel companions through Herway
          </p>

          <div className="testimonials-grid">
            <div className="testimonial-card card">
              <div className="testimonial-rating">
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
              </div>
              <p className="testimonial-text">
                "I was nervous about traveling alone to Mumbai, but Herway connected me 
                with Priya who was going the same route. We had a wonderful journey together!"
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">S</div>
                <div className="author-info">
                  <h4>Sarah K.</h4>
                  <span>Delhi → Mumbai</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card card">
              <div className="testimonial-rating">
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
              </div>
              <p className="testimonial-text">
                "The verification process made me feel so safe. I found a travel buddy 
                for my trip to Bangalore and we're now good friends!"
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">A</div>
                <div className="author-info">
                  <h4>Anjali M.</h4>
                  <span>Chennai → Bangalore</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card card">
              <div className="testimonial-rating">
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
              </div>
              <p className="testimonial-text">
                "Herway's safety features are amazing. The emergency contact system 
                and real-time tracking gave me complete peace of mind."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">R</div>
                <div className="author-info">
                  <h4>Riya S.</h4>
                  <span>Pune → Hyderabad</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Travel Safely?</h2>
            <p>Join thousands of women who trust Herway for safe and secure travel</p>
            <div className="cta-actions">
              <Link to="/register" className="btn btn-primary">
                Start Your Journey
                <ArrowRight />
              </Link>
              <Link to="/safety" className="btn btn-secondary">
                Learn About Safety
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
