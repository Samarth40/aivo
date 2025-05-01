import React from "react";
import "../../styles/main.css";
import "../../styles/components/Header.css";

/**
 * Header component for the application
 */
const Header = () => {
  return (
    <header className="header">
      <div className="header-logo">AIVO</div>
      <nav className="header-nav">
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Features</a>
          </li>
          <li>
            <a href="#">Pricing</a>
          </li>
          <li>
            <a href="#" className="login">
              Login
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
