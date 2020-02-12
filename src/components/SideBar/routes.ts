import ShowInputComponents    from '../InputText/Show'
import ShowSelectComponents   from '../Select/Show'
import ShowCheckboxComponents from '../CheckBox/Show'
import ShowRadioComponents    from '../Radio/Show'
import ShowButtonComponents   from '../Button/Show'
import ShowAppBarComponent    from '../AppBar/Show'
import ShowPaginationButton   from '../Pagination/Show'
import ShowCalendar           from '../Calendar/Show'
import ShowTooltip            from '../Tooltip/Show'
import ShowDialog             from '../Dialog/Show'
import ShowSpinner            from '../Spinner/Show'
import {
  ButtonApi,
  CalendarApi,
  CheckboxApi,
  InputApi,
  RadioApi,
  SelectApi
}                             from '../api'
import {faThLarge}            from '@fortawesome/free-solid-svg-icons'
import {IRoutesProps}         from './Roots'
import LoginForm              from '../../application/auth/Login'
import RegistrationForm       from '../../application/auth/forms/RegistrationForm'
import {ClientForm}           from '../../application/component/client'
import Application            from '../../application/index'
import Show                   from '../../forms/Show'
import Accounts               from '../../application/component/account/Accounts'

const routes : IRoutesProps[]  = [
  {
    collapse: true,
    name: 'Components',
    icon: faThLarge,
    views: [
      {
        collapse: true,
        name: 'Form Components',
        views: [
          {
            path: '/input',
            name: 'Input',
            component: ShowInputComponents,
          },
          {
            path: '/select',
            name: 'Select',
            component: ShowSelectComponents,
          },
          {
            path: '/checkbox',
            name: 'Checkbox',
            component: ShowCheckboxComponents,
          },
          {
            path: '/radio',
            name: 'Radio',
            component: ShowRadioComponents,
          },
          {
            path: '/button',
            name: 'Button',
            component: ShowButtonComponents,
          },
          {
            path: '/appbar',
            name: 'Appbar',
            component: ShowAppBarComponent,
          },
          {
            path: '/pagination-button',
            name: 'Pagination Button',
            component: ShowPaginationButton,
          },
          {
            exact: true,
            path: '/calendar',
            name: 'Calendar',
            component: ShowCalendar,
          },
          {
            path: '/tooltip',
            name: 'Calendar',
            component: ShowTooltip,
          },
          {
            path: '/dialog',
            name: 'Dialog',
            component: ShowDialog
          },
          {
            path: '/spinner',
            name: 'Spinner',
            component: ShowSpinner,
          }
        ]
      },
    ]
  },
  {
    collapse: true,
    name: 'Component API',
    views: [
      {
        path: '/input-api',
        name: 'Input',
        component: InputApi,
      },
      {
        path: '/calendar-api',
        name: 'Calendar',
        component: CalendarApi,
      },
      {
        path: '/select-api',
        name: 'Select',
        component: SelectApi,
      },
      {
        path: '/checkbox-api',
        name: 'Checkbox',
        component: CheckboxApi,
      },
      {
        path: '/radio-api',
        name: 'Radio',
        component: RadioApi,
      },
      {
        path: '/button-api',
        name: 'Button',
        component: ButtonApi,
      },
    ]
  },
  {
    collapse: true,
    name: 'Forms',
    views: [
      {
        path: '/login',
        name: 'Login',
        component: LoginForm,
      },
      {
        path: '/registration',
        name: 'Registration',
        component: RegistrationForm,
      },
      {
        path: '/client',
        name: 'Client',
        component: ClientForm,
      },
      {
        path: '/show-templates',
        name: 'Forgot Password',
        component: Show,
      },
      {
        path: '/application',
        name: 'Application',
        component: Application,
      },
      {
        path: '/account-form',
        name: 'Account',
        component: Accounts,
      }
    ]
  },

  {
    path: '/',
  }
]

export default routes

