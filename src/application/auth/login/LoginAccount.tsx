import React, {useEffect}                     from 'react'
import {useValidation}                        from 'react-hook-custom-validation'
import {
  useLazyQuery,
  useMutation,
  useQuery
}                                             from '@apollo/react-hooks'
import {
  MUTATION,
  processError,
  QUERY
}                                             from '../../graphQL'
import {
  RouteComponentProps,
  withRouter
}                                             from 'react-router'
import {SpinnerLoadingCenter}                 from '../../../components/Spinner/SpinnerLoading'
import LoginAccountForm, {ILoginAccountModel} from '../forms/LoginAccountForm'

const LoginAccount = (props : RouteComponentProps) => {

  const validation = useValidation <ILoginAccountModel>({
    initialData: {
      accountCode: '',
      username: 'boban.mijajlovic.rs@gmail.com',
      password: 'Bobi123$$'
    }
  })

  const [mutationLogin] = useMutation(MUTATION.ApplicationState.appState)
  const  {data} = useQuery(QUERY.ApplicationState.appState)

  useEffect(() => {
    if (data.appState.login) {
      props.history.push('/application/main/accounts')
    }
  },[data])

  const [loginFunAccount, {loading: loadingAccount,refetch}] = useLazyQuery(QUERY.Account.logged, {
    onCompleted:  async (data) => {
      try {
        await mutationLogin({
          variables: {
            login: true,
            account: data.logged
          }
        })
      } catch (e) {
        processError(e, validation)
      }
    },
    onError: (e) => {
      console.log(e)
    }
  })

  const [loginFun, { loading }] = useLazyQuery(QUERY.Account.login,
        {
          onCompleted: async (data) => {
            try {
              await  mutationLogin({
                variables: {
                  refresh: data.data.refresh
                }
              })
            } catch (e) {
              processError(e, validation)
            }
            refetch ? refetch() : loginFunAccount()
          },
          onError: (error) => {
            processError(error, validation)
          }
        })

  const handlerOnSubmit = async () => {
    const {error, data: dataValidate} = await validation.validate()
    if (error) {
      return
    }
    loginFun({
      variables: {
        accountCode: dataValidate.accountCode,
        username: dataValidate.username,
        password: dataValidate.password
      }
    })
  }

  return (
    <>
      { loading || loadingAccount ? <SpinnerLoadingCenter/> : <></>   }
      <div className={''}>
        <LoginAccountForm handlerOnSubmit={handlerOnSubmit} validation={validation}/>
      </div>
    </>
  )

}

export default withRouter(LoginAccount)
