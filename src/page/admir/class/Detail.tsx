import {useParams} from 'react-router-dom'
import {getClassDetail } from '../../../api/class'
import {useEffect,useState} from 'react'
import {getClassStudent,DeleteStudent} from '../../../api/class'
import {Input,Button,Modal} from 'antd'
import Single from '../../../commpent/class/sigle'
import type {ClassStudentList} from '../../../type/class/index'
import type { Class } from '../../../type/class/index';
import Upload from '../../../commpent/class/upload'
const Detail = ()=>{
    const params = useParams()
    const [open,setOpen] = useState(false)
      const id = params.id
    const [input,setInput] = useState('')
    const [soru,setSoru] = useState(1)
    const [checkedList,setCheckedList] = useState<number[]>([])
    const [classDetail,setClassDetail] = useState<Class>({
    id: Number(id),
   classCode: '',
   gmtCreate: '',
   currentStudents: 0,
   tid: 0
    })
    const show = ()=>{
        switch(soru){
            case 1:
                return <Upload  id={Number(id)} />
            case 2:
                return  <Single id={Number(id)} setStudentList={setStudentList} studentList={studentList} setOpen={setOpen} />

        }
    }
    const [studentList,setStudentList] = useState<ClassStudentList[]>([])
    const [page,setPage] = useState(1)
    console.log(id)
    const [checked,setChecked] = useState(studentList.map(()=>false))
    useEffect(()=>{
       Promise.all([
        getClassDetail(Number(id)),
        getClassStudent({
            cid:Number(id),
            pageNum:page,
            pageSize:10,
            key:''
        })
       ]).then(([classDetail,classStudent])=>{
        console.log(classDetail)
        console.log(classStudent)
        setClassDetail(classDetail.data.data)
        setStudentList(classStudent.data.data.list)
       })
    },[page])
    return (
        <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
           <div style={{display:"flex",justifyContent:'center',gap:'10px'}}>
           <Input placeholder='请输入学号或者姓名' style={{width:'480px'}} value={input} onChange={(e)=>setInput(e.target.value)}/>
           <Button type='primary' onClick={()=>{
            console.log(input)
            getClassStudent({
                cid:Number(id),
                pageNum:1,
                pageSize:10,
                key:input
            }).then((res)=>{
              console.log(res)
                if(res.data?.code === 200){
                    setStudentList(res.data.data.list)
                }
            })
           }}>搜索</Button>
           </div>
           <div style={{display:'flex',justifyContent:'space-between',gap:'20px'}} >
            <div style={{display:'flex',justifyContent:'flex-start',gap:'20px'}}>
              <div>{classDetail.classCode} </div>
              <div>当前人数：{classDetail.currentStudents}</div>
           </div>
           <div style={{display:'flex',justifyContent:'flex-end',gap:'20px'}}>
           
              <Button type='primary' size='small' onClick={()=>{setSoru(2);setOpen(true)}}>单个添加</Button>
  
              <Button type='primary' size='small' onClick={()=>{setSoru(1);setOpen(true)}}>批量添加</Button>

              
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
                {show()}
             </Modal>
           </div>
           <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
            <input type='checkbox' 
             onChange={(e)=>{setChecked(studentList.map(()=>e.target.checked))
                if(e.target.checked){
                    setCheckedList(studentList.map((item)=>item.id))
                }else{
                    setCheckedList([])
                }
             }}
             />
             {
                studentList.map((item,index)=>{
                    return (
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:'10px'}}>
                             <input type='checkbox' 
                               checked={checked[index]}
                               onChange={(e)=>{setChecked((prev)=>{
                                const newChecked = [...prev]
                                newChecked[index] = e.target.checked
                                return newChecked
                                 })
                                if(e.target.checked){
                                    setCheckedList([...checkedList,item.id])
                                }else{
                                    setCheckedList(checkedList.filter((id)=>id !== item.id))
                                }
                                
                                }}
                             value={item.id} />
                            <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center',gap:'10px'}}>{item.sno}</div>
                            <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'10px'}}>{item.name}</div>
                            <div style={{display:'flex',justifyContent:'flex-end',alignItems:'center',gap:'10px'}}>{item.cid}</div>
                        </div>
                    )
                })
             }
           </div>
         <div style={{display:'flex',justifyContent:'center',gap:'20px'}}>
            <Button disabled={checkedList.length === 0} 
              onClick={()=>{
                        DeleteStudent(checkedList).then((res)=>{
                           console.log(res)
                           if(res.data?.code === 200){
                           alert('删除成功')
                            setStudentList(studentList.filter((item)=>!checkedList.includes(item.id)))
                        setCheckedList([])
                        setChecked(studentList.map(()=>false))
                           }
                        })

              }}
            >删除选中</Button>
              <Button onClick={()=>setPage(page-1)}>上一页</Button>
           <Button onClick={()=>setPage(page+1)}>下一页</Button>
         </div>
        </div>
    )
}
export default Detail