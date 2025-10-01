import request from '../ulits/reuqest'

export const NewGame = (formData: FormData) => {
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