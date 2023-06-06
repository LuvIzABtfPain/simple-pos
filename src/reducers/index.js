import { combineReducers } from "redux";
import auth from "./auth";
import message from "./messages";
import productList from "./productList";
import users from "./user";
import cart from './cart';

export default combineReducers({
  auth,
  message,
  productList,
  users,
  cart
});