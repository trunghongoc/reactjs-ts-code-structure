import axios from 'axios'
import { env } from './../environments'
import { authHeader } from './helper'
import { IAxiosHeader, HttpConfigType } from './type'
import UserService from './../services/user/user.service'

declare const window: HttpConfigType

const { fileConfigPath } = env

export const originalAxios: any = axios.create({
  timeout: 10000,
  headers: { 'X-Custom-Header': 'foobar' }
})

const initialHeaders: IAxiosHeader = authHeader()
const http: any = axios.create({
  baseURL: '',
  timeout: 10000,
  headers: initialHeaders
})

const getNewTokenIfExpired: any = (): string => {
  return UserService.getTokenFromLocalStorage()
}

http.interceptors.request.use(async (config: any): Promise<any> => {
  if (!window?.httpConfig?.baseURL) {
    const response: any = await originalAxios.get(`/${fileConfigPath}`)
    window.httpConfig = response.data
  }

  const newToken: string = await getNewTokenIfExpired()
  config.headers = {
    ...config.headers,
    Authorization: newToken ? `Bearer ${newToken}` : ''
  }
  config.baseURL = await window?.httpConfig?.baseURL

  return config
})

/*
enum Method {
  GET = 'get',
  POST = 'post',
  DELETE = 'delete',
  HEAD = 'head',
  OPTIONS = 'options',
  PUT = 'put',
  PATCH = 'patch'
}
const http: any = {}

http.get = async (url: string, payload: object): Promise<any> => {
  if (!responseConfig) {
    const response: any = await originnalAxios.get(`/${fileConfigPath}`)
    responseConfig = await response.data
  }

  const query: string = serialize(payload)

  return newHttp.get(`${responseConfig.apiUrl}${url}?${query}`)
}
const request: any = async (
  method: Method,
  url: string,
  payload: object
): Promise<any> => {
  if (!responseConfig) {
    const response: any = await originnalAxios.get(`/${fileConfigPath}`)
    responseConfig = await response.data
  }

  return newHttp[method](`${responseConfig.apiUrl}${url}`, payload)
}

http.post = async (url: string, payload: object): Promise<any> => {
  return request(Method.POST, url, payload)
}
http.put = async (url: string, payload: object): Promise<any> => {
  return request(Method.PUT, url, payload)
}
http.patch = async (url: string, payload: object): Promise<any> => {
  return request(Method.PATCH, url, payload)
}
http.delete = async (url: string, payload: object): Promise<any> => {
  return request(Method.DELETE, url, payload)
}
http.options = async (url: string, payload: object): Promise<any> => {
  return request(Method.OPTIONS, url, payload)
}
http.head = async (url: string, payload: object): Promise<any> => {
  return request(Method.HEAD, url, payload)
}
*/

/*
http.interceptors.response.use(
  (response: any): any => {
    return response
  },
  (err: any): any => {
    console.log('----res-err:', err)

    // return new Promise((resolve?: any, reject?: any): Promise<any> => {
    //   const originalReq: any = err.config
    //   if (
    //     err?.respons?.status === 401 &&
    //     err?.config &&
    //     !err?.config?.__isRetryRequest
    //   ) {
    //     originalReq._retry = true
    //     const res: any = originalAxios
    //       .post('/refresh', {
    //         token: localStorage.getItem('token'),
    //         refresh_token: localStorage.getItem('refresh_token')
    //       })
    //       .then((_res: any): any => {
    //         UserService.setCurrentUser(_res.data)
    //         // this.setSession({ token: res.token, refresh_token: res.refresh })
    //         // originalReq.headers['Token'] = _res.token
    //         // originalReq.headers['Device'] = 'device'
    //         http.headers = {
    //           ...http.headers,
    //           Authorization: _res?.data?.accessToken
    //             ? `Bearer ${_res.data.accessToken}`
    //             : ''
    //         }
    //         return http(originalReq)
    //       })
    //     resolve(res)
    //   }
    //   return Promise.reject(err)
    // })
  }
)
*/

export { http }
