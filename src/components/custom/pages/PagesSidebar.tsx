import { cutPagesMenuLink } from '@/lib/helpers';
import { MenuType } from '@/types/MenuType';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import Link from 'next/link';
import React from 'react';

export default function PagesSidebar({
  menu,
  params,
}: {
  menu: MenuType[];
  params: Params;
}) {
  return (
    <aside className="md:border-r border-slate-100 w-full md:w-1/5 md:p-4 pt-0">
      <ul className="flex flex-col gap-1">
        {menu.map((menuItem: MenuType) => (
          <li key={menuItem.id}>
            <Link
              href={cutPagesMenuLink(menuItem.url)}
              className={`block peer px-4 py-3 duration-150 rounded-md ${
                cutPagesMenuLink(menuItem.url) === `/page/${params.handle}`
                  ? 'bg-slate-800 text-slate-50'
                  : 'bg-white hover:bg-slate-200/80'
              }`}
            >
              {menuItem.title}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="/page/faq"
            className={`block peer px-4 py-3 duration-150 rounded-md ${
              Object.keys.length === params.handle
                ? 'bg-slate-800 text-slate-50'
                : 'bg-white hover:bg-slate-200/80'
            }`}
          >
            FAQ
          </Link>
        </li>
      </ul>
    </aside>
  );
}
