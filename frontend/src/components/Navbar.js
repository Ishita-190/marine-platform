import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          <i className="fas fa-water"></i>
          MARINIX
        </Link>
        <ul className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <li><Link to="/" onClick={() => scrollToSection('about')}>About</Link></li>
          <li><Link to="/features">Features</Link></li>
          <li><Link to="/" onClick={() => scrollToSection('datasets')}>Datasets</Link></li>
          <li><Link to="/visualization">Visualization</Link></li>
          <li><Link to="/use-cases">Use Cases</Link></li>
          <li><Link to="/publications">Publications</Link></li>
          <li><Link to="/signup" className="btn btn-primary">Get Started</Link></li>
        </ul>
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;