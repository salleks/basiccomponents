import React                   from 'react'
import SaleTable               from './SaleTable'
import {EasyDialog}            from '../../../components/EasyModel/EasyModal'
import {
  CenteredDialog,
  DialogQuestion
}                              from '../../../components/Dialog/DialogBasic'
import ChangeQuantityComponent from './ChangeQuantityComponent'
import ChangePriceComponent    from './ChangePriceComponent'
import TotalPayingComponent    from './TotalPayingComponent'
import Button                  from '../../../components/Button/Button'

const SaleDashboard = () => {

  const handlerEventCellClick = (event : React.MouseEvent<HTMLElement,MouseEvent>,id : number,action : string|null) : void => {

    if (action === 'delete') {

    }
  }

  return (
    <div className={'d-flex flex-fill col-md-12  h-100 pt-4'}>
     
      <div className={'col-md-9'}>
        <SaleTable />
      </div>
      <div  className={'col-md-3'}>
        <div className={'shadow-lg d-flex p-2 '}>
          <TotalPayingComponent/>
        </div>
      </div>

    </div>
  )
}

export const openDialogEditPrice = (item : any) => {
  EasyDialog((closeDialog : () => any, openDialog : (data : any) => any) => {

    const Component = () => {
      const ComponentToRender = () => {
        return (
          <ChangePriceComponent
                item={item}
                closeDialog={closeDialog}
          />
        )
      }
      return (
        <>
          <CenteredDialog
                title={'Change price'}
                closeAction={closeDialog}
                Component={ComponentToRender}

          />
        </>
      )
    }
    openDialog(<Component/>)
  })
}

export const openDialogEditQuantity = (item : any) => {
  EasyDialog((closeDialog : () => any, openDialog : (data : any) => any) => {

    const Component = () => {
      const ComponentToRender = () => {
        return (
          <ChangeQuantityComponent
              item={item}
              closeDialog={closeDialog}
          />
        )
      }
      return (
        <>
          <CenteredDialog
                title={'Change quantity'}
                closeAction={closeDialog}
                Component={ComponentToRender}

          />
        </>
      )
    }
    openDialog(<Component/>)
  })
}

export const openDialogRemoveItem = (id : number | string) => {
  EasyDialog((closeDialog : () => any, openDialog : (data : any) => any) => {

    const Component = () => {

      return (
        <>
          <DialogQuestion
                        text={'Are you sure, you want to delete this item?'}
                        closeAction={closeDialog}
                        title={'Delete item'}
                        action={closeDialog}
          />
        </>
      )
    }
    openDialog(<Component/>)
  })
}

export default SaleDashboard
