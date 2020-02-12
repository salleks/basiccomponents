import React                   from 'react'
import {
  FORMAT_CURRENCY_STANDARD,
  useValidation
}                              from 'react-hook-custom-validation'
import InputTextWithValidation from '../../../forms/componentsWithValidation/InputTextWithValidation'
import ButtonsForm             from '../../../components/Button/ButtonsForm'

export interface IChangePriceComponentProps {
  item : any;
  closeDialog : () => void
}

export interface IChangePriceModel {
  price : string
}

const ChangePriceComponent = ({item, closeDialog} : IChangePriceComponentProps) => {
  const validation = useValidation<IChangePriceModel>()

  const handlerOnSubmit = async () => {
    const { error,data } = await validation.validate()
    if (error) {
      return
    }
    closeDialog()
  }
  return (
    <div className={'d-flex flex-fill flex-column pt-4'}>
      <div className={'d-flex justify-content-center'}>
        <InputTextWithValidation
        fontSize={'large-input-font'}
        label={'price'}
        helperText={'enter the new price'}
        align={'align-right'}
        validation={{
          useValidation: validation,
          model: 'price',
          defaultValue: item.price.toString(),
          format: {
            rule: {
              ...FORMAT_CURRENCY_STANDARD,
              ...{
                decimalPlace: 2
              }
            }
          }

        }}

        />
      </div>
      <div className={'p-3'}>
        <ButtonsForm
          buttonsCancel={{
            label:'CANCEL',
            action: closeDialog
          }}
          buttonSubmit={{
            label: 'SUBMIT',
            action: closeDialog
          }}
        />
      </div>
    </div>
  )
}

export default ChangePriceComponent