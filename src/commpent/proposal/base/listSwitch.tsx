import { Button } from 'antd';
import {StudentRank} from '../../../api/game'
import Personlist from '../../../commpent/game/detail/perosnRank'
import {useEffect, useState} from 'react'
import type {StudentRanks} from '../../../type/game/index'
interface Props{
  id:number
}
const ListSwitch =({id}:Props)=>{
    const [srank,setSrank] = useState<StudentRanks[]>([])
    useEffect(()=>{
      Promise.all([StudentRank(id)]).then(([studentRank])=>{
       console.log(studentRank)
       setSrank(studentRank.data.data)
      })
    },[id])
    const [index,setIndex] = useState<number>(1)
    const show =()=>{
        switch(index){
            case 1:
                return <Personlist srank={srank} id={id} />  //一会使用usecontext去传入变量
            case 0:
                return <div></div>
        }
    }

   return (
    <div style={{display:'flex',gap:'20px',flexDirection:'column'}}>
       <div style={{display:'flex',justifyContent:'center',gap:'10px',width:'55%'}}>
        <Button onClick={()=>setIndex(0)}>团队排行表</Button>
        <Button onClick={()=>setIndex(1)}>学生排行表</Button>
       </div>
     
        {show()}
    </div>
   )
}
export default ListSwitch