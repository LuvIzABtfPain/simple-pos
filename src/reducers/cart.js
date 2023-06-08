import { CREATE_CART_FAIL, CREATE_CART_SUCCESS, ADD_TO_CART_SUCCESS, ADD_TO_CART_FAIL, UPDATE_CUSTOMER_INFO } from "../actions/actionTypes/types";

const initialState = { cartID: null };

const cart = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CART_SUCCESS:
      return {
        cartID: action.payload,
        items: []
      };
    case CREATE_CART_FAIL:
      return state;
    case ADD_TO_CART_FAIL:
      return state;
    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        items: action.payload
      }
    case UPDATE_CUSTOMER_INFO:
      return {
        ...state,
        cartID: null,
        items: []
      }
    default:
      return state;
  }
};

export default cart;