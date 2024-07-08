import { getData } from '../getData';

export async function getMenu(handle: string) {
  const Menu = `#graphql
    query Menu {
        menu(handle: "${handle}") {
        id
        title
        items {
            id
            title
            url
            items {
                id
                title
                url
                items {
                id
                title
                url
            }
            }
        }
        }
    }`;
  const { props } = await getData(Menu);
  return props;
}
