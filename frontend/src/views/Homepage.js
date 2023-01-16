import { SmileOutlined } from "@ant-design/icons";
import {
  BackTop, Breadcrumb, Col,
  Divider, Layout, Modal, Row
} from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../components/Homepage/Homepage.css";
import HomepageHot from "../components/Homepage/HomepageHot";
import HomepageSider from "../components/Homepage/HomepageSider";
import HomepageTrending from "../components/Homepage/HomepageTrending";
import Navbar from "../components/Navbar";
import PostFormModal from "../components/Post/PostFormModal";

const { Footer } = Layout;

function Homepage() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [init, setInit] = useState(0);

  return (
    <Layout>
      <Modal visible={visible} footer={null} onCancel={() => setVisible(false)}>
        <PostFormModal
          handleClose={(id) => {
            setVisible(false);
            setInit(init + 1);
            navigate("/detail?id=" + id, { replace: true });
          }}
        />
      </Modal>
      <Navbar
        handleOpen={() => {
          setVisible(true);
        }}
      ></Navbar>
      <Breadcrumb id="trending-title">
        <Breadcrumb.Item>Welcome to Our Wiki Forum 😊</Breadcrumb.Item>
      </Breadcrumb>
      <HomepageTrending init={init}></HomepageTrending>

      <Row justify="center" align="top" style={{ margin: "30px 20px 0 0" }}>
        <Col span={10}>
          <Divider
            orientation="left"
            className="homepage-button-commine"
          ></Divider>
          <HomepageHot init={init}></HomepageHot>
        </Col>
        <Col span={5} style={{ margin: "40px 0" }}>
          <HomepageSider
            handleOpen={() => {
              setVisible(true);
            }}
          ></HomepageSider>
        </Col>
      </Row>

      <Footer style={{ textAlign: "center" }}>
        <h3>A Wikipedia Forum @2022 Created by Ruby-Rattlesnakes</h3>
        <p>
          <Link to="/about">
            {" "}
            About Us <SmileOutlined />{" "}
          </Link>
        </p>
      </Footer>

      <BackTop />
      <strong className="site-back-top-basic"></strong>
    </Layout>
  );
}

export default Homepage;
