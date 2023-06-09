import {
  gql,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
const apolloClient = new ApolloClient({
  link: createHttpLink({
    uri: "http://magento245.local/graphql",
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
    const result = await apolloClient.query({
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
          cart_items: [{ data: { quantity: 1, sku: $sku } }]
        }
      ) {
        cart {
          items {
            id
            uid
            prices {
              price {
                currency
                value
              }
            }
            product {
              sku
              stock_status
              image {
                url
              }
              price_range {
                minimum_price {
                  regular_price {
                    value
                    currency
                  }
                }
              }
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
  const token = localStorage.getItem("customer");
  try {
    const result = await apolloClient.mutate({
      mutation,
      variables,
      context: {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    });
    return result.data.addSimpleProductsToCart.cart.items;
  } catch (error) {
    return error;
  }
};

export const addConfigurableProductToCart = async (cart_id, cart_items) => {
  const mutation = gql`
    mutation AddConfigurableProductsToCart(
      $cartId: String!
      $cartItems: [ConfigurableCartItemInput!]!
    ) {
      addConfigurableProductsToCart(
        input: { cart_id: $cartId, cart_items: $cartItems }
      ) {
        cart {
          items {
            id
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
    cart_items,
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
// Merge the current cart with a customer's cart
export const mergeCarts = async (sourceCartID, destination_cart_id, token) => {
  const mutation = gql`
      mutation {
        mergeCarts(input: { source_cart_id: "${sourceCartID}", destination_cart_id: "${destination_cart_id}" }) {
          items {
            id
            uid
            prices {
              price {
                currency
                value
              }
            }
            product {
              sku
              stock_status
              image {
                url
              }
              price_range {
                minimum_price {
                  regular_price {
                    value
                    currency
                  }
                }
              }
            }
            quantity
          }
        }
      }
    `;

  const { result } = await apolloClient.mutate({
    mutation,
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  return result.data.mergeCarts.items;
};

// Remove an item from the cart
export const updateCartItems = async (cartID, cartItems) => {
  const UPDATE_CART_ITEMS_MUTATION = gql`
    mutation UpdateCartItems($cartID: String!, $cartItems: [CartItemInput!]!) {
      updateCartItems(input: { cart_id: $cartID, cart_items: $cartItems }) {
        cart {
          items {
            id
            uid
            prices {
              price {
                currency
                value
              }
            }
            product {
              sku
              stock_status
              image {
                url
              }
              price_range {
                minimum_price {
                  regular_price {
                    value
                    currency
                  }
                }
              }
            }
            quantity
          }
          prices {
            grand_total {
              value
              currency
            }
          }
        }
      }
    }
  `;

  try {
    const response = await apolloClient.mutate({
      mutation: UPDATE_CART_ITEMS_MUTATION,
      variables: {
        cartID,
        cartItems,
      },
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    // Access the updated cart data
    const updatedCart = response.data.updateCartItems.cart;
    return updatedCart;
  } catch (error) {
    throw error;
  }
};

// Other cart actions...

// Export all cart service functions as an object
const CartService = {
  createEmptyCartForCustomer,
  createEmptyCartForGuest,
  addSimpleProductToCart,
  addConfigurableProductToCart,
  mergeCarts,
  updateCartItems
  // removeItemFromCart,
  // Other cart actions...
};

export default CartService;
