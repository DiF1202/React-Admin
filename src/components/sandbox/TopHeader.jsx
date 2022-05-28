import React, { useState } from "react";
import { Layout, Menu, Dropdown, Avatar, Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { DownOutlined, SmileOutlined, UserOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const { Header } = Layout;
// const menu = (

// );
const TopHeader = (props) => {
  // const [collapsed, setCollapsed] = useState(false);
  const changeCollapsed = () => {
    // setCollapsed(!collapsed);
    //改变state中的isColapsed
    props.changeCollapsed();
  };

  const {
    role: { roleName },
    username,
  } = JSON.parse(localStorage.getItem("token"));

  return (
    <Header className="site-layout-background" style={{ padding: "0 16px" }}>
      {props.isCollapsed ? (
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

/*
 connect(
  // mapStateToProps  
  // mapDispatchToProps
 )(被包装的组件)
*/

//返回值必须是一个对象
const mapStateToProps = ({ CollApsedReducer: { isCollapsed } }) => {
  // console.log(state) 这些都是从state里面解构赋值出来的
  //返回的东西会挂到props上去
  return {
    isCollapsed,
  };
};

//返回的东西会挂到props上去
const mapDispatchToProps = {
  changeCollapsed() {
    //return的是action
    return {
      type: "change_collapsed",
      // payload:
    }; //action
  },
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TopHeader));
