import { FC } from 'react'
import { Redirect, Route } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { StoreType } from './../../redux/type'
import { UserType } from './../../types/user'
import { RouterItemType } from './../../router/type'

interface Props {
  router: RouterItemType
}

export const PrivateRouter: FC<Props> = ({ router }: Props): JSX.Element => {
  const user: UserType = useSelector(
    (store: StoreType): any => store.user.currentUser
  )

  const Component: FC = router.component

  return (
    <Route path={router.path} exact={router.exact}>
      {user.id ? <Redirect to="/dashboard" /> : <Component />}
    </Route>
  )
}
