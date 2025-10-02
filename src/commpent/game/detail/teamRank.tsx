import {GameRank} from '../../../api/game'
import {useEffect, useState} from 'react'
import type {TeamRanks} from '../../../type/game/index'
const TeamRank = ({id}:{id:number})=>{
    const [rank,setRank] = useState<TeamRanks[]>([])
    useEffect(()=>{
        GameRank(id).then((res)=>{
            console.log(res)
            setRank(res.data.data)
        })
    },[id])
    return (
        <div>
            {rank.map((item,index)=>{
                return (
                    <div key={item.teamId}>
                        <p>{index+1}. {item.leaderName} - {item.totalScore}</p>
                    </div>
                )
            })}
        </div>
    )
}
export default TeamRank