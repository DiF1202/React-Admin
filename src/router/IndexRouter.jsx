import React from "react";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import Login from "../pages/login/Login.jsx";
import NewsSandBox from "../pages/sandbox/NewsSandBox.jsx";
import News from "../pages/news/News.jsx";
import Detail from "../pages/news/Detail.jsx";
const Router = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/news" component={News} />
        <Route path="/detail/:id" component={Detail} />
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
