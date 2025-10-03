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
                 {list.map((item)=>{
            return (
                <div key={item.studentId} style={{height:'50px'}}>
                    <p>{item.studentName} - {item.individualScore}</p>
                </div>
            )
          })}
            </div>

         </div>
        </div>
    )
}
export default PersonRank