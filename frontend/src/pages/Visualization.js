import React from 'react';
import Navbar from '../components/Navbar';
import '../styles/main.css';

function Visualization() {
  return (
    <div className="landing-page">
      <Navbar />
      
      {/* Visualization Header */}
      <section className="hero small-hero">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1>Visualization & Tools</h1>
          <p>Interactive Data Dashboard for Marine Analytics</p>
        </div>
        <div className="wave"></div>
      </section>

      {/* Visualization Content */}
      <section className="about">
        <div className="container">
          <div className="section-header">
            <h2>Interactive Data Dashboard</h2>
            <p>Explore marine data through powerful visualization tools</p>
          </div>
          
          <div className="visualization-grid">
            <div className="viz-card">
              <div className="viz-icon">
                <i className="fas fa-map"></i>
              </div>
              <h3>Interactive Maps</h3>
              <p>Geospatial visualization of marine data with real-time updates</p>
            </div>
            
            <div className="viz-card">
              <div className="viz-icon">
                <i className="fas fa-chart-bar"></i>
              </div>
              <h3>Data Analytics</h3>
              <p>Comprehensive charts and graphs for trend analysis</p>
            </div>
            
            <div className="viz-card">
              <div className="viz-icon">
                <i className="fas fa-filter"></i>
              </div>
              <h3>Data Filtering</h3>
              <p>Advanced filtering options for customized data views</p>
            </div>
            
            <div className="viz-card">
              <div className="viz-icon">
                <i className="fas fa-download"></i>
              </div>
              <h3>Export Tools</h3>
              <p>Download data and visualizations in multiple formats</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <p>&copy; 2024 MARINIX. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Visualization;
