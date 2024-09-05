'use client';

import React from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
} from '@/components/ui/popover';
import { useCurrencyContext } from '@/contexts/CurrencyContext';

interface CurrencyType {
  isoCode: string;
  rate: number;
}

export default function CurrencyBtn({ className }: { className?: string }) {
  const { currency, setCurrency, allCurrencies } = useCurrencyContext();

  return (
    <div>
      <Popover>
        <PopoverTrigger
          className={buttonVariants({
            variant: 'outline',
            className: 'h-8 !py-1 !px-3',
          })}
        >
          {currency.isoCode}
        </PopoverTrigger>
        <PopoverContent className="p-1 w-fit mr-0" alignOffset={5}>
          <ul className="grid grid-cols-3 px-0">
            {allCurrencies.map((currentCurrency: CurrencyType) => (
              <li
                key={currentCurrency.isoCode}
                className="flex items-center justify-center"
              >
                <PopoverClose
                  className={buttonVariants({
                    variant: 'ghost',
                    className: `${
                      currentCurrency.isoCode === currency.isoCode
                        ? 'bg-slate-100'
                        : ''
                    }`,
                  })}
                  onClick={() =>
                    setCurrency({
                      isoCode: currentCurrency.isoCode,
                      rate: currentCurrency.rate,
                    })
                  }
                >
                  {currentCurrency.isoCode}
                </PopoverClose>
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
}
