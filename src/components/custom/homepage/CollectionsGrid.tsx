import React from 'react';
import CollectionCard from './CollectionCard';

export default function CollectionsGrid({ collections }: { collections: any }) {
  return (
    <div className="grid grid-cols-3 w-full gap-5 my-10">
      <CollectionCard
        title={collections.data.freedivingFins.title}
        handle={collections.data.freedivingFins.handle}
        imageSrc={collections.data.freedivingFins.image.src}
        className="col-span-3"
      />
      <CollectionCard
        title={collections.data.uwRugbyFins.title}
        handle={collections.data.uwRugbyFins.handle}
        imageSrc={collections.data.uwRugbyFins.image.src}
      />
      <CollectionCard
        title={collections.data.lifesavingFins.title}
        handle={collections.data.lifesavingFins.handle}
        imageSrc={collections.data.lifesavingFins.image.src}
      />
      <CollectionCard
        title={collections.data.uwHockeyFins.title}
        handle={collections.data.uwHockeyFins.handle}
        imageSrc={collections.data.uwHockeyFins.image.src}
      />
      <CollectionCard
        title={collections.data.monofins.title}
        handle={collections.data.monofins.handle}
        imageSrc={collections.data.monofins.image.src}
        className="col-span-3"
      />
    </div>
  );
}
