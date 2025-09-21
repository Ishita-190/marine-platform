# Marine Data Platform - Frontend

This is the React frontend for the Marine Data Platform, featuring interactive visualizations and data analysis tools.

## Features

- **Landing Page**: Beautiful landing page with marine-themed design
- **Dashboard**: Interactive dashboard with multiple views:
  - **Map View**: Interactive map showing marine species occurrences
  - **Chart View**: Data visualizations and analytics
  - **Dataset Overview**: Comprehensive data table with filtering

## Tech Stack

- React 18
- React Router DOM
- Tailwind CSS
- Leaflet (for maps)
- Chart.js (for data visualization)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view the application

## Project Structure

```
src/
├── components/
│   ├── MapView.js          # Interactive map component
│   ├── ChartView.js        # Data visualization charts
│   ├── DatasetOverview.js  # Data table with filtering
│   └── Navbar.js          # Navigation component (legacy)
├── pages/
│   ├── Landing.js         # Landing page component
│   └── Dashboard.js       # Main dashboard page
├── App.js                 # Main app with routing
└── index.css             # Tailwind CSS imports
```

## Navigation

- **Landing Page** (`/`): Main landing page with dashboard access button
- **Dashboard** (`/dashboard`): Interactive dashboard with Map, Chart, and Dataset views

## API Integration

The frontend connects to the backend API at `http://localhost:5000` for marine data:
- `/api/occurrences` - Species occurrence data

## Styling

The application uses:
- Tailwind CSS for component styling
- Custom CSS for the landing page (in `public/style.css`)
- Isolated styles to prevent conflicts between landing page and React components

## Development Notes

- The landing page and React app are completely separated to prevent CSS conflicts
- The dashboard provides a clean, professional interface for data analysis
- All components are responsive and mobile-friendly

