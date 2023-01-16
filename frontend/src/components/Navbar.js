import { UserOutlined } from "@ant-design/icons";
import { Col, Layout, Menu, Row } from "antd";
import Cookies from 'js-cookie';
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CreateCommunity from "./Community/CreateCommunity";
import UserContext from "./UserContext";

const { Header } = Layout;
const { SubMenu } = Menu;

function Navbar(props) {
  const [current, setCurrent] = React.useState("null");
  const user = useContext(UserContext);

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Header className="header">
      <Row justify="start">
        <Col span={6}>
          <div className="header-logo">
            <Link to="/" style={{ color: "whitesmoke" }}>
              <img src="../WikiLogo.png" alt="Logo" className="logo-img" />
              Wiki Forum
            </Link>
          </div>
        </Col>
        <Col span={6}></Col>
        <Col span={6}>
        </Col>
        <Col span={6}>
          <Menu
            onClick={handleClick}
            selectedKeys={[current]}
            mode="horizontal"
            theme="dark"
          >
            {!user.userName && (
              <>
                <Menu.Item key="1">
                  <Link to="/login">Log In</Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="/register">Sign Up</Link>
                </Menu.Item>
              </>
            )}

            {user.userName && (
              <SubMenu key="sub1" icon={<UserOutlined />} title={user.userName}>
                <Menu.Item key="3">
                  <Link to="/user">User settings</Link>
                </Menu.Item>
                {
                  !(props.page && props.page === 'detail') &&
                  <Menu.Item key="4" onClick={() => {
                    props.handleOpen();
                  }}>
                    Create a post
                  </Menu.Item>
                }

                <CreateCommunity></CreateCommunity>


                <Menu.Item key="6">
                  <Link
                    to="/logout"
                    onClick={(e) => {
                      e.preventDefault();
                      user.setToken(undefined);
                      Cookies.remove('token');
                      localStorage.removeItem('userInfo')
                    }}
                  >
                    Log Out
                  </Link>
                </Menu.Item>
              </SubMenu>
            )}

          </Menu>
        </Col>
      </Row>
    </Header>
  );
}

export default Navbar;
