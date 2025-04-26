'use client';

import { useState } from 'react';
import { recommendOutfit, RecommendOutfitInput, RecommendOutfitOutput } from '@/ai/flows/outfit-recommendation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2Icon, UploadIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function OutfitRecommender() {
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [occasion, setOccasion] = useState<string>('');
  const [recommendation, setRecommendation] = useState<RecommendOutfitOutput | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setRecommendation(null); // Clear previous recommendation
    }
  };

  const handleGetRecommendation = async () => {
    if (!photo || !occasion) {
      toast({
        title: 'Missing Information',
        description: 'Please upload a photo of your dog and describe the occasion.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setRecommendation(null);

    try {
        // Ensure photoPreview is a valid data URI string before proceeding
        if (!photoPreview || !photoPreview.startsWith('data:')) {
             throw new Error('Invalid photo data URI.');
        }

      const input: RecommendOutfitInput = {
        photoDataUri: photoPreview, // Send the data URI
        occasion: occasion,
      };

      const result = await recommendOutfit(input);
      setRecommendation(result);

       if (!result.recommendedOutfit) {
            toast({
                title: 'No Recommendation Found',
                description: result.reason || 'Could not find a suitable outfit for this occasion.',
            });
        }

    } catch (error) {
      console.error('Error getting recommendation:', error);
      toast({
        title: 'Recommendation Error',
        description: 'Could not get a recommendation. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Outfit Recommender</CardTitle>
        <CardDescription>Upload a photo of your dog and tell us the occasion!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Photo Upload */}
          <div className="space-y-2">
            <Label htmlFor="dog-photo">Dog's Photo</Label>
            <div className="flex items-center gap-4">
              <Input
                id="dog-photo"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
              <Button
                variant="outline"
                onClick={() => document.getElementById('dog-photo')?.click()}
                type="button"
              >
                <UploadIcon className="mr-2 h-4 w-4" /> Upload Photo
              </Button>
               {photo && <span className="text-sm text-muted-foreground truncate max-w-[150px]">{photo.name}</span>}
            </div>
             {photoPreview && (
                <div className="mt-4 aspect-square w-full max-w-xs overflow-hidden rounded-lg border">
                    <Image
                    src={photoPreview}
                    alt="Dog preview"
                    width={300}
                    height={300}
                    objectFit="cover"
                    className="h-full w-full"
                    />
                </div>
            )}
          </div>

          {/* Occasion Input */}
          <div className="space-y-2">
            <Label htmlFor="occasion">Occasion</Label>
            <Input
              id="occasion"
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              placeholder="e.g., Birthday party, Casual walk, Rainy day"
            />
          </div>
        </div>

        <Button
          onClick={handleGetRecommendation}
          disabled={isLoading || !photo || !occasion}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> Getting Recommendation...
            </>
          ) : (
            'Get Recommendation'
          )}
        </Button>

        {/* Recommendation Display */}
        {recommendation?.recommendedOutfit && (
          <Card className="mt-6 bg-secondary/50">
            <CardHeader>
              <CardTitle className="text-lg">Our Recommendation:</CardTitle>
              <CardDescription>{recommendation.reason}</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="flex items-center gap-4">
                    {/* Placeholder for product image - fetch based on ID if possible */}
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded border bg-background">
                        <Image src={`https://picsum.photos/seed/${recommendation.recommendedOutfit.productId}/100/100`} alt={recommendation.recommendedOutfit.productName} width={64} height={64} />
                    </div>
                    <div>
                        <p className="font-semibold">{recommendation.recommendedOutfit.productName}</p>
                        <p className="text-sm text-muted-foreground">{recommendation.recommendedOutfit.productDescription}</p>
                    </div>
               </div>
            </CardContent>
             <CardFooter>
                 <Link href={`/product/${recommendation.recommendedOutfit.productId}`} passHref>
                    <Button variant="outline" size="sm">View Product</Button>
                 </Link>
             </CardFooter>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
