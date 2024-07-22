import Link from 'next/link';
import React from 'react';
import Logo from '../Logo';
import { MenuType } from '@/types/MenuType';
import { cutPagesMenuLink } from '@/lib/helpers';

export default function FooterTop({ footerMenu }: { footerMenu: MenuType }) {
  return (
    <div className="bg-slate-50 px-6 py-8 rounded-t-lg">
      <Logo />
      <p className="block text-slate-400 my-4">
        71-75 Shelton street, Covent Garden, WC2H9JQ, London, United Kingdom
      </p>

      <div className="flex justify-between flex-wrap flex-col sm:flex-row gap-5">
        <ul className="flex flex-wrap flex-col sm:flex-row gap-5 itemx-start sm:items-center ">
          {footerMenu.items.map((menuItem) => (
            <li key={menuItem.id}>
              <Link
                href={cutPagesMenuLink(menuItem.url)}
                className="underline text-slate-700 font-light"
              >
                {menuItem.title}
              </Link>
            </li>
          ))}
        </ul>
        <a
          href="mailto:office@finswimmershop"
          className="text-slate-400 hover:underline hover:text-slate-700 duration-150"
        >
          office@finswimmershop.com
        </a>
      </div>
    </div>
  );
}
