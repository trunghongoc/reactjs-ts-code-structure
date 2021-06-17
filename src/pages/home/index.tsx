import { FC } from 'react'

import { ExampleTable } from './../../components/tables/example'

import { Props } from './type'

export const Home: FC<Props> = (): JSX.Element => {
  return (
    <>
      <p>Home page</p>

      <ExampleTable />
    </>
  )
}

export default Home
