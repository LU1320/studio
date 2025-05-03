'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { CalendarIcon, UserIcon, ArrowLeftIcon, EditIcon, CheckIcon } from 'lucide-react'; // Added EditIcon
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense, useState, useEffect } from 'react'; // Added useState, useEffect
import { Card, CardContent } from '@/components/ui/card'; // Added Card
import { PawPrintIcon } from '@/components/icons/paw-print-icon'; // Added PawPrintIcon


// Mock function to get post data by slug - replace with actual data fetching
const getPostBySlug = async (slug: string) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Playful blog post data
  const posts = [
    {
      id: '1',
      title: '¡Fiesta de Peluches! Top 5 Juguetes que tu Perrito Amará Masticar',
      slug: 'top-5-juguetes-peluche',
      excerpt: 'Descubre los peluches más suaves y resistentes para horas de diversión y colitas felices...',
      author: 'Experto Peludo',
      date: '2024-10-26',
      imageUrl: 'https://picsum.photos/seed/pawsomeblogtoys/800/400',
      dataAiHint: 'dogs playing with plush toys',
      content: `
        <p class="mb-4">¿Tu perrito es un campeón masticador de peluches? ¡Genial! Mantenerlos entretenidos (y lejos de tus zapatos) es clave. Aquí te presentamos nuestro top 5 de juguetes de peluche que aguantan la ternura y la diversión:</p>

        <ol class="list-decimal list-inside space-y-3 mb-6 pl-4">
          <li><strong>El Cerdito Chillón Invencible:</strong> Suave por fuera, ¡pero con refuerzos secretos! Su chillido los vuelve locos de alegría.</li>
          <li><strong>Dona Glaseada Resistente:</strong> Perfecta para morder y lanzar. ¡Cero calorías, 100% diversión!</li>
          <li><strong>Pulpo Paul con Tentáculos Sorpresa:</strong> Cada tentáculo tiene un sonido diferente. ¡Ideal para explorar!</li>
          <li><strong>Hueso de Peluche Extra-Fuerte:</strong> Un clásico que nunca falla, diseñado para durar más que la siesta de tu perrito.</li>
          <li><strong>Zorro Sigiloso sin Relleno:</strong> Menos desorden, ¡misma diversión! Perfecto para sacudir y jugar a buscar.</li>
        </ol>

        <p class="mb-4">Recuerda siempre supervisar a tu perrito mientras juega y revisar sus juguetes regularmente para asegurarte de que estén en buen estado.</p>

        <div class="my-6 aspect-video w-full overflow-hidden rounded-lg shadow-md">
            <img src="https://picsum.photos/seed/dogchewtoy/600/337" alt="Perrito masticando juguete" class="object-cover w-full h-full" data-ai-hint="dog chewing toy"/>
        </div>

        <p>¡Encuentra estos y más <a href="/shop?category=Juguetes" class="text-primary font-semibold hover:underline">juguetes súper divertidos</a> en nuestra tienda!</p>
      `,
    },
    {
      id: '2',
      title: 'Guía de Tallas PetCouture: ¡Que la Ropita le Quede Perfecta!', // Updated Title
      slug: 'guia-tallas-ropita',
      excerpt: 'Medir a tu perrito es fácil y divertido. Asegura el ajuste perfecto para máxima comodidad y estilo...',
      author: 'Modista Canina',
      date: '2024-10-20',
      imageUrl: 'https://picsum.photos/seed/pawsomeblogmeasure/800/400',
      dataAiHint: 'dog being measured with tape',
      content: `
        <p class="mb-4">¡Que tu amigo peludo luzca increíble empieza con la talla correcta! Evita devoluciones y asegura que tu perrito esté cómodo siguiendo estos sencillos pasos:</p>

        <ul class="list-none space-y-4 mb-6 pl-0">
            <li class="flex items-start gap-3">
                 <PawPrintIcon class="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                 <div><strong>Largo del Lomo:</strong> Mide desde la base del cuello (donde va el collar) hasta el inicio de la colita. ¡No incluyas la cola!</div>
             </li>
             <li class="flex items-start gap-3">
                 <PawPrintIcon class="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                 <div><strong>Contorno del Pecho:</strong> Rodea la parte más ancha del pecho, justo detrás de las patitas delanteras. Asegúrate de que la cinta métrica no quede ni muy apretada ni muy suelta.</div>
             </li>
             <li class="flex items-start gap-3">
                  <PawPrintIcon class="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <div><strong>Contorno del Cuello:</strong> Mide alrededor del cuello, donde normalmente se asienta el collar.</div>
             </li>
        </ul>

        <p class="mb-4"><strong>Consejo Pro:</strong> ¡Usa premios para que tu perrito se quede quieto durante la medición! Compara siempre tus medidas con la tabla de tallas específica de cada producto en nuestra tienda.</p>

         <div class="my-6 aspect-video w-full overflow-hidden rounded-lg shadow-md">
            <img src="https://picsum.photos/seed/dogtshirtfit/600/337" alt="Perrito con ropa bien ajustada" class="object-cover w-full h-full" data-ai-hint="dog wearing well fitting shirt"/>
        </div>

        <p>¿Listo para encontrar el atuendo perfecto? ¡Visita nuestra sección de <a href="/shop?category=Moda%20Peluda" class="text-primary font-semibold hover:underline">moda peluda</a>!</p>
      `,
    },
      {
      id: '3',
      title: 'Aventuras en el Parque: ¡Estilo y Comodidad para Jugar!',
      slug: 'moda-parque-perros',
      excerpt: 'Ideas de outfits prácticos y adorables para que tu perrito sea la estrella del parque...',
      author: 'Explorador Urbano',
      date: '2024-10-15',
      imageUrl: 'https://picsum.photos/seed/pawsomeblogpark/800/400',
      dataAiHint: 'dogs playing fetch in park',
      content: `
        <p class="mb-4">¡El parque es el paraíso social de nuestros amigos peludos! Es el lugar perfecto para correr, jugar y... ¡lucir fabuloso! Aquí te damos ideas para que tu perrito esté cómodo y a la moda:</p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <Card>
                 <CardContent class="p-4">
                     <h4 class="font-semibold mb-2">Bandanas con Estilo</h4>
                     <p class="text-sm text-muted-foreground">Un toque de personalidad instantáneo. Elige telas ligeras y transpirables, ¡y prepárate para los cumplidos!</p>
                 </CardContent>
             </Card>
             <Card>
                 <CardContent class="p-4">
                      <h4 class="font-semibold mb-2">Arneses Cómodos</h4>
                      <p class="text-sm text-muted-foreground">Opta por arneses acolchados que no restrinjan el movimiento. ¡La seguridad y la comodidad son lo primero!</p>
                  </CardContent>
              </Card>
             <Card>
                 <CardContent class="p-4">
                      <h4 class="font-semibold mb-2">Chalecos Ligeros</h4>
                      <p class="text-sm text-muted-foreground">Para días frescos, un chaleco delgado da abrigo sin sobrecalentar. ¡Ideal para perros activos!</p>
                  </CardContent>
              </Card>
             <Card>
                  <CardContent class="p-4">
                      <h4 class="font-semibold mb-2">Accesorios Prácticos</h4>
                       <p class="text-sm text-muted-foreground">Porta-bolsas que se enganchan a la correa, collares con GPS... ¡La funcionalidad también puede ser chic!</p>
                   </CardContent>
               </Card>
        </div>

         <div class="my-6 aspect-video w-full overflow-hidden rounded-lg shadow-md">
            <img src="https://picsum.photos/seed/dogbandanapark/600/337" alt="Perrito con bandana en el parque" class="object-cover w-full h-full" data-ai-hint="dog wearing bandana park"/>
        </div>

        <p class="mb-4">Recuerda que lo más importante es que tu perrito pueda moverse libremente y disfrutar. ¡Felices juegos!</p>

        <p>Encuentra el accesorio perfecto para el parque en nuestra colección de <a href="/shop?category=Accesorios" class="text-primary font-semibold hover:underline">accesorios encantadores</a>.</p>
      `,
    },
    // Add more posts
  ];

  const post = posts.find(p => p.slug === slug);
  return post ? { ...post, dataAiHint: post.dataAiHint || post.title.split(' ').slice(0,3).join(' ') } : null; // Add dataAiHint fallback
};


