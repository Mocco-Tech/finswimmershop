import { getData } from '../getData';

export async function getPages() {
  const Pages = `#graphql
    query Pages {
        pages(first: 10) {
        edges {
            node {
                id
                body
                bodySummary
                title
                seo {
                title
                description
                }
                handle
                metafield(key: "rich_text"){
                    id
                    type
                    value
                }
            }
        }
        }
    }`;
  const { props } = await getData(Pages);
  return props;
}
