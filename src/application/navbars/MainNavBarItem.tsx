import React, {
  PropsWithChildren,
  useEffect,
  useState
} from 'react'
import {FontAwesomeIcon}  from '@fortawesome/react-fontawesome'
import {
  faBan,
  faCaretDown,
  faCaretLeft
} from '@fortawesome/free-solid-svg-icons'
import {NavLink}          from 'react-router-dom'
import {
  RouteComponentProps,
  withRouter
}                         from 'react-router'
import {IconProp}         from '@fortawesome/fontawesome-svg-core'

export interface INavBarListItemProps extends RouteComponentProps,PropsWithChildren<any> {
  path : string
  label : string
  icon ? : IconProp,
  children ? : any,
  collapse ?: boolean,
  dataIndex ?: number
}

const MainNavBarItem = ({path,label, icon,location,collapse,dataIndex,children} : INavBarListItemProps) => {

  const [state,setState] = useState({
    collapse: false
  })

  const isActive = React.useMemo(() => {
    return   location.pathname === path
  },[path,location.pathname])

  const onClickHandler = () => {
    if (collapse) {
      setState({
        ...state,
        ...{
          collapse: !state.collapse
        }
      })
    }
  }
  return (
    <>
      <NavLink to={path} data-index={dataIndex} onClick={onClickHandler} activeClassName={!collapse ? 'active' : ''} className={'hw-bar-list-item'} >
        {icon ? <FontAwesomeIcon icon={icon}/> : <FontAwesomeIcon icon={faBan}/> }
        <div className={'label'}>
          {label}
        </div>
        {
          collapse ?
            state.collapse ? <FontAwesomeIcon icon={faCaretDown} className={'hw-list-item-caret active'}/>
              : <FontAwesomeIcon icon={faCaretLeft} className={'hw-list-item-caret active'}/>
            : null
        }
      </NavLink>
      {
        collapse ? (
          <div className={`hw-collapse-container${state.collapse ? ' active' : ''}`}>
            <div className={'hw-collapse-wrapper'}>
              {children}
            </div>
          </div>
        ) : null
      }
    </>
  )
}

export default withRouter(MainNavBarItem)
