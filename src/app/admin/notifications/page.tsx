"use client";

import { AdminLayout } from "@/components/layouts/admin-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Bell } from "lucide-react";
import { useSocket } from "@/context/SocketContext";
import { useRef } from "react";

export default function AdminNotificationsPage() {
    const { ws } = useSocket();
    const messageRef = useRef<HTMLTextAreaElement>(null);
    const { toast } = useToast();

    const handleSend = () => {
        const msg = messageRef.current?.value;
        if (ws && msg) {
            ws.send(msg); // Send to backend
            toast({
                title: "Notification Sent",
                description: "Your broadcast message has been sent to all students.",
            });
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Notification System</h1>
                    <p className="text-muted-foreground">Send broadcast notifications or alerts to students.</p>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Send Broadcast</CardTitle>
                        <CardDescription>Compose a message to be sent to all app users.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea ref={messageRef} id="message" placeholder="Type your notification here..." className="min-h-[150px]" />
                        </div>
                        <Button onClick={handleSend}>
                            <Bell className="mr-2 h-4 w-4" />
                            Send Broadcast
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
