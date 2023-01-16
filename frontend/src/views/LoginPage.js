import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Col, Input, Layout, message, Row, Typography } from "antd";
import axios from "axios";
import Cookies from 'js-cookie';
import React, { useContext, useState } from "react";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import UserContext from "../components/UserContext";
import "./LoginPage.css";

const { Title } = Typography;

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const user = useContext(UserContext);

  function login() {
    const data = { username, password };
    if (!isHuman) {
      return message.error("Your interaction doesn't look like a human");
    }
    else {
      if (!username) return message.error('please enter username');
      if (!password) return message.error('please enter password');
      axios.post("/api/auth/login", data).then(() => {
        user.setToken(Cookies.get('token'));
        navigate("/");
      }).catch(() => {
        message.error('Invalid password!')
      });
    }
  }
  const [isHuman, setIsHuman] = useState(false);
  function handleOnVerify() {
    setIsHuman(true);
  }

  return (
    <>
      <GoogleReCaptcha onVerify={handleOnVerify} />
      <Layout>
        <Navbar />
        <Row>
          <Col span={9} offset={6}>
            <Card
              bordered={false}
              className="login-page"
              title={<Title level={3}>Log In</Title>}
            >
              <Input
                size="large"
                placeholder="Username"
                prefix={<UserOutlined />}
                style={{ width: "80%" }}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <br />
              <br />
              <Input
                type="password"
                size="large"
                placeholder="Password"
                prefix={<LockOutlined />}
                style={{ width: "80%" }}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <br />
              <br />
              <br />
              <Button
                type="primary"
                size="large"
                id="login-button"
                onClick={login}
              >
                LOGIN
              </Button>
            </Card>
          </Col>
        </Row>
      </Layout>
    </>
  );
}

export default LoginPage;
