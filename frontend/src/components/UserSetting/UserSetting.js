import { LockOutlined, ProfileOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import UserProfile from './UserProfile';
import UserSecurity from './UserSecurity';
import './UserSetting.css';
const { Content, Sider, Footer } = Layout;

const menuList = [
  {
    key: "/user/userprofile",
    title: "User Profile",
    icon: <ProfileOutlined />,
  },
  {
    key: "/user/usersecurity",
    title: "User Security",
    icon: <LockOutlined />,
  },
]

export default function Usersetting() {
  const navigate = useNavigate()
  const renderMenu = (menuList) => {
    return menuList.map(item => {
      return <Menu.Item key={item.key} icon={item.icon} onClick={() => {
        navigate(item.key)
      }}>{item.title}</Menu.Item>
    })
  }
  return (
    <Layout>
      <Content style={{ padding: '0 50px' }}>
        <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
          <Sider className="site-layout-background" width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
            >
              {renderMenu(menuList)}
            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 500 }}>
            <Routes>
              <Route path="/userprofile" element={<UserProfile />} />
              <Route path="/usersecurity" element={<UserSecurity />} />
              {/* <Route path="/userdelete" element={<DeleteUser/>}/> */}
              <Route index element={<Navigate to="userprofile" replace />} />
            </Routes>
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}></Footer>
    </Layout>
  )
}

