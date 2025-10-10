import { Prolist } from '../../../api/proposals'
import type { gameRound } from '../../../type/game/index'
import { useEffect, useState } from 'react'
import type { Proposalslist } from '../../../type/proposals/index'
import type { Pref } from '../../../type/hock/index'
import { Button, Input, Card, Modal } from 'antd'
import type { Proposals } from './../../../type/proposals/index'
import VoteModal from './voteModal'
import { forwardRef, useImperativeHandle } from 'react'
import type { ProposalsResponse } from '../../../type/proposals/index'
import {ProposalsUpload} from '../../../api/proposals'
import {useDel} from '../../../ulits/tool'
import {useContext} from 'react'
import type {Voteinit} from '../../../type/proposals/index'
import type {Vote} from '../../../type/proposals/index'
interface FirstProposalProps {
  id: number;
  gameStatus: gameRound;
}
const FirstProposal = forwardRef<Pref, FirstProposalProps>(({ id, gameStatus }, cref) => {
  const [proposal, setProposal] = useState<Proposalslist[]>([]) // 后端原始提案
  const [isOpen, setIsOpen] = useState(false)
  const [teamid, setTeamid] = useState<number>(0)
  const [num, setNum] = useState<number>(0)
  const [Proposal, setproposal] = useState<Proposals[]>([]) // 前端操作列表
  const [index, setIndex] = useState<number>(0)
  const [voteinit, setVoteinit] = useState<Voteinit[] | null>(null)
  const [vote, setVote] = useState<Vote>({
    gameId: Number(id),
    round: gameStatus?.proposalRound,
    votes: [] as Voteinit[],
    hasTie: false,
  })
  const [porposallist, setProposalList] = useState<ProposalsResponse>({
    gameId: Number(id),
    num: 0,
    proposals: Proposal,
  })
  const {isDel,setIsDel} = useContext(useDel)
  const show =()=>{
    switch (gameStatus.proposalStage) {
      case 2:
          return  <Button
            type='primary'
            onClick={() => {
              setProposalList({
                ...porposallist,
                num: num,
                proposals: Proposal
              })
              console.log("📦 提交的提案数据:", {
                ...porposallist,
                num: num,
                proposals: Proposal
              })
              ProposalsUpload(porposallist).then((res) => {
                  console.log(res)
                  if(res.data.code === 200){
                    alert('上传提案成功')
                    setIsDel(!isDel)
                  }
                  else{
                    alert(res.data.message)
                  }
              }).catch((err) => {
                console.error('上传提案失败:', err)
                alert('上传提案失败，请检查网络连接或联系管理员')
              })
            }}
          >
            提交提案
          </Button>
         case 3:
              return  <Button
            type='primary'
          >
            提交提案
          </Button>
            
      
    }
  }
  // 获取提案
  const getProposal = async () => {
    const res = await Prolist(id, gameStatus?.proposalRound)
    console.log(res)
    if (res.data.code === 200) {
      setProposal(res.data.data)
    } else {
      alert(res.data.message)
    }
  }

  // 初始化数据
  useEffect(() => {
    getProposal()
  }, [])

  useEffect(() => {
    if (proposal.length > 0 && Proposal.length === 0) {
      const init = proposal.map(item => ({
        proposerTeamId: item.proposerTeamId,
        involvedTeamIds: [],
        scoreDistribution: []
      }))
      setproposal(init)
    }
  }, [proposal])

  // 提供给父组件的 ref
  useImperativeHandle(cref, () => ({
    proposal
  }))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '800px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Input
            placeholder='请输入小组数'
            style={{ width: '250px' }}
            onChange={(e) => setNum(Number(e.target.value))}
            value={num}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
               {show()}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Card title='提案内容' style={{ width: '800px', height: '600px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20 }}>
            <div>提出提案</div>
            <div>参与小组</div>
            <div>分值分配</div>
            <div>操作</div>
          </div>

          <Modal
            open={isOpen}
            onCancel={() => setIsOpen(false)}
            footer={null}
          >
            <VoteModal
               setVoteinit={setVoteinit}
               voteinit={voteinit}
               vote={vote}
               gameStatus={gameStatus}
              index={index}
              teamid={teamid}
              setIsOpen={setIsOpen}
              id={id}
              porposallist={Proposal}
              num={num}
              setProposalList={setproposal}
            />
          </Modal>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {proposal.map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', height: '50px' }}>
                <div>第 {item.proposerTeamId} 组</div>
                <div>
                 {gameStatus?.proposalStage === 2 ? Proposal[i]?.scoreDistribution.map((score, j) => (
                    <div key={j}>第 {j + 1} 组：{score} 分</div>
                  )) : <div>{item.involvedTeamIds.map(id => `第 ${id} 组`).join('、')}</div>}
                </div>
                <div>
                  {gameStatus?.proposalStage === 2 ? Proposal[i]?.scoreDistribution.map((score, j) => (
                    <div key={j}>第 {j + 1} 组：{score} 分</div>
                  )) : <div>{item.scoreDistribution.map(id => `${id} 分`).join('、')}</div>}
                </div>
                <div>
                  {gameStatus?.proposalStage === 2 ? <Button
                    type='primary'
                    size='small'
                    onClick={() => {
                      if (num === 0) {
                        alert('请先输入小组数')
                      } else {
                        setIsOpen(true)
                        setTeamid(item.proposerTeamId)
                        setIndex(i)
                      }
                    }}
                  >
                    操作
                  </Button> : (
                    <Button
                      type='primary'
                      size='small'
                      onClick={()=>{
                         if (num === 0) {
                        alert('请先输入小组数')
                      } else {
                        setIsOpen(true)
                        setTeamid(item.proposerTeamId)
                        setIndex(i)
                      }
                      }}
                    >
                      投票
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
})

export default FirstProposal
