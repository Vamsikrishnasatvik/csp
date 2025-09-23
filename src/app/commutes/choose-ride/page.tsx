"use client";
import { useState } from "react";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { UserSidebar } from "@/components/user/user-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function ChooseRidePage() {
  const [pickup, setPickup] = useState("Woxsen University");
  const [drop, setDrop] = useState("Lingampally");
  const [pickupTime, setPickupTime] = useState("Pickup now");
  const [forWhom, setForWhom] = useState("For me");

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <SidebarProvider>
        <aside className="hidden md:flex flex-col w-64 bg-white border-r min-h-screen">
          <UserSidebar />
        </aside>
      </SidebarProvider>

      {/* Main Content */}
      <main className="flex flex-1 flex-col lg:flex-row px-4 py-8 gap-6">
        {/* Left Panel - Ride Inputs */}
        <section className="flex-shrink-0 w-full lg:w-80">
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-4">
            <h2 className="font-semibold text-xl">Get a ride</h2>
            <button className="w-full bg-gray-100 rounded-lg py-3 px-4 text-left font-medium text-base">
              {pickup}
            </button>
            <button className="w-full bg-gray-100 rounded-lg py-3 px-4 flex items-center justify-between font-medium text-base">
              <span>{drop}</span>
              <span className="bg-black text-white rounded-full w-7 h-7 flex items-center justify-center text-lg font-bold">+</span>
            </button>
            <select
              className="w-full bg-gray-100 rounded-lg py-3 px-4 font-medium text-base"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
            >
              <option>Pickup now</option>
              <option>Schedule</option>
            </select>
            <select
              className="w-full bg-gray-100 rounded-lg py-3 px-4 font-medium text-base"
              value={forWhom}
              onChange={(e) => setForWhom(e.target.value)}
            >
              <option>For me</option>
              <option>For someone else</option>
            </select>
          </div>
        </section>

        {/* Center Panel - Ride Cards */}
        <section className="flex-1 flex flex-col items-center">
          <div className="text-4xl font-extrabold mb-2 text-center">Choose a ride</div>
          <div className="text-lg font-semibold text-gray-700 mb-6 text-center">Rides we think you'll like</div>
          <div className="w-full max-w-xl">
            <Card className="border-2 border-black rounded-xl mb-4">
              <CardContent className="flex items-center gap-6 p-6">
                <img src="/car.png" alt="Car" className="w-24 h-24 object-contain" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-2xl font-bold">Go Intercity</CardTitle>
                    <Users className="h-5 w-5" />
                    <span className="text-lg">4</span>
                  </div>
                  <div className="text-gray-500 text-sm mt-1">15 mins away • 12:09 AM</div>
                  <CardDescription className="mt-2">Affordable outstation rides in compact cars</CardDescription>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-green-600 font-bold text-lg">5% off</span>
                  <span className="text-2xl font-bold">₹1,015.31</span>
                  <span className="text-gray-400 line-through">₹1,068.75</span>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full text-lg px-8 py-4 font-bold bg-[#2563eb] hover:bg-[#1d4ed8] text-white">
              Request Go Intercity
            </Button>
          </div>
        </section>

        {/* Right Panel - Map */}
        <section className="hidden lg:block flex-shrink-0 w-[400px] h-[400px] relative">
          <iframe
            title="Map"
            width="100%"
            height="100%"
            style={{ borderRadius: "1rem", border: "1px solid #e5e7eb" }}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.217393698736!2d78.3566720750737!3d17.18987798364659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93e2e2e2e2e2%3A0x2e2e2e2e2e2e2e2e!2sWoxsen%20University!5e0!3m2!1sen!2sin!4v1695555555555!5m2!1sen!2sin"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </section>
      </main>
    </div>
  );
}
