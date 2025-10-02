import React from 'react';
import { Breadcrumb, Layout, Menu, theme ,Avatar} from 'antd';
const { Header, Content, Sider } = Layout;
import {Outlet,useNavigate} from 'react-router-dom'
import {useEffect} from 'react'
import {useLocation} from 'react-router-dom'

import {getInfo} from '../../../api/login'
const App: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const info = getInfo()
    const items2 =[{
  key:'1',
  label:'班级管理',
  onClick: ()=>{
    navigate('/admir/class')
  },
  
},
 {
  key:'2',
  label:'游戏管理',
  onClick: ()=>{
    navigate('/admir/game')
  },
  
 },
 {
  key:'3',
  label:'用户管理',
  onClick: ()=>{
    navigate('/admir/user')
  },
  
 }
]
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  useEffect(()=>{
    if(location.pathname === '/admir'){
      navigate('/admir/class')
    }
     
  },[])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
       
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Layout>
     <Sider
  width={220}
  style={{
    background: colorBgContainer,
    padding: '20px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }}
>
  {/* 用户信息区 */}
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: 30,
      padding: '0 10px',
    }}
  >
    <Avatar
      size={70}
      style={{ marginBottom: 12, border: '2px solid #1890ff' }}
      src={info.avatar}
      alt={info.username}
    />
    <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>
      {info.username}
    </div>
    <div style={{ fontSize: 14, color: '#555', textAlign: 'center' }}>
      {info.email}
    </div>
  </div>

  {/* 菜单区 */}
  <Menu
    mode="inline"
    defaultSelectedKeys={['1']}
    style={{
      width: '100%',
      borderRight: 0,
    }}
    items={items2.map(item => ({
      ...item,
      label: (
        <div style={{ padding: '8px 12px', fontWeight: 500 }}>{item.label}</div>
      ),
    }))}
  />
</Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb
            items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
            style={{ margin: '16px 0' }}
          />
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
          <Outlet/>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;