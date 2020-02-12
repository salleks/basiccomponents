import React, {
  PropsWithChildren,
  useState
}                        from 'react'
import {
  RouteComponentProps,
  withRouter
} from 'react-router'
import {AppBar}          from '../../components/AppBar'
import {
  faBars,
  faChevronLeft,
  faCookieBite,
  faUser,
  faUserAlt
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {IconProp}        from '@fortawesome/fontawesome-svg-core'
import MainNavBarItem    from './MainNavBarItem'
import {ISideBarState}   from '../layout/main'

const list : INavBarListProps[] = [
  {
    label: 'Accounts',
    path: 'accounts',
    icon: faUser
  },
  {
    label: 'Clients',
    path: 'client',
    icon: faUserAlt
  },
  {
    label: 'Items',
    path: 'items',
    icon: faCookieBite
  },
  {
    label: 'Sale',
    path: 'sale',
    icon: faCookieBite
  },
  {
    label: 'Route',
    collapse : true,
    children : [
      {
        label: 'Route 66',
        collapse : true,
        children : [
          {
            label: 'Route 44',
            collapse : true,
            children : [
              {
                label: 'Route 67',
                path: 'route67',
              },
              {
                label: 'Route 28',
                path: 'route28',
              },
            ]
          },
          {
            label: 'Route 2',
            path: 'route2',
          },
        ]
      },
      {
        label: 'Route 2',
        path: 'route2',
      },
    ]
  },
  {
    label: 'Route 3',
    collapse : true,
    children : [
      {
        label: 'Route 4',
        path: 'route4',
      },
      {
        label: 'Route 5',
        path: 'route5',
      },
    ]
  }
]

export interface INavBarListProps {
  label : string,
  path ?: string,
  icon ?: IconProp,
  collapse ?: boolean,
  children ?: INavBarListProps[]
}

export interface IMainNavBarProps extends RouteComponentProps{
  state : ISideBarState,
  onClickBarListHandler : () => void
}

const MainNavBar = (props : IMainNavBarProps) => {

  const {state,onClickBarListHandler} = props

/*  const onClickBarListItem = (e : React.MouseEvent<HTMLElement,MouseEvent>) => {
    let target : HTMLElement | null = e.target as HTMLElement
    while (target) {
      if (target.hasAttribute('data-index')) {
        const attr : any  = target.getAttribute('data-index')
        setState( {
          ...state,
          ...{
            selected: attr
          }
        })
      }
      target = target.parentElement
      if (!target) {
        break
      }
    }
  }*/

  const renderList = (props : INavBarListProps[]) => {
    return props.map(({children,collapse,...rest} : INavBarListProps,key : number) => {
      if (collapse && children) {
        return (
          <MainNavBarItem key={key} dataIndex={key} path={'#'} collapse={collapse} {...rest}>
            {renderList(children)}
          </MainNavBarItem>
        )
      }

      return <MainNavBarItem key={key} dataIndex={key} {...rest}/>
    })
  }

  return (
    <>

      <div className={`hw-nav-bar-main${state.open ? ' opened' : ''}${state.mini ? ' mini' : ''}${state.visible ? '' : ' hide'}`}>
        <div className={'hw-bar-list-main'}>
          {renderList(list)}
        </div>
        <div className={`hw-nav-bar-main-close${state.open && state.visible ? ' show' : ''}`} onClick={onClickBarListHandler}>
          <FontAwesomeIcon icon={faChevronLeft}/>
        </div>
      </div>
    </>
  )
}

export default withRouter(MainNavBar)
