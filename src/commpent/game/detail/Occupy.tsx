import { OccupyStatus, init} from '../../../api/game'
import { useEffect, useState } from 'react'
import type { GameInit } from '../../../type/game/index'
import type { gameRound } from '../../../type/game/index'
import { Button } from 'antd'
import type { Occupy, Unselect } from '../../../type/game/index'
import OccupyStates from './OccupyState'
import {useRef} from 'react'
interface Tile {
  tileId: number
  type: 'blackSwamp' | 'blindBox' | 'fortress' | 'goldCenter' | 'opportunity' | 'normal'
  occupied?: boolean
  displayNumber?: number | null
  teamId?: number | null // 添加队伍ID，用于显示哪个队伍占用了这个格子
}

const blackSwampTiles = [35, 53, 58, 120, 137, 138, 140, 141, 144, 157, 161, 191, 250, 257]
const blindBoxTiles = [135, 115, 143, 162]
const fortressTiles = [224, 56, 51, 219]
const goldCenterTiles = [139]
const opportunityTiles = [22]

const Occupy = ({ id, Round }: { id: number, Round: gameRound }) => {
  const [tiles, setTiles] = useState<Tile[]>([])
  const tileRef = useRef<any>(null);
  
  useEffect(() => {
    // 初始化游戏
    const gameInit: GameInit = {
      gameId: id,
      totalTiles: 285,
      blackSwampTiles: blackSwampTiles,
      blindBoxTiles: blindBoxTiles.map(tileId => ({ tileId, eventType: 0 })),
      fortressTiles: fortressTiles.map(tileId => ({ tileId, gameType: 0 })),
      goldCenterTiles: goldCenterTiles,
      opportunityTiles: opportunityTiles
    }

    init(gameInit).then(res => {
      console.log('初始化游戏', res)
      if (res.data.code === 200) {
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
            displayNumber: null,
            teamId: null
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
          allTiles.push({ 
            tileId: i, 
            type: 'normal', 
            displayNumber: null,
            occupied: false,
            teamId: null
          })
        }
      }

      setTiles(allTiles)
    })
  }, [Round.chessPhase])

  // 获取格子颜色
  const getColor = (tile: Tile) => {
    if (tile.occupied) return 'linear-gradient(45deg, #ff6b6b, #ff0000)' // 占用高亮渐变红
    switch (tile.type) {
      case 'blackSwamp': return 'linear-gradient(45deg, #2e2e2e, #505050)' // 深黑渐变
      case 'blindBox': return 'linear-gradient(45deg, #f7b500, #f1c232)' // 黄色渐变
      case 'fortress': return 'linear-gradient(45deg, #d36f23, #ff6600)' // 橙色渐变
      case 'goldCenter': return 'linear-gradient(45deg, #f1c232, #ffd700)' // 金色渐变
      case 'opportunity': return 'linear-gradient(45deg, #35e35e, #0ccb12)' // 绿色渐变
      default: return 'linear-gradient(45deg, #b0b0b0, #8c8c8c)' // 默认灰色渐变
    }
  }

  const handleTileClick = (tileId: number) => {
    if (!tileRef.current?.unselected || tileRef.current?.unselected.length === 0) {
      alert('暂无队伍可占用格子');
      return;
    }

    const currentTeam = tileRef.current.unselected[tileRef.current.index];
    if (!currentTeam || currentTeam.assignCount <= 0) {
      alert('该组已无格子可占用');
      return;
    }

    // 检查格子是否已被占用
    const tile = tiles.find(t => t.tileId === tileId);
    if (tile?.occupied) {
      alert('该格子已被占用');
      return;
    }

    // 检查是否已经在当前占用列表中
    const isAlreadySelected = tileRef.current.occupy?.tileIds?.includes(tileId);
    if (isAlreadySelected) {
      alert('该格子已在选择列表中');
      return;
    }

    // 添加到占用列表
    tileRef.current.setOccupy((prev: Occupy) => ({
      ...prev,
      tileIds: [...prev.tileIds, tileId],
    }));

    // 更新未占用数量
    tileRef.current.setUnselected((prev: Unselect[]) => 
      prev.map((item, idx) => 
        idx === tileRef.current.index 
          ? { ...item, assignCount: item.assignCount - 1 }
          : item
      )
    );

    // 更新格子显示状态
    setTiles(prev =>
      prev.map(tile => {
        if (tile.tileId === tileId) {
          const randomNum = Math.floor(Math.random() * 100) + 1;
          return { 
            ...tile, 
            displayNumber: randomNum, 
            occupied: true,
            teamId: currentTeam.teamId
          };
        }
        return tile;
      })
    );
    console.log('当前占用列表', tileRef.current.occupy);
  };
  
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
        {tileRef.current?.unselected && tileRef.current?.unselected.length > 0 && tileRef.current?.index < tileRef.current?.unselected.length ? (
          <h2 style={{ color: '#1890ff', margin: 0 }}>
            当前第{tileRef.current.unselected[tileRef.current.index].teamId}组有{tileRef.current.unselected[tileRef.current.index].assignCount}个格子未被占用
          </h2>
        ) : (
          <h2 style={{ color: '#52c41a', margin: 0 }}>
            所有队伍格子分配完成
          </h2>
        )}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(20, 35px)',
          gap: '4px',
          padding: '10px',
          background: '#f5f5f5',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          marginBottom: '20px'
        }}
      >
        {tiles.map(tile => (
          <div
            key={tile.tileId}
            title={`格子${tile.tileId} - 类型: ${tile.type}${tile.occupied ? ` - 被队伍${tile.teamId}占用` : ''}`}
            style={{
              width: '35px',
              height: '35px',
              borderRadius: '8px',
              background: getColor(tile),
              border: tile.occupied ? '2px solid #ff4d4f' : '1px solid #ccc',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#fff',
              fontWeight: 500,
              fontSize: '12px',
              cursor: tile.occupied ? 'not-allowed' : 'pointer',
              transition: 'transform 0.2s',
              opacity: tile.occupied ? 0.8 : 1,
            }}
            onClick={() => !tile.occupied && handleTileClick(tile.tileId)}
            onMouseEnter={e => {
              if (!tile.occupied) {
                e.currentTarget.style.transform = 'scale(1.2)';
              }
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            {tile.displayNumber ?? ''}
          </div>
        ))}
      </div>
      
      <div>
        {Round.chessPhase === 2 && <OccupyStates ref={tileRef} id={id} />}
      </div>
    </div>
  )
}

export default Occupy