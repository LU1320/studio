'use client';

import { useEffect, useState, Suspense } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import type { Product } from '@/services/products';
import type { Review } from '@/services/reviews';
import { getProduct } from '@/services/products';
import { getReviews, submitReview } from '@/services/reviews';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StarIcon, ShoppingCartIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';


const reviewSchema = z.object({
    reviewerName: z.string().min(2, { message: "Name must be at least 2 characters." }),
    rating: z.coerce.number().min(1).max(5, { message: "Please select a rating." }),
    comment: z.string().min(10, { message: "Comment must be at least 10 characters." }),
    // photoUrl is optional and handled separately if image upload is added
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
                if (productData?.sizes?.length) setSelectedSize(productData.sizes[0]);
                if (productData?.colors?.length) setSelectedColor(productData.colors[0]);
            } catch (error) {
                console.error("Failed to load product data:", error);
                toast({ title: "Error", description: "Could not load product details.", variant: "destructive" });
            } finally {
                setIsLoading(false);
            }
        }
        loadData();
    }, [id, toast]);

    const handleAddToCart = () => {
        if (!product) return;
        // Basic validation
        if (!selectedSize && product.sizes.length > 0) {
            toast({ title: "Select Size", description: "Please select a size.", variant: "destructive" });
            return;
        }
         if (!selectedColor && product.colors.length > 0) {
            toast({ title: "Select Color", description: "Please select a color.", variant: "destructive" });
            return;
         }
        // TODO: Implement actual add to cart logic (e.g., context, state management, API call)
        console.log(`Added to cart: ${quantity} x ${product.name} (${selectedSize}, ${selectedColor})`);
        toast({
            title: "Added to Cart!",
            description: `${quantity} x ${product.name} (${selectedSize}, ${selectedColor})`,
        });
    };

    const onSubmitReview = async (values: z.infer<typeof reviewSchema>) => {
        if (!product) return;
         try {
            const newReviewData = {
                productId: product.id,
                reviewerName: values.reviewerName,
                rating: values.rating,
                comment: values.comment,
                // photoUrl: '...', // Handle photo upload if implemented
            };
            // TODO: Replace with actual API call
            const submittedReview = await submitReview(product.id, newReviewData);
            setReviews(prev => [submittedReview, ...prev]); // Add new review optimistically
            form.reset(); // Reset form
            toast({ title: "Review Submitted", description: "Thank you for your feedback!" });
         } catch (error) {
             console.error("Failed to submit review:", error);
            toast({ title: "Error", description: "Could not submit review.", variant: "destructive" });
         }
    };


    if (isLoading) {
        return <ProductDetailLoadingSkeleton />;
    }

    if (!product) {
        return <div className="container mx-auto px-4 py-8 text-center">Product not found.</div>;
    }

     const placeholderImage = `https://picsum.photos/seed/${product.id}/600/600`;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* Product Image */}
                <div>
                    <div className="relative aspect-square w-full overflow-hidden rounded-lg border shadow-md">
                         <Image
                           src={product.imageUrl && !product.imageUrl.includes('placeholder') ? product.imageUrl : placeholderImage}
                            alt={product.name}
                            layout="fill"
                            objectFit="cover"
                            priority
                        />
                    </div>
                    {/* Add thumbnail gallery here if needed */}
                </div>

                {/* Product Details */}
                <div>
                    <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>
                     {/* Rating Summary */}
                     <div className="mb-4 flex items-center gap-2">
                       {reviews.length > 0 ? (
                            <>
                                <StarIcon className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium">
                                    {(reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)}
                                </span>
                                <span className="text-sm text-muted-foreground">({reviews.length} reviews)</span>
                            </>
                       ) : (
                           <span className="text-sm text-muted-foreground">Be the first to review!</span>
                       )}
                    </div>
                    <p className="mb-4 text-2xl font-semibold text-primary">${product.price.toFixed(2)}</p>
                    <p className="mb-6 text-muted-foreground">{product.description}</p>

                    {/* Size Selection */}
                    {product.sizes.length > 0 && (
                         <div className="mb-4">
                            <Label className="mb-2 block text-sm font-medium">Size</Label>
                            <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="flex flex-wrap gap-2">
                                {product.sizes.map(size => (
                                    <Label
                                        key={size}
                                        htmlFor={`size-${size}`}
                                        className={`cursor-pointer rounded-md border px-4 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${selectedSize === size ? 'border-primary bg-primary text-primary-foreground' : 'border-input bg-background'}`}
                                    >
                                        <RadioGroupItem value={size} id={`size-${size}`} className="sr-only" />
                                        {size}
                                    </Label>
                                ))}
                            </RadioGroup>
                        </div>
                    )}

                    {/* Color Selection */}
                     {product.colors.length > 0 && (
                         <div className="mb-6">
                            <Label className="mb-2 block text-sm font-medium">Color</Label>
                            <RadioGroup value={selectedColor} onValueChange={setSelectedColor} className="flex flex-wrap gap-2">
                                {product.colors.map(color => (
                                    <Label
                                        key={color}
                                        htmlFor={`color-${color}`}
                                        title={color}
                                        className={`relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 transition-all ${selectedColor === color ? 'border-primary ring-2 ring-primary ring-offset-2' : 'border-input hover:border-muted-foreground'}`}
                                         style={{ backgroundColor: color.toLowerCase() === 'white' ? '#eee' : color.toLowerCase() }}
                                    >
                                        <RadioGroupItem value={color} id={`color-${color}`} className="sr-only" />
                                         {selectedColor === color && <CheckIcon className="h-4 w-4 text-primary-foreground mix-blend-difference" />}
                                    </Label>
                                ))}
                            </RadioGroup>
                        </div>
                    )}


                    {/* Quantity Selection */}
                    <div className="mb-6 flex items-center gap-4">
                        <Label htmlFor="quantity" className="text-sm font-medium">Quantity</Label>
                        <Input
                            id="quantity"
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                            className="w-20"
                        />
                    </div>

                    {/* Add to Cart Button */}
                    <Button size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" onClick={handleAddToCart}>
                        <ShoppingCartIcon className="mr-2 h-5 w-5" /> Add to Cart
                    </Button>
                </div>
            </div>

            <Separator className="my-12" />

             {/* Reviews Section */}
             <section>
                <h2 className="mb-6 text-2xl font-semibold">Customer Reviews</h2>
                 <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {/* Review Submission Form */}
                    <div>
                         <h3 className="mb-4 text-xl font-medium">Leave a Review</h3>
                         <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmitReview)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="reviewerName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Your Name" {...field} />
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
                                      <FormLabel>Rating</FormLabel>
                                      <FormControl>
                                        <RadioGroup
                                          onValueChange={(value) => field.onChange(Number(value))}
                                          value={String(field.value)}
                                          className="flex"
                                        >
                                          {[1, 2, 3, 4, 5].map((ratingValue) => (
                                            <FormItem key={ratingValue} className="flex items-center space-x-1 space-y-0">
                                              <FormControl>
                                                <RadioGroupItem value={String(ratingValue)} id={`rating-${ratingValue}`} className="peer sr-only" />
                                              </FormControl>
                                              <FormLabel
                                                htmlFor={`rating-${ratingValue}`}
                                                className="cursor-pointer"
                                              >
                                                 <StarIcon className={`h-6 w-6 transition-colors ${field.value >= ratingValue ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground hover:text-yellow-400'}`} />
                                              </FormLabel>
                                            </FormItem>
                                          ))}
                                        </RadioGroup>
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                    control={form.control}
                                    name="comment"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Comment</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Tell us what you think!" {...field} rows={4} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                 {/* Add file input for photo here if needed */}
                                <Button type="submit" disabled={form.formState.isSubmitting}>
                                    {form.formState.isSubmitting ? 'Submitting...' : 'Submit Review'}
                                </Button>
                            </form>
                         </Form>
                    </div>

                    {/* Existing Reviews */}
                    <div className="space-y-6">
                        {reviews.length > 0 ? (
                            reviews.map(review => (
                                <Card key={review.id}>
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <div className="flex items-center gap-3">
                                             <Avatar>
                                                {/* Placeholder avatar */}
                                                <AvatarFallback>{review.reviewerName.charAt(0)}</AvatarFallback>
                                             </Avatar>
                                             <CardTitle className="text-base font-medium">{review.reviewerName}</CardTitle>
                                        </div>
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <StarIcon key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} />
                                            ))}
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">{review.comment}</p>
                                        {review.photoUrl && (
                                            <div className="mt-4 h-32 w-32 overflow-hidden rounded border">
                                                <Image
                                                    src={review.photoUrl}
                                                    alt={`${review.reviewerName}'s dog`}
                                                    width={128}
                                                    height={128}
                                                    objectFit="cover"
                                                     className="h-full w-full"
                                                />
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <p className="text-muted-foreground">No reviews yet.</p>
                        )}
                    </div>
                </div>
            </section>

             {/* TODO: Add Outfit Recommender section */}
            <Separator className="my-12" />
            <section>
                <h2 className="mb-6 text-2xl font-semibold">Need Outfit Ideas?</h2>
                {/* Outfit Recommender component will go here */}
                <p className="text-muted-foreground">Use our AI tool to get outfit recommendations based on your dog's photo and the occasion!</p>
                 <Button variant="outline" className="mt-4">Try Recommender</Button>
                 {/* Link this button to the recommender page/modal */}
            </section>
        </div>
    );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}


