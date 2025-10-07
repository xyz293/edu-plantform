import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card, Space, Typography, Divider,Modal } from "antd";
import { GameRank } from "../../../api/game";
import type { TeamRanks } from "../../../type/game";
import TeamList from "./teamlist";
import Store from "./store";
import ListSwitch from "./listSwitch";

const { Title } = Typography;

const BaseProposal = () => {
  const params = useParams();
  const navigate = useNavigate();
  const id = Number(params.id);

  const [teamRanks, setTeamRanks] = useState<TeamRanks[]>([]);
  const [isDel, setIsDel] = useState<boolean>(false);
  const [isshow,setIsshow]=useState<boolean>(false);
  useEffect(() => {
    Promise.all([GameRank(id)]).then(([gameRank]) => {
      console.log("🏆 GameRank =>", gameRank);
      setTeamRanks(gameRank.data.data);
    });
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
          <TeamList teamRanks={teamRanks} id={id} setIsDel={setIsDel} isDel={isDel} />
        </Card>

        {/* 商店或资源面板 */}
        <Card
          title="资源商店"
          
          style={{ flex: 1, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
        >
          <Store teamRanks={teamRanks} id={id} />
        </Card>
      </div>
    </div>
  );
};

export default BaseProposal;
