import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  Camera, 
  Heart, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle,
  Upload
} from 'lucide-react';
import './Register.css';

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    faceImage: null,
    genderVerification: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      const age = new Date().getFullYear() - new Date(formData.dateOfBirth).getFullYear();
      if (age < 18) {
        newErrors.dateOfBirth = 'You must be at least 18 years old';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};

    if (!formData.faceImage) {
      newErrors.faceImage = 'Face verification photo is required';
    }

    if (!formData.genderVerification) {
      newErrors.genderVerification = 'Please confirm you are a woman';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    let isValid = false;
    
    if (step === 1) {
      isValid = validateStep1();
    } else if (step === 2) {
      isValid = validateStep2();
    }

    if (isValid) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep3()) {
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      console.log('Registration successful:', formData);
      // Handle successful registration here
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({
          ...prev,
          faceImage: 'File size must be less than 5MB'
        }));
        return;
      }
      setFormData(prev => ({
        ...prev,
        faceImage: file
      }));
      setErrors(prev => ({
        ...prev,
        faceImage: ''
      }));
    }
  };

  const renderStep1 = () => (
    <div className="form-step">
      <h2>Personal Information</h2>
      <p>Let's start with your basic details</p>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <div className="input-wrapper">
            <User className="input-icon" />
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`input ${errors.firstName ? 'error' : ''}`}
              placeholder="Enter your first name"
            />
          </div>
          {errors.firstName && <span className="error-message">{errors.firstName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <div className="input-wrapper">
            <User className="input-icon" />
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`input ${errors.lastName ? 'error' : ''}`}
              placeholder="Enter your last name"
            />
          </div>
          {errors.lastName && <span className="error-message">{errors.lastName}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <div className="input-wrapper">
          <Mail className="input-icon" />
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`input ${errors.email ? 'error' : ''}`}
            placeholder="Enter your email address"
          />
        </div>
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone Number</label>
        <div className="input-wrapper">
          <Phone className="input-icon" />
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`input ${errors.phone ? 'error' : ''}`}
            placeholder="Enter your phone number"
          />
        </div>
        {errors.phone && <span className="error-message">{errors.phone}</span>}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="form-step">
      <h2>Account Security</h2>
      <p>Create a strong password to protect your account</p>
      
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <div className="input-wrapper">
          <Lock className="input-icon" />
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`input ${errors.password ? 'error' : ''}`}
            placeholder="Create a strong password"
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>
        {errors.password && <span className="error-message">{errors.password}</span>}
        <div className="password-requirements">
          <p>Password must contain:</p>
          <ul>
            <li className={formData.password.length >= 8 ? 'valid' : ''}>At least 8 characters</li>
            <li className={/(?=.*[a-z])/.test(formData.password) ? 'valid' : ''}>One lowercase letter</li>
            <li className={/(?=.*[A-Z])/.test(formData.password) ? 'valid' : ''}>One uppercase letter</li>
            <li className={/(?=.*\d)/.test(formData.password) ? 'valid' : ''}>One number</li>
          </ul>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <div className="input-wrapper">
          <Lock className="input-icon" />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`input ${errors.confirmPassword ? 'error' : ''}`}
            placeholder="Confirm your password"
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>
        {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="dateOfBirth">Date of Birth</label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          className={`input ${errors.dateOfBirth ? 'error' : ''}`}
        />
        {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="form-step">
      <h2>Verification</h2>
      <p>Complete verification to ensure platform safety</p>
      
      <div className="form-group">
        <label htmlFor="faceImage">Face Verification Photo</label>
        <div className="file-upload-area">
          <input
            type="file"
            id="faceImage"
            name="faceImage"
            accept="image/*"
            onChange={handleFileUpload}
            className="file-input"
          />
          <div className="upload-content">
            <Camera className="upload-icon" />
            <p>Click to upload or drag and drop</p>
            <span>PNG, JPG up to 5MB</span>
          </div>
        </div>
        {errors.faceImage && <span className="error-message">{errors.faceImage}</span>}
        {formData.faceImage && (
          <div className="file-preview">
            <img 
              src={URL.createObjectURL(formData.faceImage)} 
              alt="Preview" 
              className="preview-image"
            />
            <span className="file-name">{formData.faceImage.name}</span>
          </div>
        )}
      </div>

      <div className="form-group">
        <label className="checkbox-wrapper verification-checkbox">
          <input
            type="checkbox"
            name="genderVerification"
            checked={formData.genderVerification}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              genderVerification: e.target.checked
            }))}
          />
          <span className="checkmark"></span>
          I confirm that I am a woman and understand this platform is exclusively for women travelers
        </label>
        {errors.genderVerification && <span className="error-message">{errors.genderVerification}</span>}
      </div>

      <div className="verification-info">
        <h3>Why Verification?</h3>
        <ul>
          <li>Ensures platform safety for all women travelers</li>
          <li>Prevents misuse and maintains community trust</li>
          <li>Required for all users to maintain security standards</li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-content">
          <div className="register-header">
            <div className="brand-logo">
              <Heart className="heart-icon" />
              <span className="brand-text">Herway</span>
            </div>
            <h1>Join Herway</h1>
            <p>Create your account and start your safe travel journey</p>
          </div>

          <div className="progress-bar">
            <div className="progress-step">
              <div className={`step-number ${step >= 1 ? 'active' : ''}`}>1</div>
              <span>Personal Info</span>
            </div>
            <div className="progress-line"></div>
            <div className="progress-step">
              <div className={`step-number ${step >= 2 ? 'active' : ''}`}>2</div>
              <span>Security</span>
            </div>
            <div className="progress-line"></div>
            <div className="progress-step">
              <div className={`step-number ${step >= 3 ? 'active' : ''}`}>3</div>
              <span>Verification</span>
            </div>
          </div>

          <form className="register-form" onSubmit={handleSubmit}>
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}

            <div className="form-actions">
              {step > 1 && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handlePrevious}
                >
                  <ArrowLeft />
                  Previous
                </button>
              )}
              
              {step < 3 ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleNext}
                >
                  Next
                  <ArrowRight />
                </button>
              ) : (
                <button
                  type="submit"
                  className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="spinner"></div>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>

          <div className="register-footer">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="link-primary">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        <div className="register-illustration">
          <div className="illustration-content">
            <h2>Welcome to Herway</h2>
            <p>Join our community of women travelers and experience safe, secure journeys together</p>
            <div className="illustration-features">
              <div className="feature">
                <CheckCircle className="feature-icon" />
                <span>Face Verification</span>
              </div>
              <div className="feature">
                <CheckCircle className="feature-icon" />
                <span>Gender Verification</span>
              </div>
              <div className="feature">
                <CheckCircle className="feature-icon" />
                <span>24/7 Safety Support</span>
              </div>
              <div className="feature">
                <CheckCircle className="feature-icon" />
                <span>Community Trust</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
