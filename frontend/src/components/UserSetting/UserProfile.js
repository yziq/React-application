import {
  MailOutlined, UserOutlined
} from '@ant-design/icons';
import { Button, Form, Input, message, Typography } from 'antd';
import axios from "axios";
import Cookies from 'js-cookie';
import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import UserContext from '../UserContext';

const { Title } = Typography;


export default function Userprofile() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newusername, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const user = useContext(UserContext);
  function userSetting(e) {
    const username = user.userName;
    const data = { username, email, newusername, password };
    axios.post("/api/userSetting/user/userProfile", data).then(() => {
      user.setToken(Cookies.get('token'));
      console.log(data);
      e.preventDefault();
      user.setToken(undefined);
      sessionStorage.clear();
      Cookies.remove('token');
      navigate("/login");
    }).catch(() => {
      message.error("Invalid email or username!")
    });

  }


  return (
    <div>
      <Form
        name="basic"

        labelCol={{ span: 4 }}
        wrapperCol={{ span: 8 }}
        initialValues={{ remember: true }}

      >
        <Title level={3}>User Profile</Title>
        <Form.Item
          label="Change Email"
          name="Email"
          rules={[{ required: true, message: 'Please input your Email!' }]}
        >
          <Input
            placeholder="Please input your new email"
            onChange={(e) => {
              setEmail(e.target.value);
            }} value={email} prefix={<MailOutlined className="site-form-item-icon" />}
          />
        </Form.Item>
        <Form.Item
          label={"Change Username"}
          name="newusername"
          rules={[{ required: true, message: 'Please input your new username!' }]}
        >
          <Input placeholder={user.userName}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={newusername} prefix={<UserOutlined className="site-form-item-icon" />} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 2, span: 16 }}>
          <Button type="primary" onClick={userSetting}>
            Submit
          </Button>
        </Form.Item>
      </Form>

    </div>
  )
}
