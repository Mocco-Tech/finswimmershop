import Image from 'next/image';
import React, { useState } from 'react';

export default function ImageGallery({
  images,
  productTitle,
}: {
  images: { node: { id: string; url: string } }[];
  productTitle: string;
}) {
  const [activeImage, setActiveImage] = useState(images?.[0]?.node?.url!);

  return (
    <div
      className={`flex flex-col sm:flex-row-reverse gap-3 w-full ${
        images?.length > 1 ? 'lg:w-1/2' : 'lg:w-2/5'
      }`}
    >
      <Image
        src={activeImage ? activeImage : '/no-image.webp'}
        alt={`${productTitle} main image`}
        width={800}
        height={800}
        className={`object-cover rounded-lg w-full h-fit sm:max-h-fit lg:h-fit ${
          images?.length > 1 ? 'sm:w-5/6' : 'sm:w-full'
        }`}
        priority
      />
      {images?.length! > 1 && (
        <div className="flex flex-row w-full sm:flex-col sm:w-1/5 gap-2 overflow-x-auto">
          {images?.map((image) => (
            <Image
              key={image?.node?.id}
              src={image?.node?.url!}
              alt={`${productTitle} image`}
              width={400}
              height={400}
              className="h-32 sm:h-24 lg:h-32 w-full rounded-lg object-cover cursor-pointer"
              onClick={() => setActiveImage(image?.node?.url!)}
              priority
            />
          ))}
        </div>
      )}
    </div>
  );
}
