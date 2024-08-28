import ProductCard from '@/components/custom/collection/ProductCard';
import CollectionsGrid from '@/components/custom/homepage/CollectionsGrid';
import { buttonVariants } from '@/components/ui/button';
import { getCollection } from '@/shopify/queries/getCollection';
import { getHomepageCollections } from '@/shopify/queries/getHomepageCollections';
import { getPage } from '@/shopify/queries/getPage';
import { getSearchProducts } from '@/shopify/queries/getSearchProducts';
import { ProductType } from '@/types/ProductType';
import { ArrowRight } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const revalidate = 3600;

export default async function Home({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const props = await getPage('home');
  const collectionProps = await getCollection('frontpage');
  const homepageCollections = await getHomepageCollections();
  const bannerFields = props.data.pageByHandle.metafield.reference.fields;
  const [bannerBtnTitle, bannerCategory, bannerDesc, bannerImg, bannerTitle] =
    bannerFields;

  if (searchParams.search) {
    const products = await getSearchProducts(searchParams.search);

    return (
      <div className="p-3 md:px-10 md:py-8">
        <h1 className="mb-10 text-slate-500 text-lg">
          Here are some results of your search:{' '}
          <span className="font-medium text-slate-700">
            {searchParams.search}
          </span>
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-5">
          {products.data.search.edges.map((product: { node: ProductType }) =>
            Object.keys(product.node).length > 0 ? (
              <ProductCard
                key={product.node?.id}
                imageFirst={product.node?.images?.edges?.[0]?.node.url}
                imageSecond={product.node?.images?.edges?.[1]?.node?.url}
                link={product.node?.handle}
                price={product.node?.priceRange?.minVariantPrice}
                title={product.node?.title}
              />
            ) : null
          )}
        </div>
      </div>
    );
  }

  return (
    <section className="p-4 md:p-5">
      <div className="h-96 py-6 md:h-[650px] w-full relative rounded-xl overflow-hidden flex items-center px-4 md:px-8">
        <div className="z-10 bg-black/55 w-full h-96 md:h-[650px] absolute top-0 left-0"></div>
        <Image
          src="/empty-category.jpg"
          alt="Home page banner image"
          width={1000}
          height={1000}
          priority
          className="absolute w-full h-full object-cover top-0 left-0 z-0"
        />

        <div className="z-10 text-slate-50 flex flex-col gap-3 md:items-center md:text-center w-full">
          <h2 className="font-heading text-xl lg:text-4xl font-medium">
            Welcome to Finswimmer Shop
          </h2>
          <p className="text-slate-50 md:text-lg block md:max-w-[50vw]">
            Your premier destination for high-quality{' '}
            <strong>underwater sports equipment</strong>. Our mission is to make
            professional equipment <strong>accessible</strong> and{' '}
            <strong>easy to buy</strong>.
          </p>
          <Link
            href=""
            className={buttonVariants({
              className: 'mt-4 !bg-slate-50 !text-slate-800 md:w-64',
              variant: 'default',
            })}
          >
            Shop now
          </Link>
        </div>
      </div>

      <div className="py-10">
        <h3 className="text-slate-700 font-heading text-3xl mb-5">
          New arrivals
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {collectionProps.data.collectionByHandle.products.edges.map(
            (product: { node: ProductType }) => (
              <ProductCard
                key={product.node?.id}
                imageFirst={product.node?.images?.edges?.[0]?.node.url}
                imageSecond={product.node?.images?.edges?.[1]?.node?.url}
                link={product.node?.handle}
                price={product.node?.priceRange.minVariantPrice}
                title={product.node?.title}
              />
            )
          )}
        </div>
      </div>

      <CollectionsGrid collections={homepageCollections} />
    </section>
  );
}

export const metadata: Metadata = {
  title: 'Finswimmer Shop - buy underwater sports equipment',
  description:
    "Finswimming, Freedivng and UW Sports gears from the world's leading manufacturers at best prices. Shop now - we ship worldwide.",

  metadataBase: new URL('https://www.finswimmershop.com'),
  openGraph: {
    title: `Finswimmer Shop - buy underwater sports equipment`,
    description:
      "Finswimming, Freedivng and UW Sports gear from the world's leading manufacturers at best prices. Shop now - we ship worldwide.",
    url: `https://finswimmershop.com`,
    siteName: 'Finswimmer Shop',
    images: [
      {
        url: '/empty-category.jpg',
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};
