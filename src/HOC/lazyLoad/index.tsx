import { FC, Suspense } from 'react'
import { Props } from './type'

export const withSuspense: any =
  (WrappedComponent: FC<Props>): FC<Props> =>
  (props: Props): JSX.Element => {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <WrappedComponent {...props} />
      </Suspense>
    )
  }
