import { FC, Suspense, useEffect } from 'react'
import { env } from './environments'
import { http } from './http'
import './scss/index.scss'
import { useSelector } from 'react-redux'
import { RouterItemType } from './router/type'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import { Counter } from './components/Counter'
import { routers } from './router'

type Props = any

interface VoidFunction {
  // tslint:disable-next-line
  (param?: any): void
}

const App: FC<Props> = (): JSX.Element => {
  const count: number = useSelector((state: any): number => state.counter.value)

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
      <p>ENV: {JSON.stringify(env)}</p>

      <button onClick={fetchUser}>Fetch API</button>

      <p>Current counter: {count}</p>
      <Counter />

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

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}

          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              {routers.map(
                (router: RouterItemType, index: number): JSX.Element => {
                  const Page: FC = router.component
                  // const { component: Page } = router

                  return (
                    <Route path={router.path} exact={router.exact} key={index}>
                      <Page />
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
