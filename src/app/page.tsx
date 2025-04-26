import { Button } from "@/components/ui/button";
import Link from 'next/link';
import Image from 'next/image';
import { DogIcon } from 'lucide-react';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="relative mb-12 flex flex-col items-center justify-center rounded-lg bg-gradient-to-r from-primary/70 to-accent/50 p-8 text-center text-primary-foreground shadow-lg md:p-16">
        <div className="absolute inset-0 z-0 rounded-lg opacity-30 mix-blend-multiply">
          <Image
            src="https://picsum.photos/1200/400?grayscale&blur=2" // Placeholder pattern or soft background
            alt="Background pattern"
            layout="fill"
            objectFit="cover"
            priority
            className="rounded-lg"
          />
        </div>
        <div className="relative z-10">
          <h1 className="mb-4 text-4xl font-bold md:text-6xl">
            Pawsome Outfits
          </h1>
          <p className="mb-6 text-lg md:text-xl">
            Cute & Comfy Clothes for Modern Pups
          </p>
          <div className="h-64 w-full overflow-hidden rounded-lg shadow-xl md:h-96">
             <Image
                src="https://picsum.photos/seed/dogfashion/800/600" // Vibrant dog photo
                alt="Dog wearing Pawsome Outfits"
                width={800}
                height={600}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                priority
              />
          </div>
          <Link href="/shop" passHref>
            <Button size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
              Shop Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Brand Values Section */}
      <section className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-semibold">Our Pawsome Promise</h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          We believe every dog deserves to look and feel their best. That's why we design adorable, high-quality outfits that are as comfortable as they are stylish. Made with love for the modern pup!
        </p>
      </section>

       {/* Optional: Featured Products or Categories */}
       <section className="text-center">
         <h2 className="mb-6 text-3xl font-semibold">Explore Our Collections</h2>
         {/* Placeholder for featured items - can be implemented later */}
         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
           {/* Example Category Card */}
           <div className="rounded-lg border bg-card p-4 shadow-sm transition-shadow hover:shadow-md">
             <DogIcon className="mx-auto mb-3 h-12 w-12 text-primary" />
             <h3 className="mb-2 text-xl font-medium">Sweaters</h3>
             <p className="text-sm text-muted-foreground">Cozy knits for chilly days.</p>
             <Link href="/shop?category=sweaters" passHref>
                <Button variant="outline" size="sm" className="mt-4">View Sweaters</Button>
             </Link>
           </div>
           <div className="rounded-lg border bg-card p-4 shadow-sm transition-shadow hover:shadow-md">
             <DogIcon className="mx-auto mb-3 h-12 w-12 text-primary" />
             <h3 className="mb-2 text-xl font-medium">Raincoats</h3>
             <p className="text-sm text-muted-foreground">Stay dry in style.</p>
              <Link href="/shop?category=raincoats" passHref>
                 <Button variant="outline" size="sm" className="mt-4">View Raincoats</Button>
              </Link>
           </div>
           <div className="rounded-lg border bg-card p-4 shadow-sm transition-shadow hover:shadow-md">
              <DogIcon className="mx-auto mb-3 h-12 w-12 text-primary" />
             <h3 className="mb-2 text-xl font-medium">Accessories</h3>
             <p className="text-sm text-muted-foreground">The perfect finishing touch.</p>
              <Link href="/shop?category=accessories" passHref>
                 <Button variant="outline" size="sm" className="mt-4">View Accessories</Button>
              </Link>
           </div>
         </div>
       </section>

    </div>
  );
}
