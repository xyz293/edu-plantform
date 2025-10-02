import { Button, Input, Form,Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import {useState} from 'react'
import type {Userinfo} from '../../../type/user/index'
import {sendCode,regiser } from '../../../api/user'
const Register = () => {
  const navigate = useNavigate();
  const [user,setUser] =useState<Userinfo | null>(null)
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
          <Input placeholder="请输入用户名" value={user?.username || ''} onChange={(e) =>{
                setUser({...user as Userinfo,username:e.target.value})
               }} />
        </Form.Item>

        <Form.Item label="密码">
          <Input.Password placeholder="请输入密码" value={user?.password || ''} onChange={(e) =>{
                setUser({...user as Userinfo,password:e.target.value})
               }} />
        </Form.Item>
        <Form.Item label="邮箱">
               <Input placeholder="请输入邮箱" value={user?.email || ''} onChange={(e) =>{
                setUser({...user as Userinfo,email:e.target.value})
               }} />
        </Form.Item>
        <Form.Item label="昵称">
               <Input placeholder="请输入昵称" value={user?.nickname || ''} onChange={(e) =>{
                setUser({...user as Userinfo,nickname:e.target.value})
               }} />
        </Form.Item>
        <Form.Item label="用户类型">
          <Select 
            options={[
              { label: '学生', value: 0 },
              { label: '教师', value: 1 },
            ]}
            onChange={(e) =>{
                setUser({...user as Userinfo,type:e})
               }}
          />
        </Form.Item>
    
        <Form.Item label="验证码">
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Input placeholder="请输入验证码" value={user?.code || ''} onChange={(e) =>{
                setUser({...user as Userinfo,code:e.target.value})
               }} style={{ flex: 1 }} />
                    <Button type="primary" onClick={() =>{
                      console.log(user?.email)
                      sendCode(user?.email || '').then(res =>{
                        console.log(res)
                        if(res.data.code===200){
                            alert('验证码发送成功')
                        }
                      })
                    }}>获取验证码</Button>
                  </div>
                </Form.Item>
                 <Form.Item>
         <div style={{display:"flex",gap:"10px"}}>
             <Button type="primary" block size="small" onClick={()=>{
                regiser(user as Userinfo).then(res =>{
                  console.log(res)
                  if(res.data.code===200){
                            alert('注册成功')
                            navigate('/login')
                        }
                })
             }}>
            注册
          </Button>
          <Button type="link" size='small' onClick={() =>{
            navigate('/login')
          }}>登录</Button>
         </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;