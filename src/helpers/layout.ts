import store from './../redux/store'
import { setHeaderLinks as setHeaderLinksAction } from './../redux/reducers/layoutSlice'
import { IHeaderLink } from './../types/pageHeader'

export const setHeaderLinks: any = (links: IHeaderLink[]): void => {
  store.dispatch(setHeaderLinksAction(links))
}
