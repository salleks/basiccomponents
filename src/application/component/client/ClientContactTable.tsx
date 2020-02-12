import React             from 'react'
import {IUseValidation}  from 'react-hook-custom-validation'
import {
  faPencilAlt,
  faTimes
}                        from '@fortawesome/free-solid-svg-icons'
import {IContactModal}   from './ClientForm'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {CONTACT_TYPES}   from '../../constants'

interface IClientContactTableProps<T> {
  validation : IUseValidation<T>
  fieldParentName : string,
  handlerOnClickEvent : (action : string,index ?: number) => void
}

const ClientContactTable = <T extends any>({fieldParentName,validation,handlerOnClickEvent} : IClientContactTableProps<T>) => {

  return (
    <>
      {
        (validation.state).contacts && (validation.state).contacts.map((contactModel : IContactModal,key : number) => {
          const flag = CONTACT_TYPES[contactModel.flag as any]
          return (
            <div key={key} className={'hw-client-contact-grid-row '}>
              <div>{flag}</div>
              <div>{contactModel.value}</div>
              <div>
                <div className={'hw-client-contact-row'}>
                  <FontAwesomeIcon icon={faPencilAlt} onClick={() => handlerOnClickEvent('edit',key)}/>
                  <FontAwesomeIcon icon={faTimes} onClick={() => handlerOnClickEvent('delete',key)}/>
                </div>
              </div>
            </div>

          )
        })
      }
    </>
  )
}

export default ClientContactTable
