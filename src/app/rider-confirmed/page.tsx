"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { UserLayout } from "@/components/layouts/user-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Car } from "lucide-react";

const MapClient = dynamic(() => import("@/components/MapClient"), { ssr: false });

export default function RiderConfirmedPage() {
  const searchParams = useSearchParams();

  // Parse coordinates from query params
  let pickupCoords: [number, number] = [77.2090, 28.6139]; // Default: your location
  let driverCoords: [number, number] = [77.216721, 28.644800]; // Default: driver location

  try {
    const pickupParam = searchParams?.get("pickup");
    const driverParam = searchParams?.get("dest");
    if (pickupParam) pickupCoords = JSON.parse(decodeURIComponent(pickupParam));
    if (driverParam) driverCoords = JSON.parse(decodeURIComponent(driverParam));
  } catch (err) {
    // fallback to defaults if parsing fails
  }

  // Rider details
  const rider = {
    name: "Rahul Sharma",
    vehicle: "Maruti Suzuki Swift",
    plate: "DL 4CAF 1234",
    phone: "+91 98765 43210",
    avatarUrl: "/avatar.png",
    eta: "4 min",
    coords: driverCoords,
  };

  const [routeGeoJSON, setRouteGeoJSON] = useState<any | null>(null);

  useEffect(() => {
    async function fetchRoute() {
      try {
        const apiKey = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImZmZjY5YjU4M2EyZDQ4ZjY4OGYyMGUwMDNmZDQ1NmIyIiwiaCI6Im11cm11cjY0In0=";
        const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}`;
        const body = {
          coordinates: [driverCoords, pickupCoords]
        };
        const resp = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });
        const data = await resp.json();
        if (data && data.features && data.features[0]) {
          setRouteGeoJSON(data.features[0]);
        }
      } catch (err) {
        console.error("Failed to fetch rider route:", err);
      }
    }
    fetchRoute();
  }, [driverCoords, pickupCoords]);

  return (
    <UserLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <Card className="w-full max-w-md mb-2 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-700">Rider Confirmed</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <Avatar className="mx-auto mb-2">
              <img src={rider.avatarUrl} alt={rider.name} className="w-full h-full rounded-full object-cover" />
            </Avatar>
            <div className="text-lg font-semibold text-blue-800">{rider.name}</div>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Car className="h-5 w-5 text-blue-600" />
              <span>{rider.vehicle}</span>
              <span>({rider.plate})</span>
            </div>
            <div className="text-sm text-blue-600">ETA: {rider.eta}</div>
            <div className="mt-4 text-base font-medium text-green-600">
              Your rider is coming to pick you up!
            </div>
            <div className="mt-2 text-sm">
              Contact: <a href={`tel:${rider.phone}`} className="underline">{rider.phone}</a>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full max-w-md overflow-hidden border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-700">Live Map</CardTitle>
          </CardHeader>
          <CardContent style={{ height: "300px" }}>
            <MapClient
              startCoords={driverCoords}   // Driver's location
              destCoords={pickupCoords}    // Your location
              routeGeoJSON={routeGeoJSON}
              riderMode={true}
            />
          </CardContent>
        </Card>
      </div>
    </UserLayout>
  );
}