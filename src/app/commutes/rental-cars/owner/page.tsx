"use client";

import { useSearchParams } from "next/navigation";
import { UserLayout } from "@/components/layouts/user-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const ownersByCarType = {
  Sedan: [
    {
      id: 1,
      name: "Amit Verma",
      phone: "+91 98765 43210",
      avatarUrl: "/avatar.png",
      location: "Connaught Place, Delhi",
    },
    {
      id: 4,
      name: "Nisha Sharma",
      phone: "+91 99876 54321",
      avatarUrl: "/avatar4.png",
      location: "Khan Market, Delhi",
    },
  ],
  SUV: [
    {
      id: 2,
      name: "Priya Singh",
      phone: "+91 91234 56789",
      avatarUrl: "/avatar2.png",
      location: "Gurgaon, Haryana",
    },
    {
      id: 5,
      name: "Vikram Lal",
      phone: "+91 97654 32109",
      avatarUrl: "/avatar5.png",
      location: "MG Road, Gurgaon",
    },
  ],
  Hatchback: [
    {
      id: 3,
      name: "Rohit Kumar",
      phone: "+91 99887 76655",
      avatarUrl: "/avatar3.png",
      location: "Noida, UP",
    },
    {
      id: 6,
      name: "Anita Desai",
      phone: "+91 96543 21098",
      avatarUrl: "/avatar6.png",
      location: "Sector 62, Noida",
    },
  ],
};

function OwnerDetails({ owner, type, selected, onSelect }: {
  owner: any;
  type: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <Card className={`shadow-lg ${selected ? "border-blue-500" : ""}`}>
      <CardHeader>
        <CardTitle className="text-lg text-center">{owner.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-center">
        <Avatar className="mx-auto h-16 w-16">
          <img
            src={owner.avatarUrl}
            alt={owner.name}
            className="object-cover rounded-full h-full w-full"
          />
        </Avatar>
        <div className="text-sm text-gray-500">{type} Owner</div>
        <div className="text-sm text-gray-500">Location: {owner.location}</div>
        <div className="mt-2 text-base font-medium text-green-600">
          Contact: <span className="underline">{owner.phone}</span>
        </div>
        <Button
          variant={selected ? "default" : "outline"}
          className="w-full mt-2"
          onClick={onSelect}
        >
          {selected ? "Selected" : "Select"}
        </Button>
      </CardContent>
    </Card>
  );
}

export default function CarOwnerPage() {
  const searchParams = useSearchParams();
  const typeParam = searchParams?.get("type");
  const idParam = Number(searchParams?.get("id"));

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

  const selectedOwner = ownersList[selectedIdx];

  return (
    <UserLayout>
      <div className="flex flex-col items-center py-12">
        <h1 className="text-xl font-bold mb-8">{type} Owners</h1>
        <div className="w-full max-w-md space-y-8">
          {ownersList.map((owner, idx) => (
            <OwnerDetails
              key={owner.id}
              owner={owner}
              type={type}
              selected={selectedIdx === idx}
              onSelect={() => setSelectedIdx(idx)}
            />
          ))}
        </div>
        <Button className="w-full max-w-md mt-8" asChild>
          <a href={`tel:${selectedOwner.phone}`}>Call to Book</a>
        </Button>
      </div>
    </UserLayout>
  );
}
