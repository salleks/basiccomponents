import React                   from 'react'
import Paper                   from '../../../components/Paper'
import InputTextWithValidation from '../../../forms/componentsWithValidation/InputTextWithValidation'
import {
  IUseValidation,
  required,
  useValidation
}                              from 'react-hook-custom-validation'

import {Button}     from '../../../components/Button'
import {faEnvelope} from '@fortawesome/free-solid-svg-icons'
import {isEmail}    from 'validator'
import {
  useLazyQuery,
  useMutation
}                             from '@apollo/react-hooks'
import {
  MUTATION,
  processError,
  QUERY
}                             from '../../graphQL'
import {
  useRedirectLink
}                             from '../../graphQL/hooks'
import {SpinnerLoadingCenter} from '../../../components/Spinner/SpinnerLoading'
import {APP_LAYOUT}           from '../../constants'

export interface IForgotPasswordModel {
  email : string
}

const ForgotPasswordForm = () => {

  const validation = useValidation<IForgotPasswordModel>({
    initialData: {
      email: 'boban.mijajlovic.rs@gmail.com'
    }
  })
  const {redirect: redirectFun} = useRedirectLink()

  const [queryFun, {loading}] = useLazyQuery(QUERY.Account.accountPasswordRecovery, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    onCompleted: async () => {
      await redirectFun(APP_LAYOUT.AUTH, 'success-request-password-changed')
    },
    onError: (error) => {
      processError(error, validation)
    }
  })

  const handlerOnSubmit = async () => {
    const {error, data} = await validation.validate()
    if (error) {
      return 
    }
    queryFun({
      variables: {
        email: data.email
      }
    })
  }

  return (
    <>
      {loading ? <SpinnerLoadingCenter /> : <></>}
      <Paper header={'Forgot password'}>
        <InputTextWithValidation
                    label={'Email'}
                    helperText={'Enter valid email for recovery'}
                    icon={faEnvelope}
                    validation={{
                      useValidation: validation,
                      model: 'email',
                      rule: {
                        required,
                        useValidator: [
                          {
                            validator: isEmail,
                          }
                        ]
                      }
                    }}
        />
        <div className={'hw-login-form-button'}>
          <Button color={'primary'} outline onClick={handlerOnSubmit} label={'SEND'}/>
        </div>
      </Paper>
    </>
  )
}

export default ForgotPasswordForm
