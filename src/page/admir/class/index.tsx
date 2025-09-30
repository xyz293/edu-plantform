import List from '../../../commpent/class/classlist'
import {useEffect} from 'react'
import {Input,Button,Modal} from 'antd'
import {useState} from 'react'
import NewClass from '../../../commpent/class/NewClass'
const Class = () =>{
    const [open,setOpen] = useState(false)
    useEffect(()=>{
        
    },[])
    return (
        <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>
            <div style={{display:'flex',justifyContent:'center',gap:'20px'}}>
                <Input placeholder='请输入班级名称' style={{width:'480px'}}/>
                <Button type='primary' onClick={()=>setOpen(true)}>创建新班级</Button>
            </div>
            <div>
                <Modal
                    title='创建新班级'
                    open={open}
                    onOk={()=>setOpen(false)}
                    onCancel={()=>setOpen(false)}
                    footer={null}
                >
                    <NewClass setOpen={setOpen}/>
                </Modal>
            </div>
            <div>
                <List/>
            </div>
        </div>
    )
}
export default Class