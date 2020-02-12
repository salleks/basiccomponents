import React                                       from 'react'
import ApiGeneratorComponent, {IApiComponentProps} from './ApiGeneratorComponent'

const checkboxProps : IApiComponentProps[]  = [
  {
    name : 'label',
    type: 'string',
    default: '',
    description: 'The label content.'
  },
  {
    name : 'value',
    type: 'string|number',
    default: '',
    description: 'The value of the radio element.'
  },
  {
    name : 'disabled',
    type: 'boolean',
    default: '',
    description: ''
  },
  {
    name : 'component-direction',
    type: 'row | column | column-reverse | row-reverse',
    default: '',
    description: ''
  }
]

export default () => {

  return (
    <ApiGeneratorComponent props={checkboxProps} title={'Checkbox api'}/>
  )
}
