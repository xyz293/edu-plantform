import {StudentRank} from '../../../api/game'
import {useEffect,useState} from 'react'
import type {StudentRanks} from '../../../type/game/index'
const PersonRank = ({id}:{id:number})=>{
    const [rank,setRank] = useState<StudentRanks[]>([])
     useEffect(()=>{
            StudentRank(id).then(res=>{
                console.log(res)
                setRank(res.data.data)
            })
    },[])
    return (
        <div>
          {rank.map((item,index)=>{
            return (
                <div key={item.studentId}>
                    <p>{index+1}. {item.studentName} - {item.individualScore}</p>
                </div>
            )
          })}
        </div>
    )
}
export default PersonRank