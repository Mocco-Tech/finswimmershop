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
    <div className="flex flex-wrap gap-3 self-start h-full w-full lg:w-1/2">
      <Image
        src={activeImage ? activeImage : '/no-image.webp'}
        alt={`${productTitle} main image`}
        width={800}
        height={800}
        className="h-80 sm:h-96 md:h-80 lg:h-[525px] object-cover rounded-lg w-full"
        priority
      />
      {images?.length! > 1 && (
        <div className="flex overflow-x-auto md:grid-cols-5 gap-3 h-2/6 w-full">
          {images?.map((image) => (
            <Image
              key={image?.node?.id}
              src={image?.node?.url!}
              alt={`${productTitle} image`}
              width={400}
              height={400}
              className="w-1/3 sm:w-1/4 lg:w-1/5 flex-shrink-0 rounded-lg object-cover cursor-pointer"
              onClick={() => setActiveImage(image?.node?.url!)}
              priority
            />
          ))}
        </div>
      )}
    </div>
  );
}
