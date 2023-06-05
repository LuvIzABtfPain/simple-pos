import axios from "axios";
import {
  gql,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "apollo-link-context";

// const API_URL = "https://magento246.com/rest/all/V1/integration/admin/token";
const API_URL = "http://magento245.local/rest/all/V1/integration/admin/token";

const GENERATE_CUSTOMER_TOKEN_AS_ADMIN = gql`
  mutation GenerateCustomerTokenAsAdmin($email: String!) {
    generateCustomerTokenAsAdmin(input: { customer_email: $email }) {
      customer_token
    }
  }
`;

const GRAPHQL_URL = "http://magento245.local/graphql";
const httpLink = createHttpLink({
  uri: GRAPHQL_URL,
});
const authLink = setContext((_, { headers }) => {
  const admin_token = localStorage.getItem("user");
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${admin_token}`,
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
const generateCustomerToken = async (email) => {
  try {
    const result = await client.mutate({
      mutation: GENERATE_CUSTOMER_TOKEN_AS_ADMIN,
      variables: { email },
    });
    const customer_token =
      result.data.generateCustomerTokenAsAdmin.customer_token;
    if (customer_token) {
      localStorage.setItem("customer", customer_token);
    }
    return customer_token;
  } catch (error) {
    throw new Error(error.message);
  }
};

const login = (username, password) => {
  let data = JSON.stringify({
    username: username,
    password: password,
  });
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: API_URL,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  return axios.request(config).then((response) => {
    if (response.data) {
      localStorage.setItem("user", response.data);
    }

    return response.data;
  });
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("customer");
};

export default {
  login,
  logout,
  generateCustomerToken,
};
