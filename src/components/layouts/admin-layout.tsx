"use client";

import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { Header } from "@/components/shared/header";

export function AdminLayout({ children }: { children: React.ReactNode }) {
   return (
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          {/* Sidebar with fixed width */}
          <div className="w-64 h-screen border-r bg-white flex flex-col justify-between">
            <AdminSidebar />
          </div>
          {/* Main content area fills remaining space */}
          <div className="flex flex-col flex-1 w-full">
            <Header />
            <main className="flex-1 w-full px-8 py-6">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    );
  }
