import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css'

const HomePage = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to MyBank</h1>
        <p>Your Trusted Banking Partner</p>
      </header>
      <main className="home-content">
        <div className="feature-box">
          <h2>Online Banking</h2>
          <p>Manage your finances from anywhere, anytime.</p>
        </div>
        <div className="feature-box">
          <h2>Secure Transactions</h2>
          <p>Your transactions are safe and encrypted.</p>
        </div>
        <div className="feature-box">
          <h2>24/7 Customer Support</h2>
          <p>We're here to assist you around the clock.</p>
        </div>
      </main>
      <div className="login-signup-section">
        <div className="login-section">
          <h2><Link to="/login">Login</Link></h2>
        </div>
        <div className="signup-section">
          <h2><Link to="/register">Register for Net Banking</Link></h2>
        </div>
        <div className="openacc-section">
          <h2><Link to="/openaccount">Open New Account</Link></h2>
        </div>
      </div>
      <footer className="home-footer">
        <p>&copy; 2023 MyBank. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
