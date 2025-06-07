'use client';

import Link from 'next/link';
import { ShoppingCartIcon, MenuIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils'; // Import cn utility
import { PawPrintIcon } from '@/components/icons/paw-print-icon'; // Use PawPrintIcon

const navItems = [
  { href: '/', label: 'Inicio' },
  { href: '/shop', label: 'Productos' }, // Changed from Tienda to Productos
  { href: '/gallery', label: 'Galería' }, // Added Gallery
  { href: '/blog', label: 'Blog' },
  { href: '/testimonials', label: 'Testimonios' },
  { href: '/contact', label: 'Contacto' },
  // { href: '/about', label: 'Nosotros' }, // About removed as per sections
  // { href: '/recommend', label: 'Recomendador' }, // Recommender removed as per sections
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
          <img src="/logo.png" alt="PetCouture Logo" className="h-8 w-auto" /> {/* Use logo.png */}
          <span className="font-bold">PetCouture</span> {/* Updated Brand Name */}
        </Link>

        {/* Navegación Escritorio */}
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href ? "text-primary font-semibold" : "text-muted-foreground" // Highlight active link
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Carrito y Menú Móvil */}
        <div className="flex items-center gap-2 md:gap-4"> {/* Adjusted gap */}
          <Link href="/cart" passHref>
            <Button variant="ghost" size="icon" aria-label="Carrito de Compras">
              <ShoppingCartIcon className="h-5 w-5" />
            </Button>
          </Link>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Abrir Menú">
                <MenuIcon className="h-6 w-6" />
              </Button> 
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs bg-background p-6">
               {/* Logo en Menú Móvil */}
               <Link href="/" className="mb-6 flex items-center gap-2 text-xl font-bold text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                  <PawPrintIcon className="h-7 w-7 text-primary" />
                  <span>PetCouture</span> {/* Updated Brand Name */}
                </Link>
              <nav className="flex flex-col gap-4"> {/* Adjusted gap */}
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "text-base font-medium transition-colors hover:text-primary py-2", // Increased font size and padding
                       pathname === item.href ? "text-primary font-semibold" : "text-foreground"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
