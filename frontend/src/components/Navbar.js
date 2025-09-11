import React from 'react';

function Navbar({ view, setView }) {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Marine Data Platform</h1>
        <div className="space-x-4">
          <button
            onClick={() => setView('map')}
            className={`px-4 py-2 rounded ${view === 'map' ? 'bg-blue-800' : 'bg-blue-500'}`}
          >
            Map View
          </button>
          <button
            onClick={() => setView('chart')}
            className={`px-4 py-2 rounded ${view === 'chart' ? 'bg-blue-800' : 'bg-blue-500'}`}
          >
            Chart View
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;