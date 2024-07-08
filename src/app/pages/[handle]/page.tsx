import React from 'react';

import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { getPage } from '@/shopify/queries/getPage';
import { getMenu } from '@/shopify/queries/getMenu';
import PageContent from '@/components/custom/pages/PageContent';
import Link from 'next/link';
import { cutMenuLink, cutPagesMenuLink } from '@/lib/helpers';
import { MenuType } from '@/types/MenuType';
import { notFound } from 'next/navigation';

export const revalidate = 3600;

export default async function PagesPage({ params }: { params: Params }) {
  const props = await getPage(params.handle);
  const footerMenu = await getMenu('footer');

  if (!props?.data?.pageByHandle) {
    notFound();
  }

  return (
    <div className="px-4 py-6 lg:p-10">
      <h2 className="text-center mb-6 lg:mb-16 text-2xl font-heading text-slate-800 uppercase tracking-wide">
        Information for customers
      </h2>
      <div className="flex flex-wrap">
        <aside className="h-96 border-r border-slate-100 w-full md:w-1/5 md:p-4 pt-0">
          <ul className="">
            {footerMenu.data.menu.items.map((menuItem: MenuType) => (
              <li key={menuItem.id}>
                <Link
                  href={cutMenuLink(menuItem.url)}
                  className={`block peer hover:bg-slate-100 text-slate-600 px-4 py-3 duration-150 ${
                    cutPagesMenuLink(menuItem.url) === params.handle
                      ? 'bg-slate-100'
                      : 'bg-white'
                  }`}
                >
                  {menuItem.title}
                </Link>
                <div className="h-[1px] bg-slate-100 peer-hover:bg-slate-300 duration-150"></div>
              </li>
            ))}
          </ul>
        </aside>
        <main className="flex-1 md:px-6">
          <h1 className="text-slate-700 font-heading text-2xl mb-4">
            {props.data.pageByHandle.title}
          </h1>
          <PageContent
            rawHtmlContent={props.data.pageByHandle.body.toString()}
          />
        </main>
      </div>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { handle: string };
}) {
  const props = await getPage(params.handle);
  const pageSeo = props?.data?.pageByHandle;
  const seoTitle = pageSeo?.seo.title
    ? pageSeo?.seo.title
    : props?.data?.pageByHandle.title;
  const seoDescription = pageSeo?.seo.description
    ? pageSeo?.seo.description
    : props?.data?.pageByHandle.bodySummary;

  return {
    title: `Finswimmer Shop | ${seoTitle}`,
    description: seoDescription,

    metadataBase: new URL('https://www.finswimmershop.com'),
    openGraph: {
      title: `Finswimmer Shop | ${seoTitle}`,
      description: seoDescription,
      url: `https://www.finswimmershop.com/pages/${params?.handle}`,
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
}
