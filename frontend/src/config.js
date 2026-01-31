const config = {
  // API base URL - changes based on environment
  API_BASE_URL: process.env.NODE_ENV === 'production' 
    ? process.env.REACT_APP_API_URL || 'https://marine-platform-backend.onrender.com'
    : process.env.REACT_APP_API_URL || 'http://localhost:5000',
  
  // Alternative production URLs for different platforms
  PRODUCTION_URLS: {
    render: 'https://marine-platform-backend.onrender.com',
    aws: 'https://your-ecs-load-balancer.amazonaws.com',
    digitalocean: 'https://marine-platform-backend.ondigitalocean.app',
    vercel: 'https://your-backend.vercel.app'
  },
  
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
