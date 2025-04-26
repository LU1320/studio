'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { Review } from '@/services/reviews';
import { getReviews } from '@/services/reviews'; // Assume getReviews can fetch reviews across all products if needed, or adjust logic
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StarIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Mock fetching all reviews (adjust based on your actual API)
const getAllReviews = async (): Promise<Review[]> => {
  // In a real app, this might fetch reviews with product info or from a dedicated endpoint
  // For now, we'll simulate by fetching reviews for a couple of product IDs
  const reviews1 = await getReviews('1');
  const reviews2 = await getReviews('2');
   // Add more product IDs if needed, or modify getReviews service
  return [...reviews1, ...reviews2]; // Combine reviews
};

export default function TestimonialsPage() {
  const [allReviews, setAllReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadReviews() {
      setIsLoading(true);
      try {
        // In a real app, fetch *all* reviews or a paginated list
        const fetchedReviews = await getAllReviews();
        // Optional: Sort reviews, e.g., by date (if available) or rating
        setAllReviews(fetchedReviews);
      } catch (error) {
        console.error("Failed to load testimonials:", error);
        // Handle error state if needed
      } finally {
        setIsLoading(false);
      }
    }
    loadReviews();
  }, []);

   const renderSkeletons = () => (
    Array.from({ length: 6 }).map((_, index) => (
      <Card key={index} className="overflow-hidden">
        <CardHeader className="flex flex-row items-center gap-3 pb-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-16" />
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-4" />
            ))}
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
           <Skeleton className="mt-4 h-32 w-full rounded" /> {/* Image skeleton */}
        </CardContent>
      </Card>
    ))
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-primary md:text-5xl">Happy Pups, Happy Parents!</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          See what our amazing customers are saying about Pawsome Outfits.
        </p>
      </section>

      {/* Testimonials Grid */}
      <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? renderSkeletons()
          : allReviews.length > 0
            ? allReviews.map((review) => (
              <Card key={review.id} className="flex flex-col overflow-hidden rounded-lg shadow-sm transition-shadow hover:shadow-md">
                <CardHeader className="flex flex-row items-center gap-3 pb-2">
                  <Avatar>
                     {/* Use placeholder if no photoUrl or simplify */}
                     <AvatarFallback>{review.reviewerName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base font-medium">{review.reviewerName}</CardTitle>
                    {/* Optional: Link to the product reviewed */}
                     <Link href={`/product/${review.productId}`} className="text-xs text-primary hover:underline">
                         View Product
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-grow flex-col">
                   <div className="mb-2 flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <StarIcon key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} />
                        ))}
                    </div>
                  <p className="mb-4 flex-grow text-sm text-muted-foreground">{review.comment}</p>
                  {review.photoUrl && (
                    <div className="relative mt-auto aspect-video w-full overflow-hidden rounded border">
                      <Image
                        src={review.photoUrl}
                        alt={`${review.reviewerName}'s dog wearing the product`}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
            : (
              <p className="col-span-full text-center text-muted-foreground">No testimonials yet. Be the first to share your experience!</p>
            )}
      </section>

      {/* Call to Action */}
       <section className="mt-16 text-center">
         <h2 className="mb-4 text-2xl font-semibold">Share Your Pawsome Look!</h2>
         <p className="mx-auto mb-6 max-w-xl text-muted-foreground">
             Bought something you love? Leave a review on the product page or tag us on social media #PawsomeOutfits
         </p>
          <Link href="/shop" passHref>
             <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                 Shop Now & Share
             </Button>
          </Link>
       </section>
    </div>
  );
}
