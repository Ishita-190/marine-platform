import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapView = () => {
  return (
    <MapContainer center={[10, 75]} zoom={5} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[9.9312, 76.2673]}>
        <Popup>Kerala Coast - Indian Mackerel</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapView;
