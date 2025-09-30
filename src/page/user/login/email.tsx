import { Button, Input, Form, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import {sendCode} from '../../../api/login'
import {useState} from 'react'
import type {Logininfo} from '../../../type/user/index'
import {login} from '../../../api/login'
import userStore from '../../../store/index'
const Login = () => {
  const navigate = useNavigate();
   const [user,setUser] = useState<Logininfo>({
    username:'',
    code:'',
    type:0
   })
   const {setToken,setId,setAvatar,setNickname} = userStore()
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f2f5', // 可选：Ant Design 默认背景色
      }}
    >
      <Form
        layout="vertical"
        style={{
          width: '320px', // 固定表单宽度，更专业
          padding: '32px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        }}
      >
        <Form.Item label="邮箱">
          <Input placeholder="请输入邮箱"  value={user.username} onChange={(e) => setUser({...user,username:e.target.value})} />
        </Form.Item>

        <Form.Item label="验证码">
          <div style={{ display: 'flex', gap: '8px' }}>
            <Input placeholder="请输入验证码" style={{ flex: 1 }} value={user.code} onChange={(e) => setUser({...user,code:e.target.value})} />
            <Button type="primary" onClick={() =>{
               sendCode(user.username).then(res=>{
                console.log(res)
               })
            }}>获取验证码</Button>
          </div>
        </Form.Item>

        <Form.Item>
          <Button type="primary" block size="large" onClick={() =>{
               login(user).then(res=>{
                console.log(res)
                if(res.data.code === 200){
                  setToken(res.data.data.token)
                  setId(res.data.data.id)
                  setAvatar(res.data.data.avatar)
                  setNickname(res.data.data.nickname)
                  navigate('/user')
                }
               })
            }}>
            登录
          </Button>
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <div style={{ textAlign: 'center' }}>
            <Space direction="vertical" size={8}>
              <Button type="link" onClick={() => navigate('/login/password')}>
                切换到密码登录
              </Button>
              <div>
                <span>还没有账号？</span>
                <Button type="link" onClick={() => navigate('/register')} size="small">
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