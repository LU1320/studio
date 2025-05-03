import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon, LinkedinIcon } from 'lucide-react'; // Added more icons if needed
import { PawPrintIcon } from '@/components/icons/paw-print-icon';

export function Footer() {
  return (
    <footer className="mt-16 border-t bg-card py-10"> {/* Changed background */}
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 md:grid-cols-4">
        {/* Marca y Redes Sociales */}
        <div className="flex flex-col items-center md:items-start">
           <Link href="/" className="mb-4 flex items-center gap-2 text-xl font-bold text-primary"> {/* Increased size */}
            <PawPrintIcon className="h-7 w-7 text-primary" /> {/* Use PawPrintIcon, increased size */}
            <span>PetCouture</span> {/* Updated Brand Name */}
          </Link>
          <p className="mb-4 text-center text-sm text-muted-foreground md:text-left">
            Impresiona con ternura, ¡como un perrito! {/* Updated Slogan */}
          </p>
          <div className="flex gap-4">
             {/* Using foreground color for icons */}
            <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FacebookIcon className="h-5 w-5 text-foreground transition-colors hover:text-primary" />
            </Link>
            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <InstagramIcon className="h-5 w-5 text-foreground transition-colors hover:text-primary" />
            </Link>
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <TwitterIcon className="h-5 w-5 text-foreground transition-colors hover:text-primary" />
            </Link>
             {/* Add TikTok if relevant - Lucide might not have it, consider SVG */}
          </div>
        </div>

        {/* Enlaces Rápidos */}
        <div>
          <h4 className="mb-4 font-semibold">Explora</h4> {/* Changed title */}
          <nav className="flex flex-col gap-2">
            <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-primary">Inicio</Link>
            <Link href="/shop" className="text-sm text-muted-foreground transition-colors hover:text-primary">Productos</Link>
            <Link href="/gallery" className="text-sm text-muted-foreground transition-colors hover:text-primary">Galería</Link> {/* Added Gallery */}
            <Link href="/blog" className="text-sm text-muted-foreground transition-colors hover:text-primary">Blog</Link>
            <Link href="/testimonials" className="text-sm text-muted-foreground transition-colors hover:text-primary">Testimonios</Link>
            <Link href="/contact" className="text-sm text-muted-foreground transition-colors hover:text-primary">Contacto</Link>
             {/* Removed About and Recommender */}
          </nav>
        </div>

        {/* Políticas */}
        <div>
          <h4 className="mb-4 font-semibold">Legal</h4> {/* Changed title */}
          <nav className="flex flex-col gap-2">
            <Link href="/shipping-policy" className="text-sm text-muted-foreground transition-colors hover:text-primary">Política de Envíos</Link>
            <Link href="/returns-policy" className="text-sm text-muted-foreground transition-colors hover:text-primary">Política de Devoluciones</Link>
            <Link href="/privacy-policy" className="text-sm text-muted-foreground transition-colors hover:text-primary">Política de Privacidad</Link>
            <Link href="/terms-of-service" className="text-sm text-muted-foreground transition-colors hover:text-primary">Términos de Servicio</Link>
          </nav>
        </div>

        {/* Boletín */}
        <div>
          <h4 className="mb-4 font-semibold">Únete al Club</h4> {/* Changed title */}
          <p className="mb-3 text-sm text-muted-foreground">Recibe ternura directo a tu email.</p> {/* Changed text */}
          <form className="flex gap-2">
            <Input type="email" placeholder="tu.email@ejemplo.com" className="flex-grow bg-background" aria-label="Email para boletín" /> {/* Adjusted placeholder */}
            <Button type="submit" variant="default">Suscribirse</Button> {/* Use default variant */}
          </form>
        </div>
      </div>

      <Separator className="my-8 bg-border" /> {/* Ensured separator uses border color */}

      <div className="container mx-auto px-4 text-center text-xs text-muted-foreground"> {/* Adjusted font size */}
        © {new Date().getFullYear()} PetCouture. Ternura Peluda Reservada. {/* Updated copyright */}
      </div>
    </footer>
  );
}
