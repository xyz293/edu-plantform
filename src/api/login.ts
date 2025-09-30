import request from '../ulits/reuqest'
import type {Userinfo} from '../type/user/index'
import type {Logininfo} from '../type/user/index'
export const sendCode =(email:string) =>{  //3671263704
    return request.get('/user/sendCode',{params:{identifier:email}})
}

export const regiser = (data:Userinfo) =>{
    console.log(data.email)
    return request.post('/user/regist',{
        username:data.username,
        email:data?.email,
        avatar:data?.avatar,
        password:data.password,
        nickname:data.nickname,
        type:data.type,
        code:data.code
    
    })
}
export const login = (data:Logininfo) =>{
    console.log(data)
    return request.post('/user/login',{
        username:data.username,
        password:data.password,
        emailCode:data.code,
        loginType:data.type
    })
}