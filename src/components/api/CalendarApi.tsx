import React                 from 'react'
import ApiGeneratorComponent from './ApiGeneratorComponent'

const calendarProps = [
  {
    name: 'start-day',
    type: 'MON | SUN',
    default: '',
    description: ''
  },
  {
    name: 'days',
    type: 'string[]',
    default: '',
    description: ''
  },
  {
    name: 'day',
    type: 'number',
    default: '',
    description: ''
  },
  {
    name: 'month',
    type: 'number',
    default: '',
    description: ''
  },
  {
    name: 'year',
    type: 'number',
    default: '',
    description: ''
  },
  {
    name: 'panel',
    type: 'D | M | Y',
    default: '',
    description: ' describe current visible panel that '
  },
  {
    name: 'minDate',
    type: 'Date',
    default: '',
    description: 'Min date to show'
  },
  {
    name: 'maxDate',
    type: 'Date',
    default: '',
    description: 'Max date to show'
  },
  {
    name: 'sub-header',
    type: 'show | hide',
    default: '',
    description: ''
  },
  {
    name: 'locales',
    type: 'string',
    default: '',
    description: ''
  },
  {
    name: 'show-type',
    type: 'popover | modal | component',
    default: '',
    description: ''
  },
  {
    name: 'popover-root',
    type: 'function',
    default: '',
    description: ''
  },
  {
    name: 'visible-state',
    type: 'show | hide',
    default: '',
    description: ''
  }
]

export default () => {
  return (
    <ApiGeneratorComponent title={'Calendar api props'} props={calendarProps} />
  )
}

