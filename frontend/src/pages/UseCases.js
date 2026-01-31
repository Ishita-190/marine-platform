import React from 'react';
import Navbar from '../components/Navbar';
import '../styles/main.css';

function UseCases() {
  const useCases = [
    {
      title: "Sustainable Fisheries",
      description: "Optimize fishing practices and ensure long-term sustainability through data-driven insights",
      icon: "fa-fish",
      benefits: [
        "Real-time stock assessment",
        "Predictive modeling of fish populations",
        "Sustainable catch recommendations"
      ]
    },
    {
      title: "Biodiversity Conservation",
      description: "Protect marine ecosystems and endangered species through comprehensive monitoring",
      icon: "fa-shield-alt",
      benefits: [
        "Species distribution mapping",
        "Habitat vulnerability assessment",
        "Conservation priority identification"
      ]
    },
    {
      title: "Blue Economy",
      description: "Support sustainable economic development in marine sectors",
      icon: "fa-chart-line",
      benefits: [
        "Economic impact analysis",
        "Resource optimization",
        "Sustainable development planning"
      ]
    }
  ];

  return (
    <div className="landing-page">
      <Navbar />
      
      {/* Use Cases Header */}
      <section className="hero small-hero">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1>Use Cases</h1>
          <p>Real-world applications of the MARINIX platform across marine industries</p>
        </div>
        <div className="wave"></div>
      </section>

      {/* Use Cases Content */}
      <section className="about">
        <div className="container">
          <div className="section-header">
            <h2>Platform Applications</h2>
            <p>How MARINIX is transforming marine research and industry practices</p>
          </div>
          
          <div className="use-cases-grid">
            {useCases.map((useCase, index) => (
              <div key={index} className="use-case-card">
                <div className="use-case-icon">
                  <i className={`fas ${useCase.icon}`}></i>
                </div>
                <h3>{useCase.title}</h3>
                <p>{useCase.description}</p>
                <div className="benefits-list">
                  <h4>Key Benefits:</h4>
                  <ul>
                    {useCase.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
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

export default UseCases;
