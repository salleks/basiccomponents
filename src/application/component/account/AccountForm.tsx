import React                    from 'react'
import {
  faAt,
  faUser
}                               from '@fortawesome/free-solid-svg-icons'
import {
  IUseValidation,
  minLength,
  required
}                               from 'react-hook-custom-validation'
import InputTextWithValidation  from '../../../forms/componentsWithValidation/InputTextWithValidation'
import {isEmail}                from 'validator'
import SelectTextWithValidation from '../../../forms/componentsWithValidation/SelectTextWithValidation'
import {Button}                 from '../../../components/Button'

export interface IAccountModel {
  userName : string,
  email : string,
  role : string
}

export interface IAccountFormProps {
  handlerOnSubmit : () => void
  validation : IUseValidation<IAccountModel>
}

const AccountForm = ({handlerOnSubmit, validation} : IAccountFormProps) => {

  return (
    <div style={{marginTop: '200px'}} className={' d-flex flex-fill flex-column shadow-lg'}>
      <div className={'col-md-12'}>
        <InputTextWithValidation
            required
            icon={faUser}
            label={'Username'}
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
      </div>

      <div className={'col-md-12'}>
        <InputTextWithValidation
            required
            icon={faAt}
            label={'Email'}
            helperText={'enter email'}
            validation={{
              useValidation: validation,
              model: 'email',
              rule: {
                required,
                useValidator:[
                  {
                    validator: isEmail
                  }
                ]

              }
            }}
        />
      </div>
      <div className={'col-md-12'}>
        <SelectTextWithValidation
            required
            label={'Role'}
            helperText={'choose role'}
            options={[
              {
                label: 'user',
                value: '1'
              },
              {
                label: 'admin',
                value: '0'
              }
            ]}
            validation={{
              useValidation: validation,
              model: 'role',
              rule: {
                required,
              }
            }}
        />
      </div>

      <div className={'hw-account-form-buttons'}>
        <Button  color={'danger'} outline onClick={() => {}} label={'CANCEL'} />
        <Button  color={'primary'} outline onClick={handlerOnSubmit} label={'CONFIRM'} />
      </div>
    </div>
  )
}
export default AccountForm
