import { http } from './../../http'
import { UserType } from './../../types/user'
import store from './../../redux/store'
import { setCurrentUser } from './../../redux/reducers/userSlice'
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
    store.dispatch(setCurrentUser(user))
    localStorage.setItem('user', JSON.stringify(user))
  }

  removeCurrentUser(): void {
    localStorage.removeItem('user')
    store.dispatch(setCurrentUser(null))
  }

  getTokenFromLocalStorage(): string {
    const userJson: string = localStorage.getItem('user') || ''
    let user: UserType | null = null
    if (userJson) {
      user = JSON.parse(userJson)
    }

    return (user && user?.accessToken) || ''
  }
}

export default new UserService()
