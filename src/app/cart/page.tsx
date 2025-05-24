
'use client'; // Needed for potential client-side cart logic

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingCartIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Mock cart items - replace with actual cart state management (Context, Zustand, Redux, etc.)
const initialCartItems = [
  {
    id: 'cart-item-1',
    productId: '1',
    name: 'Striped Sweater',
    price: 29.99,
    quantity: 1,
    size: 'M',
    color: 'Blue',
    imageUrl: 'https://placehold.co/100x100.png', // Updated
  },
  {
    id: 'cart-item-2',
    productId: '2',
    name: 'Raincoat',
    price: 39.99,
    quantity: 1,
    size: 'L',
    color: 'Yellow',
    imageUrl: 'https://placehold.co/100x100.png', // Updated
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems); // Placeholder state

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems(items => items.filter(item => item.id !== itemId));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = cartItems.length > 0 ? 5.00 : 0; // Example shipping cost
  const total = subtotal + shippingCost;

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-8">
        <h1 className="flex items-center gap-3 text-3xl font-bold md:text-4xl">
          <ShoppingCartIcon className="h-8 w-8 text-primary" /> Your Shopping Cart
        </h1>
      </section>

      {cartItems.length === 0 ? (
        <Card className="text-center">
          <CardHeader>
            <CardTitle>Your cart is empty!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">Looks like you haven't added any pawsome outfits yet.</p>
            <Link href="/shop" passHref>
              <Button>Start Shopping</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Cart Items List */}
          <div className="space-y-6 lg:col-span-2">
            {cartItems.map((item) => (
              <Card key={item.id} className="flex flex-col overflow-hidden sm:flex-row">
                <div className="relative h-32 w-full flex-shrink-0 sm:h-auto sm:w-32">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="sm:rounded-l-lg"
                    sizes="100px"
                    data-ai-hint="cart item" // Added hint
                  />
                </div>
                <div className="flex flex-grow flex-col justify-between p-4">
                  <div>
                    <Link href={`/product/${item.productId}`} className="text-lg font-semibold hover:text-primary">
                      {item.name}
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      Size: {item.size} / Color: {item.color}
                    </p>
                    <p className="mt-2 text-lg font-medium text-primary">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between sm:mt-0">
                    <div className="flex items-center gap-2">
                      <label htmlFor={`quantity-${item.id}`} className="sr-only">Quantity</label>
                      <Button
                        variant="outline" size="icon" className="h-8 w-8"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                      > - </Button>
                       <input
                         id={`quantity-${item.id}`}
                         type="number"
                         min="1"
                         value={item.quantity}
                         onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                         className="h-8 w-12 rounded-md border border-input bg-background px-2 text-center text-sm"
                         aria-label="Item quantity"
                        />
                      <Button
                        variant="outline" size="icon" className="h-8 w-8"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                         aria-label="Increase quantity"
                      > + </Button>
                    </div>
                    <Button
                      variant="ghost" size="icon"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => handleRemoveItem(item.id)}
                      aria-label="Remove item"
                    >
                      <Trash2Icon className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20"> {/* Sticky summary */}
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>${shippingCost.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  Proceed to Checkout
                </Button>
                <Link href="/shop" passHref>
                   <Button variant="outline" className="w-full">
                     Continue Shopping
                   </Button>
                 </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
