"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { UserLayout } from "@/components/layouts/user-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SmartRecommendations } from "@/components/user/smart-recommendations";
import { DollarSign, Route, Users } from "lucide-react";

type User = {
  _id: string;
  name: string;
  trips?: {
    upcoming?: number;
    nextDestination?: string;
  };
  totalSaved?: number;
  carpoolRequests?: {
    pending?: number;
  };
};

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      router.push("/");
      return;
    }

    fetch(`/api/user/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        router.push("/");
        setLoading(false);
      });

    const role = localStorage.getItem("role");
    if (role && userId) {
      const ws = new WebSocket(`ws://localhost:8000/ws/${role}/${userId}`);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("WebSocket connected");
        ws.send("Hello from frontend!");
      };

      ws.onmessage = (event) => {
        console.log("Received:", event.data);
      };

      ws.onclose = () => {
        console.log("WebSocket closed");
      };

      return () => {
        ws.close();
      };
    }
  }, [router]);

  if (loading || !user) return null;

  return (
    <UserLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {user.name.split(' ')[0]}!
          </h1>
          <p className="text-muted-foreground">
            Here's your commute overview for this weekend.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Trips</CardTitle>
              <Route className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.trips?.upcoming || 0}</div>
              <p className="text-xs text-muted-foreground">
                {user.trips?.nextDestination || 'No upcoming trips'}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Saved</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{user.totalSaved || 0}</div>
              <p className="text-xs text-muted-foreground">this month by carpooling</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Carpool Requests</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.carpoolRequests?.pending || 0} Pending</div>
              <p className="text-xs text-muted-foreground">Awaiting your approval</p>
            </CardContent>
          </Card>
        </div>
        <SmartRecommendations userId={user._id} />
      </div>
    </UserLayout>
  );
}
