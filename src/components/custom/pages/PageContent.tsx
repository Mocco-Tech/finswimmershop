'use client';

import React from 'react';
import DOMPurify from 'isomorphic-dompurify';

export default function PageContent({
  rawHtmlContent,
}: {
  rawHtmlContent: string;
}) {
  const sanitizedHtmlContent = DOMPurify.sanitize(rawHtmlContent);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: sanitizedHtmlContent }}
      className="text-slate-500 shopify-render-text "
    ></div>
  );
}
