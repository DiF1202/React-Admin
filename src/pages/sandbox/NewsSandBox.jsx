import React from "react";
import SideMenu from "../../components/sandbox/SideMenu.jsx";
import TopHeader from "../../components/sandbox/TopHeader.jsx";
import "./NewsSandBox.scss";
import { Layout, Menu } from "antd";
import NewsRouter from "../../components/sandbox/NewsRouter.jsx";
const { Content } = Layout;

export default function NewsSandBox() {
  return (
    <Layout>
      <SideMenu></SideMenu>
      <Layout className="site-layout">
        <TopHeader></TopHeader>
        {/* 相当于Content */}
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            overflow: "auto",
          }}
        >
          <NewsRouter></NewsRouter>
        </Content>
      </Layout>
    </Layout>
  );
}
