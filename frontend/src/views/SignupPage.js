import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Col, Input, Layout, Row, Typography } from "antd";
import axios from "axios";
import Cookies from 'js-cookie';
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import UserContext from "../components/UserContext";
import "./SignupPage.css";

const { Title } = Typography;

function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const user = useContext(UserContext);

  function register(e) {
    e.preventDefault();
    const data = { email, username, password };
    axios
      .post("/api/auth/register", data, {
        withCredentials: true,
      })
      .then(() => {
        axios.post("/api/auth/login", { username, password }).then(() => {
          user.setToken(Cookies.get('token'));
          navigate("/");
        });

        setEmail("");
        setPassword("");
        setUsername("");
      });
  }

  return (
    <Layout>
      <Navbar />
      <Row>
        <Col span={9} offset={6}>
          <Card
            className="signup-page"
            bordered={false}
            title={<Title level={3}>Sign Up</Title>}
          >
            <Row>
              <Col span={4}>
                <div className="field-label">Email </div>
              </Col>
              <Col flex={10}>
                <Input
                  size="large"
                  placeholder="Email"
                  prefix={<MailOutlined />}
                  className="input-box"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Col>
            </Row>
            <br />
            <br />
            <Row>
              <Col span={4}>
                <div className="field-label">Username</div>
              </Col>
              <Col flex={10}>
                <Input
                  size="large"
                  placeholder="Username"
                  prefix={<UserOutlined />}
                  className="input-box"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </Col>
            </Row>
            <br />
            <br />
            <Row>
              <Col span={4}>
                <div className="field-label">Password</div>
              </Col>
              <Col flex={10}>
                <Input
                  type="password"
                  size="large"
                  placeholder="Password"
                  prefix={<LockOutlined />}
                  className="input-box"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Col>
            </Row>
            <br />
            <br />
            <Button
              type="primary"
              size="large"
              id="login-button"
              onClick={(e) => register(e)}
            >
              Submit
            </Button>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}

export default SignupPage;
