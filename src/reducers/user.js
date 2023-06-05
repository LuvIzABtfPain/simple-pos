import { FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE } from "../actions/actionTypes/userTypes";

const initialState = [];

const users = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return action.payload;
    case FETCH_USERS_FAILURE:
      return [];
    default:
      return state;
  }
};

export default users;