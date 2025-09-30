export interface Userinfo{
    username:string
    email:string
    avatar?:string
    password:string
    nickname:string
    type:number
    code:string
}
export interface Logininfo{
    username:string
    password?:string
    code?:string
    type:number
}