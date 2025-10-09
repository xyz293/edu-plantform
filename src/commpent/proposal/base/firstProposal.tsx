import {Prolist} from '../../../api/proposals'
import type {gameRound} from '../../../type/game/index'
import {useEffect, useState} from 'react'
import type {Proposalslist} from '../../../type/proposals/index'
import {Button,Input,Card,Modal} from 'antd'
import VoteModal from './voteModal'
import {forwardRef,useImperativeHandle} from 'react'
interface FirstProposalProps{
    id:number;
    gameStatus:gameRound;
}

const FirstProposal = forwardRef(({id,gameStatus}:FirstProposalProps,cref)=>{
    const [proposal,setProposal] = useState<Proposalslist[]>([])
    const [isOpen,setIsOpen] = useState(false)
    const [index,setIndex] = useState<number>(0)
    
    const getProposal = async ()=>{
        const res = await Prolist(id,gameStatus?.proposalRound)
        console.log(res)
        if(res.data.code === 200){
            setProposal(res.data.data)
        } else {
            alert(res.data.message)
        }
    }

    useEffect(()=>{
        getProposal()
    },[])
    useImperativeHandle(cref,()=>({
       proposal
    }))
    return (
        <div style={{display:'flex',flexDirection:'column',gap:20,width:'800px'}}>
            <div style={{display:'flex',justifyContent:'space-between'}}>
                <div style={{display:'flex',justifyContent:'flex-start'}}>
                    <Input placeholder='请输入小组数' style={{width:'250px'}}/>
                </div>
                <div style={{display:'flex',justifyContent:'flex-end'}}>
                    <Button type='primary'>提交提案</Button>
                </div>
            </div>

            <div style={{display:'flex',flexDirection:'column',gap:20}}>
                <Card title='提案内容' style={{width:'800px',height:'600px'}}>
                    <div style={{display:'flex',justifyContent:'space-between',gap:20}}>
                        <div>提出提案</div>
                        <div>参与小组</div>
                        <div>分值分配</div>
                        <div>操作</div>
                    </div>
                     <Modal
                      open={isOpen}
                      onCancel={()=>setIsOpen(false)}
                      footer={null}
                     >
                       <VoteModal index={index} setIsOpen={setIsOpen} id={id}/>
                     </Modal>
                    <div style={{display:'flex',flexDirection:'column',gap:20}}>
                        {proposal.map((item,index)=>(
                            <div key={index} style={{display:'flex',justifyContent:'space-between',height:'50px'}}>
                                <div>第{item.proposerTeamId}组</div>
                                <div>
                                    {item.involvedTeamIds.map((id,index)=>(
                                        <div key={index}>第{id}组</div>
                                    ))}
                                </div>
                                <div>
                                    {item.scoreDistribution.map((score,index)=>(
                                        <div key={index}>第{index+1}组：{score}分</div>
                                    ))}
                                </div>
                                <div>
                                    <Button type='primary' size='small' onClick={()=>{setIsOpen(true)
                                     setIndex(item.proposerTeamId)
                                    }}>操作</Button>
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
