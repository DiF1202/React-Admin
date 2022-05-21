import React, { forwardRef, useEffect, useState } from "react";
import { Form, Input, Select } from "antd";
const { Option } = Select;

const UserForm = forwardRef((props, ref) => {
  const [isDisabled, setisDisabled] = useState(false);

  useEffect(() => {
    setisDisabled(props.isUpdateDisabled);
  }, [props.isUpdateDisabled]);

  return (
    <Form layout="vertical" ref={ref}>
      <Form.Item
        label="用户名"
        name="username"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="区域"
        name="region"
        rules={isDisabled ? [] : [{ required: true, message: "请输入区域" }]}
      >
        <Select disabled={isDisabled}>
          {props.regionList.map((item) => (
            <Option value={item.value} key={item.id}>
              {item.title}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="角色"
        name="roleId"
        rules={[{ required: true, message: "请输入角色" }]}
      >
        <Select
          onChange={(value) => {
            if (value === 1) {
              setisDisabled(true);
              ref.current.setFieldsValue({
                region: "", //表单form的name值来决定的
              });
            } else {
              setisDisabled(false);
            }
          }}
        >
          {props.roleList.map((item) => (
            <Option value={item.id} key={item.id}>
              {item.roleName}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
});

export default UserForm;
