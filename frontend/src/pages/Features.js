import React from 'react';
import Navbar from '../components/Navbar';
import '../styles/main.css';

function Features() {
  return (
    <div className="landing-page">
      <Navbar />
      
      {/* Features Header */}
      <section className="hero" style={{height: '50vh'}}>
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1>Platform Features</h1>
          <p>Comprehensive tools for marine data integration and analysis</p>
        </div>
        <div className="wave"></div>
      </section>

      {/* Features Content */}
      <section className="features" style={{background: 'var(--deep-ocean)'}}>
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-database"></i>
              </div>
              <h3>Unified Data Integration</h3>
              <p>Seamlessly integrate oceanographic, biodiversity, and environmental data sources into a unified platform</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-brain"></i>
              </div>
              <h3>AI-Powered Analytics</h3>
              <p>Advanced machine learning algorithms for pattern recognition and predictive modeling</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3>Visualization Tools</h3>
              <p>Interactive maps, charts, and dashboards for intuitive data exploration</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-dna"></i>
              </div>
              <h3>Taxonomy & eDNA</h3>
              <p>Comprehensive species identification and environmental DNA analysis tools</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-water"></i>
              </div>
              <h3>Real-Time Ocean Monitoring</h3>
              <p>Live data streams from ocean sensors and satellite observations</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>Collaborative Research Hub</h3>
              <p>Share findings, collaborate with researchers worldwide</p>
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

export default Features;
