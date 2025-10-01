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

