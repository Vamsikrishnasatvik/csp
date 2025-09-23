"use client";

import { UserLayout } from "@/components/layouts/user-layout";
import { mockCarpools } from "@/lib/data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, User, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

export default function CarpoolsPage() {
    const { toast } = useToast();

    const handleRequestJoin = (driverName: string) => {
        toast({
            title: "Request Sent",
            description: `Your request to join ${driverName}'s carpool has been sent.`,
        });
    };

  return (
    <UserLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Available Carpools</h1>
          <p className="text-muted-foreground">Find a ride with fellow students and save on your commute.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockCarpools.map((carpool) => (
                <Card key={carpool.requestId} className="flex flex-col">
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <Avatar>
                                <AvatarImage src={`https://picsum.photos/seed/${carpool.driverId}/100/100`} />
                                <AvatarFallback>{carpool.driverName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle>{carpool.driverName}</CardTitle>
                                <CardDescription>{carpool.vehicle}</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-3">
                        <div className="aspect-video relative rounded-lg overflow-hidden">
                            <Image src={`https://picsum.photos/seed/${carpool.vehicle}/300/200`} alt={carpool.vehicle} fill className="object-cover" data-ai-hint="car side" />
                        </div>
                        <div className="text-sm text-muted-foreground space-y-2">
                            <div className="flex items-center gap-2"><MapPin className="h-4 w-4"/> To: <span className="font-semibold text-foreground">{carpool.destination}</span></div>
                            <div className="flex items-center gap-2"><Clock className="h-4 w-4"/> Departs: <span className="font-semibold text-foreground">{carpool.departureTime}</span></div>
                            <div className="flex items-center gap-2"><Users className="h-4 w-4"/> Seats Left: <span className="font-semibold text-foreground">{carpool.availableSeats}</span></div>
                        </div>
                        <div className="pt-2">
                            <p className="text-xs font-semibold text-muted-foreground mb-2">Riders</p>
                            <div className="flex items-center space-x-2">
                                {carpool.requests.map(req => (
                                    <Badge key={req.userId} variant={req.status === 'approved' ? 'default' : 'secondary'}>
                                        <User className="h-3 w-3 mr-1"/>
                                        {req.name} ({req.status})
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" onClick={() => handleRequestJoin(carpool.driverName)}>
                            Request to Join
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
      </div>
    </UserLayout>
  );
}
