import { FeedBuilder } from "@xcommerceweb/google-merchant-feed";
import { getCollection } from "@/shopify/queries/getCollection";
import { CollectionType } from "@/types/CollectionType";

export async function GET(
  request: Request,
  { params }: { params: { handle: string } }
) {
  const collection: CollectionType = await getCollection(params.handle);
  const productsArr = collection.data.collectionByHandle.products.edges;

  const feedBuilder = new FeedBuilder();

  feedBuilder.withTitle(collection.data.collectionByHandle.title);
  feedBuilder.withLink("https://www.finswimmershop.com");
  feedBuilder.withDescription(collection.data.collectionByHandle.description);

  if (productsArr) {
    productsArr.map((product) => {
      feedBuilder.withProduct({
        id: product.node.id.replace("gid://shopify/Product/", ""),
        title: product.node.title,
        description: product.node.description.substring(0, 180),
        link: `http://www.finswimmershop.com/product/${product.node.handle}`,
        imageLink: product.node.images.edges[0].node.url,
        availability: "in_stock",
        price: {
          currency: product.node.priceRange.minVariantPrice.currencyCode,
          value: Number(product.node.priceRange.minVariantPrice.amount),
        },
        shippingWeight: {
          unit: "kg",
          value: 3,
        },
        googleProductCategory: "6511",
        condition: "new",
        brand: product.node.brand.references.edges[0].node.fields[0].value,
        identifierExists: "no",
      });
    });
  }

  const xml = feedBuilder.buildXml();

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
