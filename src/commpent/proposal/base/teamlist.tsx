import type { TeamRanks } from '../../../type/game/index'
import { Button } from 'antd'
import { useState, useRef } from 'react'
import type { ReOutTeam } from '../../../type/game/index'
import { ReOutTeams } from '../../../api/game'
import type {gameRound} from '../../../type/game/index'

const TeamList = ({
  teamRanks,
  id,
  setIsDel,
  isDel,
  gameStatus
}: {
  teamRanks: TeamRanks[]
  id: number
  setIsDel: (isDel: boolean) => void
  isDel: boolean
  gameStatus:gameRound|null
}) => {
  const [outTeam, setOutTeam] = useState<ReOutTeam>({
    gameId: Number(id),
    teamIds: [],
    type: 0, // 2为淘汰
  })
  console.log(gameStatus)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState<number>(0)

  const handleScroll = () => {
    setIndex(Math.floor((scrollRef.current?.scrollTop || 0) / 50))
  }

  const visibleList = teamRanks.slice(index, index + 8)

  const delTeam = async (teamId: number, status: number) => {
    const newdata = {
      ...outTeam,
      teamIds: [teamId], // ✅ 每次只操作一个 teamId（避免越传越多）
      type: status === 1 ? 2 : 1,
    }

    setOutTeam(newdata)
    const res = await ReOutTeams(newdata)
    if (res.data.code === 200) {
      setIsDel(!isDel)
    }
  }

  return (
    <div
      style={{
        width: '480px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        overflow: 'hidden',
        background: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      }}
    >
      {/* 表头 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1.5fr 1fr 1fr',
          padding: '10px 0',
          textAlign: 'center',
          backgroundColor: '#fafafa',
          borderBottom: '1px solid #eee',
          fontWeight: 'bold',
          position: 'sticky',
          top: 0,
          zIndex: 1,
        }}
      >
        <div>排名</div>
        <div>组号</div>
        <div>姓名</div>
        <div>积分</div>
       {(gameStatus?.proposalStage != 1) && <div>操作</div>}
      </div>

      {/* 滚动列表 */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        style={{
          height: '400px',
          overflowY: 'auto',
          position: 'relative',
        }}
      >
        <div style={{ height: teamRanks.length * 50 + 'px', position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              top: index * 50 + 'px',
              left: 0,
              width: '100%',
            }}
          >
            {visibleList.map((item, i) => (
              <div
                key={item.teamId}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1.5fr 1fr 1fr',
                  alignItems: 'center',
                  height: '50px',
                  textAlign: 'center',
                  borderBottom: '1px solid #f2f2f2',
                  transition: 'background 0.2s',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#fafafa')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <div>第{index + i + 1}名</div>
                <div>第{item.teamId}组</div>
                <div>{item.leaderName}</div>
                <div>{item.totalScore}分</div>
               {(gameStatus?.proposalStage != 1) && 
                <Button
                  type={item.status === 1 ? 'primary' : 'default'}
                  size="small"
                  onClick={() => delTeam(item.teamId, item.status)}
                  style={{
                    transition: 'all 0.2s',
                  }}
                >
                  {item.status === 1 ? '删除' : '恢复'}
                </Button>
               }
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamList
