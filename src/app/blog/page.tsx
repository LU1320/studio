import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarIcon, UserIcon } from 'lucide-react';

// Mock blog post data - replace with actual data fetching
const blogPosts = [
  {
    id: '1',
    title: 'Top 5 Winter Essentials for Your Dog',
    slug: 'top-5-winter-essentials',
    excerpt: 'Keep your furry friend warm and stylish during the cold months with these must-have items...',
    author: 'Jane Doe',
    date: '2024-10-26',
    imageUrl: 'https://picsum.photos/seed/winterdog/400/250',
  },
  {
    id: '2',
    title: 'How to Choose the Right Size Dog Coat',
    slug: 'choosing-dog-coat-size',
    excerpt: 'Getting the perfect fit is crucial for comfort and style. Here\'s our guide to measuring your pup correctly...',
    author: 'John Smith',
    date: '2024-10-20',
    imageUrl: 'https://picsum.photos/seed/dogmeasure/400/250',
  },
   {
    id: '3',
    title: 'Pawsome Adventures: Dressing Up for the Dog Park',
    slug: 'dog-park-fashion',
    excerpt: 'Make a statement at the park! Explore fun and functional outfits for your dog\'s social outings.',
    author: 'Alice Green',
    date: '2024-10-15',
    imageUrl: 'https://picsum.photos/seed/dogpark/400/250',
  },
  // Add more posts
];

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-primary md:text-5xl">Pawsome Blog</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Tips, trends, and tales for the modern dog parent.
        </p>
      </section>

      {/* Blog Post Grid */}
      <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Card key={post.id} className="flex h-full flex-col overflow-hidden rounded-lg shadow-sm transition-shadow hover:shadow-md">
            <CardHeader className="p-0">
              <Link href={`/blog/${post.slug}`} className="block">
                 <div className="relative h-48 w-full overflow-hidden">
                   <Image
                      src={post.imageUrl}
                      alt={post.title}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 hover:scale-105"
                    />
                 </div>
              </Link>
            </CardHeader>
            <CardContent className="flex flex-grow flex-col p-4">
              <CardTitle className="mb-2 text-xl font-semibold">
                <Link href={`/blog/${post.slug}`} className="hover:text-primary">
                  {post.title}
                </Link>
              </CardTitle>
              <div className="mb-3 flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <UserIcon className="h-3 w-3" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CalendarIcon className="h-3 w-3" />
                  <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              </div>
              <p className="mb-4 flex-grow text-sm text-muted-foreground">
                {post.excerpt}
              </p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Link href={`/blog/${post.slug}`} passHref>
                <Button variant="outline" size="sm">Read More</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </section>

      {/* TODO: Add Pagination if many posts */}
    </div>
  );
}
