import { UserType } from './../types/user'
import { IAxiosHeader } from './type'

export const serialize: any = (obj: object): string => {
  const str: any = []
  for (const p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
    }
  }
  return str.join('&')
}

export function authHeader(): IAxiosHeader {
  const userLocalStorage: string | null = localStorage.getItem('user') || '{}'
  const user: UserType = JSON.parse(userLocalStorage)

  if (user && user.accessToken) {
    return { Authorization: `Bearer ${user.accessToken}` }
  } else {
    return {}
  }
}
