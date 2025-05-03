'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { Review } from '@/services/reviews';
// Use getAllReviews from the existing service
import { getAllReviews } from '@/services/reviews';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StarIcon, MessageSquareIcon } from 'lucide-react'; // Added MessageSquareIcon
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PawPrintIcon } from '@/components/icons/paw-print-icon'; // Import PawPrintIcon

export default function TestimonialsPage() {
  const [allReviews, setAllReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadReviews() {
      setIsLoading(true);
      try {
        const fetchedReviews = await getAllReviews(); // Use existing service function
        // Sort reviews, e.g., newest first
        const sortedReviews = fetchedReviews.sort((a, b) => new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime());
        setAllReviews(sortedReviews);
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
      <Card key={index} className="overflow-hidden border bg-card">
        <CardHeader className="flex flex-row items-center gap-3 pb-2 p-4"> {/* Adjusted padding */}
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-24" /> {/* Shorter name skel */}
            <Skeleton className="h-3 w-16" />
          </div>
        </CardHeader>
        <CardContent className="space-y-2 p-4"> {/* Adjusted padding */}
          <div className="flex gap-0.5"> {/* Adjusted gap */}
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-4 rounded-full" /> // Star skeleton
            ))}
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
           <Skeleton className="mt-4 aspect-video w-full rounded" /> {/* Image skeleton */}
        </CardContent>
      </Card>
    ))
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-12 text-center">
         <PawPrintIcon className="mx-auto mb-4 h-12 w-12 text-primary drop-shadow-lg" />
        <h1 className="mb-4 text-4xl font-bold text-primary md:text-5xl">¡Colitas Felices Hablan!</h1> {/* Playful Title */}
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Nuestros Pawsome Pals y sus humanos comparten su experiencia. ¡Pura ternura y alegría!
        </p>
      </section>

      {/* Testimonials Grid */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"> {/* Adjusted gap */}
        {isLoading
          ? renderSkeletons()
          : allReviews.length > 0
            ? allReviews.map((review) => (
              <Card key={review.id} className="flex h-full flex-col overflow-hidden rounded-lg border bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/30 hover:-translate-y-1">
                 {review.photoUrl && ( // Show image first if available
                    <div className="relative aspect-video w-full overflow-hidden">
                      <Image
                        src={review.photoUrl} // Use placeholder if needed: `https://picsum.photos/seed/review${review.id}/400/267`
                        alt={`${review.reviewerName}'s Pawsome Pal`}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint="happy customer dog" // AI Hint
                      />
                    </div>
                  )}
                <CardHeader className="flex flex-row items-center justify-between gap-3 pb-2 p-4"> {/* Space between name and stars */}
                   <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-primary/20"> {/* Added border */}
                          {/* Fallback with first letter */}
                         <AvatarFallback className="bg-secondary text-secondary-foreground">{review.reviewerName.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-sm font-semibold">{review.reviewerName}</CardTitle> {/* Smaller title */}
                        {/* Optional: Link to the product reviewed */}
                         <Link href={`/product/${review.productId}`} className="text-xs text-primary hover:underline">
                             Ver Producto
                        </Link>
                      </div>
                   </div>
                   {/* Stars */}
                    <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <StarIcon key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/50'}`} />
                        ))}
                    </div>
                </CardHeader>
                <CardContent className="flex flex-grow flex-col p-4 pt-0"> {/* Adjusted padding */}
                    <blockquote className="mt-2 border-l-4 border-primary/30 pl-4 italic text-muted-foreground"> {/* Quote style */}
                        <p className="text-sm leading-relaxed">{review.comment}</p>
                    </blockquote>

                </CardContent>
              </Card>
            ))
            : (
              <p className="col-span-full py-10 text-center text-muted-foreground">Aún no hay testimonios. ¡Anímate a ser el primero en compartir tu ternura!</p>
            )}
      </section>

      {/* Call to Action */}
       <section className="mt-16 text-center rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 py-12"> {/* Gradient background */}
         <MessageSquareIcon className="mx-auto mb-4 h-10 w-10 text-primary" />
         <h2 className="mb-4 text-2xl font-semibold">¿Tu Perrito Ama sus Cositas?</h2>
         <p className="mx-auto mb-6 max-w-xl text-muted-foreground">
             ¡Nos encantaría escuchar tu historia! Deja una reseña en la página del producto o etiquétanos #PawsomePals.
         </p>
          <Link href="/shop" passHref>
             <Button size="lg">
                 Comprar y Compartir Ternura
             </Button>
          </Link>
       </section>
    </div>
  );
}
