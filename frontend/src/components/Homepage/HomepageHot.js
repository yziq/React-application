import { Avatar, Card, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import hot_img1 from "../../assets/homepage/homepage_hot1.png";
import MDMarkdown from "../MDMarkdown";
import './HomepageHot.css';


const { Meta } = Card;

function HomepageHot(props) {

  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [init, setInit] = useState(0);


  const fetchData = () => {
    axios.get("/api/comment/commentMsg", {}, { withCredentials: true })
      .then(res => {
        if (res.data.success) {
          const bannerRes = res.data.data;
          setList(bannerRes);
        } else {
          message.error('Internet error')
        }
      })
      .catch(() => {
        message.error('Internet error')
      });
  }

  useEffect(() => {
    fetchData();
  }, [init])


  useEffect(() => {
    if (props.init !== init) {
      setInit(props.init);
    }
  }, [
    props.init,
  ])



  return (
    <Card className="content">

      {
        list && list.map((item, key) => (
          <Card
            key={key}
            className="homepage-card"
            onClick={() => {
              navigate('/detail?id=' + item._id);
            }}
            cover={
              <img alt="example" className="homepage-card-img" src={hot_img1} />
            }
          >
            <Meta
              title={
                <a style={{ color: "black" }}>
                  <Avatar src="https://joeschmoe.io/api/v1/random" />
                  {item.title} - Written by {item.author}
                </a>
              }
              description={<MDMarkdown source={item.body} />}
            />
          </Card>
        ))
      }
    </Card>
  );
}

export default HomepageHot;
