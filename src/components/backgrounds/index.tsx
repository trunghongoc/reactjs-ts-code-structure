import { FC, useEffect } from 'react'

import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { UserType } from './../../types/user'

type Props = {} | undefined

export const BackgroundTasks: FC<Props> = (): JSX.Element => {
  const user: UserType = useSelector(
    (state: any): UserType => state.user.currentUser
  )
  const history: any = useHistory()

  useEffect((): void => {
    if (!user.id) {
      // history.push('/login')
    }
  }, [user, history])

  return <></>
}
