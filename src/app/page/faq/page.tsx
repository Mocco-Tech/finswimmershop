import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import PagesSidebar from '@/components/custom/pages/PagesSidebar';
import { getMenu } from '@/shopify/queries/getMenu';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

const faqs = [
  {
    question: 'How to make an order?',
    answer: `Find the product you're interested in. Click on it and select the needed specifications (size, colour, stiffness, etc.). Click on the 'Add to cart' button. After that, your items will be added to the cart. In the top right corner, you will see the cart icon. Select it and navigate to the 'Checkout page' using the 'Checkout securely' button. After that, fill in your name, email, and address, select the payment method, and pay securely. You will receive an email confirmation within 5 minutes. Congratulations! You just made you order on Finswimmer Shop`,
  },
  {
    question: 'How long does it take to manufacture the fins/monofins?',
    answer: `The production time varies from fin to fin and depends on the manufacturer's workload. The usual waiting time for custom-made fins and monofins is not less than 14-25 business days. Please note, that the production time written on the product page is just an estimate, not guaranteed.`,
  },
  {
    question: 'How long does it take for the package to arrive ?',
    answer: `In most cases, orders are processed within 1-3 business days. The estimated shipping time varies based on your location: 10-16 days to the United States, 10-14 days within the EU, 10-16 days to Oceania and Asia, and 10-20 days to Africa and the Middle East. All orders are sent out by Priority Airmail. Please keep in mind that these are simply estimates; actual delivery times may vary depending on a variety of factors such as local customs clearance and postal service overload during peak seasons. While most snorkels, masks, noseclips, and bags are shipped within 2-3 business days, most fins and monofins require further customization or fabrication after you place your order, which can take anywhere from 2 to 21 days. We’ll keep you updated, and as soon as your order ships, we’ll send you an email with your shipment’s tracking information.`,
  },
  {
    question: 'How much does shipping cost ?',
    answer: `The cost of shipping varies based on the destination of your order and the products you order. The price is computed automatically based on the weight of the items in the “Cart.” Please add the desired product(s) to your shopping basket to get an accurate delivery cost. To see the quote, go to the shopping cart page and pick the destination country and ZIP code. 
However, the approximate shipping price varies based on your location: 10-120€ to the United States, 8-100€ within the EU, 12-150€ to Oceania and Asia, and 12-130€ to Africa and the Middle East. `,
  },

  {
    question: 'Where can I track my package ?',
    answer:
      'We will send you an email message with tracking information once your product has shipped. Simply enter the tracking number that we issued you through email to track your cargo and view its current status. Aftership is the best website for tracking packages. We have no control over the package once it has been dispatched or has left its country of origin. If you need more information on your package, you may trace it online or call your local post office to inquire about it.',
  },

  {
    question: 'What should I do if the item arrived in different colour?',
    answer: `We don't always have all of the colours in stock due to great demand. If the colour you choose is out of stock, we'll send the closest match. This mostly applies to masks and, in rare instances, bags and rubber fins.`,
  },
  {
    question: 'How to make a return?',
    answer:
      'Because all of our products are built to order and not sold on a trial basis, they are non-returnable. An order can only be cancelled and refunded in full within the first 24 hours after it is placed. Please contact our customer service staff to begin the refund process.',
  },
];

export default async function Faq({ params }: { params: Params }) {
  const footerMenu = await getMenu('footer');

  return (
    <section className="px-4 py-6 lg:p-10">
      <h2 className="md:text-center mb-6 lg:mb-16 text-xl md:text-2xl font-heading text-slate-800 uppercase tracking-wide">
        Information for customers
      </h2>

      <div className="flex flex-col-reverse gap-5 md:flex-row md:gap-0 flex-wrap">
        <PagesSidebar menu={footerMenu.data.menu.items} params={params} />
        <main className="flex-1 md:px-6">
          <h1 className="text-slate-800 font-heading text-2xl mb-8">
            Frequently asked questions
          </h1>

          <div className="flex flex-col justify-start gap-3">
            <Accordion type="single" collapsible>
              {faqs.map((faq, index) => (
                <AccordionItem value={`item-${index}`} key={faq.question}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-slate-600 font-body">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </main>
      </div>
    </section>
  );
}

export async function generateMetadata() {
  return {
    title: `Finswimmer Shop | FAQ`,
    description:
      'Welcome to the Frequently Asked Questions page of Finswimmer Shop',

    metadataBase: new URL('https://www.finswimmershop.com'),
    openGraph: {
      title: `Finswimmer Shop | FAQ`,
      description:
        'Welcome to the Frequently Asked Questions page of Finswimmer Shop',
      url: `https://www.finswimmershop.com/page/faq`,
      siteName: 'Finswimmer Shop',
      images: [
        {
          url: '/empty-category.jpg',
          width: 800,
          height: 600,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
  };
}
