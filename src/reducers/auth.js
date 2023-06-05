import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    GENERATE_CUSTOMER_TOKEN_FAILURE,
    GENERATE_CUSTOMER_TOKEN_SUCCESS
  } from "../actions/actionTypes/types";
import { FETCH_USERS_FAILURE } from "../actions/actionTypes/userTypes";
  
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
          customer: payload
        };
      case GENERATE_CUSTOMER_TOKEN_FAILURE:
        return {
          ...state,
          customer: null,
        }
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