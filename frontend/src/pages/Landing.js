import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import '../styles/main.css';

function Landing() {
  return (
    <div className="landing-page">
      <Navbar />
      <Hero />
      
      {/* About Section */}
      <section className="about" id="about">
        <div className="container">
          <h2>About MARINIX</h2>
          <p>Revolutionizing Marine Data Analysis with AI-powered insights and unified data integration</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="container">
          <h2>Platform Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Unified Data Integration</h3>
              <p>Seamlessly integrate oceanographic, biodiversity, and environmental data sources</p>
            </div>
            <div className="feature-card">
              <h3>AI-Powered Analytics</h3>
              <p>Advanced machine learning algorithms for pattern recognition and predictive modeling</p>
            </div>
            <div className="feature-card">
              <h3>Visualization Tools</h3>
              <p>Interactive maps, charts, and dashboards for intuitive data exploration</p>
            </div>
          </div>
        </div>
      </section>

      {/* Datasets Section */}
      <section className="datasets" id="datasets">
        <div className="container">
          <h2>Marine Datasets</h2>
          <div className="dataset-grid">
            <div className="dataset-item">
              <h3>Sea Surface Temperature</h3>
              <p>Global ocean temperature data from satellite and buoy measurements</p>
            </div>
            <div className="dataset-item">
              <h3>Marine Species Database</h3>
              <p>Comprehensive biodiversity data with taxonomic information</p>
            </div>
            <div className="dataset-item">
              <h3>Ocean Currents & Circulation</h3>
              <p>Real-time and historical ocean current patterns</p>
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

export default Landing;

