import React, {useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import {
  faBars,
  faFingerprint,
  faTimes,
  faUnlockAlt,
  faUserPlus
}                     from '@fortawesome/free-solid-svg-icons'
import {withRouter}   from 'react-router'
import NavBarListItem from './NavBarListItem'

const AuthNavBar = (props : any) => {

  const [state,setState] = useState({
    opened: false
  })

  const onClickHandler = () => {
    setState({
      opened: !state.opened
    })
  }

  return (
    <div className={'hw-nav-bar'}>
      <div className={'hw-bar-title'}>
           Boban
      </div>

      <div className={`hw-bar-list${state.opened ? ' opened' : ''}`}>
        <NavBarListItem  label={'Login'} path={'login'} icon={faFingerprint} />
        <NavBarListItem  label={'Register'} path={'register'} icon={faUserPlus} />
        <NavBarListItem  label={'Lock'} path={'lock'} icon={faUnlockAlt} />
      </div>

      <div className={'hw-bar-list-control'} onClick={onClickHandler}>
        {!state.opened ? <FontAwesomeIcon icon={faBars}/> :  <FontAwesomeIcon icon={faTimes}/>}
      </div>
    </div>
  )
}

export default withRouter(AuthNavBar)
