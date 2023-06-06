import { CREATE_CART_FAIL, CREATE_CART_SUCCESS } from "../actions/actionTypes/types";

const initialState = null;

const cart = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CART_SUCCESS:
      return {
        cartID: action.payload,
        items: []
      };
    case CREATE_CART_FAIL:
      return null;
    default:
      return state;
  }
};

export default cart;