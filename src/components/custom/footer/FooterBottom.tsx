import { Code, Code2 } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

export default function FooterBottom() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="mb-14 md:mb-0 bg-slate-100 py-3 px-6 rounded-b-lg text-sm text-slate-500 flex flex-wrap flex-col sm:flex-row items-center justify-between gap-3">
      <p>© {currentYear} | All rights reserved </p>
      <div className="flex gap-3">
        <PaymentIcon icon="/stripe.png" />
        <PaymentIcon icon="/mastercard.png" />
        <PaymentIcon icon="/visa.png" />
        <PaymentIcon icon="/apple-pay.png" />
        <PaymentIcon icon="/amex.png" />
      </div>
      <p className="flex items-center gap-2">
        <Code2 className="w-4" />
        <span>
          Site by{' '}
          <a
            href="https://www.moccotech.com"
            target="_blank"
            className="hover:text-indigo-500 duration-150"
          >
            Mocco Tech
          </a>
        </span>
      </p>
    </div>
  );
}

const PaymentIcon = ({ icon }: { icon: string }) => (
  <Image
    src={icon}
    alt="payment-icon"
    width={100}
    height={100}
    className="w-10 h-8 object-cover rounded-md"
  />
);
