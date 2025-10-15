import { Button, Input, Form, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import {login} from '../../../api/user'
import type {Logininfo} from '../../../type/user/index'
import {useState} from 'react'
import userStore from '../../../store/index'
import {setCookie} from '../../../ulits/cookie'
const Login = () => {
  const navigate = useNavigate();
   const {setId,setAvatar,setNickname,setEmail} = userStore()
  const [user,setUser] = useState<Logininfo>({
    username:'',
    password:'',
    type:1
  })
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f2f5', // Ant Design 默认背景色
      }}
    >
      <Form
        layout="vertical"
        style={{
          width: '320px',
          padding: '32px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        }}
      >
        <Form.Item label="用户名">
          <Input placeholder="请输入邮箱"  value={user?.username} onChange={(e) => setUser({...user as Logininfo,username:e.target.value})} />
        </Form.Item>

        <Form.Item label="密码">
          <Input.Password placeholder="请输入密码" value={user?.password} onChange={(e) => setUser({...user as Logininfo,password:e.target.value})} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" block size="large" onClick={() => {
            if(user){
              setUser({...user as Logininfo,type:1})
              login(user).then(res=>{
                console.log(res)
                if(res.data.code === 200){
                //setToken(res.data.data.token)
                 setCookie('token',res.data.data.token,3)
                  setId(res.data.data.id)
                  setAvatar(res.data.data.avatar)
                  setNickname(res.data.data.nickname)
                   setEmail(res.data.data.username)
                  navigate('/admir')
                }
              })
            }
          }}>
            登录
          </Button>
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <div style={{ textAlign: 'center' }}>
            <Space direction="vertical" size={12}>
              <Button type="link" onClick={() => navigate('/login/email')}>
                切换到邮箱登录
              </Button>

              <div>
                <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>还没有账号？</span>
                <Button
                  type="link"
                  onClick={() => navigate('/register')}
                  style={{ padding: 0, height: 'auto' }}
                >
                  立即注册
                </Button>
              </div>
            </Space>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;