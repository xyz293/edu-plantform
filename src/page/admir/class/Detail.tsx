import {useParams} from 'react-router-dom'
import {getClassDetail } from '../../../api/class'
import {useEffect,useState} from 'react'
import {getClassStudent} from '../../../api/class'
import {Input,Button,Modal} from 'antd'
import Single from '../../../commpent/class/sigle'
import type {ClassStudentList} from '../../../type/class/index'
const Detail = ()=>{
    const params = useParams()
    const [open,setOpen] = useState(false)
    const id = params.id
    const [studentList,setStudentList] = useState<ClassStudentList[]>([])
    console.log(id)
    useEffect(()=>{
       Promise.all([
        getClassDetail(Number(id)),
        getClassStudent({
            cid:Number(id),
            pageNum:1,
            pageSize:10,
            key:''
        })
       ]).then(([classDetail,classStudent])=>{
        console.log(classDetail)
        console.log(classStudent)
        setStudentList(classStudent.data.data.list)
       })
    },[id])
    return (
        <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
           <div style={{display:"flex",justifyContent:'center',gap:'10px'}}>
           <Input placeholder='请输入学号或者姓名' style={{width:'480px'}}/>
           <Button type='primary'>搜索</Button>
           </div>
           <div style={{display:'flex',justifyContent:'space-between',gap:'10px'}}>
            <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center',gap:'10px'}}>
              <Button type='primary' size='small' onClick={()=>setOpen(true)}>单个添加</Button>
            </div>
            <div style={{display:'flex',justifyContent:'flex-end',alignItems:'center',gap:'10px'}}>
              <Button type='primary' size='small'>批量添加</Button>
            </div>
           </div>
           <div>
             <Modal 
             title='添加学生'
             open={open}
             onOk={()=>setOpen(false)}
             onCancel={()=>setOpen(false)}
             footer={null}
             >
                 <Single id={Number(id)} setStudentList={setStudentList} studentList={studentList} setOpen={setOpen} />
             </Modal>
           </div>
           <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
             {
                studentList.map((item)=>{
                    return (
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:'10px'}}>
                            <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center',gap:'10px'}}>{item.sno}</div>
                            <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'10px'}}>{item.name}</div>
                            <div style={{display:'flex',justifyContent:'flex-end',alignItems:'center',gap:'10px'}}>{item.cid}</div>
                        </div>
                    )
                })
             }
           </div>
        </div>
    )
}
export default Detail