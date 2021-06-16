import React from 'react'
import ReactDOM from 'react-dom'
import { env } from './environments'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { simpleHttp } from './http/simpleHttp'
import { HttpConfigType } from './http/type'
import UserService from './services/user/user.service'

import store from './redux/store'
import { Provider } from 'react-redux'

import { UserType } from './types/user'

declare const window: HttpConfigType

const { fileConfigPath } = env

const loadUserFromLocalStorage: VoidFunction = (): void => {
  const userStr: string | null = localStorage.getItem('user')
  if (userStr) {
    const user: UserType = JSON.parse(userStr)
    UserService.setCurrentUser(user)
  }
}

const renderApp: VoidFunction = (): void => {
  ReactDOM.render(
    // <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>,
    // </React.StrictMode>,
    document.getElementById('root')
  )
}

const initHttpAndRenderApp: VoidFunction = (): void => {
  simpleHttp
    .get(`/${fileConfigPath}`)
    .then((res: any): any => {
      window.httpConfig = res.data
      renderApp()
    })
    .catch((): void => {
      renderApp()
    })
}

const initApp: any = async (): Promise<any> => {
  loadUserFromLocalStorage()

  if (!window?.httpConfig?.baseURL) {
    initHttpAndRenderApp()
  } else {
    renderApp()
  }
}

initApp()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
