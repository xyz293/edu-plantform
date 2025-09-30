export const getToken = () => {
  const user = localStorage.getItem('user')
  if(user){
    return JSON.parse(user).state.token
  }
  return null
}