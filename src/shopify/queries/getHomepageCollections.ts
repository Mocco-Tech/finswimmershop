import { getData } from '../getData';

export async function getHomepageCollections() {
  const collections = `#graphql
    query HomepageCollections {
        freedivingFins: collectionByHandle(handle: "freediving-fins") {
            handle
            title
            image {
            src
            }
        }
        monofins: collectionByHandle(handle: "monofins") {
            handle
            title
            image {
            src
            }
        }
        lifesavingFins: collectionByHandle(handle: "lifesaving-fins") {
            handle
            title
            image {
            src
            }
        }
        uwRugbyFins: collectionByHandle(handle: "uw-rugby-fins") {
            handle
            title
            image {
            src
            }
        }
        uwHockeyFins: collectionByHandle(handle: "uw-hockey-fins") {
            handle
            title
            image {
            src
            }
        }
    }`;
  const { props } = await getData(collections);
  return props;
}
