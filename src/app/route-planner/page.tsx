"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { UserLayout } from "@/components/layouts/user-layout";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Car, ArrowRight, MapPin } from "lucide-react";

import Openrouteservice from "openrouteservice-js";

// Dynamically import the map component to avoid SSR issues
const MapClient = dynamic(() => import("@/components/MapClient"), { ssr: false });

export default function RoutePlannerPage() {
  const orsClientRef = useRef<any>(null);

  const [startCoords, setStartCoords] = useState<[number, number] | null>(null);
  const [destination, setDestination] = useState("");
  const [destCoords, setDestCoords] = useState<[number, number] | null>(null);
  const [routeGeoJSON, setRouteGeoJSON] = useState<any | null>(null);

  const [startAddress, setStartAddress] = useState("Fetching current location…");
  const [distanceText, setDistanceText] = useState<string>("");
  const [durationText, setDurationText] = useState<string>("");

  // Initialize ORS client
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      orsClientRef.current = new Openrouteservice.Directions({
        api_key: "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImZmZjY5YjU4M2EyZDQ4ZjY4OGYyMGUwMDNmZDQ1NmIyIiwiaCI6Im11cm11cjY0In0="
      });
    } catch (err) {
      console.error("Failed to initialize ORS Directions client:", err);
    }
  }, []);

  // Get user current location
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setStartAddress("Location not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setStartCoords([longitude, latitude]);
        setStartAddress(`Lat: ${latitude.toFixed(5)}, Lng: ${longitude.toFixed(5)}`);
      },
      (err) => {
        console.error("Error fetching current location:", err);
        setStartAddress("Permission denied / location unavailable");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);

  const geocodeDestination = async (address: string) => {
    if (!address.trim()) return null;
    try {
      const resp = await fetch(`http://localhost:9002/api/geocode?address=${encodeURIComponent(address)}`);
      if (!resp.ok) throw new Error("Geocoding API error");
      const geoResp = await resp.json();
      if (!geoResp.features || !geoResp.features[0]) return null;
      const coords = geoResp.features[0].geometry.coordinates as [number, number];
      return coords;
    } catch (err) {
      console.error("Geocoding error:", err);
      return null;
    }
  };

  const handleFindRoute = async () => {
    if (!startCoords) {
      console.warn("Start coordinates not available yet");
      return;
    }
    if (!destination.trim()) {
      console.warn("Destination address not entered");
      return;
    }
    const coords = await geocodeDestination(destination);
    if (!coords) {
      console.warn("Destination geocoding failed");
      return;
    }
    setDestCoords(coords);

    if (!orsClientRef.current) {
      console.warn("ORS client not initialized");
      return;
    }

    try {
      const response = await orsClientRef.current.calculate({
        coordinates: [startCoords, coords],
        profile: "driving-car",
        format: "geojson"
      });
      const geojsonFeature = (response as any).features[0];
      setRouteGeoJSON(geojsonFeature);
      const summary = geojsonFeature.properties.summary;
      const dist = summary.distance;
      const dur = summary.duration;
      setDistanceText(`${(dist / 1000).toFixed(1)} km`);
      setDurationText(`${Math.floor(dur / 60)} min`);
    } catch (err) {
      console.error("Routing error:", err);
      setDistanceText("");
      setDurationText("");
    }
  };

  return (
    <UserLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Route Planner</h1>
          <p className="text-muted-foreground">
            Plan your trip with estimated time, distance, and cost.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Plan Your Route</CardTitle>
                <CardDescription>Enter your destination</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Start (Your Current Location)</Label>
                  <Input readOnly value={startAddress} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination Address</Label>
                  <Input
                    id="destination"
                    placeholder="Enter destination address"
                    value={destination}
                    onChange={e => setDestination(e.target.value)}
                  />
                </div>
                <Button className="w-full" onClick={handleFindRoute}>
                  <MapPin className="mr-2 h-4 w-4" />
                  Find Route
                </Button>
                <Separator className="my-4"/>
                <div className="space-y-4 text-sm">
                  <h3 className="font-semibold">Route Details</h3>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Distance</span>
                    <span>{distanceText || "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Estimated Time</span>
                    <span>{durationText || "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Estimated Cost</span>
                    <span>
                      {distanceText
                        ? `₹ ${Math.round(parseFloat(distanceText.replace(" km","")) * 12)}`
                        : "—"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <MapClient
                startCoords={startCoords}
                destCoords={destCoords}
                routeGeoJSON={routeGeoJSON}
              />
            </Card>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
