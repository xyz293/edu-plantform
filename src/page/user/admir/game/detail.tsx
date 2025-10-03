import { GameStatus, GradeRank } from '../../../../api/game'
import { useEffect, useState } from 'react'
import type { gameRound, GradeRanks } from '../../../../type/game/index'
import { useParams } from 'react-router-dom'
import { Button, Modal, Card } from 'antd'
import UploadGrade from '../../../../commpent/game/detail/upload'
import PersonRank from '../../../../commpent/game/detail/perosnRank'
import TeamRank from '../../../../commpent/game/detail/teamRank'
import Occupy from '../../../../commpent/game/detail/Occupy'
import UploadAssign from '../../../../commpent/game/detail/UploadAssign'

const GameDetail = () => {
  const params = useParams()
  const id = Number(params.id)

  const [gradeRanks, setGradeRanks] = useState<GradeRanks[]>([])
  const [showUploadAssign, setShowUploadAssign] = useState(false)
  const [Round, setRound] = useState<gameRound>({
    proposalRound: 0,
    proposalStage: 0,
    stage: 0,
    chessPhase: 0,
    chessRound: 0,
  })
  const [showPersonRank, setShowPersonRank] = useState(false)

  useEffect(() => {
    Promise.all([GameStatus(id), GradeRank(id)]).then(([statusRes, rankRes]) => {
      console.log(statusRes, rankRes)
      setRound(statusRes.data.data)
      setGradeRanks(rankRes.data.data)
    })
  }, [id])

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 2fr 1.3fr',
        gap: 20,
        padding: 20,
        background: '#f5f5f5',
        minHeight: '100vh',
      }}
    >
      {/* 左侧排名区 */}
      <Card
        title="排名"
        style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
        bodyStyle={{ padding: 16 }}
      >
        <Button
          type="primary"
          onClick={() => setShowPersonRank(!showPersonRank)}
          block
        >
          {showPersonRank ? '切换到队伍排名' : '切换到个人排名'}
        </Button>
        <div style={{ marginTop: 16 }}>
          {showPersonRank ? <PersonRank id={id} /> : <TeamRank id={id} />}
        </div>
      </Card>

      {/* 中间棋盘区 */}
      <Card
        title="棋盘占领情况"
        style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
        bodyStyle={{ padding: 16, display: 'flex', justifyContent: 'center' }}
      >
        <Occupy id={id}  Round={Round}/>
      </Card>

      {/* 右侧上传区 */}
      <Card
        title="上传数据"
        style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
      >
        <UploadGrade
          id={id}
          Round={Round}
          showUploadAssign={setShowUploadAssign}
          gradeRanks={gradeRanks}
        />
      </Card>

      {/* 上传分配 Modal */}
      <Modal
        open={showUploadAssign}
        onCancel={() => setShowUploadAssign(false)}
        footer={null}
        centered
      >
        <UploadAssign  gradeRanks={gradeRanks}  setShowUploadAssign={setShowUploadAssign} id={id} />
      </Modal>
    </div>
  )
}

export default GameDetail
