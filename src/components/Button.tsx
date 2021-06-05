import { FC } from 'react'

type Props = {} | undefined

export const Button: FC<Props> = (): JSX.Element => {
  return (
    <>
      <button>Click me</button>
    </>
  )
}
