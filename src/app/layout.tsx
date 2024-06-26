import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import CartDataProvider from '@/components/custom/cart/CartDataProvider';
import ShopifyDataProvider from '@/components/custom/ShopifyDataProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ShopifyDataProvider>
          <CartDataProvider>{children}</CartDataProvider>
        </ShopifyDataProvider>
      </body>
    </html>
  );
}
