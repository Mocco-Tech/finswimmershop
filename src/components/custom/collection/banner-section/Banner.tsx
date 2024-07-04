import React from 'react';
import BreadCrumbs from './BreadCrumbs';

export default function Banner({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image?: string;
}) {
  return (
    <div
      className="p-2 md:px-6 py-4 bg-fixed h-72 md:h-96 flex flex-col justify-between bg-center bg-cover bg-no-repeat absolute top-0 w-full"
      style={{
        backgroundImage: `url(${image ? image : '/empty-category.jpg'})`,
      }}
    >
      <BreadCrumbs collectionTitle={title} />

      <div className="mb-8 z-10">
        <h1 className="font-heading text-3xl text-slate-50">{title}</h1>
        {description && (
          <p className="text-slate-200 font-light">{description}</p>
        )}
      </div>
      <div className="w-full h-96 bg-black/20 absolute top-0 left-0"></div>
    </div>
  );
}
