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
          <div className="section-header">
            <h2>About MARINIX</h2>
            <p>Advancing marine research through integrated data and artificial intelligence</p>
          </div>
          <div className="about-content">
            <div className="about-text">
              <h3>Revolutionizing Marine Data Analysis</h3>
              <p>MARINIX is a cutting-edge platform designed to unify disparate marine data sources into a single, accessible interface. By leveraging advanced AI algorithms, we transform complex oceanographic, fisheries, and biodiversity data into actionable insights.</p>
              <p>Our mission is to democratize access to marine data and accelerate scientific discovery by breaking down data silos and providing powerful analytical tools.</p>
              
              <div className="about-icons">
                <div className="about-icon">
                  <i className="fas fa-database"></i>
                  <span>Unified Data</span>
                </div>
                <div className="about-icon">
                  <i className="fas fa-brain"></i>
                  <span>AI Analytics</span>
                </div>
                <div className="about-icon">
                  <i className="fas fa-users"></i>
                  <span>Research Community</span>
                </div>
              </div>
            </div>
            <div className="about-visual">
              <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Ocean research" className="about-image" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="container">
          <div className="section-header">
            <h2>Platform Features</h2>
            <p>Comprehensive tools for marine data integration and analysis</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-database"></i>
              </div>
              <h3>Unified Data Integration</h3>
              <p>Seamlessly integrate oceanographic, biodiversity, and environmental data sources</p>
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
          </div>
        </div>
      </section>

      {/* Datasets Section */}
      <section className="datasets" id="datasets">
        <div className="container">
          <div className="section-header">
            <h2>Marine Datasets</h2>
            <p>Comprehensive collection of oceanographic and biodiversity data</p>
          </div>
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

