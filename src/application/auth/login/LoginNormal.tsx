import React, {
  useEffect,
  useState
}                               from 'react'
import {useValidation}          from 'react-hook-custom-validation'
import LoginForm, {ILoginModel} from '../forms/LoginForm'
import {
  useLazyQuery,
  useMutation,
  useQuery
}                             from '@apollo/react-hooks'
import {
  MUTATION,
  processError,
  QUERY
}                             from '../../graphQL'
import {
  RouteComponentProps,
  withRouter
}                             from 'react-router'
import {SpinnerLoadingCenter} from '../../../components/Spinner/SpinnerLoading'
import {
  useRedirectLink
}                             from '../../graphQL/hooks'
import {APP_LAYOUT}           from '../../constants'
import {easyDialogError}      from '../../../components/EasyModel/EasyModal'

const LoginNormal = (props : RouteComponentProps) => {

  const validation = useValidation <ILoginModel>({
    initialData: {
      email: 'boban.mijajlovic.rs@gmail.com',
      password: 'Bobi123$$'
    }
  })

  const [mutationLogin] = useMutation(MUTATION.ApplicationState.appState)
  const  {data} = useQuery(QUERY.ApplicationState.appState)
  const {redirect: redirectFun} = useRedirectLink()

  useEffect(() => {
    if (data.appState.login) {
      redirectFun(APP_LAYOUT.MAIN,'accounts').then( () => {})
    }
  },[data])

  const [loginFunAccount, {loading: loadingAccount,refetch}] = useLazyQuery(QUERY.Account.logged, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    onCompleted:  async (data) => {
      await mutationLogin({
        variables: {
          login: true,
          account: data.logged
        }
      })
    },
    onError: (e) => {
      console.log(e)
    }
  })

  const [loginFun, { loading }] = useLazyQuery(QUERY.Account.login,
      {
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'network-only',
        onCompleted: async (data) => {
          await  mutationLogin({
            variables: {
              refresh: data.data.refresh
            }
          })
          refetch ? refetch() : loginFunAccount()
        },
        onError: (error) => {
          const s = processError(error, validation)
          if (s) {
            easyDialogError(s)
          }
        }
      })

  const handlerOnSubmit = async () => {
    const {error, data: dataValidate} = await validation.validate()
    if (error) {
      return
    }
    loginFun({
      variables: {
        email: dataValidate.email,
        password: dataValidate.password
      }
    })
  }

  return (
    <>
      { loading || loadingAccount ? <SpinnerLoadingCenter/> : <></>   }
      <div className={''}>
        <LoginForm handlerOnSubmit={handlerOnSubmit} validation={validation}/>
      </div>
    </>
  )

}

export default withRouter(LoginNormal)
