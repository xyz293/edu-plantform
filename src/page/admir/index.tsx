import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Sider } = Layout;
import {Outlet,useNavigate} from 'react-router-dom'
import {useEffect} from 'react'
import {useLocation} from 'react-router-dom'
const App: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const items2 =[{
  key:'1',
  label:'user',
  onClick: ()=>{
    navigate('/admir/class')
  }
}]
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
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderInlineEnd: 0 }}
            items={items2}
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