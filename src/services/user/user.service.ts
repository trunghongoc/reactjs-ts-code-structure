import { http } from './../../http'
import { UserType } from './../../types/user'

export class UserService {
  getPublicContent(): Promise<any> {
    return http.get('/all')
  }

  getUserBoard(): Promise<any> {
    return http.get('/user')
  }

  getModeratorBoard(): Promise<any> {
    return http.get('/mod')
  }

  getAdminBoard(): Promise<any> {
    return http.get('/admin')
  }

  setCurrentUser(user: UserType): void {
    localStorage.setItem('user', JSON.stringify(user))
  }

  removeCurrentUser(): void {
    localStorage.removeItem('user')
  }

  getTokenFromLocalStorage(): string {
    const userJson: string | null = localStorage.getItem('user') || ''
    const user: UserType = JSON.parse(userJson)

    return user?.accessToken || ''
  }
}

export default new UserService()
