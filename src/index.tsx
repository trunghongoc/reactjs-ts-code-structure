import React from 'react'
import ReactDOM from 'react-dom'
import { env } from './environments'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { originalAxios } from './http'
import { HttpConfigType } from './http/type'

import store from './redux/store'
import { Provider } from 'react-redux'

declare const window: HttpConfigType

const { fileConfigPath } = env

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

const initHttpBeforeRenderApp: VoidFunction = (): void => {
  originalAxios
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
  if (!window?.httpConfig?.baseURL) {
    initHttpBeforeRenderApp()
  } else {
    renderApp()
  }
}

initApp()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
