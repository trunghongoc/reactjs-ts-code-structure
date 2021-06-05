import { FC, useEffect } from 'react'
import { env } from './environments'
import { http } from './http'
// import axios from 'axios'

type Props = any

const App: FC<Props> = (): JSX.Element => {
  const fetchUser: any = (): void => {
    http.get('/todos/1')
  }

  useEffect((): void => {
    fetchUser()
  }, [])

  return (
    <>
      <p>ENV: {JSON.stringify(env)}</p>

      <button onClick={fetchUser}>Fetch API</button>
    </>
  )
}

export default App
