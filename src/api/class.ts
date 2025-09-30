import request from '../ulits/reuqest'
export const getClass =(pageNum: number, pageSize: number, key: string)=>{
    return request.get('/class/list',{params:{pageNum,pageSize,key}})
}

export const NewClasses = (code: string)=>{
    return request.get('/class',{params:{
        code:code
    }})
}