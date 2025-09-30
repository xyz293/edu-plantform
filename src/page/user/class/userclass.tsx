import {getClass } from '../../../api/class'
import {useEffect} from 'react'
const UserClass = () => {
    useEffect(()=>{
        getClass(1,10,'').then(res=>{
            console.log(res)
        })
    },[])
   return (
    <div>
      <h1>user class</h1>
    </div>
   )
}
export default UserClass