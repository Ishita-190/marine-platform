import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ChartView({ data }) {
  const speciesCount = data.reduce((acc, item) => {
    acc[item.scientific_name] = (acc[item.scientific_name] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(speciesCount).slice(0, 10),
    datasets: [
      {
        label: 'Species Occurrences',
        data: Object.values(speciesCount).slice(0, 10),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Top 10 Species by Occurrence</h2>
      <Bar data={chartData} />
    </div>
  );
}

export default ChartView;