import React                    from 'react'
import {
  minLength,
  required,
  useValidation
}                               from 'react-hook-custom-validation'
import InputTextWithValidation  from '../../../forms/componentsWithValidation/InputTextWithValidation'
import ClientAddress            from './ClientAddress'
import ClientContactTable       from './ClientContactTable'
import SelectTextWithValidation from '../../../forms/componentsWithValidation/SelectTextWithValidation'
import {
  ADDRESS_FLAGS,
  CLIENT_TYPES,
  CONTACT_TYPES
} from '../../constants'
import {faPlus}               from '@fortawesome/free-solid-svg-icons'
import {CenteredDialog}       from '../../../components/Dialog/DialogBasic'
import {
  EasyDialog,
  easyDialogError
}                             from '../../../components/EasyModel/EasyModal'
import {useMutation}          from '@apollo/react-hooks'
import {
  MUTATION,
  processError
}                             from '../../graphQL'
import {SpinnerLoadingCenter} from '../../../components/Spinner/SpinnerLoading'
import Fab                    from '../../../components/Button/Fab'
import ButtonsForm            from '../../../components/Button/ButtonsForm'

export interface IAddressModel {
  street : string,
  zipCode : string,
  city : string,
  state ?: string,
  description ?: string,
  flag : string
}

export interface IContactModal {
  flag : string,
  value : string,
  description ?: string
}

export interface IClientFormModel {
  description : string,
  flag : string,
  taxNumber : string,
  clientNumber : string,
  addresses : IAddressModel,
  contacts : IContactModal[]
}

const clientTypes = [
  {
    label: 'OWNER',
    value: CLIENT_TYPES.OWNER
  },
  {
    label: 'CUSTOMER',
    value: CLIENT_TYPES.CUSTOMER
  },
  {
    label: 'CLIENT',
    value: CLIENT_TYPES.CLIENT
  },
  {
    label: 'SUPPLIER',
    value: CLIENT_TYPES.SUPPLIER
  },
  {
    label: 'CLIENT-SUPPLIER',
    value: CLIENT_TYPES.CLIENT_SUPPLIER
  }
]

export interface IClientFormProps {
  closeDialog ?: () => void
}

const ClientForm = ({closeDialog} : IClientFormProps) => {

  const validation = useValidation<IClientFormModel>({
    initialData: {
      description: 'HWT DOO',
      flag: CLIENT_TYPES.OWNER,
      taxNumber: '107112543',
      clientNumber: '20744073',
      addresses: {
        street: 'Jasicki put 9A',
        zipCode: '37000',
        city: 'Krusevac',
        state: 'Serbia',
        flag: ADDRESS_FLAGS.HOME
      },
      contacts : [
        {
          flag: '0',
          value: 'test@gmail.com'
        },
        {
          flag: '1',
          value: '0641234567'
        }
      ]
    }
  })

  const [mutationInsertClient, {loading}] = useMutation(MUTATION.Client.insertClient)

  const handlerEventContactAddEditClick = (action : string,index ?: number) => {
    if (action === 'add') {
      openDialogAddContactForm(addContactsHandler)
      return
    }
    if (index  !== void(0) && action === 'edit') {
      const data = validation.state.contacts[index]
      openDialogEditContactForm(index,data,editContactHandler)
    }

    if (index !== void(0) && action === 'delete') {
      console.log(validation)
      console.log(index)
      const {removeArrayData} = validation
      removeArrayData('contacts' as string, index as number)
    }
  }

  const handlerOnSubmit = async () => {
    const {error, data} = await validation.validate()
    if (error) {
      return
    }

    const contacts : any = []
    data.contacts.map((x : IContactModal) => {
      contacts.push({
        flag : +x.flag,
        value: x.value
      })
    })
    const _data = {
      variables: {
        data:{
          ...data,
          ...{
            flag: +data.flag,
            contacts: contacts
          }
        }
      }
    }

    await mutationInsertClient(_data as any).then((result) => {
      handlerCancel()
    })
      .catch((e) => {
        const s = processError(e, validation)
        if (s) {
          easyDialogError(s)
        }
      })
  }

  const handlerCancel = () => {
    if (closeDialog)    {
      closeDialog()
    }
  }

  const addContactsHandler = async (contact : IContactModal) => {
    const {data,refs} = await validation.addArrayData('contacts', contact)
  }

  const editContactHandler = async (contact : IContactModal,index ?: number) => {
    await validation.setFieldValue(`contacts[${index}].flag`,contact.flag,true)
    await validation.setFieldValue(`contacts[${index}].value`,contact.value,true)
  }

  return (
    <>
      {loading ? <SpinnerLoadingCenter /> : <></>}
      <div className={'hw-client-form-root shadow-lg pt-2'}>
        <div className={'container'}>
          <div className={'col-md-6 p-2 '}>
            <InputTextWithValidation
                required
                align={'align-center'}
                label={'Tin'}
                helperText={'enter tin'}

                validation={{
                  useValidation: validation,
                  model: 'taxNumber',
                  rule: {
                    required
                  }
                }}
            />
          </div>

          <div className={'col-md-6  p-2'}>
            <InputTextWithValidation
                required
                align={'align-center'}
                label={'Client Number'}
                helperText={'enter client number'}
                validation={{
                  useValidation: validation,
                  model: 'clientNumber',
                  rule: {
                    required,
                    minLength: minLength({
                      min: 2
                    }),
                  }
                }}
            />
          </div>
          <div className={'col-md-12 p-2'}>
            <InputTextWithValidation
                required
                label={'Full client name'}
                helperText={'enter client name'}
                validation={{
                  useValidation: validation,
                  model: 'description',
                  rule: {
                    required
                  }
                }}
            />
          </div>
          <div className={'col-md-7 p-2'}>
            <InputTextWithValidation
                required
                label={'Short client name'}
                helperText={'enter client name'}
                validation={{
                  useValidation: validation,
                  model: 'description',
                  rule: {
                    required
                  }
                }}
            />
          </div>
          <div className={'col-md-5 p-2'}>
            <SelectTextWithValidation
            required
            label={'Client type'}
            helperText={'choose client type'}
            options={clientTypes}
            validation={{
              useValidation: validation,
              model: 'flag',
              rule: {
                required,
              }
            }}
            />
          </div>

          <div className={'hw-client-address-form-root mt-2'}>
            <div className={'hw-client-address-title'}>
              <span>Address</span>
            </div>
            <ClientAddress
              validation={validation}
              fieldParentName={'addresses'}
            />
          </div>

        </div>
        <div className={'hw-client-address-form-root '}>
          <div className={'hw-client-address-title hw-client-address-title-contact'}>
            <span>
               Contacts
            </span>
            <Fab
                onClick={() => handlerEventContactAddEditClick('add')}
                icon={faPlus}
                // outline

                color={'appDefaultColor'}

            />
            <span className={'hw-help-text'}>ADD NEW CONTACT (ovo je samo ideja)</span>
          </div>
          <div className={'item-align-center col-md-12'}>
            <div className={'hw-client-contact-grid'}>
              <div className={'hw-client-contact-grid-row hw-grid-header-color'}>
                <div>TYPE</div>
                <div>VALUE</div>
                <div>&nbsp;</div>
              </div>
              <ClientContactTable
                  validation={validation}
                  fieldParentName={'contacts'}
                  handlerOnClickEvent={handlerEventContactAddEditClick}
              />
            </div>
          </div>
          <div className={'container pt-4'}>

            <ButtonsForm
                  buttonsCancel={{
                    label:'CANCEL',
                    action: handlerCancel
                  }}
                  buttonSubmit={{
                    label: 'SUBMIT',
                    action: handlerOnSubmit
                  }}
            />
          </div>

        </div>

      </div>
     
    </>
  )
}

