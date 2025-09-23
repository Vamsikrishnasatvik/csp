"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, User } from "lucide-react";
import { useState } from "react";
// Update the import path below if your 'use-toast' file is located elsewhere, e.g.:
// import { Toast } from "@/components/ui/toast";
// or, if you don't have a toast utility, comment out or remove this line and related toast usages.

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

export function LoginForm({ userType }: LoginFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isStudent = userType === 'student';

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
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

      // Save role to localStorage for navigation
      if (typeof window !== "undefined") {
        localStorage.setItem("role", data.role);
      }

      toast({
        title: "Login successful!",
        description: "Redirecting to dashboard...",
      });

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
    } finally {
      setIsLoading(false);
    }
  }

  function onGoogleLogin() {
    const destination = isStudent ? '/dashboard' : '/admin/dashboard';
    router.push(destination);
  }

  return (
    <div>
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
                  <Input placeholder="name@example.com" {...field} />
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
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="text-right text-sm">
            <Link href="#" className="underline underline-offset-4 hover:text-primary">
              Forgot Password?
            </Link>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Logging in...' : `Login as ${isStudent ? 'Student' : 'Admin'}`}
          </Button>
        </form>
      </Form>
      <div className="relative my-6">
        <Separator />
        <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-card px-2 text-sm text-muted-foreground">OR</span>
      </div>
      <Button variant="outline" className="w-full" onClick={onGoogleLogin}>
        <GoogleIcon className="mr-2 h-4 w-4" />
        Login with Google
      </Button>
        {isStudent && (
          <p className="mt-4 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="underline underline-offset-4 hover:text-primary">
                  Sign up
              </Link>
          </p>
        )}
    </div>
  );
}
