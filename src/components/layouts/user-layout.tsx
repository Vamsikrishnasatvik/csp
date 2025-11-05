"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { UserSidebar } from "@/components/user/user-sidebar";
import { Header } from "@/components/shared/header";

export function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full overflow-hidden">
        {/* Sidebar with fixed width and full height */}
        <div className="w-64 h-screen border-r bg-white flex flex-col justify-between sticky top-0">
          <UserSidebar />
        </div>
        {/* Main content area fills remaining space and is scrollable */}
        <div className="flex flex-col flex-1 w-full">
          <Header />
          <main className="flex-1 w-full px-8 py-6 overflow-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
