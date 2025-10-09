import { useEffect, useState ,useMemo} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card, Space, Typography, Divider,Modal } from "antd";
import { GameRank } from "../../../api/game";
import type { TeamRanks } from "../../../type/game";
import TeamList from "./teamlist";
import Store from "./store";
import ListSwitch from "./listSwitch";
import {GameStatus,ProposalList} from '../../../api/game'
import type {gameRound} from '../../../type/game/index'
import SelectTeam from "./selectTeam";
const { Title } = Typography;

const BaseProposal = () => {
  const params = useParams();
  const navigate = useNavigate();
  const id = Number(params.id);

 const [teamRanks, setTeamRanks] = useState<TeamRanks[]>([]);

const sortedRanks:TeamRanks[] = useMemo(() => {
  return [...teamRanks];
}, [teamRanks]);

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
        maxWidth: 1000,
        margin: "0 auto",
        padding: "24px 32px",
      }}
    >
      {/* 顶部标题栏 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <Title level={3} style={{ margin: 0 }}>
          数字化智能教学互动平台
        </Title>
        <Space>
          <Button type="primary" onClick={() => {setIsshow(true)}}>
            查看排名
          </Button>
          <Button onClick={() => navigate("/admir")}>返回主页</Button>
        </Space>
      </div>

      <Divider />

      {/* 主体内容 */}
      <div
        style={{
          display: "flex",
          gap: 24,
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <Modal
          title="队伍排名"
           open={isshow}
          onCancel={()=>setIsshow(false)}
          footer={null}
        >
          <ListSwitch id={id} />
         
        </Modal>
        {/* 队伍信息 */}
        <Card
          title="队伍排名"
        
          style={{ flex: 1, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
        >
          <TeamList teamRanks={teamRanks} id={id} setIsDel={setIsDel} isDel={isDel} gameStatus={gameStatus} />
        </Card>

        {/* 商店或资源面板 */}
        <Card
          title="资源商店"
          
          style={{ flex: 1, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
        >
        {gameStatus?.proposalStage===1? <SelectTeam  id={id} list={list}   teamRanks={sortedRanks}  /> :<Store teamRanks={sortedRanks} id={id} />}
        
        </Card>
      </div>
    </div>
  );
};

export default BaseProposal;
