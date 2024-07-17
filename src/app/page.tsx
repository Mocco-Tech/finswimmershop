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
      <div className="flex items-center flex-col-reverse md:flex-row gap-5">
        <div className="w-full md:flex-1">
          <div className="px-4 py-1 border border-slate-400 text-slate-600 rounded-lg w-fit mb-1 lg:mb-4">
            {bannerCategory.reference.title}
          </div>
          <div className="overflow-hidden rounded-lg h-80 md:h-96 w-full mb-4">
            <Image
              src={
                bannerImg
                  ? bannerImg.reference.image.src
                  : '/empty-category.jpg'
              }
              alt="Banner image"
              width={500}
              height={500}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <h2 className="text-slate-700 text-2xl lg:text-3xl font-heading font-light mb-1 lg:mb-2">
            {bannerTitle.value}
          </h2>
          <p className="text-slate-400 mb-1 lg:mb-2">{bannerDesc.value}</p>
          <Link
            href={'/collections/' + bannerCategory.reference.handle}
            className={buttonVariants({
              className:
                '!px-0 uppercase font-body md:!text-lg !font-normal !text-slate-600 tracking-tight',
              variant: 'link',
            })}
          >
            <ArrowRight strokeWidth={1} className="mr-1 w-5" />{' '}
            {bannerBtnTitle.value}
          </Link>
        </div>

        <div className="h-96 md:h-[650px] w-full md:w-1/2 relative rounded-xl overflow-hidden flex items-center px-4 md:px-8">
          <div className="z-10 bg-black/40 w-full h-96 md:h-[650px] absolute top-0 left-0"></div>
          <Image
            src="/empty-category.jpg"
            alt="Home page banner image"
            width={1000}
            height={1000}
            priority
            className="absolute w-full h-full object-cover top-0 left-0 z-0"
          />

          <div className="z-10 text-slate-50 flex flex-col gap-3 items-start">
            <h2 className="font-heading text-xl lg:text-4xl font-medium">
              Welcome to Finswimmershop
            </h2>
            <p className="text-slate-100">
              Your premier destination for high-quality underwater sports
              equipment. At Finswimmershop.com, we specialize in selling a wide
              range of fins, masks, snorkels, wetsuits and other accessories
              from the world&apos;s leading manufacturers. Our mission is to
              make professional equipment accessible and easy to buy, ensuring
              that you have everything you need to succeed in your underwater
              adventures.
            </p>
            {/* <Link
              href="/"
              className={buttonVariants({
                variant: 'link',
                className:
                  '!p-0 h-fit !text-slate-50 uppercase !flex !flex-wrap !whitespace-normal',
              })}
            >
              Not a member? Sign up for Finswimmershop!
            </Link>
            <Link
              href="/"
              className={buttonVariants({
                variant: 'link',
                className: '!p-0 h-fit !text-slate-50 uppercase',
              })}
            >
              Sign in
            </Link> */}
          </div>
        </div>
      </div>

      <CollectionsGrid collections={homepageCollections} />

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
    </section>
  );
}

export const metadata: Metadata = {
  title: 'Finswimmer Shop | Finswimming, Freediving & UW Sports Gear',
  description:
    "Finswimming, Freeidivng and UW Sports gear from the world's leading manufacturers at best prices. Shop now - we ship worldwide.",

  metadataBase: new URL('https://www.finswimmershop.com'),
  openGraph: {
    title: `Finswimmer Shop | Finswimming, Freediving & UW Sports Gear`,
    description:
      "Finswimming, Freeidivng and UW Sports gear from the world's leading manufacturers at best prices. Shop now - we ship worldwide.",
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
