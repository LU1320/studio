import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HeartIcon, ShirtIcon } from 'lucide-react'; // Example icons, removed PawPrintIcon
import { PawPrintIcon } from '@/components/icons/paw-print-icon'; // Import PawPrintIcon

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold text-primary md:text-5xl">About Pawsome Outfits</h1>
        <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
          Discover the story behind our passion for dressing pups in style and comfort.
        </p>
      </section>

      {/* Brand Story */}
      <section className="mb-16 grid grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-3xl font-semibold">Our Story</h2>
          <p className="mb-4 text-muted-foreground">
            Pawsome Outfits started from a simple idea: why shouldn't our furry best friends have clothes that are as stylish and comfortable as ours? As devoted dog lovers, we noticed a gap in the market for high-quality, fashionable, and genuinely comfortable apparel for dogs of all shapes and sizes.
          </p>
          <p className="mb-4 text-muted-foreground">
            Fueled by our love for pups and a passion for design, we embarked on a mission to create a brand that celebrates the unique personality of every dog. We spend countless hours sourcing the best materials, perfecting fits, and designing outfits that are both adorable and practical for everyday adventures.
          </p>
          <p className="text-muted-foreground">
            From cozy sweaters for chilly walks to playful bandanas for park outings, every piece is crafted with care, ensuring your dog not only looks great but feels great too.
          </p>
        </div>
        <div className="relative h-80 w-full overflow-hidden rounded-lg shadow-lg md:h-96">
           <Image
            src="https://picsum.photos/seed/doglove/600/800" // Replace with an inspiring image
            alt="Founder with their dog or dogs playing"
            layout="fill"
            objectFit="cover"
            className="rounded-lg transition-transform duration-300 hover:scale-105"
          />
        </div>
      </section>

      {/* Brand Values */}
      <section className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-semibold">What We Stand For</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <Card className="text-center">
            <CardHeader>
              <PawPrintIcon className="mx-auto mb-3 h-12 w-12 text-primary" /> {/* Changed icon */}
              <CardTitle>Comfort First</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                We prioritize your dog's comfort above all. Our designs use soft, breathable materials and allow for easy movement.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <ShirtIcon className="mx-auto mb-3 h-12 w-12 text-accent" />
              <CardTitle>Stylish Designs</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Keep your pup looking trendy! We stay up-to-date with pet fashion trends to offer chic and adorable outfits.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <HeartIcon className="mx-auto mb-3 h-12 w-12 text-destructive" />
              <CardTitle>Quality & Durability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our outfits are made to last, using high-quality materials and construction techniques for everyday wear and tear.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Team Section (Optional) */}
      <section className="text-center">
        <h2 className="mb-6 text-3xl font-semibold">Meet the Team (and Pups!)</h2>
        <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
          We're a small team of dedicated dog enthusiasts working hard to bring you the best outfits!
        </p>
        <div className="relative mx-auto h-64 w-full max-w-2xl overflow-hidden rounded-lg shadow-lg md:h-80">
           <Image
            src="https://picsum.photos/seed/teamdogs/800/400" // Replace with an actual team photo
            alt="The Pawsome Outfits team with their dogs"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
         {/* Add brief bios if desired */}
      </section>
    </div>
  );
}
