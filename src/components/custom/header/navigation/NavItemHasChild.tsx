import React, { ReactNode } from 'react';
import Link from 'next/link';

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { ChevronRight } from 'lucide-react';
import { cutMenuLink } from '@/lib/helpers';

export default function NavItemHasChild({
  link,
  items,
  children,
}: {
  link: string;
  items: { id: string; title: string; url: string }[];
  children: ReactNode;
}) {
  return (
    <HoverCard openDelay={50} closeDelay={50}>
      <HoverCardTrigger asChild>
        <Link
          href={link}
          className="flex items-center justify-between px-4 py-2 hover:bg-slate-50 text-slate-700"
        >
          {children}
          <ChevronRight className="w-5 text-slate-700" strokeWidth={1.25} />
        </Link>
      </HoverCardTrigger>
      <HoverCardContent
        className="p-0"
        side="right"
        sideOffset={0}
        align="start"
      >
        <ul className="w-full">
          {items.map((childItem) => (
            <li key={childItem.title}>
              <Link
                href={cutMenuLink(childItem.url)}
                className="block px-4 py-2 hover:bg-slate-50 text-slate-700"
              >
                {childItem.title}
              </Link>
            </li>
          ))}
        </ul>
      </HoverCardContent>
    </HoverCard>
  );
}
