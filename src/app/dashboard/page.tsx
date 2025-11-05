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
  const [mounted, setMounted] = useState(false);
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
        // Trigger mount animations after data loads
        setTimeout(() => setMounted(true), 50);
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
        {/* Animated Header */}
        <div 
          className="transform transition-all duration-700 ease-out"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(-20px)'
          }}
        >
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {user.name.split(' ')[0]}!
          </h1>
          <p className="text-muted-foreground">
            Here's your commute overview for this weekend.
          </p>
        </div>

        {/* Animated Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Upcoming Trips",
              icon: Route,
              value: user.trips?.upcoming || 0,
              subtitle: user.trips?.nextDestination || 'No upcoming trips',
              delay: 0
            },
            {
              title: "Total Saved",
              icon: DollarSign,
              value: `₹${user.totalSaved || 0}`,
              subtitle: 'this month by carpooling',
              delay: 100
            },
            {
              title: "Carpool Requests",
              icon: Users,
              value: `${user.carpoolRequests?.pending || 0} Pending`,
              subtitle: 'Awaiting your approval',
              delay: 200
            }
          ].map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="transform transition-all duration-700 ease-out"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                  transitionDelay: `${card.delay}ms`
                }}
              >
                <Card className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer border-border/50 hover:border-border">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium transition-colors duration-300 group-hover:text-primary">
                      {card.title}
                    </CardTitle>
                    <div className="transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold transition-all duration-300 group-hover:scale-105 origin-left">
                      {card.value}
                    </div>
                    <p className="text-xs text-muted-foreground transition-colors duration-300 group-hover:text-foreground/70">
                      {card.subtitle}
                    </p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Animated Recommendations Section */}
        <div
          className="transform transition-all duration-700 ease-out"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(30px)',
            transitionDelay: '300ms'
          }}
        >
          <SmartRecommendations userId={user._id} />
        </div>
      </div>
    </UserLayout>
  );
}