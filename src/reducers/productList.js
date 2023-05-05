import { FETCH_PRODUCTS_FAILURE, FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS } from "../actions/actionTypes/productTypes";

const initialState = {
  loading: false,
  products: [],
};

const productList = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload.products.data.products,
      };
    case FETCH_PRODUCTS_FAILURE:
      return {
        loading: false,
        products: [],
      };
    default:
      return state;
  }
};

export default productList;