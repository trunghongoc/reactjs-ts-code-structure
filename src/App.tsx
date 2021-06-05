import { FC } from 'react'
import logo from './logo.svg'
import './App.css'
import { Button } from './components/Button'

type Props = {} | undefined
type Abc = any

const App: FC<Props> = (): JSX.Element => {
  const abc = {
    a: 'Sample text'
  }

  const b: string = '<Test string type>'
  let a: Abc
  a = 1

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React. {abc.a} {b}
          {a}
        </a>
      </header>

      <Button />
    </div>
  )
}

export default App
