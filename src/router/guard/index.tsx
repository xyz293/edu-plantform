import {useEffect} from 'react'
import {getToken} from '../../ulits/tool'
import {useNavigate} from 'react-router-dom'
const Guard = ({children}:{children:React.ReactNode}) =>{
    const token = getToken()
    console.log(token)
    const navigate = useNavigate()
    useEffect(()=>{
        if(!token){
            navigate('/login')
        }
    },[])
    return (
        <div>
            {children}
        </div>
    )
}
export default Guard