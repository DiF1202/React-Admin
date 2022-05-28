import React from "react";
import IndexRouter from "./router/IndexRouter.jsx";
import "./App.scss";
import "./util/http";
import { Provider } from "react-redux";
import store from "./redux/store";
const App = () => {
  return (
    <Provider store={store}>
      <IndexRouter></IndexRouter>;
    </Provider>
  );
};

export default App;
