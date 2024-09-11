'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { ReactNode, useContext, useEffect, useState } from 'react';

const CurrencyContext = React.createContext<{
  currency: { isoCode: string; rate: number };
  setCurrency: React.Dispatch<
    React.SetStateAction<{ isoCode: string; rate: number }>
  >;
  allCurrencies: { isoCode: string; rate: number }[];
}>({
  currency: { isoCode: '', rate: 1 },
  setCurrency: () => {},
  allCurrencies: [{ isoCode: '', rate: 1 }],
});

export const CurrencyContextProvider = ({
  currencies,
  children,
}: {
  currencies: {};
  children: ReactNode;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [currency, setCurrency] = useState({ isoCode: 'EUR', rate: 1 });

  useEffect(() => {
    if (currency.isoCode !== 'EUR') {
      const params = new URLSearchParams(searchParams);
      params.set('currency', currency.isoCode);
      replace(`${pathname}?${params.toString()}`, { scroll: false });
    } else if (currency.isoCode === 'EUR') {
      const params = new URLSearchParams(searchParams);
      replace(`${pathname}`, { scroll: false });
    }
  }, [currency, pathname, searchParams, replace]);

  const allCurrencies = Object.entries(currencies).map((e) => ({
    isoCode: e[0].toString(),
    rate: Number(e[1]),
  }));

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, allCurrencies }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrencyContext = () => {
  const currency = useContext(CurrencyContext);
  return currency;
};
