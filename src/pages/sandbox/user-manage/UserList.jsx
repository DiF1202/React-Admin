import React, { useState, useEffect, useRef } from "react";
import { Button, Table, Modal, Switch, Input, Form, Select } from "antd";
import axios from "axios";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import UserForm from "../../../components/user-manage/UserForm";
const { confirm } = Modal;
const { Option } = Select;
const UserList = () => {
  const [dataSource, setdataSource] = useState([]); //数据源
  const [isAddVisible, setisAddVisible] = useState(false); //控制模态框得显示
  const [roleList, setroleList] = useState([]); //角色列表
  const [regionList, setregionList] = useState([]); //区域列表
  const addForm = useRef(null); //初始化form表单ref
  const updateForm = useRef(null); //更新form表单ref
  const [isUpdateVisible, setisUpdateVisible] = useState(false); //控制更新form表单的弹框
  const [isUpdateDisabled, setisUpdateDisabled] = useState(false);
  const [current, setcurrent] = useState(null);

  //确定用户权限身份
  const { roleId, region, username } = JSON.parse(
    localStorage.getItem("token")
  );

  useEffect(() => {
    const roleObj = {
      1: "superadmin",
      2: "admin",
      3: "editor",
    };
    axios.get("http://localhost:5000/users?_expand=role").then((res) => {
      const list = res.data;
      console.log(res.data);
      list.forEach((item) => {
        if (item?.children?.length === 0) {
          item.children = "";
        }
      });
      setdataSource(
        roleObj[roleId] === "superadmin" //过滤数据 看看是不是超级管理员
          ? list
          : [
              ...list.filter((item) => item.username === username),
              ...list.filter(
                (item) =>
                  item.region === region && roleObj[item.roleId] === "editor"
              ),
            ]
      );
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/regions").then((res) => {
      const list = res.data;
      setregionList(list);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/roles").then((res) => {
      const list = res.data;
      setroleList(list);
    });
  }, []);

  const columns = [
    {
      title: "区域",
      dataIndex: "region",
      filters: [
        ...regionList.map((item) => ({
          text: item.title,
          value: item.value,
        })),
        {
          text: "全球",
          value: "全球",
        },
      ],

      //因为全球的region为空做的特殊处理
      onFilter: (value, item) => {
        if (value === "全球") {
          return item.region === "";
        }
        return item.region === value;
      },

      render: (region) => {
        return <b>{region === "" ? "全球" : region}</b>;
      },
    },
    {
      title: "角色名称",
      dataIndex: "role",
      render: (role) => {
        return role?.roleName;
      },
    },
    {
      title: "用户名",
      dataIndex: "username",
    },
    {
      title: "用户状态",
      dataIndex: "roleState",
      render: (roleState, item) => {
        return (
          <Switch
            checked={roleState}
            disabled={item.default}
            onChange={() => handleChange(item)}
          ></Switch>
        );
      },
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
              disabled={item.default}
            />

            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              disabled={item.default}
              onClick={() => handleUpdate(item)}
            />
          </div>
        );
      },
    },
  ];

  //更新用户信息 打开弹框
  const handleUpdate = (item) => {
    setisUpdateVisible(true);
    setTimeout(() => {
      if (item.roleId === 1) {
        //禁用
        setisUpdateDisabled(true);
      } else {
        //取消禁用
        setisUpdateDisabled(false);
      }
      updateForm.current.setFieldsValue(item);
    }, 0);

    setcurrent(item);
  };

  //用户状态更改
  const handleChange = (item) => {
    //前端改变
    item.roleState = !item.roleState;
    setdataSource([...dataSource]);
    //后端改变
    axios.patch(`http://localhost:5000/users/${item.id}`, {
      roleState: item.roleState,
    });
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
    setdataSource(dataSource.filter((data) => data.id !== item.id));
    axios.delete(`http://localhost:5000/users/${item.id}`);
  };

  //确定添加
  const addFormOK = () => {
    addForm.current.validateFields().then((value) => {
      setisAddVisible(false); //关闭弹框
      addForm.current.resetFields(); //清空表单
      //post到后端，生成id，再设置 datasource, 方便后面的删除和更新
      axios
        .post(`http://localhost:5000/users`, {
          ...value,
          roleState: true,
          default: false,
        })
        .then((res) => {
          // console.log(res.data);
          setdataSource([
            ...dataSource, //展开
            {
              ...res.data, //数据展开
              role: roleList.filter((item) => item.id === value.roleId)[0], //更新数据
            },
          ]);
        });
    });
  };

  //确认更新
  const updateFormOK = () => {
    updateForm.current.validateFields().then((value) => {
      // console.log(value);
      setisUpdateVisible(false); //关闭弹框

      setdataSource(
        dataSource.map((item) => {
          if (item.id === current.id) {
            return {
              ...item,
              ...value,
              role: roleList.filter((data) => data.id === value.roleId)[0],
            };
          }
          return item;
        })
      );
      setisUpdateDisabled(!isUpdateDisabled);

      axios.patch(`http://localhost:5000/users/${current.id}`, value);
    });
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setisAddVisible(true);
        }}
      >
        添加用户
      </Button>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
          pageSize: 5,
        }}
        rowKey={(item) => item.id}
      />
      <Modal
        visible={isAddVisible}
        title="添加用户"
        okText="确定"
        cancelText="取消"
        onCancel={() => {
          setisAddVisible(false);
        }}
        onOk={() => addFormOK()}
      >
        <UserForm
          regionList={regionList}
          roleList={roleList}
          ref={addForm}
        ></UserForm>
      </Modal>

      <Modal
        visible={isUpdateVisible}
        title="更新用户"
        okText="更新"
        cancelText="取消"
        onCancel={() => {
          setisUpdateVisible(false); //关闭弹框
          setisUpdateDisabled(!isUpdateDisabled);
        }}
        onOk={() => updateFormOK()}
      >
        <UserForm
          regionList={regionList}
          roleList={roleList}
          ref={updateForm}
          isUpdateDisabled={isUpdateDisabled}
        ></UserForm>
      </Modal>
    </div>
  );
};

export default UserList;
