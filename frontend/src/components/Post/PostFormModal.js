import MDEditor from '@uiw/react-md-editor';
import { Button, Input, message, Select, Tag } from "antd";
import axios from "axios";
import katex from 'katex';
import 'katex/dist/katex.css';
import React, { useContext, useEffect, useState } from "react";
import ClickOutHandler from 'react-clickout-handler';
import { GoogleReCaptcha } from 'react-google-recaptcha-v3';
import UserContext from '../UserContext';
import PostEditorContext from './PostEditorContext';

function PostFormModal(props) {
  const [isHuman, setIsHuman] = useState(false);
  function handleOnVerify() {
    setIsHuman(true);
  }

  const { TextArea } = Input;

  const mdEditor = React.useRef(null);
  const [body, setBody] = useState(props.detail ? props.detail.body : '');
  const [communities, setCommunities] = useState();

  const modalContext = useContext(PostEditorContext);
  const { userId } = useContext(UserContext);

  const { Option } = Select;


  const visibleClass = modalContext.show ? 'block' : 'hidden';

  const [title, setTitle] = useState(props.detail ? props.detail.title : '');
  const [keywords, setKeywords] = useState(props.detail ? props.detail.keywords : '');
  const [reference, setReference] = useState(props.detail ? props.detail.reference : '');
  const [community, setCommunity] = useState(props.detail ? props.detail.community : '');

  function createPost() {
    if (!isHuman) {return message.error("Your interaction doesn't look like a human")} else {
    if (!title) return message.error('Please enter title');
    if (!body) return message.error('Please enter content');
    const data = {
      "title": title,

      "body": body, "keywords": keywords, "reference": reference, "community": community
    };
    axios.post("/api/comment/comments", data, { withCredentials: true })
      .then(res => {
        if (res.data.success) {
          if (res.data.data.code === '401') return message.error(res.data.data.msg);
          message.success('Post successfully');
          setBody("");
          setCommunity("");
          setKeywords("");
          setReference("");
          setTitle("");
          props.handleClose(res.data.data.msg._id);
        } else {
          message.error('Internet error')
        }
      })
      .catch(() => {
        message.error('Internet error')
      });
    }
  }

  useEffect(() => {
    getMyCommunities().then((data) => {
      setCommunities(data);
    })
  }, [userId]);

  async function getMyCommunities() {
    return axios.get(`/api/community?userId=${userId}`, { withCredentials: true })
      .then(res => {
        if (res.status === 200 && res.data.length !== 0) {
          return res.data;
        } else if (res.data.length === 0) {
          console.log("User doesn't join any community")
        }
        else {
          message.error('Internet error')
        }
      })
  }

  function editPost() {
    if (!isHuman) {
      return message.error("Your interaction doesn't look like a human");
    }
    else {
      if (!title) return message.error('Please enter title');
      if (!body) return message.error('Please enter content');
    }
    const data = {
      "title": title, id: props.detail._id,

      "body": body, "keywords": keywords, "reference": reference, "community": community
    };
    axios.post("/api/comment/commentMsg/edit", data, { withCredentials: true })
      .then(res => {
        if (res.data.success) {
          if (res.data.data.code === '401') return message.error(res.data.data.msg);
          message.success('Edit successfully');
          setBody("");
          setCommunity("");
          setKeywords("");
          setReference("");
          setTitle("");
          props.handleClose()
        } else {
          message.error('Internet error')
        }
      })
      .catch(() => {
        message.error('Internet error')
      });
  }

  return (
    <div className={visibleClass} style={{ height: 500 }}>
      <GoogleReCaptcha onVerify={handleOnVerify} />
      <ClickOutHandler onClickOut={() => { }}>
        <div>
          <h1>{(props.type && props.type === 'edit') ? 'Edit post' : 'Create a post'}</h1>
          {communities && <div>
            <h3>My communities</h3>
            {communities.map((x) => <Tag color="geekblue">{x.name}</Tag>)}
          </div>}

          <Input
            placeholder={'Title'}
            onChange={e => setTitle(e.target.value)}
            value={title} />

          {communities && <Select
            defaultValue="Choose your community to post"
            style={{ width: 400 }}
            onChange={value => {
              setCommunity(value)
            }}
          >
            {communities.map((c) => {
              return <Option key={c.name} value={c.value}>{c.name}</Option>
            })
            }
          </Select>
          }
          <Input
            placeholder={'Wiki keywords'}
            onChange={e => setKeywords(e.target.value)}
            value={keywords} />
          <TextArea
            autoSize={{ minRows: 3, maxRows: 5 }}
            placeholder={'Wiki content you want to mention about in this wiki page. Please copy the fragment containing only text, those text containing font-styles will not be recognized.'}
            onChange={e => setReference(e.target.value)}
            value={reference} />

          <MDEditor
            ref={mdEditor}
            placeholder={'Post text (you can use markdown, and support math eqation)'}
            onChange={(val) => {
              setBody(val);
            }}
            value={body}

            style={{ height: "300px" }}
            previewOptions={{
              components: {
                code: ({ inline, children, className }) => {
                  const txt = children[0] || "";
                  if (inline) {
                    if (typeof txt === "string" && /^\$\$(.*)\$\$/.test(txt)) {
                      const html = katex.renderToString(
                        txt.replace(/^\$\$(.*)\$\$/, "$1"),
                        {
                          throwOnError: false
                        }
                      );
                      return <code dangerouslySetInnerHTML={{ __html: html }} />;
                    }
                    return <code>{txt}</code>;
                  }
                  if (
                    typeof txt === "string" &&
                    typeof className === "string" &&
                    /^language-katex/.test(className.toLocaleLowerCase())
                  ) {
                    const html = katex.renderToString(txt, {
                      throwOnError: false
                    });
                    return <code dangerouslySetInnerHTML={{ __html: html }} />;
                  }
                  return <code className={String(className)}>{txt}</code>;
                }
              }
            }}
          />
          <div>

            <Button onClick={() => {
              if (props.type && props.type === 'edit') {
                editPost();
                return;
              }
              createPost();
            }} >POST</Button>
          </div>
        </div>
      </ClickOutHandler>
    </div>
  );
}

export default PostFormModal;