'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Product } from '@/services/products';
import { getProducts } from '@/services/products';
import { ProductCard } from '@/components/products/product-card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { FilterIcon, ArrowUpDown } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from "@/components/ui/slider";


const PRODUCTS_PER_PAGE = 9;

function ShopPageContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<string>('default');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]); // Example range
  const [maxPrice, setMaxPrice] = useState(100); // Max price from products

  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category');

  // Available filters (should ideally be dynamic based on products)
  const availableSizes = ['S', 'M', 'L', 'XL'];
  const availableColors = ['Blue', 'Red', 'Yellow', 'Green', 'Pink', 'Black', 'White']; // Example

  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true);
      try {
        const allProducts = await getProducts();
        setProducts(allProducts);
        // Calculate max price for slider
        const maxProductPrice = Math.max(...allProducts.map(p => p.price), 0);
        setMaxPrice(Math.ceil(maxProductPrice / 10) * 10); // Round up to nearest 10
        setPriceRange([0, Math.ceil(maxProductPrice / 10) * 10]);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        // Handle error state if needed
      } finally {
        setIsLoading(false);
      }
    }
    loadProducts();
  }, []);

  useEffect(() => {
    let tempProducts = [...products];

    // Filter by initial category if present
    if (initialCategory) {
        // Basic category matching - adjust if your product data has explicit categories
        tempProducts = tempProducts.filter(p =>
            p.name.toLowerCase().includes(initialCategory.toLowerCase()) ||
            p.description.toLowerCase().includes(initialCategory.toLowerCase())
        );
    }

    // Filter by size
    if (selectedSizes.length > 0) {
      tempProducts = tempProducts.filter(p => p.sizes.some(size => selectedSizes.includes(size)));
    }

    // Filter by color
    if (selectedColors.length > 0) {
        tempProducts = tempProducts.filter(p => p.colors.some(color => selectedColors.includes(color)));
    }

    // Filter by price range
    tempProducts = tempProducts.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);


    // Sort products
    if (sortOption === 'price-asc') {
      tempProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      tempProducts.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'name-asc') {
        tempProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'name-desc') {
        tempProducts.sort((a, b) => b.name.localeCompare(a.name));
    }
     // Default sort can be by ID or leave as is

    setFilteredProducts(tempProducts);
    setCurrentPage(1); // Reset to first page on filter/sort change
  }, [products, sortOption, selectedSizes, selectedColors, priceRange, initialCategory]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handleSizeChange = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const handleColorChange = (color: string) => {
      setSelectedColors(prev =>
        prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
      );
    };


  const renderSkeletons = () => (
    Array.from({ length: PRODUCTS_PER_PAGE }).map((_, index) => (
        <div key={index} className="flex flex-col space-y-3">
            <Skeleton className="h-[200px] w-full rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
            </div>
        </div>
    ))
  );


  const FilterSidebar = () => (
     <div className="space-y-6">
         <div>
             <Label className="mb-2 block text-sm font-medium">Sort By</Label>
             <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Default" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="name-asc">Name: A to Z</SelectItem>
                    <SelectItem value="name-desc">Name: Z to A</SelectItem>
                </SelectContent>
            </Select>
         </div>

         <div>
             <Label className="mb-2 block text-sm font-medium">Size</Label>
             <div className="space-y-2">
                 {availableSizes.map(size => (
                     <div key={size} className="flex items-center space-x-2">
                         <Checkbox
                             id={`size-${size}`}
                             checked={selectedSizes.includes(size)}
                             onCheckedChange={() => handleSizeChange(size)}
                         />
                         <Label htmlFor={`size-${size}`} className="text-sm font-normal">{size}</Label>
                     </div>
                 ))}
             </div>
         </div>

         <div>
            <Label className="mb-2 block text-sm font-medium">Color</Label>
            <div className="grid grid-cols-3 gap-2">
                {availableColors.map(color => (
                    <div key={color} className="flex items-center space-x-2">
                        <Checkbox
                            id={`color-${color}`}
                            checked={selectedColors.includes(color)}
                            onCheckedChange={() => handleColorChange(color)}
                        />
                        {/* Optional: Add color swatch */}
                        {/* <span className="inline-block h-4 w-4 rounded-full border" style={{ backgroundColor: color.toLowerCase() }}></span> */}
                        <Label htmlFor={`color-${color}`} className="text-sm font-normal">{color}</Label>
                    </div>
                ))}
            </div>
        </div>

         <div>
            <Label className="mb-4 block text-sm font-medium">Price Range</Label>
             <Slider
                defaultValue={[0, maxPrice]}
                max={maxPrice}
                step={5} // Adjust step as needed
                value={priceRange}
                onValueChange={(value) => setPriceRange(value as [number, number])}
                className="w-full"
            />
            <div className="mt-2 flex justify-between text-sm text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
            </div>
        </div>

        <Button onClick={() => {
            setSelectedSizes([]);
            setSelectedColors([]);
            setPriceRange([0, maxPrice]);
        }} variant="outline" className="w-full">
            Clear Filters
        </Button>
     </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Shop {initialCategory ? `- ${initialCategory.charAt(0).toUpperCase() + initialCategory.slice(1)}` : ''}</h1>

      <div className="flex flex-col gap-8 md:flex-row">
        {/* Desktop Filters */}
        <aside className="hidden w-full md:block md:w-1/4 lg:w-1/5">
          <h2 className="mb-4 text-xl font-semibold">Filters</h2>
          <FilterSidebar />
        </aside>

        {/* Mobile Filters Trigger & Product Grid */}
        <main className="w-full md:w-3/4 lg:w-4/5">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {paginatedProducts.length} of {filteredProducts.length} products
            </p>
            {/* Mobile Filter Trigger */}
             <Sheet>
                <SheetTrigger asChild className="md:hidden">
                    <Button variant="outline" size="sm">
                        <FilterIcon className="mr-2 h-4 w-4" /> Filters
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full max-w-xs overflow-y-auto p-6">
                    <SheetHeader>
                        <SheetTitle className="mb-4">Filters</SheetTitle>
                    </SheetHeader>
                    <FilterSidebar />
                </SheetContent>
            </Sheet>
             {/* Desktop Sort (moved from filters for better layout) */}
             <div className="hidden md:block">
                 <Select value={sortOption} onValueChange={setSortOption}>
                    <SelectTrigger className="w-[180px]">
                        <ArrowUpDown className="mr-2 inline-block h-4 w-4 text-muted-foreground" />
                        <SelectValue placeholder="Sort by..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="price-asc">Price: Low to High</SelectItem>
                        <SelectItem value="price-desc">Price: High to Low</SelectItem>
                        <SelectItem value="name-asc">Name: A to Z</SelectItem>
                        <SelectItem value="name-desc">Name: Z to A</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading
              ? renderSkeletons()
              : paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
              ))}
             {!isLoading && paginatedProducts.length === 0 && (
                <p className="col-span-full text-center text-muted-foreground">No products found matching your criteria.</p>
             )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center space-x-2">
              <Button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                variant="outline"
                size="sm"
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  variant={currentPage === page ? 'default' : 'outline'}
                  size="sm"
                  className="w-10"
                >
                  {page}
                </Button>
              ))}
              <Button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                variant="outline"
                size="sm"
              >
                Next
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}


