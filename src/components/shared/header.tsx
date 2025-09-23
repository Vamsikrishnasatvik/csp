"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Bell, LogOut, Settings, User, Shield, ArrowLeft } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { useSocket } from "@/context/SocketContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

export function Header() {
    const router = useRouter();
    const pathname = usePathname();

    // Example: get user role from localStorage (replace with your actual auth logic)
    let role = "user";
    if (typeof window !== "undefined") {
        role = localStorage.getItem("role") || "user";
    }

    const { notifications, unread, markRead } = useSocket();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
        markRead();
    };

    return (
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <div className="flex items-center gap-6">
                <div className="md:hidden">
                    <SidebarTrigger />
                </div>
                <nav className="hidden md:flex md:items-center md:gap-6 text-sm font-medium">
                    {role === "user" && (
                        <Link
                            href="/dashboard"
                            className="transition-colors hover:text-foreground"
                        >
                            Student
                        </Link>
                    )}
                    {role === "admin" && (
                        <Link
                            href="/admin/dashboard"
                            className="transition-colors hover:text-foreground"
                        >
                            Admin
                        </Link>
                    )}
                </nav>
            </div>

            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <div className="ml-auto flex-1 sm:flex-initial">
                    {/* Future search bar can go here */}
                </div>

                <button onClick={handleOpen} style={{ position: "relative" }}>
                <Bell size={20} />
                {unread && (
                    <span style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        width: 10,
                        height: 10,
                        background: "red",
                        borderRadius: "50%",
                    }} />
                )}
            </button>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Notifications</DialogTitle>
                    </DialogHeader>
                    <ul className="space-y-2">
                        {notifications.map((msg, idx) => (
                            <li
                            key={idx}
                            className="flex items-center p-3 bg-white rounded-lg shadow hover:bg-gray-50 transition"
                            >
                            <span className="flex-shrink-0 w-3 h-3 mr-3 rounded-full bg-blue-500 animate-pulse"></span>
                            <p className="text-gray-800">{msg}</p>
                            </li>
                        ))}
                    </ul>
                </DialogContent>
            </Dialog>
                
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon" className="rounded-full">
                        <Avatar>
                            <AvatarImage src="https://picsum.photos/seed/avatar1/100/100" alt="@shadcn" />
                            <AvatarFallback>AD</AvatarFallback>
                        </Avatar>
                        <span className="sr-only">Toggle user menu</span>
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href="/profile">
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push('/')}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            
        </header>
    );
}
