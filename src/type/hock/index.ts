import type {Proposalslist} from '../proposals/index'
export interface Pref{
    proposal?:Proposalslist[]
}

export interface Context{
    setIsDel:(isDel:boolean)=>void
    isDel:boolean
}