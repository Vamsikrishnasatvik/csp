import { AdminLayout } from "@/components/layouts/admin-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { mockCommutes } from "@/lib/data";

const busSchedules = mockCommutes.filter(c => c.type.includes('Bus'));

export default function AdminSchedulesPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Schedule Management</h1>
                <p className="text-muted-foreground">Manage College and RCT bus schedules and fare info.</p>
            </div>
            <Button>Add New Schedule</Button>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Bus Schedules</CardTitle>
                <CardDescription>Current bus schedules for students.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Bus Type</TableHead>
                            <TableHead>Route</TableHead>
                            <TableHead>Departure Time</TableHead>
                            <TableHead>Fare (₹)</TableHead>
                            <TableHead>Available Seats</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {busSchedules.map(bus => (
                            <TableRow key={bus.commuteId}>
                                <TableCell className="font-medium">{bus.type}</TableCell>
                                <TableCell>{bus.routeDetails}</TableCell>
                                <TableCell>{bus.departureTime}</TableCell>
                                <TableCell>₹{bus.costEstimate}</TableCell>
                                <TableCell>{bus.availableSeats}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
