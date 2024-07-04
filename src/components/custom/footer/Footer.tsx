import React from 'react';
import FooterTop from './FooterTop';
import FooterBottom from './FooterBottom';
import { MenuType } from '@/types/MenuType';

export default function Footer({ footerMenu }: { footerMenu: MenuType }) {
  return (
    <footer className="px-2 md:px-4 mb-4">
      <FooterTop footerMenu={footerMenu} />
      <FooterBottom />
    </footer>
  );
}
