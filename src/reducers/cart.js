import { CREATE_CART_FAIL, CREATE_CART_SUCCESS, ADD_TO_CART_SUCCESS, ADD_TO_CART_FAIL } from "../actions/actionTypes/types";

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
    case ADD_TO_CART_FAIL:
      return state;
    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        items: action.payload
      }
    default:
      return state;
  }
};

export default cart;