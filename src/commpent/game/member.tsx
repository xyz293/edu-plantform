// Member.tsx
import type { TeamMember } from '../../type/Team/index'

const Member = ({ member }: { member: TeamMember[] }) => {
  return (
    <div style={{
      marginTop: '10px',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '10px',
      backgroundColor: '#fafafa'
    }}>
      {member.map((item, i) => {
        return (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '6px 10px',
              borderBottom: '1px solid #f0f0f0'
            }}
          >
            <div style={{ width: '10%', fontWeight: item.isLeader ? 'bold' : 'normal', color: item.isLeader ? '#1890ff' : '#555' }}>
              {item.isLeader ? '组长' : '组员'}
            </div>
            <div style={{ width: '30%' }}>{item.studentName}</div>
            <div style={{ width: '30%' }}>{item.studentId}</div>
            <div style={{ width: '30%' }}>{item.studentSno}</div>
          </div>
        )
      })}
    </div>
  )
}
export default Member
