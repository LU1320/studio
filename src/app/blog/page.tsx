import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarIcon, EditIcon } from 'lucide-react'; // Changed UserIcon to EditIcon
import { PawPrintIcon } from '@/components/icons/paw-print-icon'; // Use PawPrintIcon

// Mock blog post data - updated with playful titles/excerpts
const blogPosts = [
  {
    id: '1',
    title: '¡Fiesta de Peluches! Top 5 Juguetes que tu Perrito Amará Masticar',
    slug: 'top-5-juguetes-peluche',
    excerpt: 'Descubre los peluches más suaves y resistentes para horas de diversión y colitas felices...',
    author: 'Experto Peludo',
    date: '2024-10-26',
    imageUrl: 'https://picsum.photos/seed/pawsomeblogtoys/400/250',
    dataAiHint: 'dogs playing with plush toys',
  },
  {
    id: '2',
    title: 'Guía de Tallas Pawsome: ¡Que la Ropita le Quede Perfecta!',
    slug: 'guia-tallas-ropita',
    excerpt: 'Medir a tu perrito es fácil y divertido. Asegura el ajuste perfecto para máxima comodidad y estilo...',
    author: 'Modista Canina',
    date: '2024-10-20',
    imageUrl: 'https://picsum.photos/seed/pawsomeblogmeasure/400/250',
     dataAiHint: 'dog being measured with tape',
  },
   {
    id: '3',
    title: 'Aventuras en el Parque: ¡Estilo y Comodidad para Jugar!',
    slug: 'moda-parque-perros',
    excerpt: 'Ideas de outfits prácticos y adorables para que tu perrito sea la estrella del parque...',
    author: 'Explorador Urbano',
    date: '2024-10-15',
    imageUrl: 'https://picsum.photos/seed/pawsomeblogpark/400/250',
    dataAiHint: 'dogs playing fetch in park',
  },
  // Add more posts if needed
];

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-12 text-center">
         <PawPrintIcon className="mx-auto mb-4 h-12 w-12 text-primary drop-shadow-lg" /> {/* Icon */}
        <h1 className="mb-4 text-4xl font-bold text-primary md:text-5xl">Blog Pawsome Pals</h1> {/* Updated Title */}
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Consejos, trucos y pura ternura para los papás perrunos más geniales.
        </p>
      </section>

      {/* Blog Post Grid */}
      <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
           <Link key={post.id} href={`/blog/${post.slug}`} className="group block h-full">
              <Card className="flex h-full flex-col overflow-hidden rounded-lg border bg-card shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg hover:border-primary/30">
                <CardHeader className="p-0">
                     <div className="relative h-48 w-full overflow-hidden">
                       <Image
                          src={post.imageUrl}
                          alt={post.title}
                          layout="fill"
                          objectFit="cover"
                          className="transition-transform duration-500 ease-in-out group-hover:scale-105"
                           sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" // Added sizes
                           data-ai-hint={post.dataAiHint} // Added AI hint
                        />
                     </div>
                </CardHeader>
                <CardContent className="flex flex-grow flex-col p-5"> {/* Increased padding */}
                  <CardTitle className="mb-2 text-lg font-semibold leading-tight group-hover:text-primary"> {/* Adjusted size */}
                      {post.title}
                  </CardTitle>
                  <div className="mb-3 flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <EditIcon className="h-3 w-3" /> {/* Changed Icon */}
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="h-3 w-3" />
                       <span>{new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span> {/* Spanish locale */}
                    </div>
                  </div>
                  <p className="mb-4 flex-grow text-sm text-muted-foreground line-clamp-3"> {/* Limit excerpt lines */}
                    {post.excerpt}
                  </p>
                </CardContent>
                <CardFooter className="p-5 pt-0"> {/* Increased padding */}
                    <Button variant="link" size="sm" className="px-0 text-primary group-hover:underline">Leer Más <span className="ml-1 transition-transform group-hover:translate-x-1">&rarr;</span></Button> {/* Link style button */}
                </CardFooter>
              </Card>
           </Link>
        ))}
      </section>

      {/* TODO: Add Pagination if many posts */}
      {/* <div className="mt-12 text-center">
          <Button variant="outline">Cargar más posts</Button>
      </div> */}
    </div>
  );
}
