import "./index.scss";
import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import axios from "axios";
const { Sider } = Layout;

//图标映射表
const iconList = {
  "/home": <UserOutlined />,
  "/user-manage": <UserOutlined />,
  "/user-manage/list": <UserOutlined />,
  "/right-manage": <UserOutlined />,
  "/right-manage/role/list": <UserOutlined />,
  "/right-manage/right/list": <UserOutlined />,
};

const SideMenu = (props) => {
  const [meun, setMeun] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/rights?_embed=children").then((res) => {
      setMeun(formatData(res.data));
    });
  }, []);

  //切换路由
  const changeRouter = (e, props) => {
    props.history.push(e.key);
  };

  //鉴定权限
  const formatData = (arr) => {
    return arr.map((item) => {
      if (item.pagepermisson === 1) {
        if (item.key in iconList) item.icon = iconList[item.key];
        if (item?.children?.length == 0) {
          delete item.children;
        }
        if (item?.children?.length) {
          item.children = item.children.map((child) => {
            if (child.pagepermisson === 1) {
              if (child?.rightId) {
                child.rightid = child.rightId;
                delete child.rightId;
              }
              if (child.key in iconList) child.icon = iconList[child.key];
              return child;
            }
          });
        }
        return item;
      }
    });
  };

  // console.log(props.location.pathname)
  const selectKeys = [props.location.pathname];
  const openKeys = ["/" + props.location.pathname.split("/")[1]];

  return (
    <Sider trigger={null} collapsible collapsed={false}>
      <div style={{ display: "flex", height: "100%", flexDirection: "column" }}>
        <div className="logo">博客后台管理系统</div>
        <div style={{ flex: 1, overflow: "auto" }}>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={selectKeys}
            defaultOpenKeys={openKeys}
            items={meun}
            onClick={(item) => {
              changeRouter(item, props);
            }}
          />
        </div>
      </div>
    </Sider>
  );
};

export default withRouter(SideMenu);
