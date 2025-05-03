'use client';

import { useEffect, useState, Suspense } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import type { Product } from '@/services/products';
import type { Review } from '@/services/reviews';
import { getProduct } from '@/services/products';
import { getReviews, submitReview } from '@/services/reviews';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { StarIcon, ShoppingCartIcon, CheckIcon, InfoIcon, MessageSquareIcon } from 'lucide-react'; // Added CheckIcon, InfoIcon, MessageSquareIcon
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { PawPrintIcon } from '@/components/icons/paw-print-icon'; // Added PawPrintIcon
import Link from 'next/link'; // Ensure Link is imported

const reviewSchema = z.object({
    reviewerName: z.string().min(2, { message: "El nombre debe tener al menos 2 letras." }),
    rating: z.coerce.number().min(1, {message: "¡Por favor, selecciona una calificación!"}).max(5),
    comment: z.string().min(10, { message: "El comentario debe tener al menos 10 letras." }),
});

function ProductDetailPageContent() {
    const params = useParams();
    const { id } = params;
    const { toast } = useToast();
    const [product, setProduct] = useState<Product | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [selectedColor, setSelectedColor] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);
     const [isSubmittingReview, setIsSubmittingReview] = useState(false);

    const form = useForm<z.infer<typeof reviewSchema>>({
        resolver: zodResolver(reviewSchema),
        defaultValues: {
            reviewerName: "",
            rating: 0,
            comment: "",
        },
    });

    useEffect(() => {
        async function loadData() {
            if (typeof id !== 'string') return;
            setIsLoading(true);
            try {
                const [productData, reviewsData] = await Promise.all([
                    getProduct(id),
                    getReviews(id),
                ]);
                setProduct(productData);
                setReviews(reviewsData);
                // Pre-select first available option if exists
                if (productData?.sizes?.length) setSelectedSize(productData.sizes[0]);
                if (productData?.colors?.length) setSelectedColor(productData.colors[0]);
            } catch (error) {
                console.error("Fallo al cargar datos del producto:", error);
                toast({ title: "Error", description: "No se pudieron cargar los detalles del producto.", variant: "destructive" });
            } finally {
                setIsLoading(false);
            }
        }
        loadData();
    }, [id, toast]);

    const handleAddToCart = () => {
        if (!product) return;
        if (product.sizes.length > 0 && !selectedSize) {
            toast({ title: "Falta Talla", description: "Por favor, selecciona una talla.", variant: "destructive" });
            return;
        }
         if (product.colors.length > 0 && !selectedColor) {
            toast({ title: "Falta Color", description: "Por favor, selecciona un color.", variant: "destructive" });
            return;
         }
        // TODO: Implement real cart logic
        console.log(`Añadido al carrito: ${quantity} x ${product.name} (Talla: ${selectedSize || 'N/A'}, Color: ${selectedColor || 'N/A'})`);
        toast({
            title: "¡Añadido al Carrito!",
            description: `${quantity} x ${product.name} añadido con ternura.`,
             action: ( // Add view cart action
               <Link href="/cart">
                 <Button variant="outline" size="sm">
                   Ver Carrito
                 </Button>
               </Link>
             ),
        });
    };

    const onSubmitReview = async (values: z.infer<typeof reviewSchema>) => {
        if (!product) return;
        setIsSubmittingReview(true);
         try {
            const newReviewData = {
                reviewerName: values.reviewerName,
                rating: values.rating,
                comment: values.comment,
                // photoUrl: '...', // Handle photo upload later if needed
            };
            // TODO: Replace with actual API call
            const submittedReview = await submitReview(product.id, newReviewData);
            // Add new review to the top optimistically
             setReviews(prev => [submittedReview, ...prev].sort((a, b) => new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime()));
            form.reset();
            toast({ title: "¡Reseña Enviada!", description: "¡Gracias por compartir tu opinión peluda!" });
         } catch (error) {
             console.error("Fallo al enviar reseña:", error);
            toast({ title: "Error", description: "No se pudo enviar la reseña.", variant: "destructive" });
         } finally {
             setIsSubmittingReview(false);
         }
    };

    // Calculate average rating
     const averageRating = reviews.length > 0
        ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length)
        : 0;


    if (isLoading) {
        return <ProductDetailLoadingSkeleton />;
    }

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <h1 className="text-2xl font-semibold mb-4">¡Producto Extraviado!</h1>
                <p className="text-muted-foreground mb-6">Parece que este producto se fue a jugar y no lo encontramos.</p>
                 <Link href="/shop">
                    <Button variant="outline">Volver a la Tienda</Button>
                </Link>
            </div>
        );
    }

     // Enhanced placeholder generation
     const placeholderImage = `https://picsum.photos/seed/pawsomeprod-${product.id}/600/600`;
     const imageUrl = product.imageUrl && product.imageUrl !== 'https://picsum.photos/seed/placeholder/400/300' ? product.imageUrl : placeholderImage;

    return (
        <div className="container mx-auto px-4 py-12"> {/* Increased py */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12"> {/* Increased gap */}

                {/* Product Image Gallery */}
                <div className="space-y-4">
                    <div className="relative aspect-square w-full overflow-hidden rounded-lg border shadow-lg"> {/* More shadow */}
                         <Image
                           src={imageUrl}
                            alt={product.name}
                            layout="fill"
                            objectFit="cover"
                            priority
                             sizes="(max-width: 1024px) 100vw, 50vw"
                             className="transition-transform duration-300 hover:scale-105"
                             data-ai-hint="dog product detail" // AI hint
                        />
                         {/* Optional: Sale badge */}
                         {/* <Badge className="absolute top-3 right-3 bg-destructive text-destructive-foreground">Oferta</Badge> */}
                    </div>
                    {/* TODO: Add thumbnail gallery if multiple images */}
                     {/* <div className="grid grid-cols-4 gap-2">
                         {[1, 2, 3, 4].map(i => (
                             <div key={i} className="aspect-square relative border rounded overflow-hidden cursor-pointer hover:border-primary">
                                 <Image src={`https://picsum.photos/seed/thumb${product.id}-${i}/100/100`} layout="fill" objectFit="cover" alt={`Thumbnail ${i}`} />
                             </div>
                         ))}
                     </div> */}
                </div>

                {/* Product Details & Options */}
                <div className="flex flex-col space-y-6">
                    {/* Title and Rating */}
                     <div>
                         <h1 className="mb-2 text-3xl font-bold leading-tight lg:text-4xl">{product.name}</h1>
                         <div className="mb-4 flex items-center gap-2">
                           {averageRating > 0 ? (
                                <>
                                     <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <StarIcon key={i} className={`h-5 w-5 ${i < Math.round(averageRating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/50'}`} />
                                        ))}
                                     </div>
                                    <span className="font-medium text-sm">
                                        {averageRating.toFixed(1)}
                                    </span>
                                    <a href="#reviews-section" className="text-sm text-muted-foreground hover:text-primary">({reviews.length} {reviews.length === 1 ? 'reseña' : 'reseñas'})</a>
                                </>
                           ) : (
                               <span className="text-sm text-muted-foreground">¡Sé el primero en opinar!</span>
                           )}
                        </div>
                    </div>

                     {/* Price */}
                    <p className="text-3xl font-semibold text-primary">${product.price.toFixed(2)}</p>

                     {/* Description */}
                     <div className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                         <p>{product.description}</p>
                         {/* Add more details if available */}
                         {/* <p>Material: Algodón Suavecito</p> */}
                     </div>


                    {/* Size Selection */}
                    {product.sizes.length > 0 && (
                         <div>
                            <Label className="mb-2 block text-sm font-medium">Talla:</Label>
                            <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="flex flex-wrap gap-2">
                                {product.sizes.map(size => (
                                    <FormItem key={size}>
                                        <FormControl>
                                             <RadioGroupItem value={size} id={`size-${size}`} className="sr-only peer" />
                                         </FormControl>
                                         <Label
                                            htmlFor={`size-${size}`}
                                            className="flex h-9 w-14 cursor-pointer items-center justify-center rounded-md border border-input bg-background text-sm transition-colors hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground"
                                        >
                                            {size}
                                        </Label>
                                    </FormItem>
                                ))}
                            </RadioGroup>
                        </div>
                    )}

                    {/* Color Selection */}
                     {product.colors.length > 0 && (
                         <div>
                            <Label className="mb-2 block text-sm font-medium">Color:</Label>
                            <RadioGroup value={selectedColor} onValueChange={setSelectedColor} className="flex flex-wrap gap-3">
                                {product.colors.map(color => (
                                     <FormItem key={color}>
                                        <FormControl>
                                             <RadioGroupItem value={color} id={`color-${color}`} className="sr-only peer" />
                                        </FormControl>
                                        <Label
                                            htmlFor={`color-${color}`}
                                            title={color}
                                            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-input bg-background transition-all hover:border-muted-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-primary peer-data-[state=checked]:ring-offset-2"
                                            style={{ backgroundColor: color.toLowerCase() === 'white' ? '#f8f8f8' : color.toLowerCase() }} // Handle white color explicitly
                                        >
                                            {selectedColor === color && <CheckIcon className="h-4 w-4 text-white mix-blend-difference" />}
                                        </Label>
                                     </FormItem>
                                ))}
                            </RadioGroup>
                        </div>
                    )}


                    {/* Quantity Selection */}
                    <div className="flex items-center gap-4">
                        <Label htmlFor="quantity" className="text-sm font-medium shrink-0">Cantidad:</Label>
                         <div className="flex items-center rounded-md border border-input">
                            <Button variant="outline" size="icon" className="h-9 w-9 rounded-r-none border-r-0" onClick={() => setQuantity(q => Math.max(1, q - 1))} disabled={quantity <= 1}>-</Button>
                            <Input
                                id="quantity"
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                className="h-9 w-14 border-x-0 text-center focus-visible:ring-0"
                             />
                            <Button variant="outline" size="icon" className="h-9 w-9 rounded-l-none border-l-0" onClick={() => setQuantity(q => q + 1)}>+</Button>
                         </div>
                    </div>

                    {/* Add to Cart Button */}
                    <Button size="lg" className="w-full" onClick={handleAddToCart}>
                        <ShoppingCartIcon className="mr-2 h-5 w-5" /> Añadir al Carrito con Ternura
                    </Button>

                     {/* Additional Info/Shipping Teaser */}
                     <div className="mt-auto flex items-center gap-2 border-t pt-4 text-xs text-muted-foreground">
                         <InfoIcon className="h-4 w-4"/>
                         <span>Envío rápido disponible. Consulta nuestra <Link href="/shipping-policy" className="underline hover:text-primary">política de envíos</Link>.</span>
                     </div>
                </div>
            </div>

            <Separator className="my-12 lg:my-16" />

             {/* Reviews Section */}
             <section id="reviews-section" aria-labelledby="reviews-heading">
                 <div className="mb-8 flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
                     <h2 id="reviews-heading" className="text-2xl font-semibold lg:text-3xl">Opiniones de PetCouture</h2>
                      <Link href="#review-form">
                         <Button variant="outline">
                             <MessageSquareIcon className="mr-2 h-4 w-4" /> Escribe tu Reseña
                         </Button>
                      </Link>
                 </div>

                 <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
                    {/* Review Submission Form */}
                    <div className="lg:col-span-1" id="review-form">
                         <Card className="sticky top-20"> {/* Sticky Form */}
                            <CardHeader>
                                 <CardTitle className="flex items-center gap-2 text-xl">
                                    <PawPrintIcon className="h-5 w-5 text-primary"/> ¡Comparte tu Experiencia!
                                 </CardTitle>
                             </CardHeader>
                            <CardContent>
                                 <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmitReview)} className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="reviewerName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Tu Nombre</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Amante de Perritos" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                         <FormField
                                          control={form.control}
                                          name="rating"
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormLabel>Calificación (¡Cuántas patitas le das!)</FormLabel>
                                              <FormControl>
                                                 {/* Star Rating Input */}
                                                 <div className="flex justify-center md:justify-start">
                                                    <RadioGroup
                                                      onValueChange={(value) => field.onChange(Number(value))}
                                                      value={String(field.value)}
                                                      className="flex space-x-1"
                                                      aria-label="Calificación por estrellas"
                                                    >
                                                      {[1, 2, 3, 4, 5].map((ratingValue) => (
                                                        <FormItem key={ratingValue} className="flex items-center space-x-0 space-y-0">
                                                          <FormControl>
                                                            <RadioGroupItem value={String(ratingValue)} id={`rating-${ratingValue}`} className="peer sr-only" />
                                                          </FormControl>
                                                          <FormLabel
                                                            htmlFor={`rating-${ratingValue}`}
                                                            className="cursor-pointer p-1"
                                                            title={`${ratingValue} estrella${ratingValue > 1 ? 's' : ''}`}
                                                          >
                                                             <StarIcon className={`h-7 w-7 transition-colors ${field.value >= ratingValue ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground hover:text-yellow-400/70'}`} />
                                                          </FormLabel>
                                                        </FormItem>
                                                      ))}
                                                    </RadioGroup>
                                                 </div>
                                              </FormControl>
                                              <FormMessage className="text-center md:text-left"/>
                                            </FormItem>
                                          )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="comment"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Comentario</FormLabel>
                                                    <FormControl>
                                                        <Textarea placeholder="¿Qué te pareció el producto? ¡Cuéntanos todo!" {...field} rows={4} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                         {/* Add file input for photo here later if needed */}
                                        <Button type="submit" disabled={isSubmittingReview} className="w-full">
                                            {isSubmittingReview ? 'Enviando Reseña...' : 'Enviar Reseña'}
                                        </Button>
                                    </form>
                                 </Form>
                             </CardContent>
                         </Card>
                    </div>

                    {/* Existing Reviews List */}
                    <div className="space-y-6 lg:col-span-2">
                        {reviews.length > 0 ? (
                            reviews.map(review => (
                                <Card key={review.id} className="overflow-hidden">
                                    <CardHeader className="flex flex-row items-start justify-between gap-3 p-4 pb-2"> {/* Adjusted padding */}
                                        <div className="flex items-center gap-3">
                                             <Avatar className="h-9 w-9 border">
                                                 <AvatarFallback>{review.reviewerName.charAt(0).toUpperCase()}</AvatarFallback>
                                             </Avatar>
                                             <div>
                                                 <CardTitle className="text-sm font-semibold">{review.reviewerName}</CardTitle>
                                                  <p className="text-xs text-muted-foreground">{new Date(review.date ?? Date.now()).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric'})}</p>
                                             </div>
                                        </div>
                                        {/* Stars */}
                                         <div className="flex flex-shrink-0 items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <StarIcon key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/50'}`} />
                                            ))}
                                        </div>
                                    </CardHeader>
                                    <CardContent className="px-4 pb-4">
                                        <p className="text-sm leading-relaxed text-foreground">{review.comment}</p>
                                        {review.photoUrl && (
                                            <div className="mt-4 aspect-video w-full max-w-[200px] overflow-hidden rounded border">
                                                <Image
                                                    src={review.photoUrl} // Use placeholder if needed: `https://picsum.photos/seed/reviewphoto${review.id}/200/112`
                                                    alt={`${review.reviewerName}'s PetCouture Pal`} // Updated Alt Text
                                                    width={200}
                                                    height={112}
                                                    objectFit="cover"
                                                    className="h-full w-full"
                                                    data-ai-hint="customer dog photo review" // AI Hint
                                                />
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <div className="rounded-lg border bg-card py-10 text-center">
                                <PawPrintIcon className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />
                                <p className="text-muted-foreground">Aún no hay reseñas para este producto.</p>
                                <p className="text-sm text-muted-foreground">¡Sé el primero en dejar tu huella!</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}

// Loading Skeleton updated slightly for layout changes
function ProductDetailLoadingSkeleton() {
    return (
        <div className="container mx-auto animate-pulse px-4 py-12">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                {/* Image Skeleton */}
                <div className="space-y-4">
                     <Skeleton className="aspect-square w-full rounded-lg" />
                     <div className="grid grid-cols-4 gap-2">
                         <Skeleton className="aspect-square w-full rounded" />
                         <Skeleton className="aspect-square w-full rounded" />
                         <Skeleton className="aspect-square w-full rounded" />
                         <Skeleton className="aspect-square w-full rounded" />
                     </div>
                </div>
                {/* Details Skeleton */}
                <div className="space-y-6">
                     <div>
                         <Skeleton className="mb-3 h-8 w-3/4" />
                         <Skeleton className="h-6 w-1/3" />
                     </div>
                    <Skeleton className="h-10 w-1/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-full" />

                    <div className="space-y-2 pt-4">
                         <Skeleton className="mb-2 h-5 w-16" />
                         <div className="flex gap-2">
                            <Skeleton className="h-9 w-14 rounded-md" />
                            <Skeleton className="h-9 w-14 rounded-md" />
                            <Skeleton className="h-9 w-14 rounded-md" />
                         </div>
                    </div>
                     <div className="space-y-2 pt-4">
                         <Skeleton className="mb-2 h-5 w-16" />
                         <div className="flex gap-3">
                            <Skeleton className="h-8 w-8 rounded-full" />
                            <Skeleton className="h-8 w-8 rounded-full" />
                            <Skeleton className="h-8 w-8 rounded-full" />
                         </div>
                    </div>
                    <div className="flex items-center gap-4 pt-4">
                         <Skeleton className="h-6 w-20" />
                         <Skeleton className="h-9 w-32" />
                    </div>
                    <Skeleton className="h-12 w-full" />
                     <Skeleton className="mt-4 h-4 w-3/4" />
                </div>
            </div>
             <Separator className="my-12 lg:my-16" />
             <Skeleton className="mb-8 h-8 w-1/3" />
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
                 <div className="space-y-4 rounded-lg border p-4 lg:col-span-1">
                    <Skeleton className="h-6 w-1/2" />
                     <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-10 w-full" />
                 </div>
                 <div className="space-y-6 lg:col-span-2">
                     <Skeleton className="h-28 w-full rounded-lg" />
                     <Skeleton className="h-28 w-full rounded-lg" />
                      <Skeleton className="h-28 w-full rounded-lg" />
                 </div>
              </div>
        </div>
    );
}


export default function ProductDetailPage() {
  return (
    <Suspense fallback={<ProductDetailLoadingSkeleton />}>
      <ProductDetailPageContent />
    </Suspense>
  );
}
