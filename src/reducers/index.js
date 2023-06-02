import { combineReducers } from "redux";
import auth from "./auth";
import message from "./messages";
import productList from "./productList";
import users from "./user";

export default combineReducers({
  auth,
  message,
  productList,
  users,
});