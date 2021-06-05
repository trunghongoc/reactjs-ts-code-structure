import { FC } from 'react'
import { env } from './environments'

type Props = any

const App: FC<Props> = (): JSX.Element => {
  return (
    <>
      <p>ENV: {JSON.stringify(env)}</p>
    </>
  )
}

export default App
