import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/services/products';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StarIcon } from 'lucide-react'; // Assuming StarIcon for ratings

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const placeholderImage = `https://picsum.photos/seed/${product.id}/400/300`; // Placeholder

  return (
    <Card className="flex h-full flex-col overflow-hidden rounded-lg shadow-sm transition-shadow hover:shadow-md">
      <CardHeader className="p-0">
        <Link href={`/product/${product.id}`} className="block">
          <div className="relative h-48 w-full overflow-hidden">
             {/* Use placeholder or actual image */}
             <Image
                src={product.imageUrl && !product.imageUrl.includes('placeholder') ? product.imageUrl : placeholderImage} // Basic check if URL seems like placeholder
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-105"
                // Add placeholder if needed
                // placeholder="blur"
                // blurDataURL="data:..."
              />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="flex flex-grow flex-col p-4">
        <CardTitle className="mb-1 text-lg font-semibold">
          <Link href={`/product/${product.id}`} className="hover:text-primary">
            {product.name}
          </Link>
        </CardTitle>
        {/* Basic rating placeholder */}
        <div className="mb-2 flex items-center gap-1 text-sm text-muted-foreground">
          <StarIcon className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span>4.5</span> {/* Placeholder rating */}
          <span className="ml-1">(15 reviews)</span> {/* Placeholder count */}
        </div>
        <p className="mb-3 flex-grow text-sm text-muted-foreground">
          {product.description.length > 80 ? `${product.description.substring(0, 80)}...` : product.description}
        </p>
        <div className="mb-3 flex flex-wrap gap-1">
            {product.sizes.slice(0, 3).map(size => ( // Show limited sizes
              <Badge key={size} variant="outline">{size}</Badge>
            ))}
             {product.sizes.length > 3 && <Badge variant="outline">...</Badge>}
        </div>
        <div className="flex flex-wrap gap-1">
            {product.colors.slice(0, 3).map(color => ( // Show limited colors
                 <span key={color} className="inline-block h-5 w-5 rounded-full border" title={color} style={{ backgroundColor: color.toLowerCase() === 'white' ? '#eee' : color.toLowerCase() }}></span>
            ))}
            {product.colors.length > 3 && <Badge variant="outline" className="text-xs">+{product.colors.length - 3}</Badge>}
        </div>

      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <span className="text-lg font-semibold text-primary">${product.price.toFixed(2)}</span>
        <Link href={`/product/${product.id}`} passHref>
          <Button size="sm" variant="outline">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
