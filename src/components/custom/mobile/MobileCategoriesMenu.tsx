'use client';

import React, { useState } from 'react';
import { MenuType } from '@/types/MenuType';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ChevronDown, ChevronUp, Menu } from 'lucide-react';
import Link from 'next/link';
import { cutMenuLink } from '@/lib/helpers';
import MobileNavLink from './MobileNavLink';

interface IsOpenMenu {
  id: string;
  isVisible: boolean;
}

export default function MobileCategoriesMenu({
  collections,
}: {
  collections: MenuType;
}) {
  const [isVisibleCategory, setIsVisibleCategory] = useState<IsOpenMenu>({
    id: '',
    isVisible: false,
  });
  const [isVisibleSubCategory, setIsVisibleSubCategory] = useState<IsOpenMenu>({
    id: '',
    isVisible: false,
  });

  function handleCategorySubmenu(id: string, isVisible: boolean, type: string) {
    type === 'category' && setIsVisibleCategory({ id, isVisible });
    type === 'subcategory' && setIsVisibleSubCategory({ id, isVisible });
  }

  return (
    <Sheet>
      <SheetTrigger className="w-1/4 h-full flex items-center justify-center border-r border-slate-200">
        <Menu strokeWidth={1.1} className="text-slate-700" />
      </SheetTrigger>
      <SheetContent
        side={'left'}
        className="!max-w-[30rem] w-[90%] md:w-full pt-5 h-lvh flex flex-col justify-between gap-0 px-0 pb-3"
      >
        <div className="overflow-y-scroll no-scrollbar px-4 pb-2">
          <SheetTitle className="text-center text-slate-700 mb-4">
            Categories
          </SheetTitle>
          <ul>
            {collections?.items?.map((category) => (
              <li key={category.title}>
                {category.items.length > 0 ? (
                  <>
                    <div className="flex items-center justify-between">
                      <MobileNavLink url={category.url}>
                        {category.title}
                      </MobileNavLink>

                      {isVisibleCategory.id === category.id &&
                      isVisibleCategory.isVisible ? (
                        <ChevronUp
                          strokeWidth={1}
                          className="bg-slate-50 rounded w-6 h-6 text-center text-slate-500"
                          onClick={() =>
                            handleCategorySubmenu(
                              category.id,
                              false,
                              'category'
                            )
                          }
                        />
                      ) : (
                        <ChevronDown
                          strokeWidth={1}
                          className="bg-slate-50 rounded w-6 h-6 text-center text-slate-500"
                          onClick={() =>
                            handleCategorySubmenu(category.id, true, 'category')
                          }
                        />
                      )}
                    </div>
                    {isVisibleCategory.id === category.id &&
                      isVisibleCategory.isVisible && (
                        <ul className="pl-6">
                          {category.items.map((subCategory) => (
                            <li key={subCategory.id}>
                              {subCategory.items.length > 0 ? (
                                <>
                                  <div className="flex items-center justify-between">
                                    <MobileNavLink url={subCategory.url}>
                                      {subCategory.title}
                                    </MobileNavLink>
                                    {isVisibleSubCategory.id ===
                                      subCategory.id &&
                                    isVisibleSubCategory.isVisible ? (
                                      <ChevronUp
                                        strokeWidth={1}
                                        className="bg-slate-50 rounded w-6 h-6 text-center text-slate-500"
                                        onClick={() =>
                                          handleCategorySubmenu(
                                            subCategory.id,
                                            false,
                                            'subcategory'
                                          )
                                        }
                                      />
                                    ) : (
                                      <ChevronDown
                                        strokeWidth={1}
                                        className="bg-slate-50 rounded w-6 h-6 text-center text-slate-500"
                                        onClick={() =>
                                          handleCategorySubmenu(
                                            subCategory.id,
                                            true,
                                            'subcategory'
                                          )
                                        }
                                      />
                                    )}
                                  </div>
                                  {isVisibleSubCategory.id === subCategory.id &&
                                    isVisibleSubCategory.isVisible && (
                                      <ul className="pl-6">
                                        {subCategory.items.map(
                                          (subSubCategoryItem) => (
                                            <li key={subSubCategoryItem.title}>
                                              <MobileNavLink
                                                url={subSubCategoryItem.url}
                                              >
                                                {subSubCategoryItem.title}
                                              </MobileNavLink>
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    )}
                                </>
                              ) : (
                                <MobileNavLink url={subCategory.url}>
                                  {subCategory.title}
                                </MobileNavLink>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                  </>
                ) : (
                  <MobileNavLink url={category.url}>
                    {category.title}
                  </MobileNavLink>
                )}
              </li>
            ))}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
}
