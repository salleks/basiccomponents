import React                        from 'react'
import {useValidation}              from 'react-hook-custom-validation'
import AccountForm, {IAccountModel} from './AccountForm'
import ComponentTableProps          from '../../../components/basic/ComponentTableProps'

const Accounts = () => {

  const validation = useValidation<IAccountModel>()

  const handlerOnSubmit = async () => {
    const { error,data } = await validation.validate()
    if (error) {
      return
    }
    const _data = {
      variables: {
        data: {
          userName: data.userName,
          email: data.email,
          role: data.role
        }
      }
    }
  }

  return (
    <div>
      {<AccountForm handlerOnSubmit={handlerOnSubmit} validation={validation}/>}
    </div>
  )
}

export default Accounts
