import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducers";

const initialState = {};

export default createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(thunk))
);
