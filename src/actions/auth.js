import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
    GENERATE_CUSTOMER_TOKEN_SUCCESS,
    GENERATE_CUSTOMER_TOKEN_FAILURE,
  } from "./actionTypes/types";
  
  import AuthService from "../services/auth.service";
  
  
  export const login = (username, password) => (dispatch) => {
    return AuthService.login(username, password).then(
      (data) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: data },
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
          type: LOGIN_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };
  
  export const logout = () => (dispatch) => {
    AuthService.logout();
  
    dispatch({
      type: LOGOUT,
    });
  };
  
  export const generateCustomerToken = (email) => (dispatch) => {
    return AuthService.generateCustomerToken(email).then(
      (data) => {
        dispatch({
          type: GENERATE_CUSTOMER_TOKEN_SUCCESS,
          payload: data
        });
        return Promise.resolve();
      },
      (error) => {
        dispatch({
          type: GENERATE_CUSTOMER_TOKEN_FAILURE
        });
        return Promise.reject();
      }
    )
  }