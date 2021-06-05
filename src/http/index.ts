import axios from 'axios'
import { env } from './../environments'

let responseConfig: any = null

const { fileConfigPath } = env

const originnalAxios: any = axios.create({
  timeout: 10000,
  headers: { 'X-Custom-Header': 'foobar' }
})

const http: any = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
})

http.interceptors.request.use(async (config: any): Promise<any> => {
  if (!responseConfig) {
    const response: any = await originnalAxios.get(`/${fileConfigPath}`)
    responseConfig = response.data
  }

  config.baseURL = responseConfig.apiUrl

  return config
})

export { http }
