
import type {TeamRanks} from '../../../type/game/index'
const TeamRank = ({trank}:{trank:TeamRanks[]})=>{

   
    return (
        <div>
            <h3>占领格子数排行榜</h3>
            <div style={{display:"flex",justifyContent:'space-between'}}>
            <h4>排名</h4>
             <h4>队伍ID</h4>
             <h4>队长姓名</h4>
             <h4>占领格子数</h4>
            </div>
            {trank.map((item)=>{
                return (
                    <div key={item.teamId} style={{display:"flex",justifyContent:'space-between'}}>
                       <p>第{trank.indexOf(item)+1}名</p>
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