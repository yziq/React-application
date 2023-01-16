import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Card, message, Modal, Popover } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TimeAgo from 'timeago-react';
import cancelLike from "../assets/homepage/cancelLike.png";
import HasLike from "../assets/homepage/like.png";
import CommentPage from '../components/Comment/CommentPage';
import TreeDom from "../components/Comment/TreeDom";
import MDMarkdown from '../components/MDMarkdown';
import Navbar from '../components/Navbar';
import ArticleRefCard from '../components/Post/ArticleRefCard';
import PostFormModal from '../components/Post/PostFormModal';
import UserContext from "../components/UserContext";
import './Detail.css';

function Detail(_props) {

  const location = useLocation();
  const navigate = useNavigate();
  const [detail, setDetail] = useState(null);
  const user = useContext(UserContext);
  const [visible, setVisible] = useState(false);
  const [init, setInit] = useState(0);
  const [userCom, setUserCom] = useState([]);
  const [likeNum, setLikeNum] = useState(0);
  const [isLike, setIsLike] = useState(false);

  let userInfo;
  try {
    const msg = localStorage.getItem('userInfo');
    userInfo = JSON.parse(msg);
  } catch (e) {
    userInfo = null;
  }




  const getUrlParam = function (name) {
    var suffix = window.location.search.substr(1);
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    return suffix ? suffix.match(reg) ? unescape(suffix.match(reg)[2]) : '' : '';
  }

  const getData = () => {
    axios.get("/api/comment/commentMsg?id=" + getUrlParam('id'), {}, { withCredentials: true })
      .then(res => {
        if (res.data.success) {
          setDetail(res.data.data)
        } else {
          message.error('Internet error')
        }
      })
      .catch(_error => {
        message.error('Internet error')
      });
  }

  const getTree = () => {
    axios.get("/api/comment/userComment?allId=" + getUrlParam('id'), {}, { withCredentials: true })
      .then(res => {
        if (res.data.success) {
          setUserCom(res.data.data);
        }
      })
      .catch(_error => {
        message.error('Internet error')
      });
  }

  const deletePost = () => {
    axios.post('/api/comment/commentMsg/delete', {
      id: detail._id
    }, { withCredentials: true }).then(res => {
      if (res.data.success) {
        message.success('Delete successfully');
        setTimeout(() => {
          navigate('/');
        }, 1000)
      } else {
        message.error(res.data.data.msg)
      }
    }).catch(_e => {
      message.error('Internet error')
    })
  }


  const editPost = () => {
    setVisible(true);
  }

  const changeInit = () => {
    setInit(init + 1);
  }

  const successCb = () => {
    setInit(init + 1);
  }

  const getLike = () => {
    console.log('search userinfo=====>');
    let url = "/api/vote/userVote?postId=" + getUrlParam('id');
    if (userInfo && userInfo.userId) {
      url += '&userId=' + userInfo.userId;
    }

    axios.get(url, {}, { withCredentials: true })
      .then(res => {
        if (res.data.success) {
          setLikeNum(res.data.data.likeNum);
          setIsLike(res.data.data.userHasLike);
        }
      })
      .catch(_error => {
        message.error('Internet error')
      });
  }

  const clickLike = () => {
    if (!userInfo.userName) return message.error('please login!');
    if (isLike === true) {

      axios.post("/api/vote/userVote", {
        postId: getUrlParam('id'),
        type: 0,
      }, { withCredentials: true })
        .then(res => {
          if (res.data.success) {
            message.success('Cancel like!');
            setLikeNum(likeNum - 1);
            setIsLike(false);
          }
        })
        .catch(_error => {
          message.error('Internet error')
        });
    } else {

      axios.post("/api/vote/userVote", {
        postId: getUrlParam('id'),
        type: 1,
      }, { withCredentials: true })
        .then(res => {
          if (res.data.success) {
            message.success('Like successfully');
            setLikeNum(likeNum + 1);
            setIsLike(true);
          }
        })
        .catch(_error => {
          message.error('Internet error')
        });
    }
  }



  useEffect(() => {
    getData()
    getTree()
    getLike()
  }, [init])

  const { title = '', body = '', author = '', postedAt = '', reference = '', keywords = '', _id = '' } = detail || { title: '', body: '', author: '', postedAt: '', reference: '', keywords: '', _id: '' };

  return (
    <>
      <Navbar handleOpen={() => {
        setVisible(true)
      }} page="detail"></Navbar>
      <div className="site-card-border-less-wrapper">
        <Modal visible={visible} footer={null} onCancel={() => setVisible(false)}>
          <PostFormModal type='edit' detail={detail} handleClose={() => {
            setVisible(false);
            setInit(init + 1);
          }} />
        </Modal>
        <Card style={{}} size="small" headStyle={{ fontSize: '20px' }} title={title} extra={
          <div>
            <div style={{

              display: 'flex',
              alignItems: 'right'

            }}>
              <span style={{
                textAlign: 'right',
                marginLeft: 'auto',
                marginRight: 20,
                fontWeight: 600
              }}>Author: {author}</span>
              <TimeAgo style={{ marginRight: "10px" }} datetime={postedAt} />
              {
                user && user.userName === author && <Popover content={"Edit!"} ><EditOutlined style={{ fontSize: '20px', color: '#08c', marginLeft: "10px" }} onClick={() => {
                  editPost();
                }}>Edit</EditOutlined></Popover>
              }
              {
                user && user.userName === author && <Popover content={"Delete!"} > <DeleteOutlined style={{ fontSize: '20px', color: 'red', marginLeft: "10px" }} onClick={() => {
                  deletePost();
                }}>Delete</DeleteOutlined></Popover>
              }
            </div>
          </div>

        }>

          <br />

          <div className='textbody'>
            <MDMarkdown source={body} />
            <div className='textbody'></div>
            <div className='like'>
              <Popover content={"click it!"}>
                <img style={{ width: 30, height: 30, marginRight: 20, cursor: 'pointer' }} onClick={() => {
                  clickLike()
                }} src={isLike ? HasLike : cancelLike} alt="" /></Popover>
              <span style={{ fontSize: '17px' }}>{likeNum} User likes </span>
            </div>
            <ArticleRefCard wikiTitle={keywords} reference={reference} />
          </div>
        </Card>

        <div>
          <CommentPage match={{
            params: {
              id: _id,
            }
          }} successCb={() => successCb()} />
        </div>
        <TreeDom userCom={userCom} id={getUrlParam("id") || ''} changeInit={() => {
          changeInit()
        }} />
      </div>

    </>
  )
}

export default Detail;