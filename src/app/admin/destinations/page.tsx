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
import { mockCityDestinations } from "@/lib/data";

export default function AdminDestinationsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Destination Management</h1>
                <p className="text-muted-foreground">Add, edit, or delete city destinations and route information.</p>
            </div>
            <Button>Add New Destination</Button>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>City Guide Destinations</CardTitle>
                <CardDescription>List of destinations available in the student city guide.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Destination Name</TableHead>
                            <TableHead>Travel Options</TableHead>
                            <TableHead>Estimated Cost</TableHead>
                            <TableHead>Popular Attractions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockCityDestinations.map(dest => (
                            <TableRow key={dest.destinationId}>
                                <TableCell className="font-medium">{dest.name}</TableCell>
                                <TableCell>{dest.travelOptions}</TableCell>
                                <TableCell>{dest.estimatedCost}</TableCell>
                                <TableCell>{dest.popularAttractions.join(', ')}</TableCell>
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
