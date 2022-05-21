import React, { useState } from "react";
import { Layout, Menu, Dropdown, Avatar, Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { DownOutlined, SmileOutlined, UserOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";

const { Header } = Layout;
const menu = (
  <Menu
    items={[
      {
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.antgroup.com"
          >
            1st menu item
          </a>
        ),
      },
      {
        danger: true,
        label: (
          <div
            onClick={(props) => {
              localStorage.removeItem("token");
              props.history.replace("/login");
            }}
          >
            退出
          </div>
        ),
      },
    ]}
  />
);
const TopHeader = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const changeCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Header className="site-layout-background" style={{ padding: "0 16px" }}>
      {collapsed ? (
        <MenuUnfoldOutlined onClick={changeCollapsed}></MenuUnfoldOutlined>
      ) : (
        <MenuFoldOutlined onClick={changeCollapsed}></MenuFoldOutlined>
      )}

      <div style={{ float: "right" }}>
        <span>欢迎admin回来</span>
        <Dropdown overlay={menu}>
          <Avatar size="large" icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </Header>
  );
};

export default withRouter(TopHeader);
