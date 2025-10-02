import { GameStatus, Unselected } from '../../../../api/game'
import { useEffect, useState } from 'react'
import type { gameRound } from '../../../../type/game/index'
import { useParams } from 'react-router-dom'
import { Button } from 'antd'
import UploadGrade from '../../../../commpent/game/detail/upload'
import PersonRank from '../../../../commpent/game/detail/perosnRank'
import TeamRank from '../../../../commpent/game/detail/teamRank'
import Occupy from '../../../../commpent/game/detail/Occupy'

const GameDetail = () => {
  const params = useParams()
  const id = Number(params.id)

  const [Round, setRound] = useState<gameRound>({
    proposalRound: 0,
    proposalStage: 0,
    stage: 0,
    chessPhase: 0,
    chessRound: 0,
  })

  const [showPersonRank, setShowPersonRank] = useState(false)

  useEffect(() => {
    Promise.all([GameStatus(id), Unselected(id)]).then(([statusRes]) => {
      setRound(statusRes.data.data)
    })
  }, [id])

  return (
    <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', padding: 20 }}>
      {/* 左侧：排名 + 上传成绩 */}
      <div style={{ flex: 1, minWidth: 300, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ padding: 16, border: '1px solid #eee', borderRadius: 8, background: '#fafafa' }}>
          <Button onClick={() => setShowPersonRank(!showPersonRank)}>
            切换排名
          </Button>
          <div style={{ marginTop: 16 }}>
            {showPersonRank ? <PersonRank id={id} /> : <TeamRank id={id} />}
          </div>
        </div>

        <UploadGrade id={id} Round={Round} />
      </div>

      {/* 右侧：棋盘占有 */}
      <div style={{ flex: 1, minWidth: 300, padding: 16, border: '1px solid #eee', borderRadius: 8, background: '#fafafa' }}>
        <Occupy id={id} />
      </div>
    </div>
  )
}

export default GameDetail
