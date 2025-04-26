// 'use server';
/**
 * @fileOverview Recommends outfits based on a dog's photo and the occasion.
 *
 * - recommendOutfit - A function that handles the outfit recommendation process.
 * - RecommendOutfitInput - The input type for the recommendOutfit function.
 * - RecommendOutfitOutput - The return type for the recommendOutfit function.
 */

'use server';
import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {getProducts, Product} from '@/services/products';

const RecommendOutfitInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of your dog, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  occasion: z.string().describe('The occasion for which the outfit is needed.'),
});
export type RecommendOutfitInput = z.infer<typeof RecommendOutfitInputSchema>;

const RecommendOutfitOutputSchema = z.object({
  recommendedOutfit: z.object({
    productName: z.string().describe('The name of the recommended product.'),
    productDescription: z.string().describe('A description of the recommended product.'),
    productId: z.string().describe('The ID of the recommended product.'),
  }).nullable().describe('The recommended outfit details or null if no suitable outfit found.'),
  reason: z.string().describe('The reason for the recommendation.'),
});
export type RecommendOutfitOutput = z.infer<typeof RecommendOutfitOutputSchema>;

export async function recommendOutfit(input: RecommendOutfitInput): Promise<RecommendOutfitOutput> {
  return recommendOutfitFlow(input);
}

const outfitRecommendationPrompt = ai.definePrompt({
  name: 'outfitRecommendationPrompt',
  input: {
    schema: z.object({
      photoDataUri: z
        .string()
        .describe(
          "A photo of your dog, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
        ),
      occasion: z.string().describe('The occasion for which the outfit is needed.'),
      products: z.string().describe('A list of products to consider in the recommendation.'),
    }),
  },
  output: {
    schema: z.object({
      recommendedOutfit: z.object({
        productName: z.string().describe('The name of the recommended product.'),
        productDescription: z.string().describe('A description of the recommended product.'),
        productId: z.string().describe('The ID of the recommended product.'),
      }).nullable().describe('The recommended outfit details or null if no suitable outfit found.'),
      reason: z.string().describe('The reason for the recommendation.'),
    }),
  },
  prompt: `You are a personal stylist for dogs. Given a photo of the dog and the occasion, you will recommend an outfit from the provided product list.

Consider the dog's appearance in the photo and the nature of the occasion when making your recommendation. If no outfit is suitable, return null for recommendedOutfit. Never recommend outfits that are not present in the product list.

Photo: {{media url=photoDataUri}}
Occasion: {{{occasion}}}
Products: {{{products}}}

Response:
`,
});

const recommendOutfitFlow = ai.defineFlow<
  typeof RecommendOutfitInputSchema,
  typeof RecommendOutfitOutputSchema
>(
  {
    name: 'recommendOutfitFlow',
    inputSchema: RecommendOutfitInputSchema,
    outputSchema: RecommendOutfitOutputSchema,
  },
  async input => {
    const products = await getProducts();
    const productsString = JSON.stringify(products.map(p => ({name: p.name, description: p.description, id: p.id})));

    const {output} = await outfitRecommendationPrompt({
      ...input,
      products: productsString,
    });
    return output!;
  }
);
