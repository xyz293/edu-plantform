import {update} from '../../../api/game'
import type {UpdateScore} from '../../../type/game/index'
import {Form,Input,Button} from 'antd'
import {useState} from 'react'
interface UpdateProps{
    id:number,
    index:number,
    setIsshow:(isshow:boolean)=>void,
    setTrank:(trank:boolean)=>void,
    tranks:boolean,
    type:number
    stage:number
}
const Update =({id,index,setIsshow,setTrank,tranks,type,stage}:UpdateProps)=>{
   console.log(id)
    const [user,setUser] = useState<UpdateScore>({
        type: type, // 1为小组 2为个人
        stage: stage, // 1为个人 2为小组
        id: Number(index), // 个人为学生id 小组为小组id
        gameId: Number(id),
        num: 0, // 学生成绩
        comment: '',  // 评语
    })
    const onSubmit = async ()=>{
        const res = await update(user)
        console.log(res)
        if(res.data.code === 200){
           setTrank(!tranks)
            alert(res.data.message)
            setIsshow(false)
        }
        else{
            alert(res.data.msg)
        }
    }
    return (
        <div>
           <Form>
             <Form.Item label="填入成绩" >
                <Input value={user.num} onChange={(e)=>setUser({...user,num:Number(e.target.value)})}/>
             </Form.Item>
             <Form.Item label="填入评语">
                <Input value={user.comment} onChange={(e)=>setUser({...user,comment:e.target.value})}/>
             </Form.Item>
             <Form.Item>
              <div style={{display:'flex',justifyContent:'center',gap:'20px'}}>
                 <Button onClick={onSubmit}>更新</Button>
                 <Button onClick={()=>setIsshow(false)}>取消</Button>
              </div>
             </Form.Item>
           </Form>
        </div>
    )
}
export default Update
