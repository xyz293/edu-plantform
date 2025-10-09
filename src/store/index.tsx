import { create } from 'zustand'
import {persist} from 'zustand/middleware'
interface UserState {
  token: string | null;
  id: number| null;
  avatar: string | null;
  nickname: string | null;
  email: string | null;
  submitlist: number[][];
}

interface UserActions {
  setToken: (token: string) => void;
  setId: (id: number) => void;
  setAvatar: (avatar: string) => void;
  setNickname: (nickname: string) => void;
  setEmail: (email: string) => void;

  // 也可以加一个 reset 方法
}
const userStore = create(persist<UserState & UserActions>((set) => ({
     token:'',
     avatar:'',
     nickname:'',
     id:0,
     email:'',
     submitlist: [[],[],[]],
     setToken:(token :string) => set({token}),
     setAvatar:(avatar :string) => set({avatar}),
     setNickname:(nickname :string) => set({nickname}),
     setId:(id :number) => set({id}),
     setEmail:(email :string) => set({email}),
     setSubmitlist:(list :number[][]) => set({submitlist:list}),
}),{
  name:'user'
}
))
export default userStore