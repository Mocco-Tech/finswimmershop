import { getAllCollections } from '@/shopify/queries/getAllCollections';
import { getProducts } from '@/shopify/queries/getProducts';
import {
  Collection,
  Product,
} from '@shopify/hydrogen-react/storefront-api-types';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();
  const collections = await getAllCollections();

  const URL = 'https://finswimmershop.com';

  const restUrls = [
    {
      url: `${URL}/`, // Home Page
      lastModified: new Date(),
      priority: 1.0,
      changeFrequency: 'weekly',
    },
    {
      url: `${URL}/products`, // Projects Page
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: 'weekly',
    },
    {
      url: `${URL}/page/about-us`, // About Page
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: 'weekly',
    },
    {
      url: `${URL}/page/contact-us`, // Contact Page
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: 'weekly',
    },
    {
      url: `${URL}/page/shipping`, // Contact Page
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: 'weekly',
    },
    {
      url: `${URL}/page/terms-conditions`, // Contact Page
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: 'weekly',
    },
    {
      url: `${URL}/page/payments`, // Contact Page
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: 'weekly',
    },
    {
      url: `${URL}/page/return-and-exchange`, // Contact Page
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: 'weekly',
    },
    {
      url: `${URL}/page/privacy-policy`, // Contact Page
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: 'weekly',
    },
  ];

  const allProducts = products.data.products.edges.map(
    (product: Product, date: Date) => {
      return {
        // @ts-ignore
        url: `${URL}/product/${product.node.handle}`,
        lastModified: new Date(date),
        priority: 0.64,
        changeFrequency: 'daily',
      };
    }
  );

  const allCollections = collections.data.collections.edges.map(
    (collection: Collection, date: Date) => {
      return {
        // @ts-ignore
        url: `${URL}/collections/${collection.node.handle}`,
        lastModified: new Date(date),
        priority: 0.64,
        changeFrequency: 'daily',
      };
    }
  );

  return [...restUrls, ...allProducts, ...allCollections];
}
