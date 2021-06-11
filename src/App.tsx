import { FC, Suspense, useEffect } from 'react'
import { env } from './environments'
import { http } from './http'
import './scss/index.scss'
import { useSelector } from 'react-redux'

import { StoreType } from './redux/type'
import { UserType } from './types/user'
import { RouterItemType } from './router/type'

import {
  BrowserRouter as Router,
  Switch,
  Link,
  Redirect,
  Route
} from 'react-router-dom'

import { routers } from './router'

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
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
            </ul>
          </nav>

          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              {routers.map(
                (router: RouterItemType, index: number): JSX.Element => {
                  const Page: FC = router.component

                  return (
                    <Route path={router.path} exact={router.exact} key={index}>
                      {currentUser.id ? <Page /> : <Redirect to="/login" />}
                    </Route>
                  )
                }
              )}
            </Switch>
          </Suspense>
        </div>
      </Router>
    </>
  )
}

export default App
