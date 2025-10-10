import { Form, Input, Button, Select, Card } from "antd";
import { ProRank } from "../../../api/proposals";
import { useEffect, useState } from "react";
import type { TeamRank } from "../../../type/proposals/index";
import type { Proposals } from './../../../type/proposals/index';
import type { gameRound } from "../../../type/game/index";
import type {Voteinit} from '../../../type/proposals/index'
import type {Vote} from '../../../type/proposals/index'
interface VoteModalProps {
  voteinit: Voteinit[] | null;
  setVoteinit: (voteinit: Voteinit[] | null) => void;
  vote: Vote;
  gameStatus: gameRound;
  teamid: number;
  setIsOpen: (isOpen: boolean) => void;
  index: number;
  id: number;
  porposallist: Proposals[];
  num: number;
  setProposalList: (proposalList: Proposals[]) => void;
}

const VoteModal = ({ index, teamid, setIsOpen, id, porposallist, num, setProposalList ,gameStatus,setVoteinit,voteinit}: VoteModalProps) => {
  const [teamRank, setTeamRank] = useState<TeamRank[]>([]);
  const [form] = Form.useForm();
  const [input, setInput] = useState<number[]>([]);
 
  useEffect(() => {
    const fetchRankData = async () => {
      try {
        const res = await ProRank(id);
        if (res.data.code === 200) {
          setTeamRank(res.data.data);
        } else {
          alert(res.data.message);
        }
      } catch (error) {
        console.error("获取排名数据失败:", error);
      }
    };
    fetchRankData();
  }, []);

  const handleSubmit = () => {
    setIsOpen(false);
  };

  return (
    <Card
      title={`为第 ${teamid} 组投票`}
      style={{
        width: 400,
        margin: "0 auto",
        borderRadius: 12,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          rank: `第 ${teamid} 组`,
        }}
      >
        {gameStatus.proposalStage === 2 && (
          <Form.Item
            label="名次"
            name="rank"
          >
            <Input readOnly />
          </Form.Item>
        )}

        <Form.Item
          label="选择队伍"
          name="teamId"
          rules={[{ required: true, message: "请选择一个队伍" }]}
        >
          <Select
            mode="multiple"
            placeholder="请选择队伍"
            value={porposallist[index]?.involvedTeamIds || []}
            onChange={(value) => {
             if(gameStatus.proposalStage === 2){
                if (value.length > num) {
                alert("最多只能选择 " + num + " 个队伍");
                return;
              }

              setProposalList(prev => {
                if (!Array.isArray(prev) || prev.length === 0) return prev;

                const data = prev.map(item => ({
                  ...item,
                  involvedTeamIds: Array.isArray(item.involvedTeamIds)
                    ? [...item.involvedTeamIds]
                    : [],
                  scoreDistribution: Array.isArray(item.scoreDistribution)
                    ? [...item.scoreDistribution]
                    : [],
                }));

                if (index >= 0 && index < data.length) {
                  data[index].involvedTeamIds = [...value];
                }

                console.log("✅ 更新后 proposalList:", data);
                return data;
              });
             }
             else if(gameStatus.proposalStage === 3){
                setVoteinit(prev => {
                  if (!Array.isArray(prev) || prev.length === 0) return prev;

                  const data = prev.map(item => ({
                    ...item,
                    teamId: Number(item.teamId),
                  }));
                  return data;
                });
             }
            }}
            options={teamRank.map(item => ({
              value: item.teamId,
              label: `第 ${item.teamId} 组`,
            }))}
          />
        </Form.Item>

        <Form.Item
          label="分值分配"
          name="score"
          rules={[{ required: true, message: "请输入分值" }]}
        >
          <Input
            placeholder="请输入分值（例如：10）"
            value={input.join(',')}
            onChange={(e) => setInput(e.target.value.split(',').map(item => Number(item)))}
          />
        </Form.Item>

        <Form.Item>
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "20px",
          }}>
            <Button type="primary" onClick={()=>{
              console.log(input)  
                  if(gameStatus.proposalStage === 2){
                    setProposalList(prev => {
                if (!Array.isArray(prev) || prev.length === 0) return prev;

                const data = prev.map(item => ({
                  ...item,
                  involvedTeamIds: Array.isArray(item.involvedTeamIds)
                    ? [...item.involvedTeamIds]
                    : [],
                  scoreDistribution: Array.isArray(item.scoreDistribution)
                    ? [...item.scoreDistribution]
                    : [],
                }));

                if (index >= 0 && index < data.length) {
                  data[index].scoreDistribution = [...input];
                }

                return data;
              });
                let sum =0
                input.forEach(item => {
                  sum += item;
                })
                if (sum !== 28) {
                  alert("分值总和必须为 28");
                  setInput([]);
                  setProposalList(prev => {
                    if (!Array.isArray(prev) || prev.length === 0) return prev;
                    const data = prev.map(item => ({
                      ...item,
                      involvedTeamIds: Array.isArray(item.involvedTeamIds)
                        ? [...item.involvedTeamIds]
                        : [],
                      scoreDistribution: Array.isArray(item.scoreDistribution)
                        ? [...item.scoreDistribution]
                        : [],
                    }));
                    return data;
                  });
                  return;
                }
                else {
                  setInput([]);
                  setProposalList(prev => {
                    if (!Array.isArray(prev) || prev.length === 0) return prev;
                    const data = prev.map(item => ({
                      ...item,
                      involvedTeamIds: Array.isArray(item.involvedTeamIds)
                        ? [...item.involvedTeamIds]
                        : [],
                      scoreDistribution: Array.isArray(item.scoreDistribution)
                        ? [...item.scoreDistribution]
                        : [],
                    }));
                    return data;
                  });
                  setIsOpen(false);
                  }
                }
                else if(gameStatus.proposalStage === 3){
                  setVoteinit(prev => {
                    if (!Array.isArray(prev) || prev.length === 0) return prev;
                    const data = prev.map(item => ({
                      ...item,
                      score: [...input],
                      proposalId: Number(item.proposalId),
                    }));
                    return data;
                  });
                }
                console.log(voteinit)
             } }>确认</Button>
            <Button onClick={() => setIsOpen(false)}>取消</Button>
          </div>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default VoteModal;
