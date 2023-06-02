import { FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE } from "../actions/actionTypes/userTypes";

const initialState = {
  users: []
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return {
        users: action.payload,
      };
    case FETCH_USERS_FAILURE:
      return {
        users: [],
      };
    default:
      return state;
  }
};

export default users;