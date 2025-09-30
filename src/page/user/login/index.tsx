import {Outlet} from 'react-router-dom'
import {useLocation,useNavigate} from 'react-router-dom'
import {useEffect} from 'react'
const Login = () => {
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    if (location.pathname === '/login') {
      navigate('/login/password')
    }
  }, [])
  return (
    <div>
      <Outlet/>
    </div>
  )
}
export default Login