import React     from 'react'
import {NavLink} from 'react-router-dom'
import logo      from '../assets/images/logo.svg'

export interface IVerifyAccountProps {
  username : string,
  link : string,
  text : string
}

const VerifyAccount = ({username,text,link} : IVerifyAccountProps) => {
  return (
    <div className={'hw-form-success-verification-root'}>
      <img className={'hw-success-verification-logo'} src={logo} alt={'logo'} />
      <div className={'hw-success-verification-text'}>
        <strong>Hi {username},</strong><br/><br/>
        {text}
      </div>
      <div className={'hw-success-verification-button'}>
        <NavLink to={link} className={'hw-button-root primary outline'}>Verify Email</NavLink>
      </div>
      <div className={'hw-verify-alternative'}>
        <small> If that doesn't work, copy and past the following link in your browser.</small><br/>
        <div className={'hw-verify-alternative-link'}><small>{link}</small></div>
      </div>
    </div>
  )
}

export default VerifyAccount
