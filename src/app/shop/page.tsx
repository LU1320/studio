'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Product } from '@/services/products';
import { getProducts } from '@/services/products';
import { ProductCard } from '@/components/products/product-card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { FilterIcon, ArrowUpDown, SlidersHorizontalIcon } from 'lucide-react'; // Added SlidersHorizontalIcon
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
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [maxPrice, setMaxPrice] = useState(100);

  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category');

  // Fetch available filters dynamically from products
  const [availableSizes, setAvailableSizes] = useState<string[]>([]);
  const [availableColors, setAvailableColors] = useState<string[]>([]);

  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true);
      try {
        const allProducts = await getProducts();
        setProducts(allProducts);

        // Dynamically determine filters and max price
        const sizes = new Set<string>();
        const colors = new Set<string>();
        let currentMaxPrice = 0;
        allProducts.forEach(p => {
          p.sizes.forEach(s => sizes.add(s));
          p.colors.forEach(c => colors.add(c));
          if (p.price > currentMaxPrice) currentMaxPrice = p.price;
        });

        setAvailableSizes(Array.from(sizes).sort()); // Sort sizes
        setAvailableColors(Array.from(colors).sort()); // Sort colors
        const roundedMaxPrice = Math.ceil(currentMaxPrice / 10) * 10 || 100; // Ensure max price is at least 100
        setMaxPrice(roundedMaxPrice);
        setPriceRange([0, roundedMaxPrice]);

      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadProducts();
  }, []);

  useEffect(() => {
    let tempProducts = [...products];

    // Filter by initial category (if present)
     if (initialCategory) {
         // Match against the 'category' field if it exists, otherwise fall back to name/description matching
         tempProducts = tempProducts.filter(p =>
             (p.category && p.category.toLowerCase() === initialCategory.toLowerCase()) ||
             (!p.category && (
                 p.name.toLowerCase().includes(initialCategory.toLowerCase()) ||
                 p.description.toLowerCase().includes(initialCategory.toLowerCase())
             ))
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
    switch (sortOption) {
        case 'price-asc':
            tempProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            tempProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            tempProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            tempProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'newest': // Assuming products have a date or implicit order means newest first
             // If no date, reverse the original fetched order (if that represents newest)
             // Or sort by ID descending if IDs are sequential/time-based
             tempProducts.sort((a, b) => parseInt(b.id) - parseInt(a.id)); // Example: sort by ID descending
             break;
         // default: // 'default' or 'popularity' might rely on backend data not available here
    }


    setFilteredProducts(tempProducts);
    setCurrentPage(1);
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
            <Skeleton className="h-[250px] w-full rounded-xl" /> {/* Increased height */}
            <div className="space-y-2 p-2">
                <Skeleton className="h-5 w-3/4" /> {/* Slightly larger text */}
                <Skeleton className="h-4 w-1/2" />
            </div>
        </div>
    ))
  );


  const FilterSidebar = ({ isMobile = false }: { isMobile?: boolean }) => (
     <div className="space-y-6">
         {/* Sorting only on mobile sheet */}
         {isMobile && (
             <div>
                 <Label className="mb-2 block text-sm font-medium">Ordenar Por</Label>
                 <Select value={sortOption} onValueChange={setSortOption}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccionar orden" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="default">Populares</SelectItem>
                         <SelectItem value="newest">Novedades</SelectItem>
                        <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
                        <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
                        <SelectItem value="name-asc">Nombre: A a Z</SelectItem>
                        <SelectItem value="name-desc">Nombre: Z a A</SelectItem>
                    </SelectContent>
                </Select>
             </div>
         )}

         {/* Price Range */}
         <div>
            <Label className="mb-4 block text-sm font-medium">Rango de Precios</Label>
             <Slider
                defaultValue={[0, maxPrice]}
                max={maxPrice}
                step={5}
                value={priceRange}
                onValueChange={(value) => setPriceRange(value as [number, number])}
                className="w-full"
            />
            <div className="mt-2 flex justify-between text-xs text-muted-foreground"> {/* Smaller text */}
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
            </div>
        </div>

         {/* Sizes */}
         {availableSizes.length > 0 && (
             <div>
                 <Label className="mb-2 block text-sm font-medium">Talla</Label>
                 <div className="grid grid-cols-3 gap-2"> {/* Grid layout */}
                     {availableSizes.map(size => (
                         <div key={size} className="flex items-center space-x-2">
                             <Checkbox
                                 id={`${isMobile ? 'm-' : ''}size-${size}`}
                                 checked={selectedSizes.includes(size)}
                                 onCheckedChange={() => handleSizeChange(size)}
                             />
                             <Label htmlFor={`${isMobile ? 'm-' : ''}size-${size}`} className="text-sm font-normal cursor-pointer">{size}</Label>
                         </div>
                     ))}
                 </div>
             </div>
         )}

        {/* Colors */}
         {availableColors.length > 0 && (
             <div>
                <Label className="mb-2 block text-sm font-medium">Color</Label>
                <div className="grid grid-cols-3 gap-x-2 gap-y-3"> {/* Grid layout */}
                    {availableColors.map(color => (
                        <div key={color} className="flex items-center space-x-2">
                            <Checkbox
                                id={`${isMobile ? 'm-' : ''}color-${color}`}
                                checked={selectedColors.includes(color)}
                                onCheckedChange={() => handleColorChange(color)}
                            />
                            {/* Optional: Add color swatch */}
                            <span className="inline-block h-4 w-4 rounded-full border" style={{ backgroundColor: color.toLowerCase() === 'white' ? '#eee' : color.toLowerCase() }}></span>
                            <Label htmlFor={`${isMobile ? 'm-' : ''}color-${color}`} className="text-sm font-normal cursor-pointer">{color}</Label>
                        </div>
                    ))}
                </div>
            </div>
         )}


        {/* Clear Filters Button */}
        <Button onClick={() => {
            setSelectedSizes([]);
            setSelectedColors([]);
            setPriceRange([0, maxPrice]);
            setSortOption('default'); // Reset sort as well
        }} variant="outline" className="w-full border-destructive text-destructive hover:bg-destructive/10"> {/* Destructive outline */}
            Limpiar Filtros
        </Button>
     </div>
  );

  // Determine category title
  let categoryTitle = "Todos los Productos";
  if (initialCategory) {
      const foundProduct = products.find(p => p.category?.toLowerCase() === initialCategory.toLowerCase());
      if (foundProduct && foundProduct.category) {
          categoryTitle = foundProduct.category; // Use the exact category name from product
      } else {
          // Fallback for categories derived from URL but not explicitly in product data
          categoryTitle = initialCategory.charAt(0).toUpperCase() + initialCategory.slice(1);
      }
  }


  return (
    <div className="container mx-auto px-4 py-12"> {/* Increased py */}
      <h1 className="mb-8 text-center text-3xl font-bold md:text-4xl">{categoryTitle} Adorables</h1> {/* Playful Title */}

      <div className="flex flex-col gap-8 md:flex-row">
        {/* Desktop Filters */}
        <aside className="hidden w-full md:block md:w-1/4 lg:w-1/5">
          <div className="sticky top-20 space-y-6 rounded-lg border bg-card p-4 shadow-sm"> {/* Sticky filters */}
            <h2 className="flex items-center gap-2 text-lg font-semibold">
                <SlidersHorizontalIcon className="h-5 w-5" /> Filtros
            </h2>
            <FilterSidebar />
          </div>
        </aside>

        {/* Mobile Filters Trigger & Product Grid */}
        <main className="w-full md:w-3/4 lg:w-4/5">
          <div className="mb-6 flex items-center justify-between"> {/* Increased mb */}
            <p className="text-sm text-muted-foreground">
              Mostrando {paginatedProducts.length} de {filteredProducts.length} ternuras
            </p>

            {/* Desktop Sort */}
             <div className="hidden md:block">
                 <Select value={sortOption} onValueChange={setSortOption}>
                    <SelectTrigger className="w-[200px] text-sm"> {/* Increased width */}
                        <ArrowUpDown className="mr-2 inline-block h-4 w-4 text-muted-foreground" />
                        <SelectValue placeholder="Ordenar por..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="default">Populares</SelectItem>
                         <SelectItem value="newest">Novedades</SelectItem>
                        <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
                        <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
                        <SelectItem value="name-asc">Nombre: A a Z</SelectItem>
                        <SelectItem value="name-desc">Nombre: Z a A</SelectItem>
                    </SelectContent>
                </Select>
            </div>

             {/* Mobile Filter Trigger */}
             <Sheet>
                <SheetTrigger asChild className="md:hidden">
                    <Button variant="outline" size="sm">
                        <FilterIcon className="mr-2 h-4 w-4" /> Filtros y Orden
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full max-w-xs overflow-y-auto p-6">
                    <SheetHeader>
                        <SheetTitle className="mb-4 text-lg">Filtros y Orden</SheetTitle> {/* Updated title */}
                    </SheetHeader>
                    <FilterSidebar isMobile={true} />
                </SheetContent>
            </Sheet>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading
              ? renderSkeletons()
              : paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
              ))}
             {!isLoading && paginatedProducts.length === 0 && (
                <p className="col-span-full py-10 text-center text-muted-foreground">¡Oh no! No encontramos ternuras con esos filtros.</p>
             )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex justify-center space-x-1"> {/* Adjusted spacing */}
              <Button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                variant="outline"
                size="sm"
              >
                Anterior
              </Button>
              {/* Display subset of page numbers for many pages */}
              {/* TODO: Implement smarter pagination display (e.g., ellipsis) */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  variant={currentPage === page ? 'default' : 'outline'}
                  size="icon" // Use icon size for page numbers
                  className="h-9 w-9"
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
                Siguiente
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}


export default function ShopPage() {
  // Wrap with Suspense because useSearchParams() needs it
  return (
    <Suspense fallback={<ShopPageLoading />}>
      <ShopPageContent />
    </Suspense>
  );
}

// Loading Skeleton remains largely the same, could be slightly adjusted for padding/sizes if needed
function ShopPageLoading() {
    return (
      <div className="container mx-auto px-4 py-12">
        <Skeleton className="mb-8 h-8 w-1/3" />
        <div className="flex flex-col gap-8 md:flex-row">
          <aside className="hidden w-full md:block md:w-1/4 lg:w-1/5">
             <div className="sticky top-20 space-y-4 rounded-lg border bg-card p-4 shadow-sm">
                 <Skeleton className="h-6 w-1/3" />
                 <Skeleton className="h-8 w-full" />
                 <Skeleton className="h-20 w-full" />
                 <Skeleton className="h-20 w-full" />
                 <Skeleton className="h-16 w-full" />
                 <Skeleton className="h-8 w-full" />
             </div>
          </aside>
          <main className="w-full md:w-3/4 lg:w-4/5">
            <div className="mb-6 flex items-center justify-between">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-8 w-36 md:hidden" /> {/* Mobile filter button skeleton */}
              <Skeleton className="hidden h-10 w-48 md:block" /> {/* Desktop sort skeleton */}
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: PRODUCTS_PER_PAGE }).map((_, index) => (
                  <div key={index} className="flex flex-col space-y-3">
                      <Skeleton className="h-[250px] w-full rounded-xl" />
                      <div className="space-y-2 p-2">
                          <Skeleton className="h-5 w-3/4" />
                          <Skeleton className="h-4 w-1/2" />
                      </div>
                  </div>
              ))}
            </div>
             <div className="mt-10 flex justify-center space-x-1">
                <Skeleton className="h-9 w-20" />
                <Skeleton className="h-9 w-9" />
                <Skeleton className="h-9 w-9" />
                <Skeleton className="h-9 w-20" />
             </div>
          </main>
        </div>
      </div>
    );
  }
