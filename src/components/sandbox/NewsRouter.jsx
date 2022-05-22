import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "../../pages/sandbox/home/Home.jsx";
import UserList from "../../pages/sandbox/user-manage/UserList.jsx";
import RoleList from "../../pages/sandbox/right-manage/RoleList.jsx";
import RightList from "../../pages/sandbox/right-manage/RightList.jsx";
import Nopermission from "../../pages/sandbox/nopermission/Nopermission.jsx";
import NewsAdd from "../../pages/sandbox/news-manage/NewsAdd.jsx";
import NewsDraft from "../../pages/sandbox/news-manage/NewsDraft.jsx";
import NewsCategory from "../../pages/sandbox/news-manage/NewsCategory.jsx";
import Audit from "../../pages/sandbox/audit-manage/Audit.jsx";
import AuditList from "../../pages/sandbox/audit-manage/AuditList.jsx";
import Unpublished from "../../pages/sandbox/publish-manage/Unpublished.jsx";
import Published from "../../pages/sandbox/publish-manage/Published.jsx";
import Sunset from "../../pages/sandbox/publish-manage/Sunset.jsx";
import axios from "axios";

//构建本地路由map
const LocalRouterMap = {
  "/home": Home,
  "/user-manage/list": UserList,
  "/right-manage/role/list": RoleList,
  "/right-manage/right/list": RightList,
  "/news-manage/add": NewsAdd,
  "/news-manage/draft": NewsDraft,
  "/news-manage/category": NewsCategory,
  "/audit-manage/audit": Audit,
  "/audit-manage/list": AuditList,
  "/publish-manage/unpublished": Unpublished,
  "/publish-manage/published": Published,
  "/publish-manage/sunset": Sunset,
};

const NewsRouter = () => {
  const [BackRouteList, setBackRouteList] = useState([]); //路由列表
  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:5000/rights"),
      axios.get("http://localhost:5000/children"),
    ]).then((res) => {
      setBackRouteList([...res[0].data, ...res[1].data]);
    });
  }, []);

  const {
    role: { rights },
  } = JSON.parse(localStorage.getItem("token"));

  //权限控制
  const checkRoute = (item) => {
    return LocalRouterMap[item.key] && item.pagepermisson;
  };
  //权限控制
  const checkUserPermission = (item) => {
    return rights.includes(item.key);
  };

  return (
    <div>
      <Switch>
        {BackRouteList.map((item) => {
          if (checkRoute(item) && checkUserPermission(item)) {
            return (
              <Route
                path={item.key}
                key={item.key}
                component={LocalRouterMap[item.key]}
                exact
              />
            );
          }
          return null;
        })}

        <Redirect from="/" to="/home" exact />
        {BackRouteList.length > 0 && (
          <Route path="*" component={Nopermission} />
        )}
      </Switch>
    </div>
  );
};

export default NewsRouter;
