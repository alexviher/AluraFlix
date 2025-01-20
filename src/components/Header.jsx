import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <img className='header-title' src='./public/LogoAluraFlix.png'></img>
        <nav className="header-nav">
            
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/nuevo-video" className="nav-link">
            Nuevo Video
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
