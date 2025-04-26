/**
 * Represents a customer review for a product.
 */
export interface Review {
  /**
   * The unique identifier of the review.
   */
  id: string;
  /**
   * The ID of the product being reviewed.
   */
  productId: string;
  /**
   * The name of the reviewer.
   */
  reviewerName: string;
  /**
   * The rating given by the reviewer (e.g., 1 to 5 stars).
   */
  rating: number;
  /**
   * The comment or text of the review.
   */
  comment: string;
  /**
   * URL of the reviewer's image of their dog wearing the product.
   */
  photoUrl?: string;
  /**
   * Date the review was submitted.
   */
  date?: string; // Optional: Add date
}

// Mock database for reviews
let MOCK_REVIEWS: Review[] = [
    {
      id: 'rev-1-1',
      productId: '1', // Classic Striped Sweater
      reviewerName: 'Buddy Owner',
      rating: 5,
      comment: 'My Corgi looks absolutely adorable in this sweater! It\'s soft, fits well, and keeps him warm on our morning walks. Great quality!',
      photoUrl: 'https://picsum.photos/seed/review1/200/200', // Placeholder
      date: '2024-10-22',
    },
    {
      id: 'rev-1-2',
      productId: '1', // Classic Striped Sweater
      reviewerName: 'Bella\'s Mom',
      rating: 4,
      comment: 'Very cute sweater, the blue color is lovely. A little snug around the chest for my Frenchie, maybe size up if your dog is broad.',
      date: '2024-10-18',
    },
    {
      id: 'rev-2-1',
      productId: '2', // Waterproof Yellow Raincoat
      reviewerName: 'Max Adventures',
      rating: 5,
      comment: 'Finally, a raincoat that actually keeps Max dry! The hood is a great feature, and the yellow makes him easy to spot. Highly recommend!',
      photoUrl: 'https://picsum.photos/seed/review2/200/200', // Placeholder
      date: '2024-10-25',
    },
     {
      id: 'rev-3-1',
      productId: '3', // Cozy Fleece Hoodie
      reviewerName: 'Luna Loves Comfort',
      rating: 5,
      comment: 'This hoodie is SO soft! Luna practically lives in it now. Washes well too.',
      date: '2024-10-12',
    },
     {
      id: 'rev-4-1',
      productId: '4', // Bowtie Collar
      reviewerName: 'Sir Reginald',
      rating: 4,
      comment: 'Makes my little gentleman look very distinguished for special occasions. The bowtie is easy to attach/detach.',
       photoUrl: 'https://picsum.photos/seed/review4/200/200', // Placeholder
      date: '2024-09-30',
    },
];


/**
 * Retrieves a list of reviews for a specific product.
 *
 * @param productId The ID of the product to retrieve reviews for.
 * @returns A promise that resolves to an array of Review objects.
 */
export async function getReviews(productId: string): Promise<Review[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));

  return MOCK_REVIEWS.filter(review => review.productId === productId).sort((a, b) => new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime()); // Sort newest first if date exists
}

/**
 * Submits a new review for a product.
 *
 * @param productId The ID of the product being reviewed.
 * @param review The review data to submit (without id and date).
 * @returns A promise that resolves to the newly created Review object.
 */
export async function submitReview(productId: string, review: Omit<Review, 'id' | 'date' | 'productId'>): Promise<Review> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));

    const newReview: Review = {
        id: `rev-${productId}-${Date.now()}`, // More unique mock ID
        productId: productId,
        ...review,
        date: new Date().toISOString().split('T')[0], // Add current date
    };

    // Add to our mock database
    MOCK_REVIEWS.unshift(newReview); // Add to the beginning of the array

    console.log("Submitted Review:", newReview);
    console.log("Updated Mock Reviews:", MOCK_REVIEWS);

    return newReview;
}

/**
 * Retrieves all reviews (for testimonials page, potentially paginated in real app).
 *
 * @returns A promise that resolves to an array of all Review objects.
 */
export async function getAllReviews(): Promise<Review[]> {
   // Simulate API delay
   await new Promise(resolve => setTimeout(resolve, 500));
   // Return a copy sorted by date
   return [...MOCK_REVIEWS].sort((a, b) => new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime());
}
