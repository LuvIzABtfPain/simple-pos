import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    GENERATE_CUSTOMER_TOKEN_FAILURE,
    GENERATE_CUSTOMER_TOKEN_SUCCESS,
    UPDATE_CUSTOMER_INFO
  } from "../actions/actionTypes/types";
  
  const user = localStorage.getItem("user");
  
  const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case LOGIN_SUCCESS:
        return {
          ...state,
          isLoggedIn: true,
          user: payload.user,
        };
      case LOGIN_FAIL:
        return {
          ...state,
          isLoggedIn: false,
          user: null,
        };
      case LOGOUT:
        return {
          ...state,
          isLoggedIn: false,
          user: null,
        };
      case GENERATE_CUSTOMER_TOKEN_SUCCESS:
        return {
          ...state,
          customer: {
            ...state.customer,
            token: payload
          }
        };
      case GENERATE_CUSTOMER_TOKEN_FAILURE:
        return {
          ...state,
          customer: null,
        };
      case UPDATE_CUSTOMER_INFO:
        return {
          ...state,
          customer: {
            ...state.customer,
            id: payload.customerID,
            email: payload.customerEmail
          },
        };
      // case FETCH_USERS_FAILURE:
      //   return {
      //     ...state,
      //     isLoggedIn: false,
      //     user: null,
      //   }
      default:
        return state;
    }
  }