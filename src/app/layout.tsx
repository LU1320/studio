import type { Metadata } from 'next';
import { Poppins } from 'next/font/google'; // Import Poppins
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';

// Configure Poppins font
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // Include needed weights
  variable: '--font-poppins', // Define CSS variable
});

export const metadata: Metadata = {
  title: 'Pawsome Pals - Ternura Peluda', // New Title
  description: 'Productos adorables y divertidos para tu mejor amigo peludo. ¡Impresiona con ternura!', // New Description reflecting slogan
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      {/* Apply Poppins font variable to the body */}
      <body className={`${poppins.variable} font-sans antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
