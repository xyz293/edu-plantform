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
import type {Pref} from '../../../type/hock/index'
import {useState,useEffect} from 'react'
import type {Proposalslist} from '../../../type/proposals/index'
import {useDel} from '../../../ulits/tool'
import {useContext} from 'react'
interface Props{
  teamRanks:TeamRanks[]
  id:number
  gameStatus:gameRound |null    
  list:number[]
}
const FristStage =forwardRef<Pref,Props>(({teamRanks,id,gameStatus,list}:Props,pref)=>{   //通过子组件暴露方法或者属性一般是等子组件加载之后进行的
    const sortedRanks = useMemo(() => {
      return [...teamRanks]
    }, [teamRanks]);
    const cref = useRef<Pref>(null)
    console.log(cref.current?.proposal)
      const [proposal,setProposal] = useState<Proposalslist[]>([])
      const {isDel,setIsDel} = useContext(useDel)
    useEffect(()=>{
        if(cref.current?.proposal){
            console.log(cref.current.proposal)
            setProposal(cref.current.proposal)
        }
    },[cref.current?.proposal])
    useImperativeHandle(pref,()=>(
        {
            proposal:proposal || []
        }
    ))
    const show =()=>{
        switch(gameStatus?.proposalStage){
            case 1:
                return  <SelectTeam id={id} list={list} teamRanks={sortedRanks} />
            case 0:
                return  <Store teamRanks={sortedRanks} id={id} />
             case 2:
                return <FirstProposal id={id} gameStatus={gameStatus} ref={cref}  />
            case 3:
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