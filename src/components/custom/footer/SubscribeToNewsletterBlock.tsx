'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export const SubscribeToNewsletterBlock = ({
  submit,
}: {
  submit: (formdata: FormData) => Promise<void>;
}) => {
  const [emailInput, setEmailInput] = useState('');

  return (
    <div className="px-4 mt-10 bg-slate-50/50 rounded-t-lg flex flex-col items-center justify-center py-12">
      <h3 className="text-2xl font-medium font-heading text-slate-800 mb-6">
        Get the latest deals and news
      </h3>
      <form
        className="flex flex-col md:flex-row gap-2 max-w-[550px] w-full"
        action={submit}
        onSubmit={() => {
          toast.success("You've been successfully subscribed.");
          setEmailInput('');
        }}
      >
        <Input
          placeholder="Email"
          type="email"
          name="email"
          id="email"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
        />
        <Button>Subscribe</Button>
      </form>
    </div>
  );
};
