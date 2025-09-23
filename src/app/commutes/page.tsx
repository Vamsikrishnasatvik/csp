"use client";

import { useState } from 'react';
import { UserLayout } from "@/components/layouts/user-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockCommutes } from "@/lib/data";
import { Bus, BusFront, Car, CarTaxiFront, Users, Clock, Wallet, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const icons: { [key: string]: React.ElementType } = {
  Bus, BusFront, Car, CarTaxiFront, Users
};

export default function CommutesPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [filter, setFilter] = useState('all');

  const filteredCommutes = filter === 'all' 
    ? mockCommutes 
    : mockCommutes.filter(c => c.filter === filter);

  const handleBook = (commuteType: string) => {
    if (commuteType.toLowerCase().includes("rental car")) {
      router.push("/commutes/rental-cars");
      return;
    }

    if (commuteType.toLowerCase().includes("carpool")) {
      router.push("/carpools");
      return;
    }

    if (commuteType.toLowerCase().includes("book vehicle")) {
      router.push("/commutes/choose-ride");
      return;
    }
    toast({
        title: "Booking Initiated",
        description: `Your request for the ${commuteType} has been noted.`,
    });
  };

  return (
    <UserLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Commute Options</h1>
          <p className="text-muted-foreground">Explore all available ways to travel from campus.</p>
        </div>
        <Tabs defaultValue="all" onValueChange={setFilter}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="fastest">Fastest</TabsTrigger>
            <TabsTrigger value="cheapest">Cheapest</TabsTrigger>
            <TabsTrigger value="eco-friendly">Eco-Friendly</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCommutes.map((commute) => {
            const Icon = icons[commute.icon];
            const isCarpool = commute.type.toLowerCase() === "carpool";
            return (
              <Card key={commute.commuteId}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      {Icon && <Icon className="h-8 w-8 text-primary" />}
                      <div>
                        <CardTitle>{commute.type}</CardTitle>
                        {!isCarpool && <CardDescription>{commute.routeDetails}</CardDescription>}
                      </div>
                    </div>
                    <Badge variant={
                      commute.filter === 'fastest' ? 'default' : 
                      commute.filter === 'cheapest' ? 'secondary' : 'outline'
                    }>{commute.filter}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!isCarpool && (
                    <>
                      <div className="flex justify-between items-center text-sm border-t pt-4">
                        <span className="flex items-center gap-2 text-muted-foreground"><Clock className="h-4 w-4"/> Departure</span>
                        <span>{commute.departureTime}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="flex items-center gap-2 text-muted-foreground"><Wallet className="h-4 w-4"/> Cost</span>
                        <span className="font-semibold">₹{commute.costEstimate}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="flex items-center gap-2 text-muted-foreground"><Users className="h-4 w-4"/> Seats Left</span>
                        <span>{commute.availableSeats}</span>
                      </div>
                    </>
                  )}
                  <Button className="w-full mt-2" onClick={() => handleBook(commute.type)}>
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </UserLayout>
  );
}
