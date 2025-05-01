import React from 'react';
import '../../styles/main.css';

/**
 * Header component for the application
 */
const Header = () => {
  return (
    <header style={{
      backgroundColor: 'var(--color-white)',
      borderBottom: '1px solid var(--color-border)',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <div className="logo" style={{ color: 'var(--color-primary)', fontWeight: 'bold', fontSize: '1.5rem' }}>
        AIVO
      </div>
      <nav>
        <ul style={{ display: 'flex', gap: '1.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
          <li><a href="#" style={{ color: 'var(--color-text-primary)' }}>Home</a></li>
          <li><a href="#" style={{ color: 'var(--color-text-primary)' }}>Features</a></li>
          <li><a href="#" style={{ color: 'var(--color-text-primary)' }}>Pricing</a></li>
          <li><a href="#" style={{ color: 'var(--color-primary)', fontWeight: 500 }}>Login</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
