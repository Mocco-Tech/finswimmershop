import type { Metadata } from 'next';
import { Jost, Montserrat } from 'next/font/google';
import './globals.css';
import CartDataProvider from '@/components/custom/cart/CartDataProvider';
import ShopifyDataProvider from '@/components/custom/ShopifyDataProvider';
import Header from '@/components/custom/header/Header';
import { Toaster } from '@/components/ui/sonner';
import NextTopLoader from 'nextjs-toploader';
import Footer from '@/components/custom/footer/Footer';
import { getMenu } from '@/shopify/queries/getMenu';
import { getLocalizations } from '@/shopify/queries/getLocalizations';
import MobileNav from '@/components/custom/mobile/MobileNav';
import { Sheet } from '@/components/ui/sheet';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import { GoogleAnalytics } from '@next/third-parties/google';

const heading = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-heading',
});

const body = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const menu = await getMenu('main-menu');
  const collections = await getMenu('collections');
  const footerMenu = await getMenu('footer');
  const localizations = await getLocalizations();

  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-body`}>
        <SpeedInsights />
        <Analytics />
        <GoogleAnalytics gaId="G-0ZD8WTEF3W" />
        <ShopifyDataProvider>
          <CartDataProvider>
            <Sheet>
              <NextTopLoader color="#0ea5e9" showSpinner={false} />
              <Header
                collections={collections.data.menu}
                menu={menu.data.menu}
                languages={localizations.data.localization.availableLanguages}
                currentLanguage={localizations.data.localization.language}
              />
              {children}
              <Toaster
                position="top-center"
                richColors={true}
                offset={10}
                duration={3000}
              />
              <MobileNav collections={collections.data.menu} />
              <Footer footerMenu={footerMenu.data.menu} />
            </Sheet>
          </CartDataProvider>
        </ShopifyDataProvider>
      </body>
    </html>
  );
}
