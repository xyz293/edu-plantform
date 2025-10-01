import { ClassGame} from '../../api/game'
import {useEffect} from 'react'
import {useParams} from 'react-router-dom'
const ClassGames= ()=>{
    const params = useParams()
    const id = params.id
    useEffect(()=>{
        ClassGame(Number(id)).then((res)=>{
            console.log(res)
        })
    },[])
   return (
    <div>
      <h1>班级游戏</h1>
    </div>
   )
}
export default ClassGames