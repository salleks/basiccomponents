import React from 'react'
import {
  IWithValidationProps,
  withValidation
}            from 'react-hook-custom-validation'
import {
  ISelectProps,
  Select
}            from '../../components/Select'

const SelectTextWithValidation : <T extends any>(props :  ISelectProps & IWithValidationProps<T>) =>
React.ReactElement<ISelectProps & IWithValidationProps<T>> = ({label,options,...rest}) => {
  return (
    <Select
        {...rest}
        label={label}
        options={options}
    />
  )
}

export default withValidation(SelectTextWithValidation)
