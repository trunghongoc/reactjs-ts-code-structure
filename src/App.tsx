import { FC, useEffect } from 'react'
import { http } from './http'
import './scss/index.scss'
import { useSelector } from 'react-redux'

import { StoreType } from './redux/type'
import { UserType } from './types/user'

import { BrowserRouter as Router } from 'react-router-dom'
import { AdminLayout } from './layouts/verticalAdminMenu'
import { BackgroundTasks } from './components/backgrounds'

type Props = any

interface VoidFunction {
  // tslint:disable-next-line
  (param?: any): void
}

const App: FC<Props> = (): JSX.Element => {
  const currentUser: UserType = useSelector(
    (store: StoreType): any => store.user.currentUser
  )

  /*
  const isLogedIn: boolean = useMemo((): boolean => {
    return !!currentUser.id
  }, [currentUser])
  */

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
        <AdminLayout />
        <BackgroundTasks />
        {currentUser && null}
      </Router>
    </>
  )
}

export default App
