
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { Review } from '@/services/reviews';
import { getAllReviews } from '@/services/reviews';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StarIcon, MessageSquareIcon } from 'lucide-react'; 
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PawPrintIcon } from '@/components/icons/paw-print-icon'; 

export default function TestimonialsPage() {
  const [allReviews, setAllReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadReviews() {
      setIsLoading(true);
      try {
        const fetchedReviews = await getAllReviews(); 
        const sortedReviews = fetchedReviews.sort((a, b) => new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime());
        setAllReviews(sortedReviews);
      } catch (error) {
        console.error("Failed to load testimonials:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadReviews();
  }, []);

   const renderSkeletons = () => (
    Array.from({ length: 6 }).map((_, index) => (
      <Card key={index} className="overflow-hidden border bg-card">
        <CardHeader className="flex flex-row items-center gap-3 pb-2 p-4"> 
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-24" /> 
            <Skeleton className="h-3 w-16" />
          </div>
        </CardHeader>
        <CardContent className="space-y-2 p-4"> 
          <div className="flex gap-0.5"> 
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-4 rounded-full" /> 
            ))}
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
           <Skeleton className="mt-4 aspect-video w-full rounded" /> 
        </CardContent>
      </Card>
    ))
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-12 text-center">
         <PawPrintIcon className="mx-auto mb-4 h-12 w-12 text-primary drop-shadow-lg" />
        <h1 className="mb-4 text-4xl font-bold text-primary md:text-5xl">¡Colitas Felices Hablan!</h1> 
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Nuestros clientes de PetCouture y sus humanos comparten su experiencia. ¡Pura ternura y alegría!
        </p>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"> 
        {isLoading
          ? renderSkeletons()
          : allReviews.length > 0
            ? allReviews.map((review) => (
              <Card key={review.id} className="flex h-full flex-col overflow-hidden rounded-lg border bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/30 hover:-translate-y-1">
                 {review.photoUrl && ( 
                    <div className="relative aspect-video w-full overflow-hidden">
                      <Image
                        src={review.photoUrl.includes('placehold.co') ? review.photoUrl : `https://placehold.co/400x267.png`} // Ensure placeholder for old data too
                        alt={`El amigo peludo de ${review.reviewerName}`} 
                        fill 
                        style={{ objectFit: 'cover' }} 
                        className="transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        data-ai-hint="testimonial dog" 
                      />
                    </div>
                  )}
                <CardHeader className="flex flex-row items-center justify-between gap-3 pb-2 p-4"> 
                   <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-primary/20"> 
                         <AvatarFallback className="bg-secondary text-secondary-foreground">{review.reviewerName.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-sm font-semibold">{review.reviewerName}</CardTitle> 
                         <Link href={`/product/${review.productId}`} className="text-xs text-primary hover:underline">
                             Ver Producto
                        </Link>
                      </div>
                   </div>
                    <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <StarIcon key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/50'}`} />
                        ))}
                    </div>
                </CardHeader>
                <CardContent className="flex flex-grow flex-col p-4 pt-0"> 
                    <blockquote className="mt-2 border-l-4 border-primary/30 pl-4 italic text-muted-foreground"> 
                        <p className="text-sm leading-relaxed">{review.comment}</p>
                    </blockquote>

                </CardContent>
              </Card>
            ))
            : (
              <p className="col-span-full py-10 text-center text-muted-foreground">Aún no hay testimonios. ¡Anímate a ser el primero en compartir tu ternura!</p>
            )}
      </section>

       <section className="mt-16 text-center rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 py-12"> 
         <MessageSquareIcon className="mx-auto mb-4 h-10 w-10 text-primary" />
         <h2 className="mb-4 text-2xl font-semibold">¿Tu Perrito Ama sus Cositas?</h2>
         <p className="mx-auto mb-6 max-w-xl text-muted-foreground">
             ¡Nos encantaría escuchar tu historia! Deja una reseña en la página del producto o etiquétanos #PetCouture.
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
