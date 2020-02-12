import React                                       from 'react'
import ApiGeneratorComponent, {IApiComponentProps} from './ApiGeneratorComponent'

const inputProps : IApiComponentProps[] = [
  {
    name: 'label',
    type: 'string',
    default: '',
    description: 'The label content. Label is required.'
  },
  {
    name: 'label',
    type: 'string',
    default: '',
    description: 'The label content. Label is required.'
  },
  {
    name: 'helperText',
    type: 'string',
    default: '',
    description: 'The helper text content.'
  },
  {
    name: 'error',
    type: 'string|bool',
    default: '',
    description: 'If true or string, the input will indicate an error.'
  },
  {
    name: 'icon',
    type: 'IconProp',
    default: '',
    description: ' Fontawesome icon'
  },
  {
    name: 'iconAction',
    type: 'object',
    default: '',
    description: 'Object with icon and handler (fontawesome icon, handler is a custom onClick action)'
  },
  {
    name: 'fullWidth',
    type: 'boolean',
    default: '',
    description: 'If true, the input will take up the full width of its container.'
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: '',
    description: 'If true, the input element will be disabled.'
  },
  {
    name: 'readonly',
    type: 'boolean',
    default: '',
    description: ' It prevents the user from changing the value of the field.'
  },
  {
    name: 'value',
    type: 'string',
    default: '',
    description: 'The value of the input element.'
  },
  {
    name: 'required',
    type: 'boolean',
    default: '',
    description: 'If true, the input element will be required.'
  }
]

const InputApi = () => {
  return (
    <ApiGeneratorComponent title={'Input api props'} props={inputProps}/>
  )
}

export default InputApi
