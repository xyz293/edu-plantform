
import { Form, Input, Button, message ,Select} from 'antd';
import type { Game } from '../../../type/game/index';
import { NewGame } from '../../../api/game';
import {getClass} from '../../../api/class'
import { useState,useEffect } from 'react';
import Teamlist from './teamList'

import {useNavigate} from 'react-router-dom'
import type { Class } from '../../../type/class/index';
import type {Team } from '../../../type/Team/index'
const BaseGame = () => {
  const navigate = useNavigate()

  const [Class,setClass] = useState<Class[]>([])
   const [team,setTeam] = useState<Team>({
    gameId:0,
    studentNum:0,
    teamNum:0,
   })
   const [isshow,setIsshow] = useState<boolean>(false)
   
  const [game, setGame] = useState<Game>({
    file: null, // 初始不要用 new File([], '')
    teamNum: 0,
    studentNum: 0,
    perTeamNum: 0,
    cid: 0,
  });

  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!game.file || !game.teamNum || !game.studentNum || !game.perTeamNum) {
      message.error('请完整填写所有字段');
      return;
    }

     const formData = new FormData();
    formData.append('file', game.file);
    formData.append('teamNum', String(game.teamNum));
    formData.append('studentNum', String(game.studentNum));
    formData.append('teamMemberCount', String(game.perTeamNum));
    formData.append('cid', String(game.cid));

    setLoading(true);
    try {
      const res = await NewGame(formData); // 确保 NewGame 内部 axios.post 不手动设置 Content-Type
      console.log('上传成功', res);
     if(res.data.code===200){
      setIsshow(true)
       setTeam({
        gameId:Number(res.data.data.gameId),
        studentNum:Number(res.data.data.studentNum),
        teamNum:Number(res.data.data.teamNum),
      })
     }
      message.success('上传成功！');
    } catch (err) {
      console.error('上传失败', err);
      message.error('上传失败，请检查文件和参数');
    } finally {
      setLoading(false);
    }
  };
  useEffect(()=>{
    getClass(1, 50, '').then((res) => {
      if (res.data?.code === 200) {
        console.log(res)
        setClass(res.data.data?.list || [])
      }
    });
  },[])

  return (
    <div style={{display:'flex',justifyContent:'space-between'}}>
     <div style={{width:'50%',display:'flex',justifyContent:'flex-start'}}>
         <Form layout="vertical">
          <Form.Item>
             <Select
             onChange={(value) => setGame({ ...game, cid: Number(value) })}
              style={{ width: '100%' }}
              placeholder="请选择班级"
              options={Class.map((item) => ({
                label: item.classCode,
                value: item.id,
              }))}
            />

          </Form.Item>
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
         <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'20px'}}>
           <Button type="primary" onClick={handleUpload} loading={loading}>
            提交数据
          </Button>
          {isshow===true&& <Button type="primary" onClick={()=>navigate(`/admir/game/detail/${team.gameId}`)}>进入游戏</Button>}
         </div>
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
