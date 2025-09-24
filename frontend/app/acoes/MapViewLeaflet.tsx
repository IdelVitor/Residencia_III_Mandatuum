"use client";

import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";
import { useEffect, useMemo } from "react";
import styles from "./acoes.module.css";

/* Corrige os ícones do marker (sem precisar de arquivos em /public) */
import marker2x from "leaflet/dist/images/marker-icon-2x.png";
import marker1x from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
L.Icon.Default.mergeOptions({
  iconRetinaUrl: marker2x as unknown as string,
  iconUrl: marker1x as unknown as string,
  shadowUrl: markerShadow as unknown as string,
});

/* Heatmap opcional (deixe comentado se não precisa agora) */
function Heatmap({ points }: { points: { lat: number; lng: number }[] }) {
  const map = useMap();
  useEffect(() => {
    const layer = (L as any)
      .heatLayer(points.map(p => [p.lat, p.lng, 0.6]), { radius: 28, blur: 18 })
      .addTo(map);
    return () => { map.removeLayer(layer); };
  }, [map, points]);
  return null;
}

export default function MapViewLeaflet() {
  const center = useMemo(() => ({ lat: -10.913, lng: -37.05 }), []);
  const points = useMemo(
    () => [
      { lat: -10.912, lng: -37.047 },
      { lat: -10.918, lng: -37.06 },
      { lat: -10.905, lng: -37.04 },
      { lat: -10.92,  lng: -37.03 },
      { lat: -10.907, lng: -37.055 },
    ],
    []
  );

  return (
    <MapContainer className={styles.map} center={center} zoom={12} scrollWheelZoom>
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {points.map((p, i) => (
        <Marker key={i} position={p} />
      ))}

      {/* <Heatmap points={points} /> */}
    </MapContainer>
  );
}