function BlogPostPageContent() {
    const params = useParams();
    const slug = params.slug as string;
    const [post, setPost] = useState<any>(null); // Use 'any' for mock data structure
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (slug) {
            setIsLoading(true);
            getPostBySlug(slug)
                .then(data => {
                    setPost(data);
                    setIsLoading(false);
                })
                .catch(err => {
                    console.error("Error fetching post:", err);
                    setIsLoading(false);
                });
        }
    }, [slug]);

    if (isLoading) {
        return <BlogLoadingSkeleton />;
    }

    if (!post) {
        return (
             <div className="container mx-auto px-4 py-12 text-center">
                <h1 className="mb-4 text-2xl font-semibold">¡Ups! Post Perdido</h1>
                <p className="text-muted-foreground mb-6">Parece que este post se fue a jugar y no lo encontramos.</p>
                <Link href="/blog" passHref>
                    <Button variant="outline">
                        <ArrowLeftIcon className="mr-2 h-4 w-4" /> Volver al Blog
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto max-w-3xl px-4 py-12"> {/* Adjusted max-width */}
            <article>
                {/* Back Button */}
                <Link href="/blog" passHref className="mb-8 inline-block"> {/* Increased mb */}
                    <Button variant="outline" size="sm">
                        <ArrowLeftIcon className="mr-2 h-4 w-4" /> Volver al Blog
                    </Button>
                </Link>

                {/* Post Header */}
                <header className="mb-8 border-b border-border pb-6"> {/* Added border */}
                    <h1 className="mb-4 text-3xl font-bold leading-tight text-primary md:text-4xl lg:text-5xl">{post.title}</h1> {/* Primary color title */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground"> {/* Flex wrap for smaller screens */}
                        <div className="flex items-center gap-1.5">
                            <EditIcon className="h-4 w-4" /> {/* Changed icon */}
                            <span>Por {post.author}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <CalendarIcon className="h-4 w-4" />
                             <span>{new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span> {/* Spanish locale */}
                        </div>
                    </div>
                </header>

                {/* Featured Image */}
                <div className="relative mb-10 h-64 w-full overflow-hidden rounded-lg shadow-lg md:h-96"> {/* Increased mb and shadow */}
                     <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill // Changed layout to fill
                        style={{ objectFit: 'cover' }} // Use style for objectFit with fill
                        priority
                        className="rounded-lg"
                        data-ai-hint={post.dataAiHint} // Added AI hint
                    />
                </div>

                {/* Post Content */}
                 <div
                    className="prose prose-lg max-w-none dark:prose-invert prose-p:leading-relaxed prose-headings:font-semibold prose-headings:tracking-tight prose-a:font-semibold prose-a:text-primary hover:prose-a:underline prose-strong:font-semibold prose-li:my-1 prose-li:marker:text-primary" // Adjusted prose styles
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />


                 <Separator className="my-12" />

                 {/* Related Posts or Author Bio (Optional) */}
                 <div className="text-center">
                     <h3 className="mb-4 text-xl font-semibold">¿Te gustó este post?</h3>
                     <p className="text-muted-foreground mb-6">¡Explora más consejos y ternura en nuestro blog!</p>
                     <Link href="/blog" passHref>
                        <Button>Más Posts del Blog</Button>
                     </Link>
                 </div>

            </article>
        </div>
    );
}


function BlogLoadingSkeleton() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <Skeleton className="mb-8 h-8 w-32" /> {/* Back button */}
      <header className="mb-8 space-y-4 border-b border-border pb-6">
        <Skeleton className="h-10 w-full md:h-12 lg:h-14" /> {/* Title */}
        <Skeleton className="h-10 w-3/4 md:h-12" /> {/* Title */}
        <div className="flex gap-4">
          <Skeleton className="h-5 w-36" /> {/* Meta */}
          <Skeleton className="h-5 w-48" /> {/* Meta */}
        </div>
      </header>
      <Skeleton className="mb-10 h-64 w-full rounded-lg shadow-lg md:h-96" /> {/* Image */}
      <div className="space-y-4">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-5/6" />
         <Skeleton className="h-8 w-1/3 mt-6" /> {/* Subheading Skeleton */}
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />
         <Skeleton className="h-40 w-full rounded-lg mt-6" /> {/* Image inside content */}
         <Skeleton className="h-5 w-full" />
         <Skeleton className="h-5 w-1/2" />
      </div>
       <Separator className="my-12" />
       <div className="text-center space-y-4">
           <Skeleton className="h-6 w-1/3 mx-auto" />
           <Skeleton className="h-4 w-2/3 mx-auto" />
            <Skeleton className="h-10 w-40 mx-auto" />
       </div>
    </div>
  );
}


export default function BlogPostPage() {
  return (
    <Suspense fallback={<BlogLoadingSkeleton />}>
      <BlogPostPageContent />
    </Suspense>
  );
}
