import { useEffect, useState } from 'react'
import { ProRank } from '../../../api/proposals'
import { Modal } from 'antd'
import type { TeamRank as TeamRankType } from '../../../type/proposals/index'
import Update from '../../../commpent/game/base/updateS'
interface TeamRankProps {
  id: number
}

const TeamRank = ({ id }: TeamRankProps) => {
  const [rankList, setRankList] = useState<TeamRankType[]>([])
  const [isshow,setIsshow]=useState<boolean>(false)
  const [index,setIndex]=useState<number>(0)
  const [tranks,setTrank]=useState<boolean>(false)
  const type = 1
  const stage = 2
  useEffect(() => {
    ProRank(id).then((res) => {
      if (res.data.code === 200) {
        setRankList(res.data.data)
      } else {
        alert(res.data.message)
      }
    }).catch((err) => {
      console.error('获取排行榜失败:', err)
    })
  }, [id,tranks])

  return (
    <div style={{ width: '100%', maxWidth: '600px', margin: '20px auto', padding: '20px', background: '#fff', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>
        提案赛阶段小组积分排行榜
      </h2>

      {/* 表头 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 1fr', gap: '20px', padding: '10px 0', borderBottom: '2px solid #eee', fontWeight: 600, color: '#555' }}>
        <span>排名</span>
        <span>队伍名称</span>
        <span>队伍ID</span>
        <span>得分</span>
      </div>
     <Modal
       open={isshow}
       onCancel={()=>setIsshow(false)}
       footer={null}
     >
       <Update id={id} index={index} setIsshow={setIsshow} setTrank={setTrank} tranks={tranks} type={type} stage={stage} />
     </Modal>
      {/* 排行列表 */}
      <div style={{ marginTop: '10px' }}>
        {rankList.length > 0 ? (
          rankList.map((item, index) => (
            <div key={index} onClick={()=>
            {           setIndex(item.teamId)
                        setIsshow(true)

            }} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 1fr', gap: '20px', padding: '8px 0', borderBottom: '1px solid #f2f2f2', alignItems: 'center' }}>
              <span>第{item.rank}名</span>
              <span>{item.name}</span>
              <span>第{item.teamId}组</span>
              <span>{item.score}分</span>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', color: '#888', marginTop: '20px' }}>暂无排名数据</p>
        )}
      </div>
    </div>
  )
}

export default TeamRank
