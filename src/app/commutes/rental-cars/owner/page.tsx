"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { UserLayout } from "@/components/layouts/user-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { MapPin, Phone, Star, CheckCircle2, User, Shield, Award } from "lucide-react";

const ownersByCarType = {
  Sedan: [
    {
      id: 1,
      name: "Amit Verma",
      phone: "+91 98765 43210",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      location: "Connaught Place, Delhi",
      rating: 4.8,
      trips: 150,
      verified: true,
      badges: ["Top Rated", "Verified"],
    },
    {
      id: 4,
      name: "Nisha Sharma",
      phone: "+91 99876 54321",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
      location: "Khan Market, Delhi",
      rating: 4.6,
      trips: 120,
      verified: true,
      badges: ["Professional"],
    },
  ],
  SUV: [
    {
      id: 2,
      name: "Priya Singh",
      phone: "+91 91234 56789",
      avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
      location: "Gurgaon, Haryana",
      rating: 4.9,
      trips: 200,
      verified: true,
      badges: ["Top Rated", "Verified", "5+ Years"],
    },
    {
      id: 5,
      name: "Vikram Lal",
      phone: "+91 97654 32109",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      location: "MG Road, Gurgaon",
      rating: 4.7,
      trips: 180,
      verified: true,
      badges: ["Professional", "Verified"],
    },
  ],
  Hatchback: [
    {
      id: 3,
      name: "Rohit Kumar",
      phone: "+91 99887 76655",
      avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
      location: "Noida, UP",
      rating: 4.5,
      trips: 95,
      verified: true,
      badges: ["Reliable"],
    },
    {
      id: 6,
      name: "Anita Desai",
      phone: "+91 96543 21098",
      avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      location: "Sector 62, Noida",
      rating: 4.8,
      trips: 110,
      verified: true,
      badges: ["Top Rated", "Professional"],
    },
  ],
  "Luxury Sedan": [
    {
      id: 7,
      name: "Rajesh Khanna",
      phone: "+91 98765 11111",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
      location: "South Delhi",
      rating: 5.0,
      trips: 250,
      verified: true,
      badges: ["Top Rated", "Verified", "Premium", "5+ Years"],
    },
  ],
  "Electric Car": [
    {
      id: 8,
      name: "Sneha Reddy",
      phone: "+91 98765 22222",
      avatarUrl: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&w=200&q=80",
      location: "Bangalore",
      rating: 4.9,
      trips: 130,
      verified: true,
      badges: ["Eco-Friendly", "Verified", "Tech Savvy"],
    },
  ],
  "Mini Car": [
    {
      id: 9,
      name: "Karan Malhotra",
      phone: "+91 98765 33333",
      avatarUrl: "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=200&q=80",
      location: "Mumbai",
      rating: 4.6,
      trips: 85,
      verified: true,
      badges: ["Budget Friendly", "Quick Response"],
    },
  ],
};

