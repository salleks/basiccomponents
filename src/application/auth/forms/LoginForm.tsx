import React                           from 'react'
import {Button}                        from '../../../components/Button'
import {
  faKey,
  faUser
}                                      from '@fortawesome/free-solid-svg-icons'
import InputTextWithValidation         from '../../../forms/componentsWithValidation/InputTextWithValidation'
import {required}                      from 'react-hook-custom-validation'
import InputTextPasswordWithValidation from '../../../forms/componentsWithValidation/InputTextPasswordWithValidation'
import {IUseValidation}                from 'react-hook-custom-validation/lib/interface'
import {NavLink}                       from 'react-router-dom'
import {isEmail}                       from 'validator'

export interface ILoginModel {
  email : string
  password : string
}

export interface ILoginFormProps {
  handlerOnSubmit : () => void
  validation : IUseValidation<ILoginModel>
}

const LoginForm = ({handlerOnSubmit, validation} : ILoginFormProps) => {
  return (
    <div className={'hw-login-root'}>
      <InputTextWithValidation
                    required
                    icon={faUser}
                    label={'Email'}
                    helperText={'enter email'}
                    validation={{
                      useValidation: validation,
                      model: 'email',
                      rule: {
                        required,
                        useValidator:[
                          {
                            validator: isEmail,
                            message: 'Email is not valid'
                          }
                        ]
                      }
                    }}
      />

      <InputTextPasswordWithValidation
                    required
                    icon={faKey}
                    type={'password'}
                    label={'Password'}
                    helperText={'enter password'}
                    validation={{
                      useValidation: validation,
                      model: 'password',
                      rule: {
                        required
                      }
                    }}
      />

      <div className={'hw-login-forgot-password'}>
        <NavLink to={'/application/auth/forgot-password'}>Forgot password?</NavLink>
      </div>

      <div className={'hw-login-form-button'}>
        <Button color={'primary'} outline label={'LOGIN'} onClick={handlerOnSubmit}/>
      </div>
    </div>
  )
}

export default LoginForm
