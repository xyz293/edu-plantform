import List from '../../../../commpent/class/classlist'
import {useEffect} from 'react'
import {Input,Button,Modal} from 'antd'
import {useState,useRef} from 'react'
import NewClass from '../../../../commpent/class/NewClass'
import {getClass} from '../../../../api/class'
import type { Class } from '../../../../type/class/index'
const Class = () =>{
    const [open,setOpen] = useState(false)
    const [list,setList] = useState<Class[]>([])
    const inputRef = useRef<number|null>(null)
    const [val,setVal] = useState('')
    useEffect(()=>{
       
    },[])
    return (
        <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
            <div style={{display:'flex',justifyContent:'center',gap:'20px'}}>
                <Input  placeholder='请输入班级名称' 
                  value={val}
                  onChange={(e)=>{
                    const newValue = e.target.value
                     setVal(newValue)
                     if(inputRef.current!==null){
                        clearTimeout(inputRef.current)
                     }
                     inputRef.current = window.setTimeout(()=>{
                        getClass(1, 10, newValue || '').then((res) => {
                            console.log(newValue)
                            console.log(res);
                            if (res.data?.code === 200) {
                                setList(res.data.data?.list || []);
                            }
                           
                        });
                     },1000)
                  }}
                style={{width:'480px'}}/>
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
                    <NewClass setOpen={setOpen} setList={setList} list={list} />
                </Modal>
            </div>
            <div>
                <List list={list} setList={setList} />
            </div>
        </div>
    )
}
export default Class