"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapClientProps {
  startCoords: [number, number] | null;
  destCoords: [number, number] | null;
  routeGeoJSON: any | null;
}

export default function MapClient({ startCoords, destCoords, routeGeoJSON }: MapClientProps) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (!mapRef.current) {
      mapRef.current = L.map(containerRef.current).setView([0, 0], 2);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);
    }

    const map = mapRef.current;
    // Remove old layers (except tile layer)
    map.eachLayer(layer => {
      if (!(layer instanceof L.TileLayer)) {
        map.removeLayer(layer);
      }
    });

    if (startCoords) {
      L.marker([startCoords[1], startCoords[0]]).bindPopup("Start").addTo(map);
      map.setView([startCoords[1], startCoords[0]], 13);
    }
    if (destCoords) {
      L.marker([destCoords[1], destCoords[0]]).bindPopup("Destination").addTo(map);
    }
    if (routeGeoJSON) {
      const routeLayer = L.geoJSON(routeGeoJSON, {
        style: { color: "blue", weight: 5, opacity: 0.7 }
      }).addTo(map);
      map.fitBounds(routeLayer.getBounds());
    }

  }, [startCoords, destCoords, routeGeoJSON]);

  return <div ref={containerRef} style={{ width: "100%", height: "500px" }} />;
}
