import React from 'react';
import Navbar from '../components/Navbar';
import '../styles/main.css';

function Publications() {
  const publications = [
    {
      title: "Integrated Assessment of Indian Ocean Biodiversity Using eDNA Metabarcoding",
      authors: "Dr. Sarah Chen, Prof. Michael Roberts",
      journal: "Marine Ecology Progress Series",
      year: "2024",
      doi: "10.3354/meps12345"
    },
    {
      title: "Predictive Modeling of Fish Stock Dynamics Under Climate Change Scenarios",
      authors: "Dr. James Wilson, Dr. Lisa Anderson",
      journal: "Climate Change Ecology",
      year: "2024",
      doi: "10.1016/j.cceco.2024.100123"
    },
    {
      title: "MARINIX: A Unified Platform for Marine Data Integration and Analysis",
      authors: "MARINIX Research Team",
      journal: "Journal of Marine Informatics",
      year: "2023",
      doi: "10.1234/jmi.2023.5678"
    },
    {
      title: "Application of Machine Learning in Oceanographic Data Analysis",
      authors: "Dr. Alex Kumar, Dr. Maria Garcia",
      journal: "Ocean Data Science",
      year: "2023",
      doi: "10.5678/ods.2023.9012"
    }
  ];

  return (
    <div className="landing-page">
      <Navbar />
      
      {/* Publications Header */}
      <section className="hero small-hero">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1>Research & Publications</h1>
          <p>Latest scientific findings and research contributions from the MARINIX platform</p>
        </div>
        <div className="wave"></div>
      </section>

      {/* Publications Content */}
      <section className="about">
        <div className="container">
          <div className="section-header">
            <h2>Recent Publications</h2>
            <p>Peer-reviewed research leveraging the MARINIX platform for marine data analysis</p>
          </div>
          
          <div className="publications-grid">
            {publications.map((pub, index) => (
              <div key={index} className="publication-card">
                <div className="publication-content">
                  <h3>{pub.title}</h3>
                  <p className="authors">{pub.authors}</p>
                  <div className="publication-meta">
                    <span className="journal">{pub.journal}</span>
                    <span className="year">{pub.year}</span>
                  </div>
                  <div className="publication-doi">
                    <strong>DOI:</strong> {pub.doi}
                  </div>
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

export default Publications;
