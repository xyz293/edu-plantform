import { OccupyStatus ,init } from '../../../api/game'
import { useEffect, useState } from 'react'
import type { GameInit } from '../../../type/game/index'
import {Unselected } from '../../../api/game'
import type {Unselect} from '../../../type/game/index'
import type {gameRound} from '../../../type/game/index'
import { Button } from 'antd'
import type {Occupy} from '../../../type/game/index'
interface Tile {
  tileId: number
  type: 'blackSwamp' | 'blindBox' | 'fortress' | 'goldCenter' | 'opportunity' | 'normal'
  occupied?: boolean
  displayNumber?: number | null
}

const blackSwampTiles = [35, 53, 58, 120, 137, 138, 140, 141, 144, 157, 161, 191, 250, 257]
const blindBoxTiles = [135, 115, 143, 162]
const fortressTiles = [224, 56, 51, 219]
const goldCenterTiles = [139]
const opportunityTiles = [22]

const Occupy = ({ id ,Round}: { id: number ,Round:gameRound}) => {
  const [tiles, setTiles] = useState<Tile[]>([])
  const [unselected, setUnselected] = useState<Unselect[]>([])
  const [occupy, setOccupy] = useState<Occupy[]>([])
  const [index,setIndex] = useState<number>(0)
  useEffect(() => {
    // 初始化游戏
    if(Round.chessPhase===2){
    Unselected(id).then(res=>{
      console.log('未占用', res)
      setUnselected(res.data.data)
    })
  }
    const gameInit: GameInit = {
      gameId: id,
      totalTiles: 0,
      blackSwampTiles: blackSwampTiles,
      blindBoxTiles: blindBoxTiles.map(tileId => ({ tileId, eventType: 0 })),
      fortressTiles: fortressTiles.map(tileId => ({ tileId, gameType: 0 })),
      goldCenterTiles: goldCenterTiles,
      opportunityTiles: opportunityTiles
    }

    init(gameInit).then(res=>{
      console.log('初始化游戏', res)
      if(res.data.code===200){
        alert('初始化游戏成功')
      }
    })

    // 获取占用状态
    OccupyStatus(id).then((res) => {
      console.log('占用状态', res)

      const allTiles: Tile[] = []

      const addTiles = (ids: number[], type: Tile['type']) => {
        ids.forEach(tileId => {
          allTiles.push({
            tileId,
            type,
            occupied: false,
            displayNumber: null
          })
        })
      }

      addTiles(blackSwampTiles, 'blackSwamp')
      addTiles(blindBoxTiles, 'blindBox')
      addTiles(fortressTiles, 'fortress')
      addTiles(goldCenterTiles, 'goldCenter')
      addTiles(opportunityTiles, 'opportunity')

      // 普通格子
      for (let i = 1; i <= 260; i++) {
        if (!allTiles.find(t => t.tileId === i)) {
          allTiles.push({ tileId: i, type: 'normal', displayNumber: null })
        }
      }

      setTiles(allTiles)
    })
  }, [id,Round.chessPhase])

  const getColor = (tile: Tile) => {
    if (tile.occupied) return '#ff6b6b' // 占用高亮红
    switch (tile.type) {
      case 'blackSwamp': return '#1e1e1e'
      case 'blindBox': return '#ffcc00'
      case 'fortress': return '#ff6600'
      case 'goldCenter': return '#ffd700'
      case 'opportunity': return '#0ccb12'
      default: return '#8c8c8c'
    }
  }

  const handleClick = (tileId: number) => {
    setTiles(prev =>
      prev.map(tile => {
        if (tile.tileId === tileId) {
          // 生成随机数字，例如 1-100
          const randomNum = Math.floor(Math.random() * 100) + 1
          return { ...tile, displayNumber: randomNum, occupied: true }
        }
        return tile
      })
    )
  }

  return (
    <div>
      <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        {unselected.length===0?'':<h1>当前有{unselected[index].teamId}组有{unselected[index].assignCount}个格子未被占用</h1>}
      </div>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(20, 35px)',
        gap: '4px',
        padding: '10px',
        background: '#f5f5f5',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
      }}
    >
      
      {tiles.map(tile => (
        <div
          key={tile.tileId}
          title={`格子类型: ${tile.type}`}
          style={{
            width: '35px',
            height: '35px',
            borderRadius: '8px',
            backgroundColor: getColor(tile),
            border: '1px solid #ccc',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
            fontWeight: 500,
            fontSize: '12px',
            cursor: 'pointer',
            transition: 'transform 0.2s',
          }}
          onClick={() => handleClick(tile.tileId)}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.2)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          {tile.displayNumber ?? ''} {/* 初始为空，点击后显示随机数字 */}
        </div>
      ))}
    </div>
    <div style={{padding:'20px',display:'flex',justifyContent:'center',alignItems:'center',gap:'20px'}}>
      <Button size='large' type='default'> 取消占用</Button>
      <Button size='large' type='primary' onClick={()=>{
       
      }}>提交占用</Button>
    </div>
    </div>
  )
}

export default Occupy
