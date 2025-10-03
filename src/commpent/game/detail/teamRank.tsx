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
            <h3>占领格子数排行榜</h3>
            <div style={{display:"flex",justifyContent:'space-between'}}>
            <h4>排名</h4>
             <h4>队伍ID</h4>
             <h4>队长姓名</h4>
             <h4>占领格子数</h4>
            </div>
            {rank.map((item)=>{
                return (
                    <div key={item.teamId} style={{display:"flex",justifyContent:'space-between'}}>
                       <p>第{rank.indexOf(item)+1}名</p>
                       <p>第{item.teamId}组</p>
                       <p>{item.leaderName}</p>
                       <p>{item.totalTile}</p>
                    </div>
                )
            })}
        </div>
    )
}
export default TeamRank