import { useParams } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import type { Game } from '../../../type/game/index';
import { NewGame } from '../../../api/game';
import { useState } from 'react';
import Teamlist from './teamList'
import type {Team } from '../../../type/Team/index'
const BaseGame = () => {
  const params = useParams();
  const id = params.id;
   const [team,setTeam] = useState<Team>({
    gameId:0,
    studentNum:0,
    teamNum:0,
   })
   
  const [game, setGame] = useState<Game>({
    file: null, // 初始不要用 new File([], '')
    teamNum: 0,
    studentNum: 0,
    perTeamNum: 0,
    cid: Number(id),
  });

  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!game.file || !game.teamNum || !game.studentNum || !game.perTeamNum) {
      message.error('请完整填写所有字段');
      return;
    }

    const formData = new FormData();
    formData.append('file', game.file);
    formData.append('teamNum', game.teamNum.toString());
    formData.append('studentNum', game.studentNum.toString());
    formData.append('teamMemberCount', game.perTeamNum.toString()); // 后端要求字段名
    formData.append('cid', game.cid.toString());

    setLoading(true);
    try {
      const res = await NewGame(formData); // 确保 NewGame 内部 axios.post 不手动设置 Content-Type
      console.log('上传成功', res);
      setTeam({
        gameId:Number(res.data.data.gameId),
        studentNum:Number(res.data.data.studentNum),
        teamNum:Number(res.data.data.teamNum),
      })
      message.success('上传成功！');
    } catch (err) {
      console.error('上传失败', err);
      message.error('上传失败，请检查文件和参数');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{display:'flex',justifyContent:'space-between'}}>
     <div style={{width:'50%',display:'flex',justifyContent:'flex-start'}}>
         <Form layout="vertical">
        <Form.Item label="分组文件">
          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setGame({ ...game, file: e.target.files[0] });
              }
            }}
          />
        </Form.Item>

        <Form.Item label="小组数量">
          <Input
            type="number"
            value={game.teamNum}
            onChange={(e) =>
              setGame({ ...game, teamNum: Number(e.target.value) })
            }
          />
        </Form.Item>

        <Form.Item label="学生总数">
          <Input
            type="number"
            value={game.studentNum}
            onChange={(e) =>
              setGame({ ...game, studentNum: Number(e.target.value) })
            }
          />
        </Form.Item>

        <Form.Item label="每组人数">
          <Input
            type="number"
            value={game.perTeamNum}
            onChange={(e) =>
              setGame({ ...game, perTeamNum: Number(e.target.value) })
            }
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" onClick={handleUpload} loading={loading}>
            提交数据
          </Button>
        </Form.Item>
      </Form>
     </div>
     <div style={{width:'45%',display:'flex',justifyContent:'flex-end'}}>
      <Teamlist id={team.gameId}/>
     </div>
    </div>
  );
};

export default BaseGame;
