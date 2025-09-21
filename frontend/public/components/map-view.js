import React, { useState, useEffect, useRef } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl'; // needed for LngLatBounds

const MAPBOX_TOKEN = 'pk.eyJ1IjoiaXNoaXNhbjE5IiwiYSI6ImNtZnR4MnBtcjBtcXMyanF6aTVkY3hiMHgifQ.DVP78cO-G9n0hP5EgqxYTw'; // paste your token here

function MapView({ data }) {
  const mapRef = useRef(null);
  const [popupInfo, setPopupInfo] = useState(null);

  // Fit bounds when data changes
  useEffect(() => {
    if (!mapRef.current) return;

    const validPoints = data
      .filter(item => item.decimal_latitude && item.decimal_longitude)
      .map(item => [parseFloat(item.decimal_longitude), parseFloat(item.decimal_latitude)]);

    if (validPoints.length > 0) {
      const bounds = new mapboxgl.LngLatBounds(validPoints[0], validPoints[0]);
      validPoints.forEach(point => bounds.extend(point));

      mapRef.current.fitBounds(bounds, {
        padding: 50,
        animate: true,
      });
    }
  }, [data]);

  return (
    <div style={{ height: '350px', width: '100%' }}>
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: 72.18,
          latitude: 10.86,
          zoom: 8,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        {data
          .filter(item => item.decimal_latitude && item.decimal_longitude)
          .map((item, idx) => (
            <Marker
              key={idx}
              longitude={parseFloat(item.decimal_longitude)}
              latitude={parseFloat(item.decimal_latitude)}
              onClick={e => {
                e.originalEvent.stopPropagation();
                setPopupInfo(item);
              }}
            />
          ))}

        {popupInfo && (
          <Popup
            longitude={parseFloat(popupInfo.decimal_longitude)}
            latitude={parseFloat(popupInfo.decimal_latitude)}
            onClose={() => setPopupInfo(null)}
            closeOnClick={false}
            anchor="top"
          >
            <div>
              <h3>{popupInfo.scientific_name}</h3>
              <p>Location: {popupInfo.locality}</p>
              <p>Count: {popupInfo.individual_count}</p>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}

export default MapView;
