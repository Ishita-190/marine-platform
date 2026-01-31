import React from 'react';

function Hero() {
  return (
    <section className="hero">
      <div className="video-background">
        <div className="video-container">
          <iframe 
            src="https://www.youtube.com/embed/8cULX5QP5L0?autoplay=1&mute=1&loop=1&playlist=8cULX5QP5L0&controls=0&showinfo=0&modestbranding=1&iv_load_policy=3&rel=0&enablejsapi=1" 
            frameBorder="0" 
            allow="autoplay; encrypted-media" 
            allowFullScreen
            id="youtube-iframe"
            title="Marine background video showing ocean scenes"
          />
        </div>
      </div>
      <div className="hero-overlay"></div>
      
      {/* Marine Life Animations */}
      <div className="marine-life">
        <div className="fish fish1">
          <i className="fas fa-fish"></i>
        </div>
        <div className="fish fish2">
          <i className="fas fa-fish"></i>
        </div>
        <div className="fish fish3">
          <i className="fas fa-fish"></i>
        </div>
        <div className="jellyfish">
          <i className="fas fa-circle"></i>
        </div>
        <div className="bubble bubble1"></div>
        <div className="bubble bubble2"></div>
        <div className="bubble bubble3"></div>
        <div className="bubble bubble4"></div>
        <div className="bubble bubble5"></div>
      </div>
      
      <div className="container hero-content">
        <h1>AI-Driven Unified Data Platform for Oceanographic & Biodiversity Insights</h1>
        <p>Integrate satellite, oceanographic, fisheries, taxonomy and eDNA data — powered by AI analytics and interactive visualizations.</p>
        <div className="hero-buttons">
          <a href="#datasets" className="btn btn-primary">Explore Data</a>
          <a href="#about" className="btn btn-secondary">Learn More</a>
        </div>
      </div>
      <div className="wave"></div>
    </section>
  );
}

export default Hero;
