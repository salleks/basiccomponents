import {QUERY}         from './graphSchems'
import {IModelAccount} from './models'

export const resolvers = {
  Mutation: {

    setAppStateRedirectLinkProcessed:(parent : any,data = {},{ cache } : {cache : any}) : any  => {
      const appState = cache.readQuery({
        query: QUERY.ApplicationState.appState
      })
      const state = {
        ...appState.appState,
        redirectLink: {
          ...appState.appState.redirectLink,
          processed: true
        }
      }
      try {
        cache.writeData({
          data: {
            ApplicationState: state
          }
        })
      } catch (e) {
        console.log(e)
      }
      return  state
    },

    setAppStateRedirectLink:(parent : any, {link} : {link : string}, { cache } : {cache : any}) : any  => {
      const appState = cache.readQuery({
        query: QUERY.ApplicationState.appState
      })
      const state = {
        ...appState.appState,
        redirectLink: {
          ...appState.appState.redirectLink,
          link: link,
          processed: false
        }
      }
      try {
        cache.writeData({
          data: {
            ApplicationState: state
          }
        })
      } catch (e) {
        console.log(e)
      }
      return  state
    },
    setAppState: (parent : any, { login,refresh, account } : {login ?  : boolean, account ? : IModelAccount, refresh ?: string}, { cache } : {cache : any}) : any  => {
      const appState = cache.readQuery({
        query: QUERY.ApplicationState.appState
      })

      const state = {
        ...appState.appState,
        login:login === void(0) ? appState.appState.login : login,
        account: account === void(0) ? appState.appState.account : {...account},
        refreshTokenTime: refresh ? refresh : appState.appState.refreshTokenTime
      }
      try {
        cache.writeData({
          data: {
            ApplicationState: state
          }
        })
      } catch (e) {
        console.log(e)
      }
      return  state
    },
  }
}
