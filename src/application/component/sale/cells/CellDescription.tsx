import React                  from 'react'
import {ReceiptItem}          from '../../../models/ReceiptItem'
import {FontAwesomeIcon}      from '@fortawesome/react-fontawesome'
import {
  faPencilAlt,
  faTimes
}                             from '@fortawesome/free-solid-svg-icons'
import {openDialogRemoveItem} from '../SaleDashboard'

export interface ICellDescription {
  itemReceipt : ReceiptItem
  index : number
}

const CellDescription = ({itemReceipt,index} : ICellDescription) => {

  return (
    <div className={'d-flex flex-fill flex-column color-gray  '}>
      <div className={'d-flex flex-fill flex-row justify-content-between'}>
        <div className={'px-1'}><small><sup>#</sup>{index}</small></div>
        <div className={'d-flex flex-grow-1 justify-content-end'}>
          <div  className={'text-right '}><small style={{fontWeight: 500}}>{itemReceipt.barCode}</small></div>
        </div>
      </div>

      <div className={'d-flex justify-content-between pt-1'}  style={{fontSize: '18px'}}>
        <div className={'pl-1 pr-2'} onClick={() => openDialogRemoveItem(itemReceipt.id)}><FontAwesomeIcon className={'icon-hover icon-active color-danger'} icon={faTimes}></FontAwesomeIcon></div>
        <div className={'flex-fill text-center'}>{itemReceipt.description}</div>
      </div>

    </div>
  )

}

export default  CellDescription
