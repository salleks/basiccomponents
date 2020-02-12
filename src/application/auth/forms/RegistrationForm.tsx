import React, {
  useEffect,
  useRef,
  useState
}                                      from 'react'
import {Button}                        from '../../../components/Button'
import {
  faAt,
  faKey,
  faUser
}                                      from '@fortawesome/free-solid-svg-icons'
import Recaptcha                       from 'react-recaptcha'
import Paper                           from '../../../components/Paper'
import {
  areTheSame,
  minLength,
  required,
  useValidation,
}                                      from 'react-hook-custom-validation'
import InputTextWithValidation         from '../../../forms/componentsWithValidation/InputTextWithValidation'
import InputTextPasswordWithValidation from '../../../forms/componentsWithValidation/InputTextPasswordWithValidation'
import {isEmail}                       from 'validator'
import {ToolTipOpen}          from '../../../components/Tooltip/Tooltip'
import {useMutation}          from '@apollo/react-hooks'
import {
  MUTATION,
  processError
}                             from '../../graphQL'
import {
  useRedirectLink
}                             from '../../graphQL/hooks'
import {easyDialogError}      from '../../../components/EasyModel/EasyModal'
import {SpinnerLoadingCenter} from '../../../components/Spinner/SpinnerLoading'
import {APP_LAYOUT}           from '../../constants'

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

export interface IRegistrationModel {
  accountCode : string
  userName : string
  email : string
  password : string
  confirmPassword : string

}

const RegistrationForm = () => {

  const validation = useValidation<IRegistrationModel>({
    initialData: {
      accountCode: 'hwt',
      userName: 'Boban123$$',
      email: 'boban.mijajlovic.rs@gmail.com',
      password: 'Bobi123$$',
      confirmPassword: 'Bobi123$$'
    }
  })

  const captchaRef = useRef()
  const [mutationRegistration, {loading}] = useMutation(MUTATION.registration)
  const {redirect: redirectFun} = useRedirectLink()

  const handlerOnSubmit = async () => {
    const {error, data} = await validation.validate()
    if (error) {
      return
    }
    const _data = {
      variables: {
        data: {
          accountCode: data.accountCode,
          userName: data.userName,
          email: data.email,
          password: data.password
        }
      }
    }
    mutationRegistration(_data as any).then((result) => {
      redirectFun(APP_LAYOUT.AUTH, 'success-registration')
    })
      .catch((e) => {
        const s = processError(e, validation)
        if (s) {
          easyDialogError(s)
        }
      })

  }

  const [captcha, setCaptcha] = useState({
    response: void(0)
  })

  const handlerVerifyCaptcha = (value : string) => {
    setCaptcha({
      response: value
    } as any)
  }

  const handlerSubmitAction = () => {
    if (!captcha.response) {
            /** not verified */
      ToolTipOpen({
        text: 'Please confirm you are not robot !',
        position: 'top-left',
        type: 'error',
        parent: captchaRef.current,
      })
      return
    }
    handlerOnSubmit()
  }

  return (
    <>
      {loading ? <SpinnerLoadingCenter /> : <></>}
      <Paper header={'Registration Form'}>
        <InputTextWithValidation
                    required
                    fullWidth
                    label={'Account code'}
                    helperText={'enter account code'}
                    validation={{
                      useValidation: validation,
                      model: 'accountCode',
                      rule: {
                        required,
                        minLength: minLength({min: 2}),
                            /* checkRegex: checkRegex({
                              regex:/[^a-zA-Z0-9-_]+/
                            }),*/
                      }
                    }}
        />

        <InputTextWithValidation
                    required
                    icon={faUser}
                    fullWidth
                    label={'User Name'}
                    helperText={'enter username'}
                    validation={{
                      useValidation: validation,
                      model: 'userName',
                      rule: {
                        required,
                        minLength: minLength({min: 2})
                      }
                    }}
        />

        <InputTextWithValidation
                    required
                    icon={faAt}
                    fullWidth
                    label={'Email'}
                    helperText={'enter email'}
                    validation={{
                      useValidation: validation,
                      model: 'email',
                      rule: {
                        required,
                        useValidator: [
                          {
                            validator: isEmail
                          }
                        ]
                      }
                    }}
        />

        <InputTextPasswordWithValidation
                    required
                    icon={faKey}
                    fullWidth
                    type={'password'}
                    label={'Password'}
                    helperText={'enter password'}
                    validation={{
                      useValidation: validation,
                      model: 'password',
                      rule: passwordRule
                    }}
        />

        <InputTextPasswordWithValidation
                    required
                    icon={faKey}
                    fullWidth
                    type={'password'}
                    label={'Confirm password'}
                    helperText={'repeat password'}
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

        <div className={'hw-registration-recaptcha'} ref={(ele) => captchaRef.current = ele as any}>
          <Recaptcha
                        sitekey="6Leim8MUAAAAADfM5jLZ29j_1Kp8YjvV4BpGMYnd"
                        onloadCallback={() => {}}
                        verifyCallback={handlerVerifyCaptcha}
                        render="explicit"
          />
        </div>

        <div className={'hw-login-form-button'}>
          <Button color={'primary'} outline onClick={handlerSubmitAction} label={'REGISTER'}/>
        </div>
      </Paper>
    </>
  )
}

export default RegistrationForm
