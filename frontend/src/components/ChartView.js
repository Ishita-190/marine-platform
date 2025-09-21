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

function ChartView({ data = [] }) {
  // If no data is available, show a message
  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow text-center">
        <h2 className="text-xl font-bold mb-2">No Data Available</h2>
        <p className="text-gray-600">There is no data to display in the chart.</p>
      </div>
    );
  }

  // Process the data to count species occurrences
  const speciesCount = data.reduce((acc, item) => {
    if (item && item.scientific_name) {
      acc[item.scientific_name] = (acc[item.scientific_name] || 0) + 1;
    }
    return acc;
  }, {});

  // Sort species by count in descending order and take top 10
  const sortedSpecies = Object.entries(speciesCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const chartData = {
    labels: sortedSpecies.map(([name]) => name || 'Unknown'),
    datasets: [
      {
        label: 'Species Occurrences',
        data: sortedSpecies.map(([_, count]) => count),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Top 10 Species by Occurrence',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Occurrences',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Species',
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Top 10 Species by Occurrence</h2>
      <div className="h-96">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}

export default ChartView;