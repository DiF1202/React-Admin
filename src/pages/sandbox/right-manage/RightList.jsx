import React, { useState, useEffect } from "react";
import { Button, Table, Tag, Modal, Popover, Switch } from "antd";
import axios from "axios";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
const { confirm } = Modal;

const RightList = () => {
  const [dataSource, setdataSource] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/rights?_embed=children").then((res) => {
      const list = res.data;

      list.forEach((item) => {
        if (item.children.length === 0) {
          item.children = "";
        }
      });

      setdataSource(list);
    });
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id) => {
        return <b>{id}</b>;
      },
    },
    {
      title: "权限名称",
      dataIndex: "label",
    },
    {
      title: "权限路径",
      dataIndex: "key",
      render: (key) => {
        return <Tag color="orange">{key}</Tag>;
      },
    },
    {
      title: "操作",
      render: (item) => {
        return (
          <div>
            <Popover
              content={
                <div style={{ textAlign: "center" }}>
                  <Switch
                    checked={item.pagepermisson}
                    onChange={() => switchMethod(item)}
                  ></Switch>
                </div>
              }
              title="页面配置项"
              trigger={item.pagepermisson === undefined ? "" : "click"}
            >
              <Button
                type="primary"
                shape="circle"
                disabled={item.pagepermisson === undefined}
              >
                <EditOutlined></EditOutlined>
              </Button>
            </Popover>
            <Button danger shape="circle" onClick={() => confirmMethod(item)}>
              <DeleteOutlined></DeleteOutlined>
            </Button>
          </div>
        );
      },
    },
  ];

  const switchMethod = (item) => {
    item.pagepermisson = item.pagepermisson === 1 ? 0 : 1;
    // console.log(item);
    setdataSource([...dataSource]);

    if (item.grade === 1) {
      axios.patch(`http://localhost:5000/rights/${item.id}`, {
        pagepermisson: item.pagepermisson,
      });
    } else {
      axios.patch(`http://localhost:5000/children/${item.id}`, {
        pagepermisson: item.pagepermisson,
      });
    }
  };

  //确认删除吗？
  const confirmMethod = (item) => {
    confirm({
      title: "你确定要删除吗?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deleteMethod(item);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  //删除
  const deleteMethod = (item) => {
    // console.log(item)
    // 当前页面同步状态 + 后端同步
    //二级 先找到 二级菜单的上一级。
    //
    if (item.grade === 1) {
      setdataSource(dataSource.filter((data) => data.id !== item.id));
      axios.delete(`http://localhost:5000/rights/${item.id}`);
    } else {
      let list = dataSource.filter((data) => data.id === item.rightId);
      list[0].children = list[0].children.filter((data) => data.id !== item.id);
      setdataSource([...dataSource]);
      axios.delete(`http://localhost:5000/children/${item.id}`);
    }
  };

  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
          pageSize: 5,
        }}
      />
    </div>
  );
};

export default RightList;
