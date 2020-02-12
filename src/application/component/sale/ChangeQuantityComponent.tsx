import React, {useState}       from 'react'
import {
  FORMAT_CURRENCY_STANDARD,
  required,
  useValidation
}                              from 'react-hook-custom-validation'
import InputTextWithValidation from '../../../forms/componentsWithValidation/InputTextWithValidation'
import Fab                     from '../../../components/Button/Fab'
import {
  faMinus,
  faPlus
}                              from '@fortawesome/free-solid-svg-icons'
import ButtonsForm             from '../../../components/Button/ButtonsForm'

export interface IChangeQuantityComponentProps {
  item : any
  closeDialog : () => void
}

export interface IChangeQuantityModel {
  quantity : string
}

const ChangeQuantityComponent = ({item,closeDialog} : IChangeQuantityComponentProps) => {

  const validation = useValidation<IChangeQuantityModel>()

  const [state,setState] : [string,(r : string) => void] = useState(item.quantity.toString())

  const handlerIncrementDecrement = async (e : React.MouseEvent<HTMLButtonElement>) => {
    let target : HTMLButtonElement| null = e.target as HTMLButtonElement
    let type : string | null = ''
    while (target.tagName !== 'button') {
      if (target.getAttribute('data-type')) {
        type = target.getAttribute('data-type')
        break
      }
      target = target.parentElement as HTMLButtonElement
      if (!target) {
        break
      }
    }
    let value = +state
    if (type === 'inc') {
      value += 1
    } else {
      value <  2 ? value = 1 : value -= 1
    }
    const finale = value.toString()
    await validation.setFieldValue('quantity',finale,true)
    setState(finale)
  }

  const handlerOnSubmit = async () => {
    const { error,data } = await validation.validate()
    if (error) {
      return
    }
    closeDialog()
  }

  const handlerOnFocus = (e : React.FocusEvent<HTMLInputElement>) => {
    e.target.select()
  }

  return (
    <div className={'d-flex flex-fill flex-column align-items-center pt-4 hw-change-quantity-component-root'}>
      <div className={'d-flex align-items-center container col-md-12'}>
        <div className={'col-md-3'}>
          <Fab
              icon={faMinus}
              size={'lg'}
              color={'danger'}
              onClick={handlerIncrementDecrement}
          />
        </div>
        <div className={'col-md-6'}>
          <InputTextWithValidation
          fontSize={'large-input-font'}
          label={'Quantity'}
          helperText={'enter quantity'}
          align={'align-right'}
          validation={{
            useValidation: validation,
            model: 'quantity',
            defaultValue: state,
            rule: {
              required
            },
            format: {
              rule: {
                ...FORMAT_CURRENCY_STANDARD,
                ...{
                  decimalPlace: 3
                }
              }
            }
          }}
          />
        </div>
        <div className={'col-3'}>
          <Fab
              icon={faPlus}
              size={'lg'}
              color={'primary'}
              data-type={'inc'}
              onClick={handlerIncrementDecrement}
          />
        </div>

        <div className={'col-md-12 p-3'}>
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
    </div>
  )
}

export default ChangeQuantityComponent
