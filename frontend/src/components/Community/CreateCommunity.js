import { Button, Form, Input, Menu, Modal } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '../Avatar';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const normFile = (e) => {
  console.log('Upload event:', e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};



function CreateCommunityForm(props) {
  const [form] = Form.useForm();

  const createCommunity = (values) =>
    console.log('Received values of form: ', values);

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="Create a community"
      onFinish={createCommunity}
      scrollToFirstError
      id='CreateCommunityForm'
    >

      <Form.Item
        name="community_name"
        label="Community Name"
        rules={[
          {
            required: true,
            message: 'Please input your community name!',
            whitespace: true,
          },
        ]}
      >
        <Input onChange={(e) => { props.setName(e.target.value) }} />
      </Form.Item>

      <Form.Item
        name="avatar"
        label="Avatar (JPG/PNG) "
        rules={[
          {
            required: true,
            message: 'Please upload your community avatar',
          },
        ]}
        valuePropName="filelist"
        getValueFromEvent={normFile}
      >

        <Avatar setAvatar={props.setAvatar} />


      </Form.Item>

      <Form.Item
        name="intro"
        label="Brief Intro"
        rules={[
          {
            required: true,
            message: 'Please input Intro about this community',
          },
        ]}
      >
        <Input.TextArea showCount maxLength={100} onChange={(e) => { props.setIntro(e.target.value) }} />
      </Form.Item>


    </Form>
  );
}



function CreateCommunity() {
  const [visible, setVisible] = React.useState(false);
  const [name, setName] = React.useState("");
  const [intro, setIntro] = React.useState("");
  const [avatar, setAvatar] = React.useState("");
  const navigate = useNavigate();

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  async function clinkHandler() {
    const data = {
      "name": name,
      "intro": intro,
      "avatar": avatar
    }
    console.log(data);
    await axios.post("/api/community/create", data).then((res) => {
      setVisible(false);
      const url = res.headers["location"];
      navigate(url, { replace: true });
    })

  }
  return (
    <>
      <Menu.Item key="5" onClick={showModal}>Create a community</Menu.Item>
      <Modal
        title="Create your own community🤩"
        forceRender="true"
        visible={visible}
        footer={[
          <Button form="CreateCommunityForm" type='primary' key="submit" htmlType="submit" onClick={clinkHandler}>
            Submit
          </Button>
        ]}
        onCancel={handleCancel}
      >
        <CreateCommunityForm setName={setName} setIntro={setIntro} setAvatar={setAvatar} />
      </Modal>
    </>
  );
};

export default CreateCommunity;