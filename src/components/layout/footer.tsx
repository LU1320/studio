import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { DogIcon, FacebookIcon, InstagramIcon, TwitterIcon } from 'lucide-react'; // Assuming TwitterIcon exists, replace if needed

export function Footer() {
  return (
    <footer className="mt-16 border-t bg-secondary/50 py-8">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 md:grid-cols-4">
        {/* Brand & Socials */}
        <div className="flex flex-col items-center md:items-start">
          <Link href="/" className="mb-4 flex items-center gap-2 text-lg font-semibold text-primary">
            <DogIcon className="h-6 w-6" />
            <span>Pawsome Outfits</span>
          </Link>
          <p className="mb-4 text-center text-sm text-muted-foreground md:text-left">
            Cute & Comfy Clothes for Modern Pups.
          </p>
          <div className="flex gap-4">
            <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FacebookIcon className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
            </Link>
            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <InstagramIcon className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
            </Link>
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <TwitterIcon className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="mb-4 font-semibold">Quick Links</h4>
          <nav className="flex flex-col gap-2">
            <Link href="/shop" className="text-sm text-muted-foreground transition-colors hover:text-primary">Shop</Link>
            <Link href="/about" className="text-sm text-muted-foreground transition-colors hover:text-primary">About Us</Link>
            <Link href="/blog" className="text-sm text-muted-foreground transition-colors hover:text-primary">Blog</Link>
            <Link href="/contact" className="text-sm text-muted-foreground transition-colors hover:text-primary">Contact</Link>
          </nav>
        </div>

        {/* Policies */}
        <div>
          <h4 className="mb-4 font-semibold">Policies</h4>
          <nav className="flex flex-col gap-2">
            <Link href="/shipping-policy" className="text-sm text-muted-foreground transition-colors hover:text-primary">Shipping Policy</Link>
            <Link href="/returns-policy" className="text-sm text-muted-foreground transition-colors hover:text-primary">Returns Policy</Link>
            <Link href="/privacy-policy" className="text-sm text-muted-foreground transition-colors hover:text-primary">Privacy Policy</Link>
            <Link href="/terms-of-service" className="text-sm text-muted-foreground transition-colors hover:text-primary">Terms of Service</Link>
          </nav>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="mb-4 font-semibold">Newsletter</h4>
          <p className="mb-3 text-sm text-muted-foreground">Get updates on new arrivals and special offers!</p>
          <form className="flex gap-2">
            <Input type="email" placeholder="Enter your email" className="flex-grow" aria-label="Email for newsletter" />
            <Button type="submit" variant="outline">Subscribe</Button>
          </form>
        </div>
      </div>

      <Separator className="my-8" />

      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Pawsome Outfits. All rights reserved.
      </div>
    </footer>
  );
}
