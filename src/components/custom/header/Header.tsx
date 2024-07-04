import React from 'react';

import HeaderNav from './navigation/HeaderNav';
import { MenuType } from '@/types/MenuType';
import Logo from '../Logo';
import HeaderButtons from './header-buttons/HeaderButtons';
import { LanguageType } from '@/types/LanguageType';

export default function Header({
  collections,
  menu,
  languages,
  currentLanguage,
}: {
  collections: MenuType;
  menu: MenuType;
  languages: LanguageType[];
  currentLanguage: LanguageType;
}) {
  return (
    <header className="h-16 px-2 lg:px-8 border-b flex items-center gap-6 w-full sticky top-0 z-20 bg-white">
      <HeaderNav collections={collections} menu={menu} />

      <div className="lg:flex-1 flex justify-between gap-3 items-center w-full">
        <Logo />

        <HeaderButtons
          languages={languages}
          currentLanguage={currentLanguage}
        />
      </div>
    </header>
  );
}
