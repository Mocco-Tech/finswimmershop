import React from 'react';
import FooterTop from './FooterTop';
import FooterBottom from './FooterBottom';
import { MenuType } from '@/types/MenuType';

export default function Footer({
  policyMenu,
  helpAndSupportMenu,
}: {
  policyMenu: MenuType;
  helpAndSupportMenu: MenuType;
}) {
  return (
    <footer className="px-2 md:px-4 mb-4">
      <FooterTop
        policyMenu={policyMenu}
        helpAndSupportMenu={helpAndSupportMenu}
      />
      <FooterBottom />
    </footer>
  );
}
