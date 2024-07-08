import { getData } from '../getData';

export async function getPage(handle: string) {
  const Page = `#graphql
    query Page {
      pageByHandle(handle: "${handle}") {
        id
        handle
        title
        bodySummary
        body
        seo {
          description
          title
        }
        metafield(key: "page_banner", namespace: "custom") {
          id
          value
          reference {
        ... on Metaobject {
          id
          fields {
            key
            value
            reference {
              ... on Collection {
                handle
                title
              }
              ... on MediaImage {
                id
                image {
                  src
                }
              }
            }
          }
        }}
        }
      }
    }`;
  const { props } = await getData(Page);
  return props;
}
