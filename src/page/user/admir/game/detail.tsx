import { GameStatus, GradeRank } from '../../../../api/game'
import { useEffect, useState } from 'react'
import type { gameRound, GradeRanks } from '../../../../type/game/index'
import { useParams } from 'react-router-dom'
import { Button, Modal } from 'antd'
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
      setRound(statusRes.data.data)
      setGradeRanks(rankRes.data.data)
    })
  }, [id])

  return (
    <div style={{
      display: 'flex',
      gap: 20,
      flexWrap: 'wrap',
      padding: 20,
      background: '#f5f5f5'
    }}>
      {/* 左侧内容区 */}
      <div style={{
        flex: 1,
        minWidth: 360,
        display: 'flex',
        flexDirection: 'column',
        gap: 20
      }}>
        <div style={{
          padding: 16,
          border: '1px solid #d9d9d9',
          borderRadius: 8,
          background: '#ffffff'
        }}>
          <Button onClick={() => setShowPersonRank(!showPersonRank)} block>
            {showPersonRank ? "切换到队伍排名" : "切换到个人排名"}
          </Button>
          <div style={{ marginTop: 16 }}>
            {showPersonRank ? <PersonRank id={id} /> : <TeamRank id={id} />}
          </div>
        </div>

        <UploadGrade
          id={id}
          Round={Round}
          showUploadAssign={setShowUploadAssign}
          gradeRanks={gradeRanks}
        />
      </div>

      {/* 右侧棋盘占领情况 */}
      <div style={{
        flex: 1,
        minWidth: 360,
        padding: 16,
        border: '1px solid #d9d9d9',
        borderRadius: 8,
        background: '#ffffff'
      }}>
        <Occupy id={id} />
      </div>

      {/* 上传分配 Modal */}
      <Modal
        open={showUploadAssign}
        onCancel={() => setShowUploadAssign(false)}
        footer={null}
        centered
      >
        <UploadAssign />
      </Modal>
    </div>
  )
}

export default GameDetail
