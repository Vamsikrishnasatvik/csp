"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Create animated custom icon with pulsing effect
const createAnimatedIcon = (color: string, label: string, isPrimary: boolean = false) => {
  return L.divIcon({
    className: "custom-animated-marker",
    html: `
      <div class="marker-container" style="
        position: relative;
        width: 40px;
        height: 50px;
        animation: markerDrop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
      ">
        <!-- Pulsing ring effect -->
        <div class="pulse-ring" style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60px;
          height: 60px;
          border: 3px solid ${color};
          border-radius: 50%;
          opacity: 0;
          animation: pulseRing 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        "></div>
        
        <!-- Shadow -->
        <div style="
          position: absolute;
          bottom: -5px;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 6px;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 50%;
          filter: blur(3px);
          animation: shadowPulse 2s ease-in-out infinite;
        "></div>
        
        <!-- Main pin -->
        <svg width="40" height="50" viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg" style="
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
          animation: pinBounce 2s ease-in-out infinite;
        ">
          <!-- Pin shape with gradient -->
          <defs>
            <linearGradient id="pinGradient${label}" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
              <stop offset="100%" style="stop-color:${adjustBrightness(color, -20)};stop-opacity:1" />
            </linearGradient>
            <filter id="glow${label}">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <path 
            d="M20 2C12.268 2 6 8.268 6 16c0 9 14 28 14 28s14-19 14-28c0-7.732-6.268-14-14-14z" 
            fill="url(#pinGradient${label})"
            stroke="white"
            stroke-width="2"
            filter="url(#glow${label})"
          />
          
          <!-- Inner circle -->
          <circle cx="20" cy="16" r="8" fill="white" opacity="0.9"/>
          
          <!-- Label text -->
          <text 
            x="20" 
            y="20" 
            text-anchor="middle" 
            font-size="12" 
            font-weight="bold"
            fill="${color}"
            style="font-family: system-ui, -apple-system, sans-serif;"
          >${label}</text>
        </svg>
        
        <!-- Glowing dot at pin tip -->
        <div style="
          position: absolute;
          bottom: 2px;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 6px;
          background: ${color};
          border-radius: 50%;
          box-shadow: 0 0 10px ${color}, 0 0 20px ${color};
          animation: glowPulse 1.5s ease-in-out infinite;
        "></div>
      </div>
    `,
    iconSize: [40, 50],
    iconAnchor: [20, 50],
    popupAnchor: [0, -50],
  });
};

// Helper function to adjust color brightness
function adjustBrightness(color: string, percent: number) {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255))
    .toString(16).slice(1);
}

interface MapClientProps {
  startCoords: [number, number] | null;
  destCoords: [number, number] | null;
  routeGeoJSON?: any;
  riderMode?: boolean;
}

