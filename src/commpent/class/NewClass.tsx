import {Input,Button} from 'antd'
import {NewClasses} from '../../api/class'
import {useState} from 'react'
const NewClass = ({setOpen}:{setOpen:(open:boolean)=>void}) =>{
    const [input,setInput] = useState('')
    return (
        <div>
            <div style={{display:'flex',justifyContent:'center',gap:'20px'}}>
                <Input placeholder='请输入班级名称' style={{width:'480px'}} value={input} onChange={(e)=>setInput(e.target.value)}/>
                <Button type='primary' onClick={()=>NewClasses(input).then(res=>{
                 console.log(res)
                 if(res.data.code === 200){
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