import { legacy_createStore as createStore, combineReducers } from "redux";
import { CollApsedReducer } from "./reducers/CollapsedReducer";
import { LoadingReducer } from "./reducers/LoadingReducer";

const reducer = combineReducers({
  CollApsedReducer,
  LoadingReducer,
});

const store = createStore(reducer);
export default store;

/*
 store.dispatch()

 store.subsribe()
*/
