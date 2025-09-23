"use client";

import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { smartCommuteRecommendations, SmartCommuteRecommendationsOutput } from '@/ai/flows/smart-commute-recommendations';
import { mockUser } from '@/lib/data';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Zap, Car, Clock, Wallet, CheckCircle } from 'lucide-react';
import { Separator } from '../ui/separator';

const formSchema = z.object({
  destination: z.string().min(3, { message: 'Destination is required.' }),
  timePreference: z.string().min(1, { message: 'Time preference is required.' }),
  maxTravelTime: z.coerce.number().positive({ message: 'Must be a positive number.' }),
  maxCost: z.coerce.number().positive({ message: 'Must be a positive number.' }),
  carpoolPreference: z.boolean().default(false),
});

export function SmartRecommendations({ userId }: { userId: any }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<SmartCommuteRecommendationsOutput['recommendations'] | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination: "Hitech City",
      timePreference: "Friday evening",
      maxTravelTime: 120,
      maxCost: 500,
      carpoolPreference: mockUser.carpoolPreference,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError(null);
    setRecommendations(null);

    try {
      const result = await smartCommuteRecommendations({
        ...values,
        userId: mockUser.userId,
        currentLocation: 'Woxsen University Campus',
      });
      setRecommendations(result.recommendations);
    } catch (e) {
      setError('Failed to get recommendations. Please try again.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
        <CardHeader>
            <div className="flex items-center gap-2">
                <Zap className="h-6 w-6 text-primary" />
                <CardTitle>Smart Commute Recommendations</CardTitle>
            </div>
            <CardDescription>Get personalized commute suggestions powered by AI.</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="destination"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Destination</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., Gachibowli" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="timePreference"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Time Preference</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a time" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Friday evening">Friday Evening</SelectItem>
                                    <SelectItem value="Saturday morning">Saturday Morning</SelectItem>
                                    <SelectItem value="Flexible">Flexible</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="maxTravelTime"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Max Travel Time (minutes)</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="maxCost"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Max Cost (₹)</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                control={form.control}
                name="carpoolPreference"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Prefer Carpooling?</FormLabel>
                      <p className="text-sm text-muted-foreground">Prioritize carpooling options in your recommendations.</p>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

                <Button type="submit" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Get Recommendations
                </Button>
            </form>
            </Form>
            
            {error && <Alert variant="destructive" className="mt-6"><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
            
            {recommendations && (
                <div className="mt-8">
                    <Separator className="my-6"/>
                    <h3 className="text-xl font-semibold mb-4">Your Recommended Commutes</h3>
                    <div className="space-y-4">
                        {recommendations.map((rec, index) => (
                            <Card key={index} className="bg-secondary">
                                <CardContent className="p-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-bold">{rec.commuteType}</h4>
                                            <p className="text-sm text-muted-foreground">{rec.routeDetails}</p>
                                        </div>
                                        {rec.carpoolAvailable && <span className="text-xs bg-green-100 text-green-800 font-medium px-2 py-1 rounded-full dark:bg-green-900 dark:text-green-300">Carpool</span>}
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 text-sm mt-4">
                                        <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> {rec.estimatedTravelTime} min</div>
                                        <div className="flex items-center gap-2"><Wallet className="h-4 w-4" /> ₹{rec.costEstimate}</div>
                                    </div>
                                    <p className="text-sm mt-4 bg-background p-3 rounded-md">{rec.reasons}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </CardContent>
    </Card>
  );
}
