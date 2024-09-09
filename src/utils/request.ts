import axios, { AxiosResponse } from "axios"
import apiConfig, { ApoConfigKeyType } from "@/api"

const instance = axios.create({
  baseURL: 'http://192.168.10.116:7001',
  timeout: 10 * 1000
})

instance.interceptors.response.use(
  response => response,
  error => {
    const { response } = error
    if (response) {
      const { status } = response
      if (status >= 500) {
        // 服务端错误
      } else if (status === 400) {
        // 接口参数异常
      } else if (status === 401) {
        // 登录信息过期
      } else {
        // 其他错误
      }
    } else {
      // 网络异常
    }
    return Promise.reject(error)
  }
)

export const request = (name: ApoConfigKeyType, params: any): Promise<AxiosResponse<any, any>> => {
  const api = apiConfig[name]
  const { url, method } = api
  if (method === 'get') {
    return get(url, params)
  } else {
    return post(url, params)
  }
}

export const get = (url: string, params: any): Promise<AxiosResponse<any, any>> => {
  return instance.get(url, {
    params: params
  })
}

export const post = (url: string, params: any): Promise<AxiosResponse<any, any>> => {
  return instance.post(url, params)
}