function ProductDetailLoadingSkeleton() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* Image Skeleton */}
                <div>
                     <Skeleton className="aspect-square w-full rounded-lg" />
                </div>
                {/* Details Skeleton */}
                <div className="space-y-4">
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-6 w-1/4" />
                    <Skeleton className="h-10 w-1/3" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-4/6" />
                    <div className="space-y-2 pt-4">
                         <Skeleton className="h-6 w-16" />
                         <div className="flex gap-2">
                            <Skeleton className="h-10 w-16 rounded-md" />
                            <Skeleton className="h-10 w-16 rounded-md" />
                             <Skeleton className="h-10 w-16 rounded-md" />
                         </div>
                    </div>
                     <div className="space-y-2 pt-4">
                         <Skeleton className="h-6 w-16" />
                         <div className="flex gap-2">
                            <Skeleton className="h-8 w-8 rounded-full" />
                            <Skeleton className="h-8 w-8 rounded-full" />
                            <Skeleton className="h-8 w-8 rounded-full" />
                         </div>
                    </div>
                    <div className="flex items-center gap-4 pt-4">
                         <Skeleton className="h-6 w-20" />
                         <Skeleton className="h-10 w-20" />
                    </div>
                    <Skeleton className="h-12 w-full" />
                </div>
            </div>
             <Separator className="my-12" />
             <Skeleton className="mb-6 h-8 w-1/3" />
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                 <div className="space-y-4">
                    <Skeleton className="h-6 w-1/4" />
                     <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-10 w-32" />
                 </div>
                 <div className="space-y-6">
                     <Skeleton className="h-24 w-full rounded-lg" />
                     <Skeleton className="h-24 w-full rounded-lg" />
                 </div>
              </div>
        </div>
    );
}


export default function ProductDetailPage() {
  // Wrap with Suspense because useParams() needs it for SSR/prerendering
  return (
    <Suspense fallback={<ProductDetailLoadingSkeleton />}>
      <ProductDetailPageContent />
    </Suspense>
  );
}
