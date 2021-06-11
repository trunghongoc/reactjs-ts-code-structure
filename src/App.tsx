import { FC, useEffect } from 'react'
import { http } from './http'
import './scss/index.scss'
import { useSelector } from 'react-redux'

import { StoreType } from './redux/type'
import { UserType } from './types/user'

import { BrowserRouter as Router, Redirect } from 'react-router-dom'
import { AdminLayout } from './layouts/Admin'

type Props = any

interface VoidFunction {
  // tslint:disable-next-line
  (param?: any): void
}

const App: FC<Props> = (): JSX.Element => {
  const currentUser: UserType = useSelector(
    (store: StoreType): any => store.user.currentUser
  )

  const fetchUser: VoidFunction = (a?: number): void => {
    http.get('/todos/1', {
      a: 1,
      b: 2
    })
  }

  useEffect((): void => {
    fetchUser()
    fetchUser(1)
  }, [])

  return (
    <>
      <Router>
        {currentUser.id || true ? <AdminLayout /> : <Redirect to="/login" />}
      </Router>
    </>
  )
}

export default App
