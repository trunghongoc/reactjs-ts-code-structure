import { UserType } from './../types/user'

export interface StoreType {
  counter: any
  user: {
    currentUser: UserType
  }
}
