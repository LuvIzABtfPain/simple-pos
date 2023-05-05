import {
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
} from "./actionTypes/productTypes";
import { SET_MESSAGE } from "./actionTypes/types";
import getProducts from "../services/products.service";
export const fetchProducts = (name) => (dispatch) => {
  dispatch({
    type: FETCH_PRODUCTS_REQUEST,
  });
  return getProducts(name).then(
    (data) => {
      dispatch({
        type: FETCH_PRODUCTS_SUCCESS,
        payload: { products: data },
      });
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: FETCH_PRODUCTS_FAILURE,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
