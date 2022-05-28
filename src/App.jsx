import React from "react";
import IndexRouter from "./router/IndexRouter.jsx";
import "./App.scss";
import "./util/http";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store"; //持久化的东西
import { PersistGate } from "redux-persist/integration/react"; //持久化的东西

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <IndexRouter></IndexRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
