
import {useState,useRef} from 'react'
import type {StudentRanks} from '../../../type/game/index'
import UpdateScore from '../base/updateS'
import {Modal} from 'antd'
const PersonRank = ({srank,id}:{srank:StudentRanks[],id:number})=>{
    console.log(id)
    const rankRef = useRef<HTMLDivElement>(null)
    const [isshow,setIsshow] = useState<boolean>(false)
    const [Startindex,setIndex] = useState<number>(0)
  
    const [index,setsIndex] = useState<number>(0)
    const Sroll = ()=>{
        if(rankRef.current){
            setIndex(Math.floor(rankRef.current.scrollTop / 50))
        }

    }
    const list =srank.slice(Startindex,Startindex+400/50)
    return (
        <div ref={rankRef}  onScroll={Sroll} style={{height:'500px',overflow:'auto',position:'relative'}}>
         <div style={{height:50*srank.length}}>
            <div style={{position:'absolute',top:Startindex*50,left:0}}> 
                <h3>个人积分排行榜</h3>
                  <div style={{display:"flex",justifyContent:'space-between'}}>
            <h4>排名</h4>
             <h4>队伍ID</h4>
             <h4>姓名</h4>
             <h4>个人积分</h4>
            </div>
            <Modal
             open={isshow} 
             onCancel={()=>{setIsshow(false)}}
              footer={null}
             >
            <UpdateScore id={id} index={index} setIsshow={setIsshow}/>
            </Modal>
                 {list.map((item)=>{
            return (
                <div key={item.studentId} style={{display:"flex",justifyContent:'space-between'}} onClick={()=>{
                         setIsshow(true)
                         setsIndex(item.studentId)
                }}>
                  <p>第{srank.indexOf(item)+1}名</p>
                       <p>第{item.teamId}组</p>
                       <p>{item.studentName}</p>
                       <p>{item.individualScore}</p>
                </div>
            )
          })}
            </div>

         </div>
        </div>
    )
}
export default PersonRank