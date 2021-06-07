import axios from 'axios'
import { env } from './../environments'
import { authHeader } from './helper'
import { IAxiosHeader, HttpConfigType } from './http'

declare const window: HttpConfigType

const { fileConfigPath } = env

export const originalAxios: any = axios.create({
  timeout: 10000,
  headers: { 'X-Custom-Header': 'foobar' }
})

const initialHeaders: IAxiosHeader = authHeader()
const http: any = axios.create({
  baseURL: '',
  timeout: 1000,
  headers: initialHeaders
})

http.interceptors.request.use(async (config: any): Promise<any> => {
  if (!window?.httpConfig?.baseURL) {
    const response: any = await originalAxios.get(`/${fileConfigPath}`)
    window.httpConfig = response.data
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

export { http }
