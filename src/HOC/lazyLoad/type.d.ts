import { FC } from 'react'

export interface Props {}
export interface HOC {
  new: (component: FC<Props>) => void
}
