import {Form,Input,Button} from 'antd'
import {uploadStudent} from '../../api/class'
import type {ClassStudentList} from '../../type/class/index'
import {useState} from 'react'
const Single = ({id,studentList,setStudentList,setOpen}:{id:number,studentList:ClassStudentList[],setStudentList:(list:ClassStudentList[])=>void,setOpen:(open:boolean)=>void})=>{
    const [user,setUser] = useState({
        sno:'',
        name:''
    })
    const handleSubmit = async (sno:string,name:string)=>{
      const res =  await uploadStudent(id,sno,name)
      console.log(res)
                     if(res.data.code === 200){
                        setStudentList([...studentList,{
                            cid:id,
                            sno:user.sno,
                            name:user.name
                        }])
                        setOpen(false)
                     }
    }
    return (
        <div>
            <Form.Item name='sid' label='学号'>
                <Input placeholder='请输入学号'  value={user.sno} onChange={(e)=>setUser({...user,sno:e.target.value})}/>
            </Form.Item>
            <Form.Item name='name' label='姓名'>
                <Input placeholder='请输入姓名' value={user.name} onChange={(e)=>setUser({...user,name:e.target.value})}/>
            </Form.Item>
            <Form.Item name='phone'>
               <Button type='primary' size='small' 
                onClick={()=>handleSubmit(user.sno,user.name)}
               >添加</Button>
            </Form.Item>
        </div>
    )
}
export default Single
