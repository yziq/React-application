import React from 'react'
import Navbar from '../components/Navbar'
import Usersetting from '../components/UserSetting/UserSetting'
import PostFormModal from '../components/Post/PostFormModal';
import {Modal} from 'antd';
import { useNavigate } from "react-router-dom";

export default function UserPage() {
  const navigate = useNavigate();
  const [visible, setVisible] = React.useState(false);
  const [init, setInit] = React.useState(0);

  return (
    <div>
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
        <Usersetting ></Usersetting>
    </div>
  )
}
