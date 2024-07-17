'use client';

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="px-4 py-12 flex items-center justify-center flex-col gap-3">
      <h2 className="text-2xl font-heading">Something went wrong!</h2>
      <Button onClick={() => reset()} className="rounded-lg bg-slate-500">
        Try again
      </Button>
      <p className="text-lg text-center text-slate-500">
        Still see the error?
        <br /> Contact us and report it please
      </p>
    </div>
  );
}
