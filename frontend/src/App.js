import React from "react";
import Navbar from "./components/Navbar";
import MapView from "./components/MapView";
import ChartView from "./components/ChartView";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <MapView />
        <ChartView />
      </div>
    </div>
  );
}

export default App;