export default function ShopPage() {
  return (
    // Wrap with Suspense because useSearchParams() needs it
    <Suspense fallback={<ShopPageLoading />}>
      <ShopPageContent />
    </Suspense>
  );
}

function ShopPageLoading() {
    // Basic loading skeleton for the whole page structure
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="mb-6 h-8 w-1/4" />
        <div className="flex flex-col gap-8 md:flex-row">
          <aside className="hidden w-full md:block md:w-1/4 lg:w-1/5">
            <Skeleton className="mb-4 h-6 w-1/3" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          </aside>
          <main className="w-full md:w-3/4 lg:w-4/5">
            <div className="mb-4 flex items-center justify-between">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-8 w-24 md:hidden" /> {/* Mobile filter button skeleton */}
              <Skeleton className="hidden h-8 w-36 md:block" /> {/* Desktop sort skeleton */}
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: PRODUCTS_PER_PAGE }).map((_, index) => (
                  <div key={index} className="flex flex-col space-y-3">
                      <Skeleton className="h-[200px] w-full rounded-xl" />
                      <div className="space-y-2">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-4 w-1/2" />
                      </div>
                  </div>
              ))}
            </div>
             <div className="mt-8 flex justify-center space-x-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-10" />
                <Skeleton className="h-8 w-10" />
                <Skeleton className="h-8 w-20" />
             </div>
          </main>
        </div>
      </div>
    );
  }
