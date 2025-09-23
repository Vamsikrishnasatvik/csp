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
import { Badge } from "@/components/ui/badge";
import { mockVehicles } from "@/lib/data";


export default function AdminVehiclesPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vehicle & Carpool Monitoring</h1>
          <p className="text-muted-foreground">Monitor registered vehicles and carpool participation.</p>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Registered Vehicles</CardTitle>
                <CardDescription>A list of vehicles available for carpooling.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Driver</TableHead>
                            <TableHead>Vehicle Model</TableHead>
                            <TableHead>Available Seats</TableHead>
                            <TableHead>Current Location</TableHead>
                            <TableHead>Willing to Share</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockVehicles.map(vehicle => (
                            <TableRow key={vehicle.vehicleId}>
                                <TableCell className="font-medium">{vehicle.driverName}</TableCell>
                                <TableCell>{vehicle.model}</TableCell>
                                <TableCell>{vehicle.availableSeats}</TableCell>
                                <TableCell>{vehicle.currentLocation}</TableCell>
                                <TableCell>
                                    <Badge variant={vehicle.willingnessToShare ? "default" : "secondary"}>
                                        {vehicle.willingnessToShare ? 'Yes' : 'No'}
                                    </Badge>
                                </TableCell>
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
