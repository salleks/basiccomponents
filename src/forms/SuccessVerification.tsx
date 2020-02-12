import React             from 'react'
import {NavLink}         from 'react-router-dom'
import logo              from '../assets/images/logo.svg'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheckCircle}   from '@fortawesome/free-regular-svg-icons'

interface ISuccessVerificationProps {
  text ?: string
  title ?: string
}

const SuccessVerification = ({text,title} : ISuccessVerificationProps) => {
  return (
    <div className={'hw-form-success-verification-root'}>
      <img className={'hw-success-verification-logo'} src={logo} alt={'logo'} />
      <div className={'hw-verified-logo'}> <FontAwesomeIcon icon={faCheckCircle} className={''}/></div>
      <div className={'hw-success-verification-text'}>
        {text}
      </div>
      <div className={'hw-success-verification-button'}>
        <NavLink to={'application/auth/login'} className={'hw-button-root primary outline'}>Back to login</NavLink>
      </div>
    </div>
  )
}

export default SuccessVerification
