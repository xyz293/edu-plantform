import {useNavigate} from 'react-router-dom'
import {Button} from 'antd'
import {Outlet} from 'react-router-dom'
import {useLocation} from 'react-router-dom'
import {useEffect} from 'react'
const Control= ()=>{
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(()=>{
      if(location.pathname === '/admir/game'){
        navigate('/admir/game/list')
      }
    },[])
    return (
        <div>
        <div style={{display:'flex',justifyContent:'flex-start',gap:'20px'}}>
            <Button type='primary' onClick={()=>navigate('/admir/game/list')}>游戏管理</Button>
              <Button type='primary' onClick={()=>navigate('/admir/game/baseGameControl')}>游戏设置</Button>
        </div>
        <div>
            <Outlet/>
        </div>
        </div>
    )
}
export default Control