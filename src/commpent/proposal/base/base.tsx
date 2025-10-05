import {GameRank} from '../../../api/game'
import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import type {TeamRanks} from '../../../type/game/index'
import TeamList from './teamlist'
import Store from './store'

const BaesProposal =()=>{
    const params = useParams()
    const id = Number(params.id)
    const [teamRanks, setTeamRanks] = useState<TeamRanks[]>([])
    useEffect(() => {
     Promise.all([
        GameRank(id),
       
     ]).then(([gameRank]) => {
        console.log(gameRank)
        setTeamRanks(gameRank.data.data)
     })
    }, [id])
    return (<div>
        <div style={{display:'flex',width:'800px'}}>
  <div style={{flex:1,display:'flex',justifyContent:'flex-end'}}>
    <TeamList teamRanks={teamRanks} id={id} />
  </div>
  <div style={{flex:1,display:'flex',justifyContent:'center'}}>
    <Store teamRanks={teamRanks} id={id} />
  </div>
</div>

    </div>)
}
export default BaesProposal