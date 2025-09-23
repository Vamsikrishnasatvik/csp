"use client";
import { AdminLayout } from "@/components/layouts/admin-layout";
import { RidesPerStudentChart, PopularDestinationsChart, CommutePatternsChart } from "@/components/admin/analytics-charts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, Car, Route } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // Replace with your actual user fetching logic
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.role !== "admin") {
      router.push("/dashboard"); // Redirect non-admins to student dashboard
    }
  }, [router]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Overview of student commute activities and patterns.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Active Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">1,234</div>
                    <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Carpools</CardTitle>
                    <Car className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">82</div>
                    <p className="text-xs text-muted-foreground">+12 since last week</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Trips this Month</CardTitle>
                    <Route className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">573</div>
                    <p className="text-xs text-muted-foreground">College Bus is the most used</p>
                </CardContent>
            </Card>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Rides Per Student</CardTitle>
                    <CardDescription>Monthly average of rides taken per student.</CardDescription>
                </CardHeader>
                <CardContent>
                    <RidesPerStudentChart />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Popular Destinations</CardTitle>
                    <CardDescription>Top city destinations for students.</CardDescription>
                </CardHeader>
                <CardContent>
                    <PopularDestinationsChart />
                </CardContent>
            </Card>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Commute Patterns</CardTitle>
                <CardDescription>Breakdown of commute types used by students.</CardDescription>
            </CardHeader>
            <CardContent>
                <CommutePatternsChart />
            </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
