import React, { useState } from "react";
import { Layout, Menu, Dropdown, Avatar, Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { DownOutlined, SmileOutlined, UserOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";

const { Header } = Layout;
// const menu = (

// );
const TopHeader = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const changeCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const {
    role: { roleName },
    username,
  } = JSON.parse(localStorage.getItem("token"));

  return (
    <Header className="site-layout-background" style={{ padding: "0 16px" }}>
      {collapsed ? (
        <MenuUnfoldOutlined onClick={changeCollapsed}></MenuUnfoldOutlined>
      ) : (
        <MenuFoldOutlined onClick={changeCollapsed}></MenuFoldOutlined>
      )}

      <div style={{ float: "right" }}>
        <span>
          欢迎<span style={{ color: "#1890ff" }}>{username}</span>回来
        </span>
        <Dropdown
          overlay={
            <Menu
              items={[
                {
                  label: <div>{roleName}</div>,
                },
                {
                  danger: true,
                  label: (
                    <div
                      onClick={() => {
                        localStorage.removeItem("token");
                        // console.log(props.history)
                        props.history.replace("/login");
                      }}
                    >
                      退出
                    </div>
                  ),
                },
              ]}
            />
          }
        >
          <Avatar size="large" icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </Header>
  );
};

export default withRouter(TopHeader);
