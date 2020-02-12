import React                   from 'react'
import Paper                   from '../components/Paper'
import InputTextWithValidation from './componentsWithValidation/InputTextWithValidation'
import {
  minLength,
  required,
  useValidation
} from 'react-hook-custom-validation'

const ClientForm = () => {
  const validation = useValidation()
  return (
    <div className={'hw-client-form-root'}>
      <Paper header={'Client Form'}>
        <div className={'col-md-12 row'}>
          <div className={'col-md-6'}>
            <InputTextWithValidation
                   label={'Name'}
                   helperText={'enter name'}
                   validation={{
                     useValidation: validation,
                     model: 'clientName',
                     rule: {
                       required,
                       minLength: minLength({min: 2})
                     }
                   }}
            />
          </div>
          <div className={'col-md-6'}>
            <InputTextWithValidation
                   label={'Tin'}
                   helperText={'enter tin'}
                   validation={{
                     useValidation: validation,
                     model: 'clientTin',
                     rule: {
                       required,
                       minLength: minLength({min: 2})
                     }
                   }}
            />
          </div>
        </div>

      </Paper>    
    </div>
  )
}

export default ClientForm