export default function MapClient({
  startCoords,
  destCoords,
  routeGeoJSON,
  riderMode = false,
}: MapClientProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const startMarkerRef = useRef<L.Marker | null>(null);
  const destMarkerRef = useRef<L.Marker | null>(null);
  const routeLayerRef = useRef<L.GeoJSON | null>(null);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [20.5937, 78.9629], // Center of India as default
      zoom: 5,
      zoomControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update start marker
  useEffect(() => {
    if (!mapRef.current || !startCoords) return;

    // Remove old marker
    if (startMarkerRef.current) {
      mapRef.current.removeLayer(startMarkerRef.current);
    }

    // Create animated start marker (green)
    const startIcon = createAnimatedIcon("#10b981", "A", true);

    const marker = L.marker([startCoords[1], startCoords[0]], {
      icon: startIcon,
    })
      .addTo(mapRef.current)
      .bindPopup(`
        <div style="font-family: system-ui; padding: 4px;">
          <b style="color: #10b981; font-size: 14px;">🚀 Start Location</b>
          <p style="margin: 4px 0 0 0; font-size: 12px; color: #666;">Your current position</p>
        </div>
      `);

    startMarkerRef.current = marker;

    // Center map on start location with animation
    mapRef.current.setView([startCoords[1], startCoords[0]], 13, {
      animate: true,
      duration: 1,
    });
  }, [startCoords]);

  // Update destination marker
  useEffect(() => {
    if (!mapRef.current || !destCoords) return;

    // Remove old marker
    if (destMarkerRef.current) {
      mapRef.current.removeLayer(destMarkerRef.current);
    }

    // Create animated destination marker (red)
    const destIcon = createAnimatedIcon("#ef4444", "B", false);

    const marker = L.marker([destCoords[1], destCoords[0]], {
      icon: destIcon,
    })
      .addTo(mapRef.current)
      .bindPopup(`
        <div style="font-family: system-ui; padding: 4px;">
          <b style="color: #ef4444; font-size: 14px;">🎯 Destination</b>
          <p style="margin: 4px 0 0 0; font-size: 12px; color: #666;">Your target location</p>
        </div>
      `);

    destMarkerRef.current = marker;

    // Fit bounds to show both markers if we have both
    if (startCoords && destCoords) {
      const bounds = L.latLngBounds([
        [startCoords[1], startCoords[0]],
        [destCoords[1], destCoords[0]],
      ]);
      mapRef.current.fitBounds(bounds, { 
        padding: [80, 80],
        animate: true,
        duration: 1,
      });
    }
  }, [destCoords, startCoords]);

  // Update route with animation
  useEffect(() => {
    if (!mapRef.current) return;

    // Remove old route
    if (routeLayerRef.current) {
      mapRef.current.removeLayer(routeLayerRef.current);
      routeLayerRef.current = null;
    }

    if (!routeGeoJSON) return;

    // Add new route with animated drawing effect
    const routeLayer = L.geoJSON(routeGeoJSON, {
      style: {
        color: "#3b82f6",
        weight: 5,
        opacity: 0.8,
        lineCap: "round",
        lineJoin: "round",
      },
      onEachFeature: (feature, layer) => {
        // Add animated dash effect
        if (layer instanceof L.Polyline) {
          layer.setStyle({
            dashArray: "10, 10",
            dashOffset: "0",
          });
          
          // Animate the dash offset for moving effect
          let offset = 0;
          setInterval(() => {
            offset += 1;
            layer.setStyle({ dashOffset: offset.toString() });
          }, 50);
        }
      },
    }).addTo(mapRef.current);

    routeLayerRef.current = routeLayer;

    // Fit bounds to route with animation
    const bounds = routeLayer.getBounds();
    mapRef.current.fitBounds(bounds, { 
      padding: [80, 80],
      animate: true,
      duration: 1,
    });
  }, [routeGeoJSON]);

  return (
    <div className="relative w-full h-full min-h-[500px]">
      <div ref={mapContainerRef} className="absolute inset-0 rounded-lg" />
      
      {/* Loading indicator when waiting for coordinates */}
      {!startCoords && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-lg z-[1000]">
          <div className="text-center space-y-4">
            <div className="relative">
              <div className="w-16 h-16 mx-auto">
                <svg className="animate-spin" viewBox="0 0 24 24">
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                    fill="none"
                  />
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-2xl animate-pulse">📍</div>
              </div>
            </div>
            <p className="text-sm font-medium text-muted-foreground animate-pulse">
              Getting your location...
            </p>
          </div>
        </div>
      )}

      {/* Custom animations and styles */}
      <style jsx global>{`
        @keyframes markerDrop {
          0% {
            transform: translateY(-100px);
            opacity: 0;
          }
          60% {
            transform: translateY(5px);
            opacity: 1;
          }
          80% {
            transform: translateY(-3px);
          }
          100% {
            transform: translateY(0);
          }
        }

        @keyframes pulseRing {
          0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0.8;
          }
          50% {
            opacity: 0.4;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.3);
            opacity: 0;
          }
        }

        @keyframes pinBounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes shadowPulse {
          0%, 100% {
            width: 20px;
            opacity: 0.3;
          }
          50% {
            width: 26px;
            opacity: 0.2;
          }
        }

        @keyframes glowPulse {
          0%, 100% {
            opacity: 1;
            transform: translateX(-50%) scale(1);
          }
          50% {
            opacity: 0.6;
            transform: translateX(-50%) scale(1.3);
          }
        }

        .custom-animated-marker {
          background: transparent;
          border: none;
        }

        .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 10px 25px -5px rgb(0 0 0 / 0.2);
          border: none;
        }

        .leaflet-popup-tip {
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        }

        .leaflet-popup-content {
          margin: 8px 12px;
        }

        /* Smooth zoom controls */
        .leaflet-control-zoom a {
          transition: all 0.2s ease;
        }

        .leaflet-control-zoom a:hover {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
}