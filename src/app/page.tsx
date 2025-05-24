
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import Image from 'next/image';
import { PawPrintIcon } from '@/components/icons/paw-print-icon';
import { HeartIcon, GiftIcon, CameraIcon } from 'lucide-react'; // Added icons

export default function Home() {
  return (
    <div className="flex flex-col"> {/* Removed container for full-width sections */}

      {/* Hero Section */}
      <section className="relative flex min-h-[60vh] flex-col items-center justify-center bg-gradient-to-b from-primary/20 via-background to-background p-8 text-center text-foreground shadow-inner md:min-h-[70vh] md:p-16">
         {/* Optional: Add a subtle background pattern */}
         {/* <div className="absolute inset-0 z-0 opacity-5 pattern-[squares] pattern-primary pattern-size-6"></div> */}

         {/* Placeholder for animation/slider - currently static */}
         <div className="relative z-10 flex flex-col items-center">
           <PawPrintIcon className="mb-4 h-16 w-16 text-primary drop-shadow-lg" />
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-6xl">
            PetCouture
          </h1>
          <p className="mb-6 max-w-lg text-lg text-muted-foreground md:text-xl">
            Impresiona con ternura, ¡como un perrito! {/* Slogan */}
          </p>
          {/* Logo Image */}
           <div className="relative mt-8 h-48 w-48 overflow-hidden rounded-lg shadow-lg md:h-56 md:w-56"> {/* Adjusted size for logo */}
           <Image
               src="/logo.jpg"
               alt="PetCouture Logo"
               fill
               style={{ objectFit: 'contain' }}
               priority
               data-ai-hint="company logo"
             />
           </div>
          <Link href="/shop" passHref>
            <Button size="lg" className="mt-8 animate-bounce"> {/* Added bounce animation */}
              Ver Productos Adorables
            </Button>
          </Link>
        </div>
      </section>

      {/* Values/Promise Section */}
       <section className="bg-card py-16 text-center">
         <div className="container mx-auto px-4">
            <h2 className="mb-4 text-3xl font-semibold">Nuestra Promesa Peluda</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              En PetCouture, cada detalle está pensado con amor. Creamos productos adorables y de alta calidad que hacen sonreír tanto a los perritos como a sus humanos.
            </p>
             <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
                 <div className="flex flex-col items-center">
                     <HeartIcon className="mb-3 h-12 w-12 text-primary" />
                     <h3 className="mb-2 text-xl font-medium">Hecho con Amor</h3>
                     <p className="text-sm text-muted-foreground">Seleccionamos materiales suaves y seguros para la felicidad de tu peludo.</p>
                 </div>
                  <div className="flex flex-col items-center">
                     <GiftIcon className="mb-3 h-12 w-12 text-primary" />
                     <h3 className="mb-2 text-xl font-medium">Diseños Únicos</h3>
                     <p className="text-sm text-muted-foreground">Estilos divertidos y tiernos que reflejan la personalidad de tu mejor amigo.</p>
                 </div>
                 <div className="flex flex-col items-center">
                      <PawPrintIcon className="mb-3 h-12 w-12 text-primary" />
                      <h3 className="mb-2 text-xl font-medium">Calidad Duradera</h3>
                      <p className="text-sm text-muted-foreground">Productos resistentes para acompañar todas sus aventuras.</p>
                  </div>
             </div>
         </div>
       </section>

       {/* Featured Products/Categories Section */}
       <section className="container mx-auto px-4 py-16 text-center">
         <h2 className="mb-8 text-3xl font-semibold">Colecciones Llenas de Ternura</h2>
         {/* Placeholder for featured items */}
         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
           {/* Example Category Card 1 */}
           <Link href="/shop?category=Juguetes%20Divertidos" className="group block"> {/* Updated category link */}
             <div className="overflow-hidden rounded-lg border bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
               <div className="relative h-48 w-full">
                 <Image
                    src="https://placehold.co/400x300.png"
                    alt="Juguetes para perros"
                    data-ai-hint="dog toys"
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                 />
               </div>
               <div className="p-4">
                 <h3 className="mb-1 text-xl font-medium text-foreground group-hover:text-primary">Juguetes Divertidos</h3>
                 <p className="text-sm text-muted-foreground">Para horas de alegría y colitas felices.</p>
                 <Button variant="link" size="sm" className="mt-2 px-0 group-hover:text-primary">Ver Juguetes <span className="ml-1 transition-transform group-hover:translate-x-1">&rarr;</span></Button>
               </div>
             </div>
           </Link>
            {/* Example Category Card 2 */}
           <Link href="/shop?category=Moda%20Peluda" className="group block"> {/* Updated category link */}
             <div className="overflow-hidden rounded-lg border bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
               <div className="relative h-48 w-full">
                 <Image
                    src="/galeria/modapeluda.jpg"
                    alt="Ropa para perros"
                    data-ai-hint="dog clothes"
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                 />
               </div>
               <div className="p-4">
                 <h3 className="mb-1 text-xl font-medium text-foreground group-hover:text-primary">Moda Peluda</h3>
                 <p className="text-sm text-muted-foreground">Ropita cómoda y adorable para cada ocasión.</p>
                  <Button variant="link" size="sm" className="mt-2 px-0 group-hover:text-primary">Ver Ropa <span className="ml-1 transition-transform group-hover:translate-x-1">&rarr;</span></Button>
               </div>
             </div>
            </Link>
            {/* Example Category Card 3 */}
           <Link href="/shop?category=Accesorios%20Encantadores" className="group block"> {/* Updated category link */}
                <div className="overflow-hidden rounded-lg border bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="relative h-48 w-full">
                    <Image
                        src="https://placehold.co/400x300.png"
                        alt="Accesorios para perros"
                         data-ai-hint="dog accessories"
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                     />
                </div>
               <div className="p-4">
                 <h3 className="mb-1 text-xl font-medium text-foreground group-hover:text-primary">Accesorios Encantadores</h3>
                 <p className="text-sm text-muted-foreground">El toque final perfecto para tu amigo fiel.</p>
                 <Button variant="link" size="sm" className="mt-2 px-0 group-hover:text-primary">Ver Accesorios <span className="ml-1 transition-transform group-hover:translate-x-1">&rarr;</span></Button>
               </div>
             </div>
            </Link>
         </div>
       </section>

        {/* Gallery CTA Section */}
        <section className="bg-secondary/50 py-16">
            <div className="container mx-auto px-4 text-center">
                <CameraIcon className="mx-auto mb-4 h-12 w-12 text-primary" />
                <h2 className="mb-4 text-3xl font-semibold">¡Muestra a tu amigo peludo!</h2> {/* Replaced Pawsome Pal */}
                <p className="mx-auto mb-6 max-w-xl text-muted-foreground">
                    Nos encanta ver a nuestros amigos peludos disfrutando de sus productos. ¡Visita nuestra galería y comparte tus fotos!
                </p>
                <Link href="/gallery" passHref>
                    <Button size="lg" variant="outline">
                        Ir a la Galería
                    </Button>
                </Link>
            </div>
        </section>

    </div>
  );
}
