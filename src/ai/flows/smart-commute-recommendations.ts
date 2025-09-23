'use server';
/**
 * @fileOverview This file defines a Genkit flow for providing smart commute recommendations to students,
 * highlighting available carpools and preferred routes.
 *
 * - smartCommuteRecommendations - A function that takes user preferences and available commutes to provide smart recommendations.
 * - SmartCommuteRecommendationsInput - The input type for the smartCommuteRecommendations function.
 * - SmartCommuteRecommendationsOutput - The return type for the smartCommuteRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartCommuteRecommendationsInputSchema = z.object({
  userId: z.string().describe('The ID of the user requesting commute recommendations.'),
  currentLocation: z.string().describe('The current location of the user.'),
  destination: z.string().describe('The desired destination of the user.'),
  timePreference: z.string().describe('The preferred departure or arrival time of the user.'),
  carpoolPreference: z.boolean().describe('Whether the user prefers carpooling.'),
  maxTravelTime: z.number().describe('The maximum travel time the user is willing to accept, in minutes.'),
  maxCost: z.number().describe('The maximum cost the user is willing to pay.'),
});
export type SmartCommuteRecommendationsInput = z.infer<typeof SmartCommuteRecommendationsInputSchema>;

const SmartCommuteRecommendationsOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      commuteType: z.string().describe('The type of commute (e.g., carpool, bus, personal vehicle).'),
      routeDetails: z.string().describe('A description of the route, including waypoints.'),
      estimatedTravelTime: z.number().describe('The estimated travel time in minutes.'),
      costEstimate: z.number().describe('The estimated cost of the commute.'),
      carpoolAvailable: z.boolean().describe('Whether carpooling is available for this commute option.'),
      reasons: z.string().describe('Why this option is being recommended'),
    })
  ).describe('A list of recommended commute options based on user preferences and available commutes.'),
});
export type SmartCommuteRecommendationsOutput = z.infer<typeof SmartCommuteRecommendationsOutputSchema>;

export async function smartCommuteRecommendations(input: SmartCommuteRecommendationsInput): Promise<SmartCommuteRecommendationsOutput> {
  return smartCommuteRecommendationsFlow(input);
}

const smartCommuteRecommendationsPrompt = ai.definePrompt({
  name: 'smartCommuteRecommendationsPrompt',
  input: {schema: SmartCommuteRecommendationsInputSchema},
  output: {schema: SmartCommuteRecommendationsOutputSchema},
  prompt: `You are an AI assistant designed to provide smart commute recommendations to university students.

  Based on the user's preferences and available commute options, provide a list of the best commute options.

  Consider the following user information:
  - User ID: {{{userId}}}
  - Current Location: {{{currentLocation}}}
  - Destination: {{{destination}}}
  - Time Preference: {{{timePreference}}}
  - Carpool Preference: {{#if carpoolPreference}}Prefers carpooling{{else}}Does not prefer carpooling{{/if}}
  - Maximum Travel Time: {{{maxTravelTime}}} minutes
  - Maximum Cost: {{{maxCost}}}

  Provide commute recommendations that are tailored to the user's needs. Include commute type, route details, estimated travel time, cost estimate, carpool availability and the reasons for the recommendation.

  Ensure that the recommendations are within the user's specified travel time and cost constraints.

  Respond in a JSON format.
`,
});

const smartCommuteRecommendationsFlow = ai.defineFlow(
  {
    name: 'smartCommuteRecommendationsFlow',
    inputSchema: SmartCommuteRecommendationsInputSchema,
    outputSchema: SmartCommuteRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await smartCommuteRecommendationsPrompt(input);
    return output!;
  }
);
