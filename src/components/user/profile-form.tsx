"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email(),
  year: z.string(),
  department: z.string(),
  carpoolPreference: z.boolean(),
  vehicleModel: z.string().optional(),
  vehiclePlate: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileFormProps {
  user: {
    _id: string; // Add this line
    name: string;
    email: string;
    year: string;
    department: string;
    carpoolPreference: boolean;
    vehicleDetails?: {
      model: string;
      plateNumber: string;
    };
  };
}

export function ProfileForm({ user }: ProfileFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  // Initialize form with user data
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      year: user.year,
      department: user.department,
      carpoolPreference: user.carpoolPreference,
      vehicleModel: user.vehicleDetails?.model || "",
      vehiclePlate: user.vehicleDetails?.plateNumber || "",
    },
  });

  // Fetch latest user data
  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch(`/api/user/profile?userId=${user._id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        
        const userData = await response.json();
        
        // Update form with fresh data
        form.reset({
          name: userData.name,
          email: userData.email,
          year: userData.year,
          department: userData.department,
          carpoolPreference: userData.carpoolPreference,
          vehicleModel: userData.vehicleDetails?.model || "",
          vehiclePlate: userData.vehicleDetails?.plateNumber || "",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive",
        });
      } finally {
        setIsFetching(false);
      }
    }

    fetchUserData();
  }, [user._id, form, toast]);

  async function onSubmit(data: ProfileFormValues) {
    try {
      setIsLoading(true);
      console.log('Submitting data:', data); // Debug log

      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user._id,
          ...data,
        }),
      });

      const responseData = await response.json();
      console.log('Response:', responseData); // Debug log

      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to update profile');
      }

      // Update form with new data
      form.reset({
        ...data,
        email: responseData.user.email, // Keep email readonly
      });

      toast({
        title: "Success",
        description: "Your profile has been updated",
      });
    } catch (error) {
      console.error('Update error:', error); // Debug log
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (isFetching) {
    return <div>Loading profile...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
            <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                    <Input placeholder="Your full name" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input placeholder="Your student email" {...field} readOnly />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Year of Study</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select your year" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="1st Year">1st Year</SelectItem>
                        <SelectItem value="2nd Year">2nd Year</SelectItem>
                        <SelectItem value="3rd Year">3rd Year</SelectItem>
                        <SelectItem value="4th Year">4th Year</SelectItem>
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Department</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., Computer Science" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        
        <Separator/>

        <div className="space-y-4">
            <h3 className="text-lg font-medium">Vehicle & Carpool</h3>
            <FormField
                control={form.control}
                name="carpoolPreference"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Open to Carpooling</FormLabel>
                      <p className="text-sm text-muted-foreground">Allow others to see you as a carpool option.</p>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
            />
            <div className="grid md:grid-cols-2 gap-6">
                <FormField
                    control={form.control}
                    name="vehicleModel"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Vehicle Model</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Maruti Swift" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="vehiclePlate"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Vehicle Plate Number</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., TS08AB1234" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </Form>
  );
}
