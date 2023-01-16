import {
  LockOutlined
} from '@ant-design/icons';
import { Button, Form, Input, message, Typography } from 'antd';
import axios from "axios";
import Cookies from 'js-cookie';
import React, { useContext, useState } from 'react';
import { GoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useNavigate } from "react-router-dom";
import UserContext from '../UserContext';

const { Title } = Typography;

export default function Usersecurity() {
  const [isHuman, setIsHuman] = useState(false);
  function handleOnVerify() {
    setIsHuman(true);
  }
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");


  const user = useContext(UserContext);
  function UpdateUserSetting(e) {
    if (!isHuman) {
      return message.error("Your interaction doesn't look like a human");
    } else {
      const username = user.userName;
      const data = { username, password, oldPassword };
      axios.post("/api/userSetting/user/userSecurity", data).then((res) => {
        user.setToken(Cookies.get('token'));
        e.preventDefault();
        user.setToken(undefined);
        Cookies.remove('token');
        navigate("/login");
        console.log(res)
      }).catch((err) => {
        console.log(err)
        message.error('Invalid password!')
      });
      console.log(data);
    }
  }


  return (
    <Form
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 8 }}
      initialValues={{ remember: true }}

      autoComplete="off"
    >
      <GoogleReCaptcha onVerify={handleOnVerify} />
      <Title level={3}>User Security</Title>

      <Form.Item
        label="Old Password"
        name="old password"
        rules={[{ required: true, message: 'Please input your old password!' }]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Old Password"
          onChange={(e) => {
            setOldPassword(e.target.value);
          }} value={oldPassword}
        />
      </Form.Item>

      <Form.Item
        label="New Password"
        name="new password"
        rules={[{ required: true, message: 'Please input your new password!' }]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="New Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }} value={password}
        />
      </Form.Item>


      <Form.Item wrapperCol={{ offset: 2, span: 16 }}>
        <Button type="primary" onClick={UpdateUserSetting}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
