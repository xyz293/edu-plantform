import {Form,Input,Button} from 'antd'
import type {GradeRanks} from '../../../type/game/index'
import {Assign } from '../../../api/game'
import {useState} from 'react'
const UploadAssign = ({gradeRanks,setShowUploadAssign,id}:{gradeRanks:GradeRanks[],setShowUploadAssign:(showUploadAssign: boolean) => void,id:number}) => {
    const [teamAssignCount,setTeamAssignCount] = useState<Record<number,number>[]>([])
        return (
            <div style={{display:'flex',flexDirection:'column',gap:10,alignItems:'center'}}>
                <Form >
                    {gradeRanks?.map((item,index)=>{
                        return (
                            <Form.Item key={index} label={`第${item.teamId}组`}>
                                <Input style={{width:250}}  onChange={(e)=>{
                                    setTeamAssignCount([...teamAssignCount,{
                                        [item.teamId]:Number(e.target.value)
                                    }])
                                }} />
                            </Form.Item>
                        )
                    })}
                </Form>
                <div style={{display:'flex',gap:20,justifyContent:'center'}}>
                    <Button type="primary" onClick={()=>{
                        Assign(id,Object.assign({},...teamAssignCount)).then(res=>{
                            console.log(res)
                            if(res.data.code === 200){
                              alert('上传成功')
                              
                              setShowUploadAssign(false)
                            }
                            else {
                                alert(res.data.msg)
                               setShowUploadAssign(false)
                            }
                        })
                    }}>上传</Button>
                    <Button onClick={()=>setShowUploadAssign(false)}>取消</Button>
                </div>
            </div>
        ) 
}
export default UploadAssign