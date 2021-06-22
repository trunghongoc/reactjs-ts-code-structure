import { FC } from 'react'
import { OvalTab } from './../../components/tabs/ovalShape'

import { Props } from './type'

export const CoporateList: FC<Props> = (): JSX.Element => {
  return (
    <>
      <p>Coporates page</p>

      <OvalTab />
    </>
  )
}

export default CoporateList
