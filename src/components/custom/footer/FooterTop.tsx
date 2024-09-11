import Link from 'next/link';
import React from 'react';
import Logo from '../Logo';
import { MenuType } from '@/types/MenuType';
import { cutPagesMenuLink } from '@/lib/helpers';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { SubscribeToNewsletterBlock } from './SubscribeToNewsletterBlock';
import { createCustomer } from '@/shopify/queries/createCustomer';

export default function FooterTop({
  helpAndSupportMenu,
  policyMenu,
}: {
  helpAndSupportMenu: MenuType;
  policyMenu: MenuType;
}) {
  const emailSubmit = async (formdata: FormData) => {
    'use server';

    if (formdata.get('email')) {
      const customer = await createCustomer(formdata.get('email') as string);
    }
  };

  return (
    <>
      <SubscribeToNewsletterBlock submit={emailSubmit} />
      <div className="bg-slate-50 px-6 py-8 rounded-t-lg">
        <div className="flex flex-col-reverse md:flex-row items-start justify-between">
          <div className="flex flex-col gap-1 mb-8 md:mb-0">
            <Logo />
            <CompanyDetailsBlock
              detail="Address: 71-75 Shelton street, Covent Garden, WC2H9JQ, London,
              United Kingdom"
              className="my-4"
            />
          </div>

          <TrustPilotBadge />
        </div>

        <div className="flex justify-between flex-wrap flex-col sm:flex-row gap-5">
          <div className="flex flex-col gap-3">
            <FooterMenuBlock
              menu={helpAndSupportMenu.items}
              menuTitle="Help and support:"
            />
            <FooterMenuBlock menu={policyMenu.items} menuTitle="Our policy" />
          </div>
          <div className="flex flex-col gap-3 text-left lg:text-right">
            <CompanyDetailsBlock detail="Email: office@finswimmershop.com" />
            <CompanyDetailsBlock detail="Phone: +447458148446" />
          </div>
        </div>
      </div>
    </>
  );
}

const TrustPilotBadge = () => (
  <a
    href="https://uk.trustpilot.com/review/finswimmershop.com"
    target="_blank"
    rel="noopener"
    className="mb-5 md:mb-0 flex items-end gap-1 w-fit text-slate-700 border border-1 border-[#00b67a] px-3 py-2 rounded-lg"
  >
    Rate us on
    <span>
      <Image
        src="/trustpilot.png"
        alt="Trustpilot badge"
        width={500}
        height={500}
        className="w-24 h-auto object-cover"
      />
    </span>
  </a>
);

const FooterMenuBlock = ({
  menu,
  menuTitle,
}: {
  menu: MenuType[];
  menuTitle: string;
}) => (
  <div className="flex flex-col md:flex-row gap-4 items-start md:items-center mb-8 md:mb-0">
    <h4 className="text-slate-500">{menuTitle}</h4>
    <ul className="flex flex-wrap flex-col sm:flex-row gap-5 itemx-start sm:items-center ">
      {menu.map((menuItem) => (
        <li key={menuItem.id}>
          <Link
            href={cutPagesMenuLink(menuItem.url)}
            className="underline text-slate-700 font-light"
          >
            {menuItem.title}
          </Link>
        </li>
      ))}
      {menuTitle === 'Help and support:' && (
        <>
          <li>
            <Link
              href="/page/faq"
              className="underline text-slate-700 font-light"
            >
              FAQ
            </Link>
          </li>
          <li>
            <a
              href="https://www.aftership.com/track"
              target="_blank"
              className="underline text-slate-700 font-light"
            >
              Track your order
            </a>
          </li>
        </>
      )}
    </ul>
  </div>
);

const CompanyDetailsBlock = ({
  detail,
  className,
}: {
  detail: string;
  className?: string;
}) => (
  <p className={cn('block cursor-default text-slate-500/80', className)}>
    {detail}
  </p>
);
