import axios from 'axios'
import {getToken} from '../ulits/tool'
import { baseURL, timeout } from './config'
const request = axios.create({
  baseURL,
  timeout
})

// 添加请求拦截器
const map = new Map()
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const token = getToken()
   
    if(token){
      config.headers["Authorization"] =token  
    }
    const contorl =new AbortController()
    config.signal = contorl.signal
    if(map.get(config.url)){
      map.get(config.url).abort()
      map.delete(config.url)
    }
    map.set(config.url,contorl)
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    map.delete(response.config.url)

    if(response.data.code === 250){
      alert('登录过期，请重新登录')
      window.location.href = '/login'
    }
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    map.delete(error.config.url)
    return Promise.reject(error);
  });
export default request
