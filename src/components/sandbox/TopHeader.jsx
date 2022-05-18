import React, { useState } from "react";
import { Layout, Menu, Dropdown, Avatar } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { DownOutlined, SmileOutlined, UserOutlined } from "@ant-design/icons";

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
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.aliyun.com"
          >
            2nd menu item (disabled)
          </a>
        ),
        icon: <SmileOutlined />,
        disabled: true,
      },
      {
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.luohanacademy.com"
          >
            3rd menu item (disabled)
          </a>
        ),
        disabled: true,
      },
      {
        danger: true,
        label: "退出",
      },
    ]}
  />
);
const TopHeader = () => {
  const [collapsed, setCollapsed] = useState(false);
  const changeCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Header className="site-layout-background" style={{ padding: "0 16px" }}>
      {/* {React.createElement(
        this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
        {
          className: "trigger",
          onClick: this.toggle,
        }
      )} */}
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

export default TopHeader;
