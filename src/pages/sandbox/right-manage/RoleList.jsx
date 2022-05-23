import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Tree } from "antd";
import axios from "axios";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
const { confirm } = Modal;
export default function RoleList() {
  const [dataSource, setdataSource] = useState([]); //数据源
  const [isModalVisible, setisModalVisible] = useState(false); //控制弹框
  const [rightList, setRightList] = useState([]); //数据源
  const [currentRights, setcurrentRights] = useState([]);
  const [currentId, setcurrentId] = useState(0);
  //下面的为树形式结构的控制
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [expandedKeys, setExpandedKeys] = useState([]);

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
    axios.delete(`/roles/${item.id}`);
  };

  useEffect(() => {
    axios.get("/roles").then((res) => {
      // console.log(res.data)
      setdataSource(res.data);
    });
  }, []);

  const formatData = (arr) => {
    if (arr?.length > 0) {
      for (const item of arr) {
        item.title = item.label;
        if (item?.children?.length > 0) {
          formatData(item.children);
        }
      }
    }
    return arr;
  };

  useEffect(() => {
    axios.get("/rights?_embed=children").then((res) => {
      //换数据
      // console.log(res.data);
      setRightList(formatData(res.data));
    });
  }, []);

  const handleOk = () => {
    // console.log(currentRights, currentId);
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

    axios.patch(`/roles/${currentId}`, {
      rights: currentRights,
    });
  };

  //关闭弹出框
  const handleCancel = () => {
    setisModalVisible(false);
  };

  const onCheck = (checkKeys) => {
    setcurrentRights(checkKeys.checked);
    setCheckedKeys(checkedKeysValue);
  };

  //树形结构的控制
  const onExpand = (expandedKeysValue) => {
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
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
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          checkedKeys={currentRights}
          onCheck={onCheck}
          checkStrictly={true}
          treeData={rightList}
        />
      </Modal>
    </div>
  );
}
