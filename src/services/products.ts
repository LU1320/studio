
/**
 * Represents a product in the store.
 */
export interface Product {
  /**
   * The unique identifier of the product.
   */
  id: string;
  /**
   * The name of the product.
   */
  name: string;
  /**
   * The description of the product.
   */
  description: string;
  /**
   * The price of the product.
   */
  price: number;
  /**
   * The URL of the product image.
   */
  imageUrl: string;
  /**
   * Available sizes for the product.
   */
  sizes: string[];
  /**
   * Available colors for the product.
   */
  colors: string[];
   /**
   * Optional: Category for filtering.
   */
  category?: string; // Added category
}

const ALL_PRODUCTS: Product[] = [
    {
      id: '1',
      name: 'Classic Striped Sweater',
      description: 'A cozy and timeless knit sweater for small to medium dogs. Perfect for chilly walks.',
      price: 29.99,
      imageUrl: 'https://placehold.co/400x300.png', // Updated
      sizes: ['S', 'M', 'L'],
      colors: ['Blue', 'Red', 'Gray'],
      category: 'Sweaters'
    },
    {
      id: '2',
      name: 'Waterproof Yellow Raincoat',
      description: 'Keep your pup dry during downpours with this bright yellow, hooded raincoat.',
      price: 39.99,
      imageUrl: 'https://placehold.co/400x300.png', // Updated
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Yellow'],
      category: 'Raincoats'
    },
     {
      id: '3',
      name: 'Cozy Fleece Hoodie',
      description: 'A soft fleece hoodie for ultimate comfort and warmth. Features a leash hole.',
      price: 34.50,
      imageUrl: 'https://placehold.co/400x300.png', // Updated
      sizes: ['M', 'L', 'XL'],
      colors: ['Gray', 'Pink', 'Navy'],
      category: 'Hoodies'
    },
    {
        id: '4',
        name: 'Dapper Dog Bowtie Collar',
        description: 'Add a touch of class with this adjustable collar featuring a removable bowtie.',
        price: 18.99,
        imageUrl: 'https://placehold.co/400x300.png', // Updated
        sizes: ['S', 'M', 'L'], // Collar sizes
        colors: ['Red Plaid', 'Blue Dots', 'Black'],
        category: 'Accessories'
    },
    {
        id: '5',
        name: 'Summer Fun Bandana',
        description: 'Lightweight and breathable cotton bandana for sunny days.',
        price: 12.00,
        imageUrl: 'https://placehold.co/400x300.png', // Updated
        sizes: ['One Size'],
        colors: ['Tropical', 'Nautical', 'Watermelon'],
        category: 'Accessories'
    },
    {
        id: '6',
        name: 'Reflective Safety Vest',
        description: 'Enhance visibility during nighttime walks with this bright, reflective vest.',
        price: 22.50,
        imageUrl: 'https://placehold.co/400x300.png', // Updated
        sizes: ['M', 'L', 'XL'],
        colors: ['Orange', 'Lime Green'],
        category: 'Outerwear'
    },
     {
      id: '7',
      name: 'Cable Knit Turtleneck',
      description: 'A sophisticated turtleneck sweater with a classic cable knit pattern.',
      price: 32.99,
      imageUrl: 'https://placehold.co/400x300.png', // Updated
      sizes: ['S', 'M'],
      colors: ['Cream', 'Burgundy'],
      category: 'Sweaters'
    },
     {
      id: '8',
      name: 'Lightweight Windbreaker',
      description: 'Protects against wind and light rain, perfect for breezy days.',
      price: 36.00,
      imageUrl: 'https://placehold.co/400x300.png', // Updated
      sizes: ['L', 'XL'],
      colors: ['Teal', 'Black'],
      category: 'Outerwear'
    },
     {
      id: '9',
      name: 'Party Dress with Tutu',
      description: 'An adorable dress with a sparkly bodice and tulle tutu skirt for special occasions.',
      price: 45.00,
      imageUrl: 'https://placehold.co/400x300.png', // Updated
      sizes: ['XS', 'S', 'M'],
      colors: ['Pink', 'Silver'],
      category: 'Dresses'
    },
     {
      id: '10',
      name: 'Plaid Flannel Shirt',
      description: 'A cool and casual flannel shirt, perfect for a rustic look.',
      price: 28.00,
      imageUrl: 'https://placehold.co/400x300.png', // Updated
      sizes: ['M', 'L'],
      colors: ['Red Plaid', 'Green Plaid'],
      category: 'Shirts'
    },
];


/**
 * Retrieves a list of products from the store.
 * Can be filtered by category.
 *
 * @param category Optional category to filter by.
 * @returns A promise that resolves to an array of Product objects.
 */
export async function getProducts(category?: string): Promise<Product[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  if (category) {
    return ALL_PRODUCTS.filter(product => product.category?.toLowerCase() === category.toLowerCase());
  }
  return ALL_PRODUCTS;
}

/**
 * Retrieves a specific product by its ID.
 *
 * @param id The ID of the product to retrieve.
 * @returns A promise that resolves to a Product object if found, or null if not found.
 */
export async function getProduct(id: string): Promise<Product | null> {
   // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));

  const product = ALL_PRODUCTS.find(product => product.id === id);
  return product || null;
}
