import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function CollectionCard({
  imageSrc,
  title,
  handle,
  className,
}: {
  imageSrc: string;
  title: string;
  handle: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'h-[400px] rounded-xl overflow-hidden relative p-6 flex items-end',
        className
      )}
    >
      <div className="h-[400px] w-full absolute top-0 left-0 bg-black/30 z-10"></div>
      <Image
        src={imageSrc}
        alt={title}
        width={1500}
        height={500}
        className="h-[400px] absolute top-0 left-0 object-cover"
      />
      <div className="z-20 block relative">
        <h3 className="font-heading text-2xl font-medium text-slate-50 mb-2">
          {title}
        </h3>
        <Link
          href={`/collections/${handle}`}
          className="uppercase text-slate-100 font-light underline flex items-center gap-1"
        >
          <ArrowRight strokeWidth={1} />
          Shop now
        </Link>
      </div>
    </div>
  );
}
