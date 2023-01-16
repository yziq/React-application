import { SmileOutlined } from "@ant-design/icons";
import { Layout, Modal } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.js";
import PostFormModal from '../components/Post/PostFormModal';
import "./AboutPage.css";

export default function AboutPage() {
  const [visible, setVisible] = React.useState(false);
  const [init, setInit] = React.useState(0);
  const navigate = useNavigate();

  return (
    <Layout>
      <Modal visible={visible} footer={null} onCancel={() => setVisible(false)}>
      <PostFormModal handleClose={(id) => {
          setVisible(false);
          setInit(init + 1);
          navigate('/detail?id=' + id, {replace: true});
        }} />
      </Modal>
      <Navbar handleOpen={() => {
        setVisible(true)
      }}></Navbar>
      <img src="../WikiLogo.png" className="about-img" />
      <h1>About Us </h1>
      <h3>Team Ruby Rattlesnakes</h3>
      <h3>
        Team Members: Mingxue Gong, Yanran Xu, Zijia Liu, Yilun Li, Ziqi Yang
      </h3>
      <p>
        Hello there! We want to build up a Wikipedia social platform where you
        can find like-minded people
      </p>
      <p> to discuss your favorite areas of interest</p>
      <p>
        Please enjoy <SmileOutlined />
      </p>
    </Layout>
  );
}
