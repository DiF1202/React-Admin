import { legacy_createStore as createStore, combineReducers } from "redux";
import { CollApsedReducer } from "./reducers/CollapsedReducer";
import { LoadingReducer } from "./reducers/LoadingReducer";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "hdfhdf", //localStorage里面的key
  storage,
  blacklist: ["LoadingReducer"],//黑名单 就是不进行持续化的reducer
};

const reducer = combineReducers({
  CollApsedReducer,
  LoadingReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
/*
 store.dispatch()

 store.subsribe()
*/
