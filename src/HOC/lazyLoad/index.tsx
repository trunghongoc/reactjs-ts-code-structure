import { FC, Suspense } from 'react'
import { HOC, Props } from './type'

export const withSuspense: HOC =
  (WrappedComponent: FC<Props>): FC<Props> =>
  (props: Props): JSX.Element => {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <WrappedComponent {...props} />
      </Suspense>
    )
  }
