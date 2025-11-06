"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, User, Car, Bus, Bike, Train } from "lucide-react";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <title>Google</title>
    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.3 1.84-4.32 1.84-3.6 0-6.5-2.95-6.5-6.5s2.9-6.5 6.5-6.5c1.95 0 3.35.73 4.1 1.5l2.43-2.43C18.4 2.2 15.86 1 12.48 1 7.03 1 3 5.03 3 10.5s4.03 9.5 9.48 9.5c2.7 0 4.9-1.05 6.4-2.43 1.6-1.4 2.3-3.6 2.3-6.1z" />
  </svg>
);

interface LoginFormProps {
  userType: 'student' | 'admin';
}

const vehicles = [
  { Icon: Car, color: "text-blue-500" },
  { Icon: Bus, color: "text-green-500" },
  { Icon: Bike, color: "text-orange-500" },
  { Icon: Train, color: "text-purple-500" },
];

export function LoginForm({ userType }: LoginFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [currentVehicleIndex, setCurrentVehicleIndex] = useState(0);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isStudent = userType === 'student';

  // Rotate through vehicles during loading
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setCurrentVehicleIndex((prev) => (prev + 1) % vehicles.length);
      }, 800);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      setLoadingMessage("Verifying credentials...");
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      console.log('Login response data:', data);

      if (!response.ok) {
        throw new Error(data.error);
      }

      setLoadingMessage("Login successful!");

      // Save role to localStorage for navigation
      if (typeof window !== "undefined") {
        localStorage.setItem("role", data.role);
        localStorage.setItem("userId", data.id);
      }

      toast({
        title: "Login successful!",
        description: "Redirecting to dashboard...",
      });

      setLoadingMessage("Preparing your commute dashboard...");

      // Small delay for smooth transition
      await new Promise(resolve => setTimeout(resolve, 500));

      // Redirect strictly based on user role
      if (data.role === 'admin') {
        router.push('/admin/dashboard');
      } else if (data.role === 'user') {
        router.push('/dashboard');
      } else {
        toast({
          title: "Error",
          description: "Unauthorized role.",
          variant: "destructive",
        });
      }
      
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Login failed",
        variant: "destructive",
      });
      console.error('Login failed:', error);
      setIsLoading(false);
      setLoadingMessage("");
    }
  }

  function onGoogleLogin() {
    const destination = isStudent ? '/dashboard' : '/admin/dashboard';
    router.push(destination);
  }

  const CurrentVehicle = vehicles[currentVehicleIndex];

  return (
    <div className="relative">
      {/* Loading Overlay with Vehicle Animation */}
      {isLoading && (
        <div 
          className="absolute inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center rounded-lg transition-opacity duration-300"
          style={{ opacity: isLoading ? 1 : 0 }}
        >
          <div className="flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-500">
            {/* Road Container */}
            <div className="relative w-64 h-24 overflow-hidden">
              {/* Road Lines */}
              <div className="absolute top-1/2 left-0 right-0 h-px bg-border" />
              <div className="absolute top-1/2 left-0 w-full flex gap-4 items-center">
                <div className="flex-1 h-px border-t-2 border-dashed border-muted-foreground/30 animate-slide-road" />
              </div>
              
              {/* Animated Vehicle */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-center">
                <div className="relative animate-vehicle-move">
                  {/* Vehicle Icon with transition */}
                  <div className="relative">
                    <CurrentVehicle.Icon 
                      className={`h-16 w-16 ${CurrentVehicle.color} transition-all duration-300 drop-shadow-lg animate-vehicle-bounce`}
                    />
                    {/* Motion blur effect */}
                    <div className={`absolute inset-0 ${CurrentVehicle.color} opacity-20 blur-sm -z-10 animate-pulse`} />
                  </div>
                  
                  {/* Exhaust/dust effect */}
                  <div className="absolute -left-8 top-1/2 -translate-y-1/2 flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/20 animate-exhaust-1" />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/15 animate-exhaust-2" />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/10 animate-exhaust-3" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Loading message with vehicle type */}
            <div className="text-center space-y-2">
              <p className="text-sm font-medium animate-pulse">{loadingMessage}</p>
              <div className="flex gap-1 justify-center">
                {vehicles.map((_, index) => (
                  <div 
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentVehicleIndex 
                        ? `${vehicles[index].color} scale-125` 
                        : 'bg-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Form content with subtle blur when loading */}
      <div className={`transition-all duration-300 ${isLoading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
        <div className="flex items-center gap-2 mb-2">
          {isStudent ? <User className="h-5 w-5"/> : <Shield className="h-5 w-5"/>}
          <h3 className="text-xl font-semibold">{isStudent ? 'Student Login' : 'Admin Login'}</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Enter your credentials to access your dashboard.
        </p>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="name@example.com" 
                      {...field}
                      className="transition-all duration-200 focus:scale-[1.01]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      {...field}
                      className="transition-all duration-200 focus:scale-[1.01]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="text-right text-sm">
              <Link 
                href="#" 
                className="underline underline-offset-4 hover:text-primary transition-colors duration-200"
              >
                Forgot Password?
              </Link>
            </div>

            <Button 
              type="submit" 
              className="w-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]" 
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Car className="h-4 w-4 animate-pulse" />
                  Logging in...
                </span>
              ) : (
                `Login as ${isStudent ? 'Student' : 'Admin'}`
              )}
            </Button>
          </form>
        </Form>
        
        <div className="relative my-6">
          <Separator />
          <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-card px-2 text-sm text-muted-foreground">OR</span>
        </div>
        
        {isStudent && (
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link 
              href="/register" 
              className="underline underline-offset-4 hover:text-primary transition-colors duration-200"
            >
              Sign up
            </Link>
          </p>
        )}
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes slide-road {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-32px);
          }
        }

        @keyframes vehicle-move {
          0%, 100% {
            transform: translateX(-10px);
          }
          50% {
            transform: translateX(10px);
          }
        }

        @keyframes vehicle-bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        @keyframes exhaust {
          0% {
            opacity: 0.4;
            transform: translateX(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateX(-20px) scale(0.5);
          }
        }

        .animate-slide-road {
          animation: slide-road 1s linear infinite;
        }

        .animate-vehicle-move {
          animation: vehicle-move 2s ease-in-out infinite;
        }

        .animate-vehicle-bounce {
          animation: vehicle-bounce 0.6s ease-in-out infinite;
        }

        .animate-exhaust-1 {
          animation: exhaust 0.8s ease-out infinite;
          animation-delay: 0s;
        }

        .animate-exhaust-2 {
          animation: exhaust 0.8s ease-out infinite;
          animation-delay: 0.15s;
        }

        .animate-exhaust-3 {
          animation: exhaust 0.8s ease-out infinite;
          animation-delay: 0.3s;
        }
      `}</style>
    </div>
  );
}