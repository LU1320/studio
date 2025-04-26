import { OutfitRecommender } from '@/components/products/outfit-recommender';

export default function RecommendPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-primary md:text-5xl">Find the Perfect Outfit!</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Let our AI stylist help you choose the best look for your pup based on their photo and the occasion.
        </p>
      </section>

      <section className="mx-auto max-w-2xl">
        <OutfitRecommender />
      </section>
    </div>
  );
}