export const openDialogEditContactForm = (index : number,data : IContactModal,submitFunc ?: (r : IContactModal, index ?: number) => void) => {
  EasyDialog((closeDialog : () => any, openDialog : (data : any) => any) => {
    const Component = () => {
      return (
        <>
          <CenteredDialog
              title={'Edit Contact'}
              closeAction={closeDialog}
              Component={ContactAddMoreComponent}
              componentRenderProps={{
                closeDialog: closeDialog,
                submitFunc: submitFunc,
                index: index,
                updateData: data
              }}
          />
        </>
      )
    }
    openDialog(<Component/>)
  })
}

export const openDialogAddContactForm = (submitFunc : (r : IContactModal) => void) => {
  EasyDialog((closeDialog : () => any, openDialog : (data : any) => any) => {
    const Component = () => {
      return (
        <>
          <CenteredDialog
                title={'Add Contact'}
                closeAction={closeDialog}
                Component={ContactAddMoreComponent}
                componentRenderProps={{
                  closeDialog: closeDialog,
                  submitFunc: submitFunc
                }}
          />
        </>
      )
    }
    openDialog(<Component/>)
  })
}

interface IContactAddEditProps {
  closeDialog : () => void
  submitFunc : (r : IContactModal,index ?: number) => void
  index ?: number,
  updateData ?: IContactModal
}

export const ContactAddMoreComponent = ({index,closeDialog,submitFunc,updateData} : IContactAddEditProps) => {

  const initData : IContactModal = updateData ? updateData : { flag: '', value: ''}

  const currValidation = useValidation<IContactModal>({
    initialData: initData
  })

  const handlerOnSubmit = async () => {
    const {error, data} = await currValidation.validate()
    if (error) {
      return
    }
    await submitFunc(data as IContactModal,index)
  }

  const handlerCancelDialog = () => {
    closeDialog()
  }

  return (
    <div className={'d-flex hw-client-form-add-contact-form'}>
      <div className={'container'}>
        <div className={'col-5'}>
          <SelectTextWithValidation
              required
              label={'Contact type'}
              helperText={'choose contact'}
              options={[
                {
                  label: 'EMAIL',
                  value: CONTACT_TYPES.EMAIL.toString()
                },
                {
                  label: 'MOBILE',
                  value: CONTACT_TYPES.MOBILE.toString()
                },
                {
                  label: 'PHONE',
                  value: CONTACT_TYPES.PHONE.toString()
                },
                {
                  label: 'FAX',
                  value: CONTACT_TYPES.FAX.toString()
                },
                {
                  label: 'WEBSITE',
                  value: CONTACT_TYPES.WEBSITE.toString()
                }
              ]}
              validation={{
                useValidation: currValidation,
                model: 'flag',
                rule: {
                  required,
                }
              }}
          />
        </div>
        <div className={'col-md-7'}>
          <InputTextWithValidation
            required
            label={'Contact type value'}
            helperText={'enter value'}
            validation={{
              useValidation: currValidation,
              model:'value',
            }}
          />
        </div>
        <div className={'col-md-12 py-3'}>
          <ButtonsForm
                buttonsCancel={{
                  label:'CANCEL',
                  action: handlerCancelDialog
                }}
                buttonSubmit={{
                  label: 'SUBMIT',
                  action: handlerOnSubmit
                }}
          />
        </div>

      </div>
    </div>
  )
}

export default ClientForm
