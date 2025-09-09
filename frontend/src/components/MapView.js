import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MapView() {
  const keralaCoords = [9.9312, 76.2673]; // Example location

  return (
    <MapContainer center={keralaCoords} zoom={6} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={keralaCoords}>
        <Popup>Indian Mackerel - Kerala Coast</Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapView;
