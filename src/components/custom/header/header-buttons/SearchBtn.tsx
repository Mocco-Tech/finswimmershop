'use client';

import React, { useState } from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function SearchBtn() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');

  return (
    <Drawer>
      <DrawerTrigger aria-label="Search button">
        <Search className="w-[18px] text-slate-700" strokeWidth={1.25} />
      </DrawerTrigger>
      <DrawerContent>
        <div className="w-96 mx-auto">
          <DrawerHeader>
            <DrawerTitle className="mb-3 font-heading font-medium">
              What would you like to find today?
            </DrawerTitle>
            <Input
              placeholder="Search"
              onChange={(e) => setInputValue(e.target.value)}
            />
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button onClick={() => router.push(`/?search=${inputValue}`)}>
                Search
              </Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
