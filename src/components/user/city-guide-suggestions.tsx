"use client";

import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getCityGuideTravelSuggestions, CityGuideTravelSuggestionsOutput } from '@/ai/flows/city-guide-travel-suggestions';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, BookOpen } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const formSchema = z.object({
  destination: z.string().min(3, { message: 'Destination is required.' }),
  interests: z.string().min(3, { message: 'Please enter at least one interest.' }),
});

export function CityGuideSuggestions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CityGuideTravelSuggestionsOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination: "Hyderabad",
      interests: "food, history, shopping",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const suggestions = await getCityGuideTravelSuggestions(values);
      setResult(suggestions);
    } catch (e) {
      setError('Failed to get suggestions. Please try again.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <CardTitle>AI Travel Advisor</CardTitle>
        </div>
        <CardDescription>Enter a destination and your interests to get personalized travel suggestions.</CardDescription>
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
                    <FormLabel>Destination City</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Hyderabad" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Interests</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., food, history, shopping" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Get Suggestions
            </Button>
          </form>
        </Form>
        
        {error && <Alert variant="destructive" className="mt-6"><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
        
        {result && (
          <div className="mt-8">
            <Separator className="my-6"/>
            <h3 className="text-xl font-semibold mb-4">Your Personalized Guide to {form.getValues('destination')}</h3>
            <div className="prose prose-sm dark:prose-invert max-w-none bg-secondary p-4 rounded-lg">
                <p>{result.suggestions}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
