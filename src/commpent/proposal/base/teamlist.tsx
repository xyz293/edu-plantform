import type { TeamRanks } from '../../../type/game/index'
import { Button } from 'antd'
import { useState,useEffect } from 'react'
import type { ReOutTeam } from '../../../type/game/index'
import { ReOutTeams } from '../../../api/game'

const TeamList = ({ teamRanks, id }: { teamRanks: TeamRanks[]; id: number }) => {
  const [outTeam, setOutTeam] = useState<ReOutTeam>({
    gameId: Number(id),
    teamIds: [],
    type: 0, // 2为淘汰
  })
  const ReTeam = async (teamId: number, action: boolean) => {
    const newOutTeam ={
        ...outTeam,
        teamIds: [...outTeam.teamIds, teamId],
        type: action===true ? 2 : 1,
    }

    const res = await ReOutTeams(newOutTeam)
      console.log(res)
  }
  const [isshow, setIsshow] = useState<boolean[] >([])
  useEffect(() => {
    setIsshow(teamRanks.map(() => true))
  }, [teamRanks])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {/* 表头 */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', fontWeight: 'bold' }}>
        <div>排名</div>
        <div>组号</div>
        <div>姓名</div>
        <div>积分</div>
        <div>操作</div>
      </div>

      {/* 每一行 */}
      {teamRanks.map((item, index) => (
        <div
          key={item.teamId}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '50px',
            borderBottom: '1px solid #eee',
            padding: '4px 0',
          }}
        >
          <div>第{index + 1}名</div>
          <div>第{item.teamId}组</div>
          <div>{item.leaderName}</div>
          <div>{item.totalScore}分</div>

          <Button
            type={isshow[index] ? 'primary' : 'default'}
            size="small"
            onClick={() => {
               ReTeam(item.teamId, isshow[index])
              setIsshow(prev => prev.map((v, idx) => (idx === index ? !v : v)))

            }}
          >
            {isshow[index] ? '删除' : '恢复'}
          </Button>
        </div>
      ))}
    </div>
  )
}

export default TeamList
