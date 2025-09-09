import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr"],
  datasets: [
    {
      label: "Temperature (°C)",
      data: [27, 28, 29, 28.5],
      borderColor: "blue",
      fill: false
    }
  ]
};

const ChartView = () => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-2">Ocean Temperature Trends</h2>
      <Line data={data} />
    </div>
  );
};

export default ChartView;
