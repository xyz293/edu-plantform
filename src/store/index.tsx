import { create } from 'zustand'
import {persist} from 'zustand/middleware'
interface UserState {
  token: string | null;
  id: number| null;
  avatar: string | null;
  nickname: string | null;
}

interface UserActions {
  setToken: (token: string) => void;
  setId: (id: number) => void;
  setAvatar: (avatar: string) => void;
  setNickname: (nickname: string) => void;
  // 也可以加一个 reset 方法
}
const userStore = create(persist<UserState & UserActions>((set) => ({
     token:'',
     avatar:'',
     nickname:'',
     id:0,
     setToken:(token :string) => set({token}),
     setAvatar:(avatar :string) => set({avatar}),
     setNickname:(nickname :string) => set({nickname}),
     setId:(id :number) => set({id}),
}),{
  name:'user'
}
))
export default userStore