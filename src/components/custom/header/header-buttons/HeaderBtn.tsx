import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export default function HeaderBtn({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        'w-8 h-8 border border-slate-700 rounded-full flex items-center justify-center text-sm',
        className
      )}
    >
      {children}
    </div>
  );
}
