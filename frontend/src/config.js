const config = {
  // API base URL - changes based on environment
  API_BASE_URL: process.env.NODE_ENV === 'production' 
    ? process.env.REACT_APP_API_URL || 'https://your-backend-url.railway.app'
    : process.env.REACT_APP_API_URL || 'http://localhost:5000',
  
  // Map configuration
  MAP_CONFIG: {
    defaultCenter: [20.0, 0.0],
    defaultZoom: 2,
    maxZoom: 18,
    minZoom: 2
  },
  
  // Chart configuration
  CHART_CONFIG: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Marine Data Analytics'
      }
    }
  }
};

export default config;
