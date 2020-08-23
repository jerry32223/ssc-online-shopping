import { combineReducers } from "redux";
import { reducer as fromReducer } from "redux-form";
import errorReducer from "./errorReducer";
import messageReducer from "./messageReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import orderReducer from "./orderReducer";

export default combineReducers({
  form: fromReducer,
  errors: errorReducer,
  messages: messageReducer,
  product: productReducer,
  cart: cartReducer,
  order: orderReducer,
});
