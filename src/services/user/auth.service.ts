import { http } from './../../http'
import UserService from './user.service'

class AuthService {
  login(username: string, password: string): Promise<any> {
    return (
      http
        // .post('/signin', { username, password })
        .post('/posts', { username, password })
        .then((response: any): void => {
          // if (response?.data?.accessToken) {
          UserService.setCurrentUser(response.data)
          // }

          return response.data
        })
    )
  }

  logout(): void {
    UserService.removeCurrentUser()
  }

  register(username: string, email: string, password: string): Promise<any> {
    return http.post('/signup', {
      username,
      email,
      password
    })
  }
}

export default new AuthService()
