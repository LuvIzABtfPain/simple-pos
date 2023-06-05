import { gql, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
const token = localStorage.getItem('customer');
const apolloClient = new ApolloClient({
    link: createHttpLink({
      uri: 'http://magento245.local/graphql',
    }),
    cache: new InMemoryCache(),
  });

// Create an empty cart for a logged-in customer
export const createEmptyCartForCustomer = async (customerId, token) => {
    const mutation = gql`
      mutation {
        createEmptyCartForCustomer(input: { customer_id: "${customerId}" }) {
          cart_id
        }
      }
    `;
  
    const { createEmptyCartForCustomer } = await apolloClient.mutate(
        mutation,
        customerId,
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        },
    )
  
    return createEmptyCartForCustomer.cart_id;
  };
  
  // Create an empty cart for a guest customer
  export const createEmptyCartForGuest = async () => {
    const mutation = gql`
      mutation {
        createEmptyCartForGuest {
          cart_id
        }
      }
    `;
  
    const { createEmptyCartForGuest } = await graphqlClient.request(mutation);
  
    return createEmptyCartForGuest.cart_id;
  };
  
  // Merge the current cart with a customer's cart
  export const mergeCarts = async (customerId, guestCartId, token) => {
    const mutation = gql`
      mutation {
        mergeCarts(input: { customer_id: "${customerId}", guest_cart_id: "${guestCartId}" }) {
          cart {
            id
          }
        }
      }
    `;
  
    const { mergeCarts } = await graphqlClient.request(mutation, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    return mergeCarts.cart.id;
  };
  
  // Remove an item from the cart
  export const removeItemFromCart = async (cartId, itemId, token) => {
    const mutation = gql`
      mutation {
        removeItemFromCart(input: { cart_id: "${cartId}", item_id: "${itemId}" }) {
          cart {
            id
          }
        }
      }
    `;
  
    const { removeItemFromCart } = await graphqlClient.request(mutation, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    return removeItemFromCart.cart.id;
  };
  
  // Other cart actions...
  
  // Export all cart service functions as an object
  const CartService = {
    createEmptyCartForCustomer,
    createEmptyCartForGuest,
    mergeCarts,
    removeItemFromCart,
    // Other cart actions...
  };
  
  export default CartService;