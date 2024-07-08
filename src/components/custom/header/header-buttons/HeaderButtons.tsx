import React from 'react';
import CartHeaderItem from '../cart/CartHeaderItem';
import LanguageBtn from './LanguageBtn';
import { LanguageType } from '@/types/LanguageType';
import HeaderBtn from './HeaderBtn';
import SearchBtn from './SearchBtn';

export default function HeaderButtons({
  languages,
  currentLanguage,
}: {
  languages: LanguageType[];
  currentLanguage: LanguageType;
}) {
  return (
    <div className="flex items-center gap-3">
      <SearchBtn />
      {/* <LanguageBtn
        className="hidden md:block"
        languages={languages}
        currentLanguage={currentLanguage}
      >
        <HeaderBtn className="font-heading font-medium text-slate-700">
          <span key={currentLanguage.isoCode}>{currentLanguage.isoCode}</span>
        </HeaderBtn>
      </LanguageBtn> */}
      <CartHeaderItem />
    </div>
  );
}
