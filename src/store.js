import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDetailsReducers,
  productListReducers,
} from "./reducers/productReducers";

const reducer = combineReducers({
  productList: productListReducers,
  productDetails: productDetailsReducers,
});
const initialStage = {};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialStage,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
