import { Avatar, BackTop, Button, Col, Layout, Modal, Row } from 'antd';
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CommunitySider from "../components/Community/CommunitySider";
import useJoinCommunity from "../components/Community/JoinCommunity";
import HomepageHot from "../components/Homepage/HomepageHot";
import AppNavbar from "../components/Navbar";
import PostFormModal from '../components/Post/PostFormModal';
import UserContext from "../components/UserContext";
import './CommunityPage.css';



function CommunityPage() {

  const navigate = useNavigate();
  const [, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { communityId } = useParams();
  const [visible, setVisible] = useState(false);
  const [init, setInit] = useState(0);

  const user = useContext(UserContext);

  const joinCommunity = useJoinCommunity();

  const [joined, setJoined] = useState(Array(data.memberId).includes(user.userId));

  useEffect(() => {

    async function fetchData() {
      setLoading(true);
      const response = await axios.get(`/api/community/${communityId}`);
      setData(response.data);
      setLoading(false);
    }
    fetchData();
  }, [])

  return (
    <Layout>
      <Modal visible={visible} footer={null} onCancel={() => setVisible(false)}>
        <PostFormModal handleClose={(id) => {
          setVisible(false);
          setInit(init + 1);
          navigate('/detail?id=' + id, { replace: true });
        }} />
      </Modal>
      <AppNavbar handleOpen={() => {
        setVisible(true)
      }}></AppNavbar>
      <div className="headerAvatar">
        <Avatar
          size={{
            xs: 64,
            sm: 64,
            md: 64,
            lg: 64,
            xl: 80,
            xxl: 100,
          }}
          src={data.avatar}></Avatar>

        <span className="topic">{data.name}</span>
        <span className="headerButton">

          {!joined && <Button type="primary" onClick={() => {
            joinCommunity(data._id);
            setJoined(true)
          }}>Join</Button>}
        </span>
      </div>

      <Row justify="center" align="top">
        <Col span={10} className='card'>
          <HomepageHot></HomepageHot>
        </Col>
        <Col span={5}>
          <CommunitySider community={data} handleOpen={() => {
            setVisible(true)
          }}></CommunitySider>
        </Col>
      </Row>

      <BackTop />
      <strong className="site-back-top-basic"></strong>
    </Layout>
  );
}

export default CommunityPage;
