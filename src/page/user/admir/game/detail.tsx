import { GameStatus, GradeRank,OccupyStatus } from '../../../../api/game'
import { useEffect, useState } from 'react'
import type { gameRound, GradeRanks } from '../../../../type/game/index'
import { useParams } from 'react-router-dom'
import { Button, Modal, Card } from 'antd'
import {StudentRank} from './../../../../api/game'
import {useData} from '../../../../ulits/tool'
import {GameRank} from '../../../../api/game'
import UploadGrade from '../../../../commpent/game/detail/upload'
import PersonRank from '../../../../commpent/game/detail/perosnRank'
import TeamRank from '../../../../commpent/game/detail/teamRank'
import Occupy from '../../../../commpent/game/detail/Occupy'
import UploadAssign from '../../../../commpent/game/detail/UploadAssign'
import type {StudentRanks} from '../../../../type/game/index'
import type {TeamRanks} from '../../../../type/game/index'
const GameDetail = () => {
  const params = useParams()
  const id = Number(params.id)
  const [isUpload,setIsUpload]= useState<boolean>(false)
  const [gradeRanks, setGradeRanks] = useState<GradeRanks[]>([])
  const [showUploadAssign, setShowUploadAssign] = useState(false)
  const [srank,setStudentRank] = useState<StudentRanks[]>([])
  const [trank,setTeamRank] = useState<TeamRanks[]>([])
  const [Round, setRound] = useState<gameRound>({
    proposalRound: 0,
    proposalStage: 0,
    stage: 0,
    chessPhase: 0,
    chessRound: 0,
  })
   const getRank = async ()=>{
    const res = await StudentRank(id)
    const res1 = await GameRank(id)
    if(res.data.code === 200){
      setStudentRank(res.data.data)
    }
    if(res1.data.code === 200){
      setTeamRank(res1.data.data)
    }
  }
  const [showPersonRank, setShowPersonRank] = useState(false)
  const show =async ()=>{
     Promise.all([GameStatus(id), GradeRank(id),OccupyStatus(id)]).then(([statusRes, rankRes,occupyRes]) => {
      console.log(statusRes, rankRes,occupyRes)
      setRound(statusRes.data.data)  //上传之后进行给出数值
      setGradeRanks(rankRes.data.data)
    })
  }

  useEffect(() => {
    console.log(Round.chessPhase)
    show()
    getRank()
  }, [isUpload,showUploadAssign])  //必须通过useState里面的方法改变才行，不能只是执行函数 ，否则不会改变

  return (
    <useData.Provider value={{getRank}}>
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
          {showPersonRank ? <PersonRank srank={srank} /> : <TeamRank trank={trank} />}
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
          setIsUpload={setIsUpload}
          Round={Round}
          showUploadAssign={setShowUploadAssign}
          gradeRanks={gradeRanks}
          show={show}
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
    </useData.Provider>
  )
}

export default GameDetail
