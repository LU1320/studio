'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { UploadIcon, HeartIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

// Mock data structure for gallery images
interface GalleryImage {
  id: string;
  imageUrl: string;
  altText: string;
  photographer?: string; // Optional photographer/owner name
  likes: number;
}

// Mock function to fetch gallery images (replace with actual API call)
const fetchGalleryImages = async (page = 1, limit = 12): Promise<GalleryImage[]> => {
  await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay

  // Create more diverse mock data using Picsum seeds
  const seedOffset = (page - 1) * limit;
  return Array.from({ length: limit }, (_, index) => {
    const idNum = seedOffset + index + 1;
    return {
      id: `gallery-${idNum}`,
      // Use different seeds for variety
      imageUrl: `https://picsum.photos/seed/pawsomegallery${idNum}/400/400`,
      altText: `Adorable customer dog ${idNum}`,
      photographer: `Perrito Feliz ${idNum}`, // Example owner name
      likes: Math.floor(Math.random() * 100), // Random likes
    };
  });
};


export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadImages = async () => {
      setIsLoading(true);
      try {
        const newImages = await fetchGalleryImages(page);
        if (newImages.length === 0) {
          setHasMore(false);
        } else {
          // Avoid duplicates if re-fetching same page (though unlikely with current setup)
           setImages(prev => {
             const existingIds = new Set(prev.map(img => img.id));
             const uniqueNewImages = newImages.filter(img => !existingIds.has(img.id));
             return [...prev, ...uniqueNewImages];
           });
        }
      } catch (error) {
        console.error("Failed to fetch gallery images:", error);
        toast({ title: "Error", description: "No se pudieron cargar las imágenes.", variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
    };
    loadImages();
  }, [page, toast]);

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handleLike = (id: string) => {
    // Mock like update - in real app, send API request
    setImages(prevImages =>
      prevImages.map(img =>
        img.id === id ? { ...img, likes: img.likes + 1 } : img
      )
    );
     toast({ title: "¡Gracias!", description: "¡Te gusta esta ternura!" });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
     const file = event.target.files?.[0];
     if (file) {
         console.log("File selected:", file.name);
         // TODO: Implement actual upload logic (e.g., to Firebase Storage, backend API)
         // Show preview, send to server, update gallery optimistically or after success
         toast({
             title: "¡Foto Recibida!",
             description: `Gracias por compartir ${file.name}. La revisaremos pronto.`,
         });
         // Reset file input if needed
         event.target.value = "";
     }
   };

  const renderSkeletons = (count: number) => (
    Array.from({ length: count }).map((_, index) => (
      <Card key={`skeleton-${index}`} className="overflow-hidden">
        <Skeleton className="aspect-square w-full" />
        <CardContent className="p-3">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="mt-2 h-4 w-1/4" />
        </CardContent>
      </Card>
    ))
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-primary md:text-5xl">Galería de Pawsome Pals</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          ¡Mira a nuestros adorables clientes peludos luciendo sus productos favoritos! Pura ternura.
        </p>
         <div className="mt-6">
             <Label htmlFor="upload-photo" className="cursor-pointer">
                <Button asChild variant="outline">
                     <span>
                         <UploadIcon className="mr-2 h-4 w-4" /> Comparte tu Foto
                     </span>
                 </Button>
             </Label>
             <Input
                 id="upload-photo"
                 type="file"
                 accept="image/*"
                 onChange={handleFileUpload}
                 className="hidden" // Hide the default input styling
             />
             <p className="mt-2 text-xs text-muted-foreground">¡Nos encantaría ver a tu perrito!</p>
         </div>
      </section>

      {/* Image Grid */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {images.map((image) => (
          <Card key={image.id} className="group relative overflow-hidden rounded-lg shadow-sm transition-shadow hover:shadow-lg">
             <div className="aspect-square w-full">
                <Image
                    src={image.imageUrl}
                    alt={image.altText}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-105"
                 />
             </div>
             {/* Overlay for info and like button - appears on hover */}
             <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 via-black/20 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                 {image.photographer && <p className="text-xs font-medium text-white drop-shadow-sm">{image.photographer}</p>}
                 <div className="mt-1 flex items-center justify-between">
                     <div className="flex items-center gap-1 text-white">
                         <HeartIcon className="h-4 w-4" />
                         <span className="text-xs font-semibold">{image.likes}</span>
                     </div>
                     <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 hover:text-pink-300"
                        onClick={() => handleLike(image.id)}
                        aria-label="Like photo"
                      >
                         <HeartIcon className="h-4 w-4" />
                     </Button>
                 </div>
             </div>
          </Card>
        ))}
        {/* Loading Skeletons */}
        {isLoading && renderSkeletons(6)}
      </section>

      {/* Load More Button */}
      {hasMore && !isLoading && (
        <div className="mt-12 text-center">
          <Button onClick={handleLoadMore} disabled={isLoading}>
            {isLoading ? 'Cargando...' : 'Cargar Más Ternura'}
          </Button>
        </div>
      )}
       {!hasMore && images.length > 0 && (
         <p className="mt-12 text-center text-muted-foreground">¡Has visto toda la ternura por ahora!</p>
       )}
       {!isLoading && images.length === 0 && !hasMore && (
            <p className="mt-12 text-center text-muted-foreground">Aún no hay fotos en la galería. ¡Sé el primero en compartir!</p>
       )}
    </div>
  );
}
