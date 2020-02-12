import React                                       from 'react'
import ApiGeneratorComponent, {
  IApiComponentProps
} from './ApiGeneratorComponent'

const selectProps : IApiComponentProps[] = [
  {
    name: 'label',
    type: 'string',
    default: '',
    description: 'The label content. Label is required.'
  },
  {
    name: 'value',
    type: 'string',
    default: '',
    description: 'The value of the select element.'
  },
  {
    name: 'description',
    type: 'string',
    default: '',
    description: ''
  },
  {
    name: 'icon',
    type: 'IconProp',
    default: '',
    description: 'Fontawesome icon'
  },
]

export default () => {
  return (
    <ApiGeneratorComponent title={'Select api props'} props={selectProps} />
  )
}
