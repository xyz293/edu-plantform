import { useState, useEffect ,useRef} from 'react'
import type { TeamRanks } from "../../../type/game"
import {ProposalsOrder} from '../../../api/proposals'
import {Button} from 'antd'
interface SelectTeamProps {
  list: number[]
  teamRanks: TeamRanks[]
}

const SelectTeam = ({ list, teamRanks }: SelectTeamProps) => {
  const [team, setTeam] = useState<TeamRanks[]>([])
  const [index,setIndex]=useState<number>(0)
  const ref=useRef<HTMLDivElement>(null)
  const handleScroll=()=>{
    if(ref?.current?.scrollTop){
      setIndex(Math.floor(ref.current.scrollTop/50))
    }
  }
  useEffect(() => {
    setTeam(teamRanks.filter((item) => !list.includes(item.teamId)))
  }, [list, teamRanks]) 
  console.log(team)
   const lists = team.slice(index,index+(400/50))
   const [isOrder,setIsOrder]=useState<boolean[]>(lists.map(()=>false))
  return (
    <div>
      <h2>选择队伍</h2>
        <div ref={ref} onScroll={handleScroll} style={{height:'400px',overflowY:'auto',position:'relative'}}>
        <div style={{height:list.length*50+'px'}}>
          <div style={{position:'absolute',top:index*50+'px',left:'0'}}>
              {lists.map((item,index) => (
        <div key={item.teamId} style={{display:'flex',justifyContent:'center',gap:'80px'}}>
         <div>
            <h3>第{item.teamId}组</h3>
            </div>
            <div>
                 <h3>{item.leaderName}</h3>
                </div>
                <div>
                   <input type="checkbox" checked={isOrder[index]}  />
                    </div>
        </div>
        ))}
          </div>
          
        </div>
        
        </div>
        <div style={{display:'flex',justifyContent:'center',gap:'20px'}}> 
                 <Button type='primary' onClick={()=>setIsOrder(lists.map(()=>false))}>
                  重置
                 </Button>
                 <Button type='primary'>
                     提交
                 </Button>
          </div>
    </div>
  )
}

export default SelectTeam
