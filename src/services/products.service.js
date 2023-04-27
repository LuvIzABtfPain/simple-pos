import { FETCH_PRODUCTS_REQUEST } from '../actions/actionTypes/productTypes';
import { useQuery, gql, ApolloClient, InMemoryCache } from '@apollo/client';

const GRAPHQL_URL = "https://magento246.com/graphql";
const GET_PRODUCTS_BY_NAME = gql`
query getProducts($name: String!)
  {
    products(search: $name) {
        total_count
        items {
          name
          sku
          image {
            url
            label
          }
          small_image{
              url
              label
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
        page_info {
          page_size
          current_page
        }
      }
  }
`;
const client = new ApolloClient({
    uri: GRAPHQL_URL,
    cache: new InMemoryCache()
  });
const getProducts = (name) => {
    client.query({
        query: GET_PRODUCTS_BY_NAME,
        variables: { name },
      }).then(response => {
        console.log(response);
        return response;
      })
      .catch(error => {
        return error
      });
}

export default getProducts;