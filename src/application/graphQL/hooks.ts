import {useMutation}                 from '@apollo/react-hooks'
import {MUTATION}                    from './graphSchems'
import {APPLICATION_MAIN_SUB_DOMAIN} from "../constants";


export const useRedirectLink = () => {
  const [mutationRedirect] = useMutation(MUTATION.ApplicationState.appStateRedirectLink)

  const redirect  = async (layout : string, path : string)  => {
    await mutationRedirect({
      variables:{
        link:`/${APPLICATION_MAIN_SUB_DOMAIN}/${layout}/${path}`
      }
    })
  }

  return {
    redirect
  }
}
