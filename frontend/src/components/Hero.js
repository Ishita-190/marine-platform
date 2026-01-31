import React from 'react';

function Hero() {
  return (
    <section className="hero">
      <div className="video-background">
        <div className="video-container">
          <iframe 
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&loop=1&playlist=dQw4w9WgXcQ&controls=0&showinfo=0&autohide=1&modestbranding=1"
            title="Marine Background Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
      <div className="hero-content">
        <h1>MARINIX</h1>
        <p>AI-Driven Unified Data Platform for Oceanographic & Biodiversity Insights</p>
        <div className="hero-buttons">
          <a href="#features" className="btn btn-primary">Explore Features</a>
          <a href="#datasets" className="btn btn-secondary">View Datasets</a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
