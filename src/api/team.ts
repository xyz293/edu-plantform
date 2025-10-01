import request from '../ulits/reuqest'
export const TeamList = (id:number)=>{  
    return request.get(`/team/game/${id}`)
}