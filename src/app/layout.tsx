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
import { CurrencyContextProvider } from '@/contexts/CurrencyContext';
// @ts-ignore
import Freecurrencyapi from '@everapi/freecurrencyapi-js';
import { Suspense } from 'react';

const freecurrencyapi = new Freecurrencyapi(
  'fca_live_apo8r7W9kCbCHm5aH3RUjwtkh32VthWBxKk2Y6Zs'
);

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

export const revalidate = 3600;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const menu = await getMenu('main-menu');
  const collections = await getMenu('collections');
  const helpAndSupportMenu = await getMenu('help-and-support');
  const policyMenu = await getMenu('our-policy');
  const localizations = await getLocalizations();

  const { data: currencies } = await freecurrencyapi.latest({
    base_currency: 'EUR',
    currencies: [
      'USD',
      'JPY',
      'EUR',
      'CZK',
      'GBP',
      'HUF',
      'PLN',
      'SEK',
      'CHF',
      'NOK',
      'TRY',
      'AUD',
      'CAD',
      'CNY',
      'HKD',
      'KRW',
      'NZD',
      'SGD',
      'THB',
      'ZAR',
      'DKK',
    ],
  });

  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-body`}>
        <SpeedInsights />
        <Analytics />
        <GoogleAnalytics gaId="G-0ZD8WTEF3W" />
        <ShopifyDataProvider>
          <CartDataProvider>
            <Suspense>
              <CurrencyContextProvider currencies={currencies}>
                <Sheet>
                  <NextTopLoader color="#0ea5e9" showSpinner={false} />
                  <Header
                    collections={collections.data.menu}
                    menu={menu.data.menu}
                    languages={
                      localizations.data.localization.availableLanguages
                    }
                    currentLanguage={localizations.data.localization.language}
                  />
                  {children}
                  <Toaster offset={10} duration={3000} />
                  <MobileNav collections={collections.data.menu} />
                  <Footer
                    helpAndSupportMenu={helpAndSupportMenu.data.menu}
                    policyMenu={policyMenu.data.menu}
                  />
                </Sheet>
              </CurrencyContextProvider>
            </Suspense>
          </CartDataProvider>
        </ShopifyDataProvider>
      </body>
    </html>
  );
}
