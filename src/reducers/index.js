import { combineReducers } from "redux";
import auth from "./auth";
import message from "./messages";
import productList from "./productList";

export default combineReducers({
  auth,
  message,
  productList
});