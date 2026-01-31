import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Initialize Mapbox access token from environment variables
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || 'pk.eyJ1IjoiZGVtbyIsImEiOiJjbG8wNjR3d3owMW1mMmlvZDZoZzVhZ3J4In0.example';

function MapView({ data = [] }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [mapError, setMapError] = useState(null);

  useEffect(() => {
    if (!mapContainer.current) return;
    if (map.current) return; // Initialize map only once

    try {
      // Check if token is available or use fallback
      const token = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
      if (!token || token === 'REACT_APP_MAPBOX_ACCESS_TOKEN') {
        // Show a simple placeholder when token is not available
        setMapError('Mapbox access token is not configured. Please add REACT_APP_MAPBOX_ACCESS_TOKEN to your .env file.');
        return;
      }

      // Initialize the map
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [72.18, 10.86], // [lng, lat]
        zoom: 8,
        attributionControl: false
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl());

      // Add markers when data is available
      if (data && data.length > 0) {
        data
          .filter(item => item.decimal_latitude && item.decimal_longitude)
          .forEach((item) => {
            const popup = new mapboxgl.Popup({ offset: 25 })
              .setHTML(`
                <div>
                  <h3 class="font-bold">${item.scientific_name || 'Unknown'}</h3>
                  <p>Location: ${item.locality || 'Not specified'}</p>
                  ${item.individual_count ? `<p>Count: ${item.individual_count}</p>` : ''}
                </div>
              `);

            new mapboxgl.Marker()
              .setLngLat([parseFloat(item.decimal_longitude), parseFloat(item.decimal_latitude)])
              .setPopup(popup)
              .addTo(map.current);
          });
      }

      // Handle map load event
      map.current.on('load', () => {
        console.log('Map loaded successfully');
        setMapError(null);
      });

      // Handle map errors
      map.current.on('error', (e) => {
        console.error('Map error:', e.error);
        setMapError('Failed to load the map. Please check your internet connection and try again.');
      });

    } catch (error) {
      console.error('Map initialization error:', error);
      setMapError(`Failed to initialize map: ${error.message}`);
    }

    // Cleanup function
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [data]);

  return (
    <div className="relative w-full" style={{ minHeight: '350px' }}>
      <div 
        ref={mapContainer} 
        className="w-full h-full rounded-lg overflow-hidden"
        style={{ minHeight: '350px' }}
      />
      {mapError && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-50 text-red-600 p-4">
          {mapError}
        </div>
      )}
    </div>
  );
}

export default MapView;
