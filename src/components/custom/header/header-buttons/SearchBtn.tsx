import React from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import HeaderBtn from './HeaderBtn';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function SearchBtn() {
  return (
    <Drawer>
      <DrawerTrigger>
        <HeaderBtn>
          <Search className="w-[18px] text-slate-700" strokeWidth={1.25} />
        </HeaderBtn>
      </DrawerTrigger>
      <DrawerContent>
        <div className="w-96 mx-auto">
          <DrawerHeader>
            <DrawerTitle className="mb-3 font-heading font-medium">
              What would you like to find today?
            </DrawerTitle>
            <Input placeholder="Search" />
          </DrawerHeader>
          <DrawerFooter>
            <Button>Search</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
