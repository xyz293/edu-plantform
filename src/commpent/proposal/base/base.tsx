import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card, Space, Typography, Divider,Modal } from "antd";
import { GameRank } from "../../../api/game";
import type { TeamRanks } from "../../../type/game";
import FirstStage from '../detail/fristStage'
import ListSwitch from "./listSwitch";
import {GameStatus,ProposalList} from '../../../api/game'
import type {gameRound} from '../../../type/game/index'
import {useRef} from 'react'
const { Title } = Typography;

const BaseProposal = () => {
  const ref = useRef<null>(null)
  const params = useParams();
  const navigate = useNavigate();
  const id = Number(params.id);

 const [teamRanks, setTeamRanks] = useState<TeamRanks[]>([]);

  const [gameStatus,setGameStatus]=useState<gameRound|null>(null)

  const [isDel, setIsDel] = useState<boolean>(false);
  const [isshow,setIsshow]=useState<boolean>(false);
  const [list,setList]=useState<number[]>([])
  const show = (id:number)=>{
     Promise.all([GameRank(id),GameStatus(id),ProposalList(id)]).then(([gameRank,gameStatus,proposalList]) => {
      console.log("🏆 GameRank =>", gameRank);
      console.log("🏆 GameStatus =>", gameStatus);
      console.log("🏆 ProposalList =>", proposalList);
      setList(proposalList.data.data)
      setTeamRanks(gameRank.data.data);
      setGameStatus(gameStatus.data.data)
    });
  }
  useEffect(() => {
    show(id)
  }, [id, isDel]);

  return (
   <div
  style={{
    width: "100%",
    maxWidth: 1200,
    margin: "0 auto",
    padding: "32px",
    background: "#f0f2f5", // 页面浅灰背景
    minHeight: "100vh",
  }}
>
  {/* 顶部标题栏 */}
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 32,
      paddingBottom: 16,
      borderBottom: "2px solid #e8e8e8",
    }}
  >
    <Title
      level={2}
      style={{
        margin: 0,
        background: "linear-gradient(90deg, #1890ff, #13c2c2)",
        WebkitBackgroundClip: "text",
        color: "transparent",
        fontWeight: 700,
      }}
    >
      数字化智能教学互动平台
    </Title>
    <Space>
      <Button type="primary" size="large" onClick={() => setIsshow(true)}>
        查看排名
      </Button>
      <Button size="large" onClick={() => navigate("/admir")}>
        返回主页
      </Button>
    </Space>
  </div>

  <Divider />

  {/* 主体内容 */}
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 24,
      alignItems: "start",
    }}
  >
    {/* 游戏状态 */}
    <Card
      title="游戏状态"
      style={{
        boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
        borderRadius: 12,
        background: "#ffffff",
        padding: 24,
        transition: "all 0.3s",
      }}
      hoverable
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ textAlign: "center", fontWeight: 600, fontSize: 16, color: "#1890ff" }}>
          提案赛阶段
        </div>
        <div style={{ fontSize: 14, color: "#555", display: "flex", flexDirection: "column" }}>
         <h2>当前总学生数： {gameStatus?.studentCount}人报名</h2>
         <h2>当前组数：{gameStatus?.teamCount}个队伍</h2>
         <h2>每组基准人数：{gameStatus?.teamMemberCount}人</h2>
        </div>
        <div style={{ fontSize: 14, color: "#555" }}>
        <h2> 提案赛轮次: 第{gameStatus?.proposalRound}轮提案阶段</h2>
        </div>
        <div>
          {gameStatus?.proposalRound===1&&
          <div>
            <h2>本轮提案小组：</h2>
            </div>
            }
        </div>
      </div>
    </Card>
    {/* 队伍排名 */}
    <FirstStage teamRanks={teamRanks} id={id} setIsDel={setIsDel} isDel={isDel} gameStatus={gameStatus} list={list} ref={ref}/>
  </div>

  {/* 队伍排名 Modal */}
  <Modal
    title="队伍排名"
    open={isshow}
    onCancel={() => setIsshow(false)}
    footer={null}
    width={800}
    bodyStyle={{ padding: "24px" }}
    style={{ borderRadius: 12 }}
  >
    <ListSwitch id={id} />
  </Modal>
</div>

  );
};

export default BaseProposal;
