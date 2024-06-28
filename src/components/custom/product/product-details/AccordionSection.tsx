import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function AccordionSection({
  description,
  deliveryTime,
  manufacturingTime,
}: {
  description: string;
  deliveryTime: string;
  manufacturingTime: string;
}) {
  return (
    <Accordion type="multiple" defaultValue={['item-1']}>
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-slate-500/80">
          Description
        </AccordionTrigger>
        <AccordionContent className="text-slate-400">
          {description}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="text-slate-500/80">
          Manufacturing time and Delivery
        </AccordionTrigger>
        <AccordionContent className="text-slate-400">
          {deliveryTime ? (
            <p>
              Estimated delivery time for this product is{' '}
              <span className="underline text-slate-700">
                {deliveryTime} days
              </span>
            </p>
          ) : (
            <p>
              Sorry, but the delivery time of this product is&apos;t available
              right now
            </p>
          )}
          {manufacturingTime ? (
            <p>
              Estimated manufacturing time for this product is{' '}
              <span className="underline text-slate-700">
                {manufacturingTime} days
              </span>
            </p>
          ) : (
            <p>
              Sorry, but the manufacturing time of this product is&apos;t
              available right now
            </p>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
