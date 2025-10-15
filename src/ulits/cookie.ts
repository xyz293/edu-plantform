import Cookies from 'js-cookie'
export const setCookie = (name: string, value: string, expires?: number) => {
  Cookies.set(name, value, { expires ,path:'/'})
}

export const getCookie = (name: string) => {
  return Cookies.get(name)
}