export interface IAxiosHeader {
  'Authorization'?: string
  'Access-Control-Allow-Origin': string
  'Accept': string
  'Content-Type': string
}

export interface HttpConfigType {
  httpConfig: {
    baseURL: string
  }
}
