import React from 'react';
import '../../styles/main.css';

/**
 * Footer component for the application
 */
const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#0A1122', // Slightly darker than the background
      color: 'var(--color-text-primary)',
      padding: '2rem',
      marginTop: '2rem',
      borderTop: '1px solid var(--color-border)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
        <div>
          <h3 style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>AIVO</h3>
          <p>AI Search Visibility Optimizer</p>
          <p>© {new Date().getFullYear()} AIVO. All rights reserved.</p>
        </div>

        <div>
          <h4 style={{ color: 'var(--color-primary-light)', marginBottom: '1rem' }}>Features</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginBottom: '0.5rem' }}><a href="#" style={{ color: 'var(--color-text-primary)' }}>AI Query Simulation</a></li>
            <li style={{ marginBottom: '0.5rem' }}><a href="#" style={{ color: 'var(--color-text-primary)' }}>Content Analysis</a></li>
            <li style={{ marginBottom: '0.5rem' }}><a href="#" style={{ color: 'var(--color-text-primary)' }}>Entity Enhancement</a></li>
            <li style={{ marginBottom: '0.5rem' }}><a href="#" style={{ color: 'var(--color-text-primary)' }}>Competitive Analysis</a></li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: 'var(--color-primary-light)', marginBottom: '1rem' }}>Resources</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginBottom: '0.5rem' }}><a href="#" style={{ color: 'var(--color-text-primary)' }}>Documentation</a></li>
            <li style={{ marginBottom: '0.5rem' }}><a href="#" style={{ color: 'var(--color-text-primary)' }}>Blog</a></li>
            <li style={{ marginBottom: '0.5rem' }}><a href="#" style={{ color: 'var(--color-text-primary)' }}>Support</a></li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: 'var(--color-primary-light)', marginBottom: '1rem' }}>Contact</h4>
          <p>info@aivo.example.com</p>
          <p>+1 (555) 123-4567</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
