import React from "react";
import SideMenu from "../../components/sandbox/SideMenu.jsx";
import TopHeader from "../../components/sandbox/TopHeader.jsx";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "./home/Home.jsx";
import UserList from "./user-manage/UserList.jsx";
import RoleList from "./right-manage/RightList.jsx";
import RightList from "./right-manage/RightList.jsx";
import Nopermission from "./nopermission/Nopermission.jsx";
export default function NewsSandBox() {
  return (
    <div>
      <SideMenu></SideMenu>
      <TopHeader></TopHeader>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/user-manage/list" component={UserList} />
        <Route path="/right-manage/role/list" component={RoleList} />
        <Route path="/right-manage/right/list" component={RightList} />

        <Redirect from="/" to="/home" exact />
        {/* 模拟匹配,只要带/就会匹配,但是加上exact就精确匹配了*/}
        <Route path="*" component={Nopermission} />
        {/* 优先级最低的兜底方案 */}
      </Switch>
    </div>
  );
}
