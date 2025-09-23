import { UserLayout } from "@/components/layouts/user-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Car, Route, Clock, ArrowRight } from "lucide-react";
import Image from 'next/image';
import { PlaceHolderImages } from "@/lib/placeholder-images";


export default function RoutePlannerPage() {
    const mapPlaceholder = PlaceHolderImages.find(p => p.id === 'map-placeholder');

    return (
        <UserLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Route Planner</h1>
                    <p className="text-muted-foreground">Plan your trip with estimated time, distance, and cost.</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader>
                                <CardTitle>Plan Your Route</CardTitle>
                                <CardDescription>Enter your start and end points.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="start">Start</Label>
                                    <Input id="start" defaultValue="Woxsen University Campus" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="destination">Destination</Label>
                                    <Input id="destination" placeholder="e.g., Secunderabad Station" />
                                </div>
                                <Button className="w-full">
                                    <Route className="mr-2 h-4 w-4" />
                                    Find Route
                                </Button>
                                <Separator className="my-4"/>
                                <div className="space-y-4 text-sm">
                                    <h3 className="font-semibold">Route Details</h3>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Distance</span>
                                        <span>75 km</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Est. Time</span>
                                        <span>1 hr 45 min</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Est. Fuel Cost</span>
                                        <span>₹ 600 - 800</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="lg:col-span-2">
                        <Card className="overflow-hidden">
                            <section className="hidden lg:block flex-shrink-0 w-[700px] h-[500px] relative">
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
                            <CardContent className="p-4 bg-secondary/50">
                                <div className="flex items-center justify-center gap-4 text-sm font-medium">
                                    <div className="flex items-center gap-2">
                                        <Car/> Woxsen University
                                    </div>
                                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                                    <div className="flex items-center gap-2">
                                        <Route/> Secunderabad Station
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
