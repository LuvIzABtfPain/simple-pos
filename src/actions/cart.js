import { CREATE_CART_SUCCESS, CREATE_CART_FAIL, ADD_TO_CART_FAIL, ADD_TO_CART_SUCCESS } from "./actionTypes/types"
import { SET_MESSAGE } from "./actionTypes/types";
import CartService from "../services/cart.service";
export const createCart = (token) => (dispatch) => {
  if(token != null) {
  return CartService.createEmptyCartForCustomer(token).then(
    (data) => {
      dispatch({
        type: CREATE_CART_SUCCESS,
        payload: data,
      });
      return Promise.resolve(data);
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: CREATE_CART_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
  } else {
    return CartService.createEmptyCartForGuest().then(
      (data) => {
        dispatch({
          type: CREATE_CART_SUCCESS,
          payload: data,
        });
        return Promise.resolve(data);
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: CREATE_CART_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  }
}

export const addProductToCart = (cartID, sku) => (dispatch) => {
  return CartService.addSimpleProductToCart(cartID, sku).then(
    (data) => {
      dispatch({
        type: ADD_TO_CART_SUCCESS,
        payload: data
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
          type: ADD_TO_CART_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });

        return Promise.reject();
    }
  )
}