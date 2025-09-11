import React, { useState, useEffect } from 'react';
import MapView from './components/MapView';
import ChartView from './components/ChartView';
import Navbar from './components/Navbar';
import './index.css';

function App() {
  const [data, setData] = useState([]);
  const [view, setView] = useState('map');

  useEffect(() => {
    fetch('http://localhost:5000/api/occurrences')
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar view={view} setView={setView} />
      <main className="container mx-auto p-4">
        {view === 'map' ? (
          <MapView data={data} />
        ) : (
          <ChartView data={data} />
        )}
      </main>
    </div>
  );
}

export default App;