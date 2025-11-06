"use client";

import { UserLayout } from "@/components/layouts/user-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Car, Users, IndianRupee, Fuel, Gauge } from "lucide-react";
import { useState } from "react";

// Updated car data with better images from Unsplash
const availableCars = [
  { 
    id: 1, 
    name: "Sedan", 
    price: 350, 
    seats: 4, 
    description: "Comfortable for city rides",
    fuel: "Petrol",
    transmission: "Manual",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80",
    features: ["AC", "Music System", "GPS"]
  },
  { 
    id: 2, 
    name: "SUV", 
    price: 500, 
    seats: 6, 
    description: "Spacious and powerful",
    fuel: "Diesel",
    transmission: "Automatic",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80",
    features: ["AC", "Leather Seats", "4WD", "Sunroof"]
  },
  { 
    id: 3, 
    name: "Hatchback", 
    price: 250, 
    seats: 4, 
    description: "Economical and compact",
    fuel: "Petrol",
    transmission: "Manual",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
    features: ["AC", "Music System", "Parking Sensor"]
  },
  { 
    id: 4, 
    name: "Luxury Sedan", 
    price: 800, 
    seats: 5, 
    description: "Premium comfort and style",
    fuel: "Petrol",
    transmission: "Automatic",
    image: "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?auto=format&fit=crop&w=800&q=80",
    features: ["AC", "Leather Seats", "Sunroof", "Premium Audio"]
  },
  { 
    id: 5, 
    name: "Electric Car", 
    price: 600, 
    seats: 5, 
    description: "Eco-friendly and silent",
    fuel: "Electric",
    transmission: "Automatic",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80",
    features: ["AC", "Auto-pilot", "Fast Charging", "Zero Emission"]
  },
];

export default function RentalCarsPage() {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  // Trigger animations on mount
  useState(() => {
    setTimeout(() => setMounted(true), 50);
  });

  return (
    <UserLayout>
      <div className="space-y-8">
        {/* Header with animation */}
        <div 
          className="transform transition-all duration-700 ease-out"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(-20px)'
          }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Car className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Available Rental Cars</h1>
          </div>
          <p className="text-muted-foreground">
            Choose from our wide range of vehicles for your commute
          </p>
        </div>

        {/* Car Grid with staggered animations */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {availableCars.map((car, index) => (
            <div
              key={car.id}
              className="transform transition-all duration-700 ease-out"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                transitionDelay: `${index * 100}ms`
              }}
              onMouseEnter={() => setHoveredCard(car.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Card className="group overflow-hidden border-border/50 hover:border-primary/50 hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                {/* Image Container with hover effects */}
                <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                  <div 
                    className="relative h-52 overflow-hidden"
                    style={{
                      transform: hoveredCard === car.id ? 'scale(1.1)' : 'scale(1)',
                      transition: 'transform 0.6s ease-out'
                    }}
                  >
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    
                    {/* Overlay gradient */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    
                    {/* Floating badge */}
                    <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold shadow-lg transform transition-all duration-300 group-hover:scale-110">
                      ₹{car.price}/day
                    </div>

                    {/* Fuel type badge */}
                    <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium shadow-md flex items-center gap-1">
                      <Fuel className="h-3 w-3" />
                      {car.fuel}
                    </div>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-xl flex items-center justify-between group-hover:text-primary transition-colors duration-300">
                    {car.name}
                    <div className="transform transition-transform duration-300 group-hover:translate-x-1">
                      <Car className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                    </div>
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {car.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 flex-1 flex flex-col">
                  {/* Car specs */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-sm bg-muted/50 rounded-lg p-2 transition-colors duration-300 group-hover:bg-muted">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{car.seats} Seats</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm bg-muted/50 rounded-lg p-2 transition-colors duration-300 group-hover:bg-muted">
                      <Gauge className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{car.transmission}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1.5">
                    {car.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Price and button */}
                  <div className="space-y-3 mt-auto pt-3 border-t">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-muted-foreground">Starting from</p>
                        <div className="flex items-center gap-1">
                          <IndianRupee className="h-4 w-4 text-primary" />
                          <span className="text-2xl font-bold text-primary">{car.price}</span>
                          <span className="text-sm text-muted-foreground">/day</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      className="w-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                      onClick={() => router.push(`/commutes/rental-cars/owner?type=${car.name}&id=${car.id}`)}
                    >
                      Select {car.name}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </UserLayout>
  );
}