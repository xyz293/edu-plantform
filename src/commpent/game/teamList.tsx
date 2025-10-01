// TeamLists.tsx
import { TeamList } from '../../api/team'
import { useEffect, useState } from 'react'
import type { Teamlist } from '../../type/Team/index'
import Member from './member'
import { Button } from 'antd'

const TeamLists = ({ id }: { id: number }) => {
  const [team, setTeam] = useState<Teamlist[]>([])
  const [isshow, setIsshow] = useState<boolean[]>([])

  useEffect(() => {
    TeamList(id).then((res) => {
      setTeam(res.data.data.teams)
      setIsshow(res.data.data.teams.map(() => false))
    })
  }, [id])

  return (
    <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <div style={{
        display: 'flex',
        justifyContent: "space-between",
        gap: '20px',
        fontWeight: 'bold',
        borderBottom: '2px solid #f0f0f0',
        paddingBottom: '8px',
        marginBottom: '12px'
      }}>
        <div>组长ID</div>
        <div>组长名字</div>
        <div>组长学号</div>
        <div>组员数量</div>
        <div>操作</div>
      </div>

      {team.length === 0 ? (
        <h3 style={{ textAlign: 'center', color: '#999' }}>暂无团队</h3>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {team.map((item, index) => (
            <div
              key={item.teamId}
              style={{
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '12px',
                backgroundColor: '#fafafa'
              }}
            >
              <div style={{ display: 'flex', justifyContent: "space-between", alignItems: 'center', gap: '20px' }}>
                <div style={{ width: '20%' }}>{item.leaderId}</div>
                <div style={{ width: '20%' }}>{item.leaderName}</div>
                <div style={{ width: '20%' }}>{item.leaderSno}</div>
                <div style={{ width: '20%' }}>{item.totalMembers}</div>
                <div>
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => setIsshow(prev => prev.map((val, idx) => idx === index ? !val : val))}
                  >
                    {isshow[index] ? '收起' : '展开'}
                  </Button>
                </div>
              </div>
              {isshow[index] && <Member member={item.members} />}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
export default TeamLists
