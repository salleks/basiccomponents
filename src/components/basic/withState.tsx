import React, {
  useState
}                              from 'react'
import {CheckBox as _CheckBox} from '../CheckBox'
import {Select as _Select}     from '../Select'
import { InputText as _InputText, InputTextPassword as _InputTextPassword, InputTextDatePicker as _InputTextDatePicker}               from '../InputText'
import {
  IRadioGroupProps,
  RadioGroup as _RadioGroup
} from '../Radio'

const withState = (WrappedComponent : React.FC<any>) : React.FC<any> => (props : any) => {

  const [state, setState] = useState()
  const {onChange, value, ...rest} = props

  const onChangeHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    e.persist()
    setState(value)
    onChange && onChange(e)
  }

  return (
    <WrappedComponent
            value={state}
            onChange={onChangeHandler}
            {
                ...rest
            }
    />
  )
}

export default withState

export const CheckBox = withState(_CheckBox)
export const Select  = withState(_Select)

export const InputText = withState(_InputText)
export const InputTextPassword = withState(_InputTextPassword)
export const InputTextDatePicker = withState(_InputTextDatePicker)

export const RadioGroup : React.FC<IRadioGroupProps> = withState(_RadioGroup)

