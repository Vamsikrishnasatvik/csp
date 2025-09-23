import { UserLayout } from "@/components/layouts/user-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SmartRecommendations } from "@/components/user/smart-recommendations";
import { mockUser } from "@/lib/data";
import { DollarSign, Route, Users } from "lucide-react";

export default function DashboardPage() {
  return (
    <UserLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {mockUser.name.split(' ')[0]}!</h1>
          <p className="text-muted-foreground">Here's your commute overview for this weekend.</p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Upcoming Trips</CardTitle>
                    <Route className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">1</div>
                    <p className="text-xs text-muted-foreground">Carpool to Jubilee Hills</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Saved</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">₹1,250</div>
                    <p className="text-xs text-muted-foreground">this month by carpooling</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Carpool Requests</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">2 Pending</div>
                    <p className="text-xs text-muted-foreground">Awaiting your approval</p>
                </CardContent>
            </Card>
        </div>

        <SmartRecommendations />

      </div>
    </UserLayout>
  );
}
