import { lazy } from 'react'
import { RouterItemType } from './type'

// const Home: any = lazy((): Promise<any> => import('./../pages/home'))
// const About: any = lazy((): Promise<any> => import('./../pages/about'))

export const routers: RouterItemType[] = [
  {
    path: '/',
    exact: true,
    component: lazy((): Promise<any> => import('./../pages/home')),
    isPrivate: true
  },
  {
    path: '/about',
    exact: true,
    component: lazy((): Promise<any> => import('./../pages/about')),
    isPrivate: true
  },
  {
    path: '/login',
    exact: false,
    component: lazy((): Promise<any> => import('./../pages/login')),
    isPrivate: false
  },
  {
    path: '/corporates',
    exact: true,
    component: lazy((): Promise<any> => import('./../pages/corporates')),
    isPrivate: true
  }
]
