import {createContext} from 'react'
import type {game} from '../type/game/index'
export const getToken = () => {
  const user = localStorage.getItem('user')
  if(user){
    return JSON.parse(user).state.token
  }
  return null
}
export const getusername = () => {
  const user = localStorage.getItem('user')
  if(user){
    return JSON.parse(user).state.nickname
  }
  return null
}

export const getAvatar = () => {
  const user = localStorage.getItem('user')
  if(user){
    return JSON.parse(user).state.avatar
  }
  return null
}

export const getEmail = () => {
  const user = localStorage.getItem('user')
  if(user){
    return JSON.parse(user).state.email
  }
  return null
}

export const getId = () => {
  const user = localStorage.getItem('user')
  if(user){
    return JSON.parse(user).state.id
  }
  return null
}

export const useData = createContext<game |null>(null)

export function splitThree(n: number): [number, number, number] {
    const base = Math.floor(n / 3)
    const remainder = n % 3

    const result = [base, base, base]

    for (let i = 0; i < remainder; i++) {
        result[i] += 1
    }

    return result as [number, number, number]
}