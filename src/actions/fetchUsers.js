import {
    FETCH_USERS_FAILURE,
    FETCH_USERS_SUCCESS,
  } from "./actionTypes/userTypes";
  import { SET_MESSAGE } from "./actionTypes/types";
  import getAllUsers from "../services/users.service";

  export const fetchUsers = () => (dispatch) => {
    return getAllUsers().then(
      (data) => {
        dispatch({
          type: FETCH_USERS_SUCCESS,
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
          type: FETCH_USERS_FAILURE,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };
  