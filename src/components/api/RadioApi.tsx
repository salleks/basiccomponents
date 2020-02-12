import React                                       from 'react'
import ApiGeneratorComponent, {IApiComponentProps} from './ApiGeneratorComponent'

const RadioApiProps : IApiComponentProps[] = [
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
    name : 'selected',
    type: 'string|number',
    default: '',
    description: ''
  },
  {
    name : 'component-direction',
    type: 'row | column | column-reverse | row-reverse',
    default: '',
    description: ''
  },
  {
    name : 'onRadioChanged',
    type: 'function',
    default: '',
    description: ''
  }
]

export default () => {
  return (
    <ApiGeneratorComponent props={RadioApiProps} title={'Radio api'}/>
  )
}

