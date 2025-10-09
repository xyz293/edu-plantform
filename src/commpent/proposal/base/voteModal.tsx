import { Form, Input, Button, Select, Card } from "antd";
import { ProRank} from "../../../api/proposals";
import { useEffect, useState } from "react";
import type { TeamRank } from "../../../type/proposals/index";

interface VoteModalProps {
  index: number;
  setIsOpen: (isOpen: boolean) => void;
  id:number
}

const VoteModal = ({ index, setIsOpen,id }: VoteModalProps) => {
  const [teamRank, setTeamRank] = useState<TeamRank[]>([]);
  const [form] = Form.useForm();

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
      title={`为第 ${index} 名组投票`}
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
          rank: `第 ${index} 名`,
        }}
      >
        <Form.Item label="名次" name="rank">
          <Input readOnly />
        </Form.Item>

        <Form.Item
          label="选择队伍"
          name="teamId"
          rules={[{ required: true, message: "请选择一个队伍" }]}
        >
          <Select
            placeholder="请选择队伍"
            options={teamRank.map((item) => ({
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
          <Input placeholder="请输入分值（例如：10）" />
        </Form.Item>

        <Form.Item>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            <Button type="primary" htmlType="submit">
              确认
            </Button>
            <Button onClick={() => setIsOpen(false)}>取消</Button>
          </div>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default VoteModal;
