'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { CalendarIcon, UserIcon, ArrowLeftIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';


// Mock function to get post data by slug - replace with actual data fetching
const getPostBySlug = async (slug: string) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const posts = [
    {
      id: '1',
      title: 'Top 5 Winter Essentials for Your Dog',
      slug: 'top-5-winter-essentials',
      excerpt: 'Keep your furry friend warm and stylish during the cold months with these must-have items...',
      author: 'Jane Doe',
      date: '2024-10-26',
      imageUrl: 'https://picsum.photos/seed/winterdog/800/400',
      content: `
        <p>Winter is coming! Ensuring your dog stays warm and comfortable during the colder months is essential. Here are our top 5 picks for winter gear:</p>
        <br/>
        <ol class="list-decimal list-inside space-y-2 mb-4">
          <li><strong>Cozy Sweater:</strong> A good quality sweater provides an extra layer of insulation. Look for soft, non-irritating fabrics.</li>
          <li><strong>Waterproof Coat:</strong> Essential for rainy or snowy days to keep your dog dry and prevent chills.</li>
          <li><strong>Paw Balm:</strong> Protects paws from ice, salt, and cold pavement.</li>
          <li><strong>Reflective Gear:</strong> Shorter days mean walks in low light. Reflective collars or vests enhance visibility.</li>
          <li><strong>Warm Bedding:</strong> An extra blanket or a self-warming bed can make a big difference indoors.</li>
        </ol>
        <p>Remember to consider your dog's breed, coat type, and age when selecting winter gear. Stay warm and pawsome!</p>
        <br/>
        <div class="aspect-video w-full overflow-hidden rounded-lg my-4">
            <img src="https://picsum.photos/seed/doggear/600/337" alt="Dog winter gear" class="object-cover w-full h-full"/>
        </div>
        <p>Check out our latest collection of <a href="/shop?category=winter" class="text-primary hover:underline">winter apparel</a>!</p>
      `,
    },
    {
      id: '2',
      title: 'How to Choose the Right Size Dog Coat',
      slug: 'choosing-dog-coat-size',
      excerpt: 'Getting the perfect fit is crucial for comfort and style. Here\'s our guide to measuring your pup correctly...',
      author: 'John Smith',
      date: '2024-10-20',
      imageUrl: 'https://picsum.photos/seed/dogmeasure/800/400',
      content: `
        <p>Finding the right size coat for your dog ensures they are comfortable and the coat functions effectively. Here's how to measure your dog:</p>
        <br/>
        <ul class="list-disc list-inside space-y-2 mb-4">
            <li><strong>Length:</strong> Measure from the base of the neck (where the collar sits) to the base of the tail.</li>
            <li><strong>Chest Girth:</strong> Measure around the widest part of your dog's chest, usually right behind the front legs.</li>
            <li><strong>Neck Girth:</strong> Measure around the neck where the collar would naturally sit.</li>
        </ul>
        <p>Always check the specific brand's sizing chart, as measurements can vary. A coat that's too tight can restrict movement, while one that's too loose might not provide enough warmth or could snag.</p>
        <br/>
         <div class="aspect-video w-full overflow-hidden rounded-lg my-4">
            <img src="https://picsum.photos/seed/measuringtape/600/337" alt="Measuring a dog" class="object-cover w-full h-full"/>
        </div>
        <p>A well-fitting coat makes all the difference for a happy pup!</p>
      `,
    },
      {
      id: '3',
      title: 'Pawsome Adventures: Dressing Up for the Dog Park',
      slug: 'dog-park-fashion',
      excerpt: 'Make a statement at the park! Explore fun and functional outfits for your dog\'s social outings.',
      author: 'Alice Green',
      date: '2024-10-15',
      imageUrl: 'https://picsum.photos/seed/dogpark/800/400',
      content: `
        <p>The dog park is the ultimate social scene for our furry friends! Why not let them strut their stuff in style? Here are some ideas for practical yet fashionable park attire:</p>
        <br/>
        <ul class="list-disc list-inside space-y-2 mb-4">
            <li><strong>Bandanas:</strong> A simple and fun way to add personality. Choose breathable fabrics.</li>
            <li><strong>Lightweight Harnesses:</strong> Opt for comfortable harnesses that don't restrict movement during play.</li>
            <li><strong>Durable Vests:</strong> For slightly cooler days, a lightweight vest can provide warmth without overheating.</li>
            <li><strong>Practical Accessories:</strong> Consider poop bag holders that attach to the leash or harness for convenience.</li>
        </ul>
         <div class="aspect-video w-full overflow-hidden rounded-lg my-4">
            <img src="https://picsum.photos/seed/dogbandana/600/337" alt="Dog wearing bandana" class="object-cover w-full h-full"/>
        </div>
        <p>Remember, safety and comfort come first. Ensure any outfit allows your dog to run and play freely. Happy park hopping!</p>
        <br/>
        <p>Find the perfect park accessory in our <a href="/shop?category=accessories" class="text-primary hover:underline">accessories collection</a>.</p>
      `,
    },
    // Add more posts
  ];

  const post = posts.find(p => p.slug === slug);
  return post || null;
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
                    // Handle error state
                });
        }
    }, [slug]);

    if (isLoading) {
        return <BlogLoadingSkeleton />;
    }

    if (!post) {
        return (
             <div className="container mx-auto px-4 py-12 text-center">
                <h1 className="mb-4 text-2xl font-semibold">Post Not Found</h1>
                <p className="text-muted-foreground mb-6">We couldn't find the blog post you were looking for.</p>
                <Link href="/blog" passHref>
                    <Button variant="outline">
                        <ArrowLeftIcon className="mr-2 h-4 w-4" /> Back to Blog
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto max-w-4xl px-4 py-12">
            <article>
                {/* Back Button */}
                <Link href="/blog" passHref className="mb-6 inline-block">
                    <Button variant="outline" size="sm">
                        <ArrowLeftIcon className="mr-2 h-4 w-4" /> Back to Blog
                    </Button>
                </Link>

                {/* Post Header */}
                <header className="mb-8">
                    <h1 className="mb-4 text-3xl font-bold leading-tight md:text-4xl">{post.title}</h1>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <UserIcon className="h-4 w-4" />
                            <span>By {post.author}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <CalendarIcon className="h-4 w-4" />
                             <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                    </div>
                </header>

                {/* Featured Image */}
                <div className="relative mb-8 h-64 w-full overflow-hidden rounded-lg shadow-md md:h-96">
                     <Image
                        src={post.imageUrl}
                        alt={post.title}
                        layout="fill"
                        objectFit="cover"
                        priority
                        className="rounded-lg"
                    />
                </div>

                {/* Post Content */}
                 <div
                    className="prose prose-lg max-w-none dark:prose-invert prose-p:text-muted-foreground prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />


                 <Separator className="my-12" />

                 {/* Optional: Author Bio / Related Posts */}

            </article>
        </div>
    );
}


function BlogLoadingSkeleton() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <Skeleton className="mb-6 h-8 w-32" /> {/* Back button */}
      <header className="mb-8 space-y-4">
        <Skeleton className="h-10 w-full md:h-12" /> {/* Title */}
        <Skeleton className="h-10 w-3/4 md:h-12" /> {/* Title */}
        <div className="flex gap-4">
          <Skeleton className="h-5 w-32" /> {/* Meta */}
          <Skeleton className="h-5 w-40" /> {/* Meta */}
        </div>
      </header>
      <Skeleton className="mb-8 h-64 w-full rounded-lg md:h-96" /> {/* Image */}
      <div className="space-y-4">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-5/6" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-5 w-full" />
         <Skeleton className="h-40 w-full rounded-lg mt-6" /> {/* Image inside content */}
         <Skeleton className="h-5 w-full" />
         <Skeleton className="h-5 w-1/2" />
      </div>
    </div>
  );
}


export default function BlogPostPage() {
  // Wrap with Suspense because useParams() needs it
  return (
    <Suspense fallback={<BlogLoadingSkeleton />}>
      <BlogPostPageContent />
    </Suspense>
  );
}
