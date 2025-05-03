import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/services/products';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
// Removed unused StarIcon import

interface ProductCardProps {
  product: Product;
}

// Function to get a playful name variation (simple example)
const getPlayfulName = (name: string) => {
    // Could add more variations based on product type
    if (name.toLowerCase().includes('sweater')) return `Suéter ${name.split(' ').slice(-1)[0]} Feliz`;
    if (name.toLowerCase().includes('toy')) return `Juguete Mágico ${name.split(' ').slice(-1)[0]}`;
    return `Adorable ${name}`;
};

export function ProductCard({ product }: ProductCardProps) {
  const placeholderImage = `https://picsum.photos/seed/product-${product.id}/400/300`;
  const imageUrl = product.imageUrl && product.imageUrl !== 'https://picsum.photos/seed/placeholder/400/300' ? product.imageUrl : placeholderImage; // Improved placeholder check
  const playfulName = getPlayfulName(product.name); // Get playful name

  // Mock rating for display purposes
  const rating = (Math.random() * (5 - 3.5) + 3.5).toFixed(1); // Random rating between 3.5 and 5.0
  const reviewCount = Math.floor(Math.random() * 50) + 5; // Random review count > 5

  return (
    <Link href={`/product/${product.id}`} className="group block h-full">
        <Card className="flex h-full flex-col overflow-hidden rounded-lg border bg-card shadow-sm transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
          <CardHeader className="p-0">
            <div className="relative h-56 w-full overflow-hidden"> {/* Increased height */}
                <Image
                    src={imageUrl}
                    alt={playfulName} // Use playful name for alt text
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 ease-in-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" // Added sizes attribute
                    data-ai-hint="cute dog product" // Generic hint
                />
                 {/* Optional: Sale Badge */}
                 {/* <Badge className="absolute right-2 top-2 bg-destructive text-destructive-foreground">Oferta!</Badge> */}
            </div>
          </CardHeader>
          <CardContent className="flex flex-grow flex-col p-4">
            <CardTitle className="mb-1 text-base font-semibold leading-tight group-hover:text-primary"> {/* Adjusted size */}
                {playfulName} {/* Use playful name */}
            </CardTitle>
             {/* Rating */}
             <div className="mb-2 flex items-center gap-1 text-xs text-muted-foreground">
                 {/* Simple Star rendering */}
                 <span className="text-yellow-400">{'★'.repeat(Math.floor(parseFloat(rating)))}</span>
                 <span className="text-gray-300">{'★'.repeat(5 - Math.floor(parseFloat(rating)))}</span>
                <span className="ml-1 font-medium text-foreground">{rating}</span>
                <span>({reviewCount} reseñas)</span>
            </div>
            {/* Description (shorter) */}
            <p className="mb-3 flex-grow text-xs text-muted-foreground line-clamp-2"> {/* Smaller font, line clamp */}
              {product.description}
            </p>
            {/* Badges (Color/Size) */}
            <div className="mt-auto space-y-1.5"> {/* Pushes badges to bottom */}
                 {/* Colors */}
                {product.colors.length > 0 && (
                     <div className="flex flex-wrap items-center gap-1">
                        {product.colors.slice(0, 4).map(color => (
                             <span key={color} className="inline-block h-4 w-4 rounded-full border border-muted" title={color} style={{ backgroundColor: color.toLowerCase() === 'white' ? '#eee' : color.toLowerCase() }}></span>
                        ))}
                        {product.colors.length > 4 && <span className="text-xs text-muted-foreground">+{product.colors.length - 4}</span>}
                     </div>
                 )}
                 {/* Sizes */}
                 {product.sizes.length > 0 && product.sizes[0] !== "One Size" && (
                     <div className="flex flex-wrap gap-1">
                         {product.sizes.slice(0, 3).map(size => (
                             <Badge key={size} variant="outline" className="px-1.5 py-0.5 text-[10px]"> {/* Smaller badge */}
                                 {size}
                             </Badge>
                         ))}
                         {product.sizes.length > 3 && <Badge variant="outline" className="px-1.5 py-0.5 text-[10px]">...</Badge>}
                     </div>
                 )}
            </div>

          </CardContent>
          <CardFooter className="mt-auto flex items-center justify-between p-4 pt-2"> {/* Adjusted padding */}
            <span className="text-lg font-semibold text-primary">${product.price.toFixed(2)}</span>
            {/* Button visible normally, slightly changes on hover */}
             <Button size="sm" variant="default" className="opacity-90 transition-opacity group-hover:opacity-100">
                 Ver Detalles
             </Button>
          </CardFooter>
        </Card>
    </Link>
  );
}
