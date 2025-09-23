"use client";

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Bus, LayoutDashboard, Users, Car, Map, Bell, BarChart, LogOut } from 'lucide-react';
import { Button } from '../ui/button';

const adminMenuItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: BarChart },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/vehicles', label: 'Vehicles', icon: Car },
  { href: '/admin/schedules', label: 'Schedules', icon: LayoutDashboard },
  { href: '/admin/destinations', label: 'Destinations', icon: Map },
  { href: '/admin/notifications', label: 'Notifications', icon: Bell },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
          <div className="bg-primary text-primary-foreground p-2 rounded-lg">
            <Bus className="h-6 w-6" />
          </div>
          <div>
            <span className="font-semibold text-lg">SmartCommute</span>
            <span className="block text-xs text-muted-foreground">Admin Panel</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {adminMenuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <Link href={item.href}>
                <SidebarMenuButton isActive={pathname === item.href} tooltip={item.label}>
                    <item.icon />
                    <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <SidebarSeparator />
        <div className="flex justify-center">
          <Button
           
            className="w-full flex items-center gap-2"
            onClick={() => {
              if (typeof window !== "undefined") {
                localStorage.clear();
                sessionStorage.clear();
                 document.cookie.split(";").forEach((c) => {
                  document.cookie = c
                    .replace(/^ +/, "")
                    .replace(/=.*/, "=;expires=" + new Date(0).toUTCString() + ";path=/");
                });
              }
              router.push('/');
            }}
          >
            Logout
          </Button>
        </div>
      </SidebarFooter>
    </>
  );
}
