import { Button } from "@/components/ui/button";
import Link from 'next/link';
import Image from 'next/image';
import { PawPrintIcon } from '@/components/icons/paw-print-icon'; // Use PawPrintIcon

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Sección Principal */}
      <section className="relative mb-12 flex flex-col items-center justify-center rounded-lg bg-gradient-to-r from-primary/70 to-accent/50 p-8 text-center text-primary-foreground shadow-lg md:p-16">
        <div className="absolute inset-0 z-0 rounded-lg opacity-30 mix-blend-multiply">
          {/* Background pattern or soft background */}
          {/* <Image
            src="https://picsum.photos/1200/400?grayscale&blur=2"
            alt="Patrón de fondo"
            layout="fill"
            objectFit="cover"
            priority
            className="rounded-lg"
          /> */}
        </div>
        <div className="relative z-10">
          <h1 className="mb-4 text-4xl font-bold md:text-6xl">
            Pawsome Outfits
          </h1>
          <p className="mb-6 text-lg md:text-xl">
            Ropa linda y cómoda para perritos modernos
          </p>
          {/* Image Removed */}
          <Link href="/shop" passHref>
            <Button size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
              Compra Ahora
            </Button>
          </Link>
        </div>
      </section>

      {/* Sección de Valores de Marca */}
      <section className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-semibold">Nuestra Promesa Pawsome</h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Creemos que cada perrito merece verse y sentirse genial. Por eso diseñamos atuendos adorables y de alta calidad que son tan cómodos como elegantes. ¡Hecho con amor para el cachorro moderno!
        </p>
      </section>

       {/* Opcional: Productos Destacados o Categorías */}
       <section className="text-center">
         <h2 className="mb-6 text-3xl font-semibold">Explora Nuestras Colecciones</h2>
         {/* Placeholder para artículos destacados - se puede implementar después */}
         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
           {/* Tarjeta de Categoría de Ejemplo */}
           <div className="rounded-lg border bg-card p-4 shadow-sm transition-shadow hover:shadow-md">
             <PawPrintIcon className="mx-auto mb-3 h-12 w-12 text-primary" /> {/* Changed icon */}
             <h3 className="mb-2 text-xl font-medium">Suéteres</h3>
             <p className="text-sm text-muted-foreground">Tejidos acogedores para días fríos.</p>
             <Link href="/shop?category=sweaters" passHref>
                <Button variant="outline" size="sm" className="mt-4">Ver Suéteres</Button>
             </Link>
           </div>
           <div className="rounded-lg border bg-card p-4 shadow-sm transition-shadow hover:shadow-md">
             <PawPrintIcon className="mx-auto mb-3 h-12 w-12 text-primary" /> {/* Changed icon */}
             <h3 className="mb-2 text-xl font-medium">Impermeables</h3>
             <p className="text-sm text-muted-foreground">Mantente seco con estilo.</p>
              <Link href="/shop?category=raincoats" passHref>
                 <Button variant="outline" size="sm" className="mt-4">Ver Impermeables</Button>
              </Link>
           </div>
           <div className="rounded-lg border bg-card p-4 shadow-sm transition-shadow hover:shadow-md">
              <PawPrintIcon className="mx-auto mb-3 h-12 w-12 text-primary" /> {/* Changed icon */}
             <h3 className="mb-2 text-xl font-medium">Accesorios</h3>
             <p className="text-sm text-muted-foreground">El toque final perfecto.</p>
              <Link href="/shop?category=accessories" passHref>
                 <Button variant="outline" size="sm" className="mt-4">Ver Accesorios</Button>
              </Link>
           </div>
         </div>
       </section>

    </div>
  );
}
