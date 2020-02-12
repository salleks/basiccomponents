import React                           from 'react'
import Paper                           from '../../../components/Paper'
import {
  areTheSame,
  minLength,
  required,
  useValidation
}                                      from 'react-hook-custom-validation'
import {Button}                        from '../../../components/Button'
import InputTextPasswordWithValidation from './../../../forms/componentsWithValidation/InputTextPasswordWithValidation'
import {faKey}                         from '@fortawesome/free-solid-svg-icons'
import {useMutation}                   from '@apollo/react-hooks'
import {
  MUTATION,
  processError
}                                      from '../../graphQL'
import {APP_LAYOUT}                    from '../../constants'
import {easyDialogError}               from '../../../components/EasyModel/EasyModal'
import {RouteComponentProps}           from 'react-router'
import {useRedirectLink}               from '../../graphQL/hooks'
import {withRouter}                    from 'react-router'
import {SpinnerLoadingCenter}          from '../../../components/Spinner/SpinnerLoading'

export interface IChangePasswordModel {
  password : string,
  confirmPassword : string
}

const passwordRule = {
  required,
  minLength: minLength({
    message: 'Password must be at least 4 char long',
    min: 4
  }),
  customValidation: (value : string) => {
    if (!value) {
      return false
    }
    if (/[^a-z0-9#$@!+*%]/gi.exec(value)) {
      return 'Password must be in scope of A-Za-z0-9#$@!+*%'
    }

    if (!/[A-Z]/.exec(value)) {
      return 'Password must have at least one Upper case letter'
    }
    if (!/\d/.exec(value)) {
      return 'Password must have at least one number'
    }
    if (!/[a-z]/.exec(value)) {
      return 'Password must have at least one Small case letter'
    }
    return false
  },
  areTheSame: areTheSame({
    message: 'Password must match',
    field: 'confirmPassword'
  })
}

const ChangePasswordForm = (props : RouteComponentProps) => {

  const validation = useValidation<IChangePasswordModel>()

  const [mutationChangePass, {loading}] = useMutation(MUTATION.accountChangePassword)
  const {redirect: redirectFun} = useRedirectLink()

  const handlerOnSubmit = async () => {
    const {error, data} = await validation.validate()
    if (error) {
      return
    }

    const _data = {
      variables: {
        data: {
          password: data.password,
          key: props.location.search.replace(/^.*=\s*(.*)/, '$1')
        }
      }
    }
    mutationChangePass(_data as any).then((result) => {
      redirectFun(APP_LAYOUT.AUTH, 'success-password-changed')
    })
      .catch((e) => {
        const s = processError(e, validation)
        if (s) {
          easyDialogError(s) 
        }
      })

  }
  return (
    <>
      {loading ? <SpinnerLoadingCenter/> : <></>}
      <Paper header={'Change password'}>
        <InputTextPasswordWithValidation
                    required
                    label={'New password'}
                    helperText={'enter password'}
                    icon={faKey}
                    validation={{
                      useValidation: validation,
                      model: 'password',
                      rule: passwordRule
                    }}
        />
        <InputTextPasswordWithValidation
                    required
                    label={'Repeat password'}
                    helperText={'enter password'}
                    icon={faKey}
                    validation={{
                      useValidation: validation,
                      model: 'confirmPassword',
                      rule: {
                        required,
                        areTheSame: areTheSame({
                          message: 'Password must match',
                          field: 'password'
                        })
                      }
                    }}
        />
        <div className={'hw-login-form-button'}>
          <Button color={'primary'} outline onClick={handlerOnSubmit} label={'CONFIRM'}/>
        </div>
      </Paper>
    </>
  )
}

export default withRouter(ChangePasswordForm)
