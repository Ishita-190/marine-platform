import React from "react";
import Navbar from "./components/Navbar";
import MapView from "./components/MapView";
import ChartView from "./components/ChartView";

function App() {
  return (
    <div className="min-h-screen bg-blue-50">
      <Navbar />
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-bold mb-2">🌍 Species Distribution</h2>
          <MapView />
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-bold mb-2">📊 Ocean Parameters</h2>
          <ChartView />
        </div>
      </div>
    </div>
  );
}

export default App;
