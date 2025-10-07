import request from '../ulits/reuqest'
import type {Proposalinit} from '../type/proposals/index'
export const init = (data:Proposalinit[]) =>{
    return request.post('/proposal/init',data)
}
