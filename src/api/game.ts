import request from '../ulits/reuqest'
import type {GameInit} from '../type/game/index'
import type {Occupy} from '../type/game/index'
import type {ReOutTeam} from '../type/game/index'
import type {UpdateScore} from '../type/game/index'
export const NewGame = (formData:FormData) => {
   return request.post('/game/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
})
}

export const ClassGame = (id:number)=>{
    return request.get(`/game/status/${id}`)
}

export const GameList = (id:number)=>{   ///获取某个班级的所有游戏列表
    return request.get(`/game/list/${id}`)
}

export const ClassGameList = (id:number)=>{   ///获取某个班级的所有游戏列表
    return request.get(`/game/list/${id}`)
}

export const init = (data:GameInit) =>{
    return request.post('/game/board/init',{
        gameId:data.gameId,
        totalTiles:data.totalTiles,
        blackSwampTiles:data.blackSwampTiles,
        blindBoxTiles:data.blindBoxTiles,
        fortressTiles:data.fortressTiles,
        goldCenterTiles:data.goldCenterTiles,
        opportunityTiles:data.opportunityTiles,
    })
}

export const GameRank = (id:number)=>{   ///获取某个班级的所有游戏列表
    return request.get(`/game/rank/team/${id}`)
}

export const StudentRank =(id:number)=>{
    return request.get(`/game/rank/student/${id}`)
}

export const OccupyStatus = (id:number)=>{
    return request.get(`/game/occupyStatus/${id}`)
}


export const GameStatus = (id:number)=>{
    return request.get(`/game/status/${id}`)
}

export const GradeRank = (id:number)=>{
    console.log(id)
    return request.get(`/game/xxt/rank/${id}`)
}

export const tileOccupy= (id:number)=>{
    return request.post(`/game/tile/occupy`,{
        gameId:id,
        tileId:1,
        eventType:1,
    })
}

export const Uploadchess =(formdata:FormData)=>{
    return request.post('/game/upload/chess',formdata,{
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}


export const Unselected = (id:number)=>{
    return request.get(`/game/unselected/${id}`)
}


export const Assign = (gameid:number,teamAssignCount:Record<number,number>)=>{
    return request.post('/game/upload/assign',{
        gameId:gameid,
        teamAssignCount,
    })
}


export const OccupyState = (id:number)=>{
    return request.get(`/game/occupyStatus/${id}`)
}


export const StudentOccupy = (data:Occupy)=>{
    console.log(data.gameId)
    return request.post('/game/tile/occupy',data)
}


export const ReOutTeams = (data:ReOutTeam)=>{
    console.log(data)
    return request.put('/game/outTeam',{
        gameId:data.gameId,
        teamIds:data.teamIds,
        type:data.type
    })
}

export const ProTeam =(id:number)=>{
    return request.get('/proposal/init/list',{
        params:{
            gameId:id,
        }
    })
}

export const ProposalList =(id:number)=>{
    return request.get('/proposal/init/list',{
        params:{
           gameId:id,
           sort:1,
        }
    })
}

export const update =(data:UpdateScore)=>{
    console.log(data)
    return request.post('/game/score/update',{
        type: data.type,        // 必须传，1=小组，2=个人
    stage: data.stage,      // 必须传，比赛阶段
    id: data.id,            // 小组ID 或 学生ID
    gameId: data.gameId,    // 比赛ID
    num: data.num,          // 分数变动
    comment: data.comment   // 备注/评语
    })
}