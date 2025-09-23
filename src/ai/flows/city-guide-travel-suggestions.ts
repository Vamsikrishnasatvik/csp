'use server';
/**
 * @fileOverview An AI agent for providing travel suggestions for popular city destinations.
 *
 * - getCityGuideTravelSuggestions - A function that handles the generation of travel suggestions.
 * - CityGuideTravelSuggestionsInput - The input type for the getCityGuideTravelSuggestions function.
 * - CityGuideTravelSuggestionsOutput - The return type for the getCityGuideTravelSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CityGuideTravelSuggestionsInputSchema = z.object({
  destination: z.string().describe('The name of the city destination.'),
  interests: z
    .string()
    .describe(
      'A comma-separated list of interests to tailor the travel suggestions.'
    ),
});
export type CityGuideTravelSuggestionsInput = z.infer<
  typeof CityGuideTravelSuggestionsInputSchema
>;

const CityGuideTravelSuggestionsOutputSchema = z.object({
  suggestions: z
    .string()
    .describe('A list of travel suggestions for the specified destination.'),
});
export type CityGuideTravelSuggestionsOutput = z.infer<
  typeof CityGuideTravelSuggestionsOutputSchema
>;

export async function getCityGuideTravelSuggestions(
  input: CityGuideTravelSuggestionsInput
): Promise<CityGuideTravelSuggestionsOutput> {
  return cityGuideTravelSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'cityGuideTravelSuggestionsPrompt',
  input: {schema: CityGuideTravelSuggestionsInputSchema},
  output: {schema: CityGuideTravelSuggestionsOutputSchema},
  prompt: `You are a travel expert providing travel suggestions for popular city destinations.

  Based on the specified destination and interests, generate a list of travel suggestions.

  Destination: {{{destination}}}
  Interests: {{{interests}}}

  Travel Suggestions:`,
});

const cityGuideTravelSuggestionsFlow = ai.defineFlow(
  {
    name: 'cityGuideTravelSuggestionsFlow',
    inputSchema: CityGuideTravelSuggestionsInputSchema,
    outputSchema: CityGuideTravelSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
