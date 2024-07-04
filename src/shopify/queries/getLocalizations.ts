import { getData } from '../getData';

export async function getLocalizations() {
  const ShopLocalizations = `#graphql
    query ShopLocalizations {
        localization {
            language {
                isoCode
                name
                endonymName
            }
            country {
                isoCode
                currency {
                    isoCode
                    symbol
                }
            }
            availableLanguages {
                isoCode
                endonymName
                name
            }
            market {
                handle
                id
            }
        }
    }`;
  const { props } = await getData(ShopLocalizations);
  return props;
}
