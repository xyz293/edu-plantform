import { OccupyStatus } from '../../../api/game'
import { useEffect, useState } from 'react'

interface Tile {
  tileId: number
  type: 'blackSwamp' | 'blindBox' | 'fortress' | 'goldCenter' | 'opportunity' | 'normal'
  occupied?: boolean
}

const blackSwampTiles = [35, 53, 58, 120, 137, 138, 140, 141, 144, 157, 161, 191, 250, 257]
const blindBoxTiles = [135, 115, 143, 162]
const fortressTiles = [224, 56, 51, 219]
const goldCenterTiles = [139]
const opportunityTiles = [22]

const Occupy = ({ id }: { id: number }) => {
  const [tiles, setTiles] = useState<Tile[]>([])

  useEffect(() => {
    OccupyStatus(id).then((res) => {
      console.log('占用状态', res)

      const allTiles: Tile[] = []

      const addTiles = (ids: number[], type: Tile['type']) => {
        ids.forEach((tileId) => {
          allTiles.push({
            tileId,
            type,
            occupied: false // 后续可以根据返回状态修改
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
        if (!allTiles.find((t) => t.tileId === i)) {
          allTiles.push({ tileId: i, type: 'normal' })
        }
      }

      setTiles(allTiles)
    })
  }, [id])

  const getColor = (tile: Tile) => {
    if (tile.occupied) return '#ff6b6b' // 占用高亮红
    switch (tile.type) {
      case 'blackSwamp':
        return '#1e1e1e'
      case 'blindBox':
        return '#ffcc00'
      case 'fortress':
        return '#ff6600'
      case 'goldCenter':
        return '#ffd700'
      case 'opportunity':
        return '#0ccb12'
      default:
        return '#8c8c8c'
    }
  }

  return (
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
      {tiles.map((tile) => (
        <div
          key={tile.tileId}
          title={`格子ID: ${tile.tileId} 类型: ${tile.type}`}
          style={{
            width: '35px',
            height: '35px',
            borderRadius: '8px',
            backgroundColor: getColor(tile),
            border: '1px solid #ccc',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: tile.type === 'blackSwamp' ? '#fff' : '#333',
            fontWeight: 500,
            fontSize: '12px',
            cursor: 'pointer',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget
            el.style.transform = 'scale(1.2)'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget
            el.style.transform = 'scale(1)'
          }}
        >
          {tile.tileId}
        </div>
      ))}
    </div>
  )
}

export default Occupy
