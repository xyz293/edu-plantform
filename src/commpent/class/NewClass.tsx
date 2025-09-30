import {Input,Button} from 'antd'
import {NewClasses} from '../../api/class'
import {useState} from 'react'
import type { Class } from '../../type/class/index'
const NewClass = ({setOpen,setList,list}:{setOpen:(open:boolean)=>void,setList:(list:Class[])=>void,list:Class[]}) =>{
    const [input,setInput] = useState('')
    return (
        <div>
            <div style={{display:'flex',justifyContent:'center',gap:'20px'}}>
                <Input placeholder='请输入班级名称' style={{width:'480px'}} value={input} onChange={(e)=>setInput(e.target.value)}/>
                <Button type='primary' onClick={()=>NewClasses(input).then(res=>{
                 console.log(res)
                 if(res.data.code === 200){
                 
                    setList([...list,{
                        id:1,
                        classCode:input,
                        gmtCreate:new Date().toISOString(),
                        currentStudents:0,
                        tid:1,
                    }])
                       alert('创建成功')
                    setOpen(false)
                 }
                })} >创建班级</Button>
                <Button type='primary' onClick={()=>setOpen(false)}>取消</Button>
            </div>
        </div>
    )
}
export default NewClass