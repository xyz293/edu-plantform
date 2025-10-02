import { updateInfo } from "../../../../api/user";
import { getId } from "../../../../ulits/tool";
import { useState } from "react";
import type { updateuser } from "../../../../type/user/index";
import { Input, Button, Card, Form, Space, Avatar, message } from "antd";

const UserManage = () => {
  const id = getId();
  const [user, setUser] = useState<updateuser>({
    id: id,
    username: "",
    nickname: "",
    avatar: "",
  });

  const handleUpdate = () => {
    updateInfo(user)
      .then((res) => {
        message.success("用户信息更新成功！");
        console.log(res);
      })
      .catch((err) => {
        message.error("更新失败，请重试！");
        console.log(err);
      });
  };

  return (
    <Card
      title="用户信息管理"
      style={{ width: 400, margin: "30px auto", borderRadius: 12 }}
    >
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        {/* 头像预览 */}
        {user.avatar && (
          <div style={{ textAlign: "center" }}>
            <Avatar src={user.avatar} size={80} />
          </div>
        )}

        <Form layout="vertical">
          <Form.Item label="用户名">
            <Input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="请输入用户名"
            />
          </Form.Item>

          <Form.Item label="昵称">
            <Input
              value={user.nickname}
              onChange={(e) => setUser({ ...user, nickname: e.target.value })}
              placeholder="请输入昵称"
            />
          </Form.Item>

          <Form.Item label="头像 URL">
            <Input
              value={user.avatar}
              onChange={(e) => setUser({ ...user, avatar: e.target.value })}
              placeholder="请输入头像地址"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" block onClick={handleUpdate}>
              更新信息
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </Card>
  );
};

export default UserManage;
