import React from "react";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import Login from "../pages/login/Login.jsx";
import NewsSandBox from "../pages/sandbox/NewsSandBox.jsx";
const Router = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/login" component={Login} />
        {/* <Route path="/" component={NewsSandBox}/> */}
        <Route
          path="/"
          render={() =>
            localStorage.getItem("token") ? (
              <NewsSandBox></NewsSandBox>
            ) : (
              <Redirect to="/login" />
            )
          }
        />
      </Switch>
    </HashRouter>
  );
};

export default Router;
