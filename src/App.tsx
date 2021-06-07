import { FC, useEffect } from 'react'
import { env } from './environments'
import { http } from './http'
import './scss/index.scss'
import { Counter } from './components/Counter'
import { useSelector } from 'react-redux'

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
    </>
  )
}

export default App
