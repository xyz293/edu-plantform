import request from '../ulits/reuqest'

export const NewGame = (formData: FormData) => {
   return request.post('/game/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
})
}

export const ClassGame = (id:number)=>{
    return request.get(`/game/status/${id}`)
}