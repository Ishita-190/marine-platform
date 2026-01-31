import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          <i className="fas fa-water"></i>
          MARINIX
        </Link>
        <ul className="nav-links">
          <li><Link to="/#about">About</Link></li>
          <li><Link to="/features">Features</Link></li>
          <li><Link to="/#datasets">Datasets</Link></li>
          <li><Link to="/visualization">Visualization</Link></li>
          <li><Link to="/use-cases">Use Cases</Link></li>
          <li><Link to="/publications">Publications</Link></li>
          <li><Link to="/signup" className="btn btn-primary">Get Started</Link></li>
        </ul>
        <button className="mobile-menu-toggle">
          <i className="fas fa-bars"></i>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;