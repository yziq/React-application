import { Avatar, Card, Col, Divider, Layout, List, Modal, Row, Skeleton } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link, useNavigate } from 'react-router-dom';
import HomepageSider from "../components/Homepage/HomepageSider";
import Navbar from "../components/Navbar";
import PostFormModal from '../components/Post/PostFormModal';


export default function CommunityListPage() {
  const navigate = useNavigate();
  const [, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [init, setInit] = useState(0);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await axios.get("/api/community/");
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
      <Navbar handleOpen={() => {
        setVisible(true)
      }}></Navbar>
      <Divider orientation="left"> <h1>All Communities 😎</h1></Divider>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={16}>
          <div
            id="scrollableDiv"
            style={{
              height: 600,
              overflow: 'auto',
              padding: '0 16px',
              border: '1px solid rgba(140, 140, 140, 0.35)',
            }}
          >

            <InfiniteScroll
              dataLength={data.length}
              loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
              endMessage={<Divider plain>That is all about our communities 😍</Divider>}
              scrollableTarget="scrollableDiv"
            >
              <List
                grid={{
                  gutter: 16,
                  xs: 1,
                  sm: 2,
                  md: 3,
                  lg: 3,
                  xl: 3,
                  xxl: 3,
                }}
                dataSource={data}
                renderItem={item => (
                  <List.Item>
                    <Link to={`/${item._id}`}>
                      <Card
                        hoverable
                        title={item.name}
                      >
                        <Avatar
                          size={{
                            xs: 24,
                            sm: 32,
                            md: 40,
                            lg: 40,
                            xl: 40,
                            xxl: 40,
                          }}
                          alt="Avatar"
                          src={item.avatar}

                        />
                      </Card>
                    </Link>
                  </List.Item>
                )}
              />
            </InfiniteScroll>
          </div>
        </Col>

        <Col span={8}>
          <HomepageSider handleOpen={() => {
            setVisible(true)
          }}></HomepageSider>
        </Col>
      </Row>



    </Layout>


  )




}