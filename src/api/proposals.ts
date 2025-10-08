import request from '../ulits/reuqest'
import type {Proposalinit} from '../type/proposals/index'
import type {Order} from '../type/proposals/index'
export const init = (data:Proposalinit[]) =>{
    return request.post('/proposal/init',data)
}


export const Prolist =(id:number,round:number)=>{
    console.log(id,round)
    return request.get('/proposal/list',{
        params:{gameId:id,round}
    })
}

export const ProRank =(id:number)=>{
    return request.get('/proposal/rank/all',{
        params:{gameId:id}
    })
}

export const ProposalsOrder =(data:Order)=>{
    return request.post('/proposal/order',data)
}