import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { productsReducer } from "./reducers/products";
import { categoriesReducer } from "./reducers/categories";
import errorReducer from "./reducers/errors";
import AuthReducer from "./reducers/auth";

const rootReducer = combineReducers({
  auth: AuthReducer,
  products: productsReducer,
  category: categoriesReducer,
  error: errorReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
