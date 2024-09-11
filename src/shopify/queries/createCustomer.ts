import { getData } from '../getData';

export async function createCustomer(email: string) {
  const password = Math.random().toString(36).slice(-8);

  const Customer = `#graphql
    mutation MyMutation {
        customerCreate(input: {email: "${email}", password: "${password}", acceptsMarketing: true}) {
            userErrors {
                field
                message
            }
            customerUserErrors {
                field
                message
                code
            }
            customer {
                email
            }
    }
  }`;
  const { props } = await getData(Customer);
  return props;
}
