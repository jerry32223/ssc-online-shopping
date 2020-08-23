import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const cartValue = localStorage.getItem("Bear-cart")
  ? JSON.parse(localStorage.getItem("Bear-cart"))
  : [];
const initialState = { cart: { cart: cartValue } };

const middleware = [thunk];

export const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
