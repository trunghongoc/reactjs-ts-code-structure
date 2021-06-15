import { UserType } from './../types/user'
import { IHeaderLink } from './../types/pageHeader'
export interface StoreType {
  counter: any
  user: {
    currentUser: UserType
  }
  spin: {
    isShowGlobalSpin: boolean
  }
  layout: {
    headerLinks: IHeaderLink[]
  }
}
