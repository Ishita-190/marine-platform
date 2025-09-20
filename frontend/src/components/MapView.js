import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function MapView({ data }) {
  const center = [10.86, 72.18]; // Default to Lakshadweep

  return (
    <div className="h-96 w-full">
      <MapContainer center={center} zoom={8} className="h-full w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {data.map((item, idx) => (
          item.decimal_latitude && item.decimal_longitude && (
            <Marker
              key={idx}
              position={[parseFloat(item.decimal_latitude), parseFloat(item.decimal_longitude)]}
            >
              <Popup>
                <div>
                  <h3 className="font-bold">{item.scientific_name}</h3>
                  <p>Location: {item.locality}</p>
                  <p>Count: {item.individual_count}</p>
                </div>
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  );
}

export default MapView;