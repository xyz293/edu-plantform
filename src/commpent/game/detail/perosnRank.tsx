import {StudentRank} from '../../../api/game'
import {useEffect,useState,useRef} from 'react'
import type {StudentRanks} from '../../../type/game/index'
const PersonRank = ({id}:{id:number})=>{
    const [rank,setRank] = useState<StudentRanks[]>([])
    const rankRef = useRef<HTMLDivElement>(null)
    const [Startindex,setIndex] = useState<number>(0)
     useEffect(()=>{
            StudentRank(id).then(res=>{
                console.log(res)
                setRank(res.data.data)
            })
    },[])
    const Sroll = ()=>{
        if(rankRef.current){
            setIndex(Math.floor(rankRef.current.scrollTop / 50))
        }

    }
    const list =rank.slice(Startindex,Startindex+400/50)
    return (
        <div ref={rankRef}  onScroll={Sroll} style={{height:'400px',overflow:'auto',position:'relative'}}>
         <div style={{height:50*rank.length}}>
            <div style={{position:'absolute',top:Startindex*50,left:0}}> 
                <h3>个人积分排行榜</h3>
                  <div style={{display:"flex",justifyContent:'space-between'}}>
            <h4>排名</h4>
             <h4>队伍ID</h4>
             <h4>姓名</h4>
             <h4>个人积分</h4>
            </div>
                 {list.map((item)=>{
            return (
                <div key={item.studentId} style={{display:"flex",justifyContent:'space-between'}}>
                  <p>第{rank.indexOf(item)+1}名</p>
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