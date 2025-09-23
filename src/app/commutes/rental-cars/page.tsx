"use client";

import { UserLayout } from "@/components/layouts/user-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Example data, replace image URLs with your own or use placeholder images
const availableCars = [
  { id: 1, name: "Sedan", price: 350, seats: 4, description: "Comfortable for city rides", image: "https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=400&q=80" },
  { id: 2, name: "SUV", price: 500, seats: 6, description: "Spacious and powerful", image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=400&q=80" },
  { id: 3, name: "Hatchback", price: 250, seats: 4, description: "Economical and compact", image: "https://images.unsplash.com/photo-1461632830798-3adb3034e4c8?auto=format&fit=crop&w=400&q=80" },
];

export default function RentalCarsPage() {
  return (
    <UserLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Available Rental Cars</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {availableCars.map(car => (
            <Card key={car.id}>
              <CardHeader>
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
                <CardTitle>{car.name}</CardTitle>
                <CardDescription>{car.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-2">
                  <span>Seats: {car.seats}</span>
                  <span className="font-semibold">₹{car.price}</span>
                </div>
                <Button className="w-full">Select</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </UserLayout>
  );
}