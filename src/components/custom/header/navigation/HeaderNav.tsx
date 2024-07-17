import React from 'react';
import Link from 'next/link';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import NavItemHasChild from './NavItemHasChild';
import NavItem from './NavItem';
import { cutMenuLink, cutPagesMenuLink } from '@/lib/helpers';
import { MenuType } from '@/types/MenuType';

export default function HeaderNav({
  collections,
  menu,
}: {
  collections: MenuType;
  menu: MenuType;
}) {
  return (
    <nav className="hidden lg:block">
      <ul className="flex items-center bg-white">
        <li>
          <Link
            href="/"
            className="border-r h-16 flex items-center md:px-4 lg:px-8 cursor-pointer text-slate-600 font-heading tracking-wide border-b-4 border-b-white hover:border-b-slate-700 hover:text-slate-700 duration-150"
          >
            Home
          </Link>
        </li>

        <li>
          <TooltipProvider delayDuration={50}>
            <Tooltip>
              <TooltipTrigger>
                <span className="border-r h-16 flex items-center md:px-4 lg:px-8 cursor-pointer text-slate-600 font-heading tracking-wide border-b-4 border-b-white hover:border-b-slate-700 hover:text-slate-700 duration-150">
                  Product categories
                </span>
              </TooltipTrigger>
              <TooltipContent className="p-0 min-w-52">
                <ul>
                  {collections.items.map((menuItem) => {
                    return menuItem.items.length > 0 ? (
                      <li key={menuItem.id}>
                        <NavItemHasChild
                          link={cutMenuLink(menuItem.url)}
                          items={menuItem.items}
                        >
                          {menuItem.title}
                        </NavItemHasChild>
                      </li>
                    ) : (
                      <li key={menuItem.id}>
                        <NavItem link={cutMenuLink(menuItem.url)}>
                          {menuItem.title}
                        </NavItem>
                      </li>
                    );
                  })}
                </ul>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>

        <li>
          <TooltipProvider delayDuration={50}>
            <Tooltip>
              <TooltipTrigger>
                <span className="border-r h-16 flex items-center md:px-4 lg:px-8 cursor-pointer text-slate-600 font-heading tracking-wide border-b-4 border-b-white hover:border-b-slate-700 hover:text-slate-700 duration-150">
                  For customers
                </span>
              </TooltipTrigger>
              <TooltipContent className="p-0 min-w-52">
                <ul>
                  {menu.items.map((menuItem) =>
                    menuItem.items.length > 0 ? (
                      <li key={menuItem.id}>
                        <NavItemHasChild
                          link={cutPagesMenuLink(menuItem.url)}
                          items={menuItem.items}
                        >
                          {menuItem.title}
                        </NavItemHasChild>
                      </li>
                    ) : (
                      <li key={menuItem.id}>
                        <NavItem link={cutPagesMenuLink(menuItem.url)}>
                          {menuItem.title}
                        </NavItem>
                      </li>
                    )
                  )}
                </ul>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>
      </ul>
    </nav>
  );
}
