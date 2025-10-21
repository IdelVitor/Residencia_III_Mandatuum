"use client";

import { GoogleMap, LoadScript, Polygon } from "@react-google-maps/api";

export default function MapaAcoes() {
  const containerStyle = {
    width: "100%",
    height: "500px",
    borderRadius: "12px",
  };

  const center = {
    lat: -10.9472, // Exemplo: Aracaju
    lng: -37.0731,
  };

  const area = [
    { lat: -10.9, lng: -37.1 },
    { lat: -10.95, lng: -37.05 },
    { lat: -10.98, lng: -37.12 },
  ];

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={11}>
        <Polygon
          path={area}
          options={{
            fillColor: "#1976D2",
            fillOpacity: 0.2,
            strokeColor: "#1565C0",
            strokeWeight: 2,
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
}
