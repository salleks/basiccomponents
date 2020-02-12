import React                    from 'react'
import {
  FORMAT_CURRENCY_STANDARD,
  required,
  useValidation
}                               from 'react-hook-custom-validation'
import InputTextWithValidation  from '../../../forms/componentsWithValidation/InputTextWithValidation'
import SelectTextWithValidation from '../../../forms/componentsWithValidation/SelectTextWithValidation'
import ButtonsForm              from '../../../components/Button/ButtonsForm'

export interface IItemModel {
  description : string
  printDescription : string
  barCode : string
  vat : string
  price : string
  costPrice : string
  group : string
  sellBy : string
}

const vatsArray = [
  {
    label: 'A',
    value: '20.00',
    description: '20.00 %'
  },
  {
    label: 'B',
    value: '10.00',
    description: '10.00 %'
  },
  {
    label: 'C',
    value: '5.00',
    description: '5.00 %'
  },
  {
    label: 'D',
    value: '0.00',
    description: '0.00 %'
  },

]

const sellBy = [
  {
    label: 'Each'
  },
  {
    label: 'Weight'
  }
]

const groupArray = [
  {
    label: 'Drinks',

  },
  {
    label: 'Electronics',

  },
  {
    label: 'Books',

  },
  {
    label: 'Mobile Phones',

  },
  {
    label: 'Vegetables',

  },

]

const ItemsForm = () => {

  const validation = useValidation<IItemModel>({
    initialData: {
      description: '',
      printDescription: '',
      barCode: '',
      vat: '',
      price: '50',
      costPrice: '25',
      sellBy: '',
      group: ''
    }
  })
  const handlerCancelDialog = () => {
      
  }

  const handlerOnSubmit = () => {
      
  }
  return (
    <div className={'hw-items-form-root shadow-lg py-4'}>
      <div className={'container'} >
        <div className={'col-md-6'}>
          <InputTextWithValidation
                  required
                  label={'Barcode'}
                  helperText={'enter barcode'}
                  validation={{
                    useValidation: validation,
                    model: 'barCode',
                    rule: {
                      required
                    }
                  }}
          />
        </div>
        <div className={'col-md-6'}>
          <InputTextWithValidation
              label={'SKU'}
              helperText={'enter sku'}
              validation={{
                useValidation: validation,
                model: 'sku',

              }}
          />
        </div>
        <div className={'col-md-12 pt-2'}>
          <InputTextWithValidation
                  required
                  label={'Description'}
                  helperText={'enter description'}
                  validation={{
                    useValidation: validation,
                    model: 'description',
                    rule: {
                      required
                    }
                  }}
          />
        </div>

        <div className={'col-md-6 pt-2'}>
          <InputTextWithValidation
              label={'Print desc.'}
              helperText={'enter print description'}
              validation={{
                useValidation: validation,
                model: 'printDescription',
              }}
          />
        </div>

        <div className={'col-md-3 pt-2'}>
          <SelectTextWithValidation
              required
              label={'Vat'}
              helperText={'choose vat'}
              options={vatsArray}
              validation={{
                useValidation: validation,
                model: 'vat',
                rule: {
                  required,
                }
              }}
          />
        </div>
        <div className={'col-md-3 pt-2 '}>
          <InputTextWithValidation
                  label={'On Stock'}
                  helperText={'enter stock'}
                  align={'align-right'}
                  validation={{
                    useValidation: validation,
                    model: 'onStock',
                    defaultValue: '100',
                    format: {
                      rule: {
                        ...FORMAT_CURRENCY_STANDARD,
                        ...{
                          decimalPlace: 0
                        }
                      }
                    }
                  }}
          />
        </div>
        <div className={'col-md-4 pt-2'}>
          <InputTextWithValidation
                  label={'Low Stock'}
                  helperText={'enter low stock'}
                  align={'align-right'}
                  validation={{
                    useValidation: validation,
                    model: 'lowStock',
                    defaultValue: '10',
                    format: {
                      rule: {
                        ...FORMAT_CURRENCY_STANDARD,
                        ...{
                          decimalPlace: 0
                        }
                      }
                    }
                  }}
          />
        </div>
        <div className={'col-md-4 pt-2'}>
          <InputTextWithValidation
                  required
                  label={'Cost Price'}
                  helperText={'enter cost price'}
                  align={'align-right'}
                  validation={{
                    useValidation: validation,
                    model: 'costPrice',
                    defaultValue: '1',
                    rule: {
                      required
                    },
                    format: {
                      rule: {
                        ...FORMAT_CURRENCY_STANDARD,
                        ...{
                          decimalPlace: 0
                        }
                      }
                    }
                  }}
          />
        </div>
        <div className={'col-md-4 pt-2'}>
          <InputTextWithValidation
              required
              label={'Price'}
              helperText={'enter price'}
              align={'align-right'}
              validation={{
                useValidation: validation,
                model: 'price',
                defaultValue: '1',
                rule: {
                  required
                },
                format: {
                  rule: {
                    ...FORMAT_CURRENCY_STANDARD,
                    ...{
                      decimalPlace: 0
                    }
                  }
                }
              }}
          />
        </div>

        <div className={'col-md-6 pt-2'}>
          <SelectTextWithValidation
                  required
                  label={'Group'}
                  helperText={'choose group'}
                  options={groupArray}
                  validation={{
                    useValidation: validation,
                    model: 'group',
                    rule: {
                      required,
                    }
                  }}
          />
        </div>
        <div className={'col-md-6 pt-2'}>
          <SelectTextWithValidation
                  required
                  label={'Sell by'}
                  helperText={'choose sell options'}
                  options={sellBy}
                  validation={{
                    model: 'sellBy',
                    useValidation: validation,
                    rule: {
                      required,
                    }
                  }}
          />
        </div>
        <div className={'container pt-4'}>

          <ButtonsForm
                          buttonsCancel={{
                            label:'CANCEL',
                            action:  handlerCancelDialog
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

export default ItemsForm
