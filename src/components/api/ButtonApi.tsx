import React                                       from 'react'
import ApiGeneratorComponent, {IApiComponentProps} from './ApiGeneratorComponent'

const buttonProps : IApiComponentProps[] = [
  {
    name : 'label',
    type: 'string',
    default: '',
    description: 'The label content. Label is required.'
  },
  {
    name : 'color',
    type: 'string',
    default: ' primary | secondary | success | danger | info',
    description: ''
  },
  {
    name : 'size',
    type: 'string',
    default: ' sm | lg',
    description: ''
  },
  {
    name : 'fullWidth',
    type: 'boolean',
    default: '',
    description: ''
  },
  {
    name : 'outline',
    type: 'boolean',
    default: '',
    description: ''
  },
  {
    name : 'className',
    type: 'string',
    default: '',
    description: ''
  },
  {
    name : 'icon',
    type: 'IconProp',
    default: '',
    description: 'Fontawesome icon.'
  },
  {
    name : 'iconRight',
    type: 'IconProp',
    default: '',
    description: ' Fontawesome icon.'
  },
  {
    name : 'glossy',
    type: 'boolean',
    default: '',
    description: ''
  }
]

export default () => {
  return (
    <ApiGeneratorComponent props={buttonProps} title={'Button api'}/>
  )
}
