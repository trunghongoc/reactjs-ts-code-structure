import { FC } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './../redux/reducers/counterSlice'

type Props = {} | undefined

export const Counter: FC<Props> = (): JSX.Element => {
  const count: number = useSelector((state: any): number => state.counter.value)
  const dispatch: any = useDispatch()

  return (
    <>
      <div>
        <div>
          <button
            aria-label="Increment value"
            onClick={(): any => dispatch(increment())}
          >
            Increment
          </button>
          <span>{count}</span>
          <button
            aria-label="Decrement value"
            onClick={(): any => dispatch(decrement())}
          >
            Decrement
          </button>
        </div>
      </div>
    </>
  )
}
