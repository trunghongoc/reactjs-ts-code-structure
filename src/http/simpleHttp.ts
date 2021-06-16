import axios from 'axios'

export const simpleHttp: any = axios.create({
  timeout: 10000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})
