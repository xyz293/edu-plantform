import request from '../ulits/reuqest'
import type {ClassStudent} from '../type/class/index'
export const getClass =(pageNum: number, pageSize: number, key: string)=>{
    return request.get('/class/list',{params:{pageNum,pageSize,key}})
}

export const NewClasses = (code: string)=>{
    return request.get('/class',{params:{
        code:code
    }})
}

export const getClassDetail = (id: number)=>{
    return request.get(`/class/${id}`)
}

export const getClassStudent = (data: ClassStudent)=>{
    return request.get('/class/student/list',{params:{
        cid:data.cid,
        pageNum:data.pageNum,
        pageSize:data.pageSize,
        key:data.key
    }})
}

export const uploadStudent = (id:number,sno:string,name:string)=>{
    return request.post('/class/upload/single',
        {
           cid:Number(id),
           sno:sno,
           name:name,
    })
}