function OwnerDetails({ 
  owner, 
  type, 
  selected, 
  onSelect,
  index 
}: {
  owner: any;
  type: string;
  selected: boolean;
  onSelect: () => void;
  index: number;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), index * 150);
  }, [index]);

  return (
    <div
      className="transform transition-all duration-700 ease-out"
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateX(0) scale(1)' : 'translateX(-30px) scale(0.95)',
      }}
    >
      <Card 
        className={`group relative overflow-hidden transition-all duration-500 cursor-pointer
          ${selected 
            ? "border-primary shadow-2xl shadow-primary/20 scale-[1.02]" 
            : "border-border/50 hover:border-primary/50 hover:shadow-xl"
          }`}
        onClick={onSelect}
      >
        {/* Selected indicator */}
        {selected && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-blue-500 to-primary animate-pulse" />
        )}

        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              {/* Animated Avatar */}
              <div className="relative">
                <div className={`absolute inset-0 rounded-full ${selected ? 'animate-ping bg-primary/30' : ''}`} />
                <Avatar className="h-16 w-16 ring-2 ring-offset-2 transition-all duration-300 group-hover:ring-primary group-hover:scale-110">
                  <img
                    src={owner.avatarUrl}
                    alt={owner.name}
                    className="object-cover rounded-full h-full w-full"
                  />
                </Avatar>
                {owner.verified && (
                  <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1 shadow-lg animate-bounce" style={{ animationDuration: '2s' }}>
                    <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
              </div>

              <div>
                <CardTitle className="text-lg flex items-center gap-2 group-hover:text-primary transition-colors duration-300">
                  {owner.name}
                  {owner.verified && (
                    <Shield className="h-4 w-4 text-primary" />
                  )}
                </CardTitle>
                <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                  <User className="h-3 w-3" />
                  {type} Owner
                </div>
              </div>
            </div>

            {/* Rating Badge */}
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded-full">
                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                <span className="text-sm font-bold text-yellow-700 dark:text-yellow-500">
                  {owner.rating}
                </span>
              </div>
              <div className="text-xs text-muted-foreground">
                {owner.trips} trips
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Location */}
          <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg transition-colors duration-300 group-hover:bg-muted">
            <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <span className="text-sm">{owner.location}</span>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {owner.badges.map((badge: string, idx: number) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-medium transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
              >
                <Award className="h-3 w-3" />
                {badge}
              </span>
            ))}
          </div>

          {/* Phone Number */}
          <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <Phone className="h-4 w-4 text-green-600 dark:text-green-500" />
            <a 
              href={`tel:${owner.phone}`}
              className="text-sm font-medium text-green-700 dark:text-green-500 hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              {owner.phone}
            </a>
          </div>

          {/* Select Button */}
          <Button
            variant={selected ? "default" : "outline"}
            className={`w-full transition-all duration-300 
              ${selected 
                ? "shadow-lg shadow-primary/30" 
                : "hover:scale-105 active:scale-95"
              }`}
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
          >
            {selected ? (
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Selected
              </span>
            ) : (
              "Select Owner"
            )}
          </Button>
        </CardContent>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </Card>
    </div>
  );
}

function CarOwnerPageContent() {
  const searchParams = useSearchParams();
  const typeParam = searchParams?.get("type");
  const idParam = Number(searchParams?.get("id"));
  const [mounted, setMounted] = useState(false);

  // Default to Sedan if type is not provided or invalid
  const type = typeParam && ownersByCarType[typeParam as keyof typeof ownersByCarType]
    ? (typeParam as keyof typeof ownersByCarType)
    : "Sedan";
  const ownersList = ownersByCarType[type];

  // Find index of owner by id, default to first owner if not found
  const initialSelectedIdx = ownersList.findIndex(o => o.id === idParam);
  const [selectedIdx, setSelectedIdx] = useState(initialSelectedIdx !== -1 ? initialSelectedIdx : 0);

  // Update selectedIdx if type or id changes
  useEffect(() => {
    const idx = ownersList.findIndex(o => o.id === idParam);
    setSelectedIdx(idx !== -1 ? idx : 0);
  }, [type, idParam]);

  useEffect(() => {
    setTimeout(() => setMounted(true), 100);
  }, []);

  const selectedOwner = ownersList[selectedIdx];

  return (
    <UserLayout>
      <div className="flex flex-col items-center py-8 px-4">
        {/* Header with animation */}
        <div 
          className="text-center mb-8 transform transition-all duration-700 ease-out"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(-20px)'
          }}
        >
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <User className="h-6 w-6 text-primary" />
            </div>
            {type} Owners
          </h1>
          <p className="text-muted-foreground">
            Choose your preferred car owner for your {type}
          </p>
        </div>

        {/* Owners List */}
        <div className="w-full max-w-2xl space-y-6">
          {ownersList.map((owner, idx) => (
            <OwnerDetails
              key={owner.id}
              owner={owner}
              type={type}
              selected={selectedIdx === idx}
              onSelect={() => setSelectedIdx(idx)}
              index={idx}
            />
          ))}
        </div>

        {/* Call to Book Button */}
        <div 
          className="w-full max-w-2xl mt-8 transform transition-all duration-700 ease-out"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: `${ownersList.length * 150}ms`
          }}
        >
          <Button 
            className="w-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 text-lg py-6"
            asChild
          >
            <a href={`tel:${selectedOwner.phone}`} className="flex items-center justify-center gap-3">
              <Phone className="h-5 w-5" />
              Call {selectedOwner.name} to Book
            </a>
          </Button>
          
          {/* Additional info */}
          <p className="text-center text-sm text-muted-foreground mt-4">
            By calling, you agree to our terms and conditions
          </p>
        </div>
      </div>
    </UserLayout>
  );
}

export default function CarOwnerPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CarOwnerPageContent />
    </Suspense>
  );
}