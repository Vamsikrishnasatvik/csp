"use client";

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Bus, LayoutDashboard, User, Car, BookOpen, Route, LogOut, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, color: 'text-blue-500' },
  { href: '/profile', label: 'Profile', icon: User, color: 'text-purple-500' },
  { href: '/commutes', label: 'Commute Options', icon: Car, color: 'text-green-500' },
  { href: '/carpools', label: 'Carpools', icon: Users, color: 'text-orange-500' },
  { href: '/route-planner', label: 'Route Planner', icon: Route, color: 'text-pink-500' },
  { href: '/city-guide', label: 'City Guide', icon: BookOpen, color: 'text-cyan-500' },
];

function Users(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export function UserSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    setIsLoggingOut(true);
    
    // Cleanup storage
    if (typeof window !== "undefined") {
      localStorage.clear();
      sessionStorage.clear();
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date(0).toUTCString() + ";path=/");
      });
    }
    
    // Delay for animation
    setTimeout(() => {
      router.push('/');
    }, 600);
  };

  return (
    <>
      {/* Header with animation */}
      <SidebarHeader>
        <div 
          className="flex items-center gap-3 p-3 transform transition-all duration-700 ease-out"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateX(0)' : 'translateX(-20px)'
          }}
        >
          <div className="relative">
            {/* Animated background pulse */}
            <div className="absolute inset-0 bg-primary rounded-lg animate-pulse opacity-30" />
            <div className="relative bg-primary text-primary-foreground p-2.5 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-110 hover:rotate-3">
              <Bus className="h-6 w-6" />
            </div>
            {/* Sparkle effect */}
            <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-400 animate-pulse" />
          </div>
          <div>
            <span className="font-bold text-lg bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              SmartCommute
            </span>
            <p className="text-xs text-muted-foreground">Travel Smarter</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarMenu className="space-y-1">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href;
            const ItemIcon = item.icon;
            
            return (
              <SidebarMenuItem 
                key={item.label}
                className="transform transition-all duration-500 ease-out"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateX(0)' : 'translateX(-20px)',
                  transitionDelay: `${(index + 1) * 100}ms`
                }}
              >
                <Link href={item.href} className="block">
                  <SidebarMenuButton
                    isActive={isActive}
                    tooltip={item.label}
                    className={`
                      relative overflow-hidden group
                      transition-all duration-300 ease-out
                      ${isActive 
                        ? 'bg-primary/10 text-primary shadow-md shadow-primary/20' 
                        : 'hover:bg-accent hover:text-accent-foreground hover:shadow-sm'
                      }
                    `}
                    onMouseEnter={() => setHoveredItem(item.label)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {/* Animated background on hover */}
                    <div 
                      className={`
                        absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent
                        transform transition-transform duration-300 ease-out
                        ${hoveredItem === item.label || isActive 
                          ? 'translate-x-0' 
                          : '-translate-x-full'
                        }
                      `}
                    />
                    
                    {/* Icon with animation */}
                    <div className="relative flex items-center gap-3 w-full">
                      <div className={`
                        transform transition-all duration-300
                        ${isActive ? 'scale-110' : 'group-hover:scale-110'}
                        ${isActive ? item.color : ''}
                      `}>
                        <ItemIcon className="h-5 w-5" />
                      </div>
                      
                      {/* Label with slide effect */}
                      <span className={`
                        font-medium transition-all duration-300
                        ${isActive ? 'translate-x-1' : 'group-hover:translate-x-1'}
                      `}>
                        {item.label}
                      </span>
                      
                      {/* Active indicator */}
                      {isActive && (
                        <div className="ml-auto">
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        </div>
                      )}
                    </div>

                    {/* Shine effect on hover */}
                    <div className={`
                      absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
                      transform -translate-x-full transition-transform duration-1000
                      ${hoveredItem === item.label ? 'translate-x-full' : ''}
                    `} />
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* Footer with logout button */}
      <SidebarFooter className="p-2">
        <SidebarSeparator className="mb-2" />
        
        <div 
          className="transform transition-all duration-700 ease-out"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: `${(menuItems.length + 1) * 100}ms`
          }}
        >
          <SidebarMenu>
            <SidebarMenuItem>
              <Button
                variant="ghost"
                className={`
                  w-full justify-start gap-3 relative overflow-hidden
                  transition-all duration-300
                  hover:bg-destructive/10 hover:text-destructive
                  hover:shadow-md hover:shadow-destructive/20
                  group
                  ${isLoggingOut ? 'bg-destructive/10 text-destructive' : ''}
                `}
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-destructive/5 to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                
                {/* Icon with rotation on logout */}
                <LogOut className={`
                  h-5 w-5 relative
                  transition-transform duration-500
                  ${isLoggingOut ? 'rotate-180 scale-110' : 'group-hover:scale-110'}
                `} />
                
                {/* Text */}
                <span className="relative font-medium">
                  {isLoggingOut ? 'Logging out...' : 'Logout'}
                </span>

                {/* Loading spinner when logging out */}
                {isLoggingOut && (
                  <div className="ml-auto">
                    <div className="w-4 h-4 border-2 border-destructive border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </Button>
            </SidebarMenuItem>
          </SidebarMenu>

          {/* User info section (optional) */}
          <div className="mt-3 p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <User className="h-3 w-3" />
              <span>Logged in as User</span>
            </div>
          </div>
        </div>
      </SidebarFooter>

      {/* Custom CSS for additional animations */}
      <style jsx global>{`
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}