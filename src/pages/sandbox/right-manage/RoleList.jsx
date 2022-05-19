import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Tree } from "antd";
import axios from "axios";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
const { confirm } = Modal;

const RoleList = () => {
  const [dataSource, setdataSource] = useState([]);
  const [rightList, setRightList] = useState([]);
  const [currentRights, setcurrentRights] = useState([]);
  const [currentId, setcurrentId] = useState(0);
  const [isModalVisible, setisModalVisible] = useState(false);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id) => {
        return <b>{id}</b>;
      },
    },
    {
      title: "角色名称",
      dataIndex: "roleName",
    },
    {
      title: "操作",
      render: (item) => {
        return (
          <div>
            <Button
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => confirmMethod(item)}
            />
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                setisModalVisible(true);
                setcurrentRights(item.rights);
                setcurrentId(item.id);
              }}
            />
          </div>
        );
      },
    },
  ];
  //确定删除吗？
  const confirmMethod = (item) => {
    confirm({
      title: "你确定要删除?",
      icon: <ExclamationCircleOutlined />,
      // content: 'Some descriptions',
      onOk() {
        //   console.log('OK');
        deleteMethod(item);
      },
      onCancel() {
        //   console.log('Cancel');
      },
    });
  };

  //删除
  const deleteMethod = (item) => {
    // console.log(item)
    setdataSource(dataSource.filter((data) => data.id !== item.id));
    axios.delete(`http://localhost:5000/roles/${item.id}`);
  };

  useEffect(() => {
    axios.get("http://localhost:5000/roles").then((res) => {
      // console.log(res.data)
      setdataSource(res.data);
    });
  }, []);

  const formatData = (arr) => {
    // console.log(arr);
    if (arr?.length > 0) {
      for (const item of arr) {
        item.title = item.label;
        if (item?.children?.length !== 0) {
          formatData(item.children);
        }
      }
    }
    return arr;
  };

  useEffect(() => {
    axios.get("http://localhost:5000/rights?_embed=children").then((res) => {
      const list = formatData(res.data);
      console.log(list);
      setRightList(list);
    });
  }, []);

  const handleOk = () => {
    console.log(currentRights, currentId);
    setisModalVisible(false);
    //同步datasource
    setdataSource(
      dataSource.map((item) => {
        if (item.id === currentId) {
          return {
            ...item,
            rights: currentRights,
          };
        }
        return item;
      })
    );
    //patch

    axios.patch(`http://localhost:5000/roles/${currentId}`, {
      rights: currentRights,
    });
  };

  const handleCancel = () => {
    setisModalVisible(false);
  };

  const onCheck = (checkKeys) => {
    // console.log(checkKeys)
    setcurrentRights(checkKeys.checked);
  };

  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(item) => item.id}
      ></Table>
      <Modal
        title="权限分配"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Tree
          checkable
          checkedKeys={currentRights}
          onCheck={onCheck}
          checkStrictly={true}
          treeData={rightList}
        />
      </Modal>
    </div>
  );
};

export default RoleList;
