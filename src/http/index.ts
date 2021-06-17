import axios from 'axios'
import { env } from './../environments'
import { simpleHttp } from './simpleHttp'
import { authHeader, isExpiredJWT } from './helper'
import { IAxiosHeader, HttpConfigType } from './type'
import UserService from './../services/user/user.service'

declare const window: HttpConfigType

const { fileConfigPath } = env

const initialHeaders: IAxiosHeader = authHeader()
const http: any = axios.create({
  baseURL: '',
  timeout: 10000,
  headers: initialHeaders
})
const cancelHttp: any = axios.CancelToken.source()

const getNewTokenIfExpired: any = (): string => {
  return UserService.getTokenFromLocalStorage()
}

http.interceptors.request.use(async (config: any): Promise<any> => {
  if (!window?.httpConfig?.baseURL) {
    const response: any = await simpleHttp.get(`/${fileConfigPath}`)
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
http.interceptors.response.use(
  (response: any): any => {
    return response
  },
  (err: any): any => {
    console.log('----res-err:', err)

    return new Promise((resolve?: any, reject?: any): Promise<any> => {
      const currentRequest: any = err.config

      if (
        isExpiredJWT()
      ) {
        currentRequest._retry = true
        const res: any = simpleHttp
          .post('/refresh', {
            token: localStorage.getItem('token'),
            refresh_token: localStorage.getItem('refresh_token')
          })
          .then((_res: any): any => {
            UserService.setCurrentUser(_res.data)
            // this.setSession({ token: res.token, refresh_token: res.refresh })
            // currentRequest.headers['Token'] = _res.token
            // currentRequest.headers['Device'] = 'device'
            http.headers = {
              ...http.headers,
              Authorization: _res?.data?.accessToken
                ? `Bearer ${_res.data.accessToken}`
                : ''
            }
            return http(currentRequest)
          })
        resolve(res)
      }
      return Promise.reject(err)
    })
  }
)
*/

http.interceptors.response.use(
  (response: any): any => {
    return Promise.resolve(response)
  },
  (err: any): any => {
    if (isExpiredJWT(err)) {
      cancelHttp.cancel('The request was canceled')
    }

    return Promise.reject(err)
  }
)

export { http }
