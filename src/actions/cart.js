import { CREATE_CART_SUCCESS, CREATE_CART_FAIL } from "./actionTypes/types"
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