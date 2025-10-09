import { Card } from 'antd'
import TeamList from '../base/teamlist'
import SelectTeam from '../base/selectTeam'
import Store from '../base/store'
import {useMemo} from 'react'
import type { TeamRanks } from "../../../type/game/index";
import type { gameRound } from "../../../type/game/index";
import FirstProposal from '../base/firstProposal'
import {useRef} from 'react'
import {forwardRef,useImperativeHandle} from 'react'
interface Props{
  teamRanks:TeamRanks[]
  id:number
  setIsDel:(isDel:boolean)=>void
  isDel:boolean
  gameStatus:gameRound |null    
  list:number[]
}
const FristStage =forwardRef(({teamRanks,id,setIsDel,isDel,gameStatus,list}:Props,pref)=>{
    const sortedRanks = useMemo(() => {
      return [...teamRanks]
    }, [teamRanks]);
    const cref = useRef<null>(null)
    useImperativeHandle(pref,()=>(
        {
             proposal:cref.current? //之后会暴露方法
        }
    ))
    const show =()=>{
        switch(gameStatus?.proposalStage){
            case 1:
                return  <SelectTeam id={id} list={list} teamRanks={sortedRanks} />
            case 0:
                return  <Store teamRanks={sortedRanks} id={id} />
             case 2:
                return <FirstProposal id={id} gameStatus={gameStatus} ref={cref} />
        }
    }
    return (
        <div style={{display:'flex',justifyContent:'space-between',width:'600px'}}>
      
      {gameStatus?.proposalStage === 1||gameStatus?.proposalStage === 0&&
             <Card
      title="队伍排名"
      style={{
        boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
        borderRadius: 12,
        background: "#ffffff",
        padding: 24,
        transition: "all 0.3s",
      }}
      hoverable
    >
      <TeamList teamRanks={sortedRanks} id={id} setIsDel={setIsDel} isDel={isDel} gameStatus={gameStatus} />
      </Card>
      }

    {/* 商店或资源面板 */}
    <Card
      title="资源商店"
      style={{
        boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
        borderRadius: 12,
        background: "#ffffff",
        padding: 24,
        transition: "all 0.3s",
      }}
      hoverable
    >
      {show()}
    </Card>
        </div>
    )
})
export default FristStage