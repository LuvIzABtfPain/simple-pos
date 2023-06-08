import { gql, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
const apolloClient = new ApolloClient({
    link: createHttpLink({
      uri: 'http://magento245.local/graphql',
    }),
    cache: new InMemoryCache(),
  });

// Create an empty cart for a logged-in customer
export const createEmptyCartForCustomer = async (token) => {
  const query = gql`
    {
      customerCart {
        id
      }
    }
  `;

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const result = await apolloClient
    .query({
      query,
      context: {
        headers,
      },
    });
    return result.data.customerCart.id;
  } catch (error) {
    return error;
  }
};
  
  //  Create an empty cart for a guest customer
  export const createEmptyCartForGuest = async () => {
    const mutation = gql`
      mutation {
        createEmptyCart
      }
    `;
  
    const result = await apolloClient.mutate({
      mutation,
    });
    return result.data.createEmptyCart;
  };

export const addSimpleProductToCart = async (cartID, sku) => {
  const mutation = gql`
    mutation AddSimpleProductsToCart($cartID: String!, $sku: String!) {
      addSimpleProductsToCart(
        input: {
          cart_id: $cartID
          cart_items: [
            {
              data: {
                quantity: 1
                sku: $sku
              }
            }
          ]
        }
      ) {
        cart {
          items {
            id
            product {
              sku
              stock_status
            }
            quantity
          }
        }
      }
    }
  `;

  const variables = {
    cartID,
    sku,
  };

  try {
    const result = await apolloClient.mutate({
    mutation,
    variables,
    });
    return result.data.addSimpleProductsToCart.cart.items;
  } catch (error) {
    return error;
  }
};
  
export const addConfigurableProductToCart = async (cart_id, cart_items) => {
  const mutation = gql`
  mutation AddConfigurableProductsToCart($cartId: String!, $cartItems: [ConfigurableCartItemInput!]!) {
    addConfigurableProductsToCart(input: { cart_id: $cartId, cart_items: $cartItems }) {
      cart {
        items {
          uid
          quantity
          product {
            name
            sku
          }
          ... on ConfigurableCartItem {
            configurable_options {
              option_label
            }
          }
        }
      }
    }
  }
`;

  const variables = {
    cart_id,
    cart_items
  };

  try {
    const result = await apolloClient.mutate({
    mutation,
    variables,
    });
    return result.data.addConfigurableProductsToCart.cart.items;
  } catch (error) {
    return error;
  }
};
  // // Merge the current cart with a customer's cart
  // export const mergeCarts = async (customerId, guestCartId, token) => {
  //   const mutation = gql`
  //     mutation {
  //       mergeCarts(input: { customer_id: "${customerId}", guest_cart_id: "${guestCartId}" }) {
  //         cart {
  //           id
  //         }
  //       }
  //     }
  //   `;
  
  //   const { mergeCarts } = await graphqlClient.request(mutation, null, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  
  //   return mergeCarts.cart.id;
  // };
  
  // // Remove an item from the cart
  // export const removeItemFromCart = async (cartId, itemId, token) => {
  //   const mutation = gql`
  //     mutation {
  //       removeItemFromCart(input: { cart_id: "${cartId}", item_id: "${itemId}" }) {
  //         cart {
  //           id
  //         }
  //       }
  //     }
  //   `;
  
  //   const { removeItemFromCart } = await graphqlClient.request(mutation, null, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  
  //   return removeItemFromCart.cart.id;
  // };
  
  // Other cart actions...
  
  // Export all cart service functions as an object
  const CartService = {
    createEmptyCartForCustomer,
    createEmptyCartForGuest,
    addSimpleProductToCart,
    addConfigurableProductToCart
    // mergeCarts,
    // removeItemFromCart,
    // Other cart actions...
  };
  
  export default CartService;