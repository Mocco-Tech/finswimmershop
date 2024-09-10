import Link from 'next/link';
import React from 'react';
import Logo from '../Logo';
import { MenuType } from '@/types/MenuType';
import { cutPagesMenuLink } from '@/lib/helpers';
import Image from 'next/image';

export default function FooterTop({ footerMenu }: { footerMenu: MenuType }) {
  return (
    <div className="bg-slate-50 px-6 py-8 rounded-t-lg">
      <div className="flex flex-col-reverse md:flex-row items-start justify-between">
        <div className="flex flex-col gap-1">
          <Logo />
          <p className="block text-slate-400 my-4">
            71-75 Shelton street, Covent Garden, WC2H9JQ, London, United Kingdom
          </p>
        </div>

        <div className="mb-5 md:mb-0 border border-1 border-[#00b67a] px-3 py-2 rounded-lg">
          <a
            href="https://uk.trustpilot.com/review/finswimmershop.com"
            target="_blank"
            rel="noopener"
            className="flex items-end gap-1 text-nowrap text-slate-700"
          >
            <span className="">Rate us on</span>
            <Image
              src="/trustpilot.png"
              alt="Trustpilot badge"
              width={200}
              height={200}
              className="w-full h-6 object-cover"
            />
          </a>
        </div>
      </div>

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
