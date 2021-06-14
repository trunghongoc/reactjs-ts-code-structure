import { FC, useEffect, useMemo } from 'react'

import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { UserType } from './../../types/user'

type Props = {} | undefined

export const BackgroundTasks: FC<Props> = (): JSX.Element => {
  const user: UserType = useSelector(
    (state: any): UserType => state.user.currentUser
  )
  const history: any = useHistory()

  const isLogedIn: boolean = useMemo((): boolean => {
    return user && !!user.id
  }, [user])

  useEffect((): void => {
    if (!isLogedIn) {
      history.push('/login')
    }
  }, [isLogedIn, history])

  return <></>
}
