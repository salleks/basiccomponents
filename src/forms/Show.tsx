import React               from 'react'
import VerifyAccount       from './VerifyAccont'
import SuccessVerification from './SuccessVerification'

const Show  = () => {

  const textVerify = ' Welcome to HW Sell. \n\n' +
      'You have successfully created a HW Sell account.Please click on the button bellow to verify your email address and complete your registration.\n\n' +
      'Hw Sell Team.'

  return (
    <>
      <div style={{margin: '20px'}}>
        <VerifyAccount username={'Pera'} text={textVerify} link={'http://localhost:3000/verify-account?AS31#02132109'}/>
      </div>
      <div style={{margin: '20px'}}>
        <SuccessVerification
          title={''}
          text={'Congratulation!\n\nYou have successfully verified HW Sell account.'}
        />
      </div>

    </>
  )

}

export default Show
