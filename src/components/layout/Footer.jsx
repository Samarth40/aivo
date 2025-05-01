import React from "react";
import "../../styles/main.css";
import "../../styles/components/Footer.css";

/**
 * Footer component for the application
 */
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div>
          <h3 className="footer-heading">AIVO</h3>
          <p>AI Search Visibility Optimizer</p>
          <p>© {new Date().getFullYear()} AIVO. All rights reserved.</p>
        </div>

        <div>
          <h4 className="footer-section-heading">Features</h4>
          <ul className="footer-nav-list">
            <li className="footer-nav-item">
              <a href="#" className="footer-link">
                AI Query Simulation
              </a>
            </li>
            <li className="footer-nav-item">
              <a href="#" className="footer-link">
                Content Analysis
              </a>
            </li>
            <li className="footer-nav-item">
              <a href="#" className="footer-link">
                Entity Enhancement
              </a>
            </li>
            <li className="footer-nav-item">
              <a href="#" className="footer-link">
                Competitive Analysis
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="footer-section-heading">Resources</h4>
          <ul className="footer-nav-list">
            <li className="footer-nav-item">
              <a href="#" className="footer-link">
                Documentation
              </a>
            </li>
            <li className="footer-nav-item">
              <a href="#" className="footer-link">
                Blog
              </a>
            </li>
            <li className="footer-nav-item">
              <a href="#" className="footer-link">
                Support
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="footer-section-heading">Contact</h4>
          <p>info@aivo.example.com</p>
          <p>+1 (555) 123-4567</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
