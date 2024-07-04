import React, { ReactNode } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { LanguageType } from '@/types/LanguageType';
import Link from 'next/link';

export default function LanguageBtn({
  children,
  languages,
  className,
}: {
  children: ReactNode;
  languages: LanguageType[];
  className: string;
  currentLanguage: LanguageType;
}) {
  return (
    <Popover>
      <PopoverTrigger className={cn('', className)}>{children}</PopoverTrigger>
      <PopoverContent className="p-0 w-fit">
        <ul>
          {languages.map((language: LanguageType) => (
            <li key={language.isoCode}>
              <Link
                href={'/'}
                className={`flex items-center gap-2 px-4 py-2 hover:bg-slate-50 rounded-t border-b ${'bg-white'}`}
              >
                {language.name}
              </Link>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
