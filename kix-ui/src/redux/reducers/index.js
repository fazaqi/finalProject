import { combineReducers } from "redux";
import userReducer from "./userReducer";
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  cart: cartReducer
});
