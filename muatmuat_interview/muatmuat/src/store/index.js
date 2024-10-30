import { legacy_createStore as createStore, combineReducers } from "redux";

import { productReducer } from "./reducer";

const rootReducer = combineReducers({
  product: productReducer,
});

const store = createStore(rootReducer);

export default store;
