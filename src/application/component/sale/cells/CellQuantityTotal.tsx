import React                    from 'react'
import {ReceiptItem}            from '../../../models/ReceiptItem'
import {FontAwesomeIcon}        from '@fortawesome/react-fontawesome'
import {faPencilAlt}            from '@fortawesome/free-solid-svg-icons'
import {openDialogEditQuantity} from '../SaleDashboard'

export interface ICellQuantityTotalProps {
  itemReceipt : ReceiptItem
}

const CellQuantityTotal = ({itemReceipt} : ICellQuantityTotalProps) => {

  return (
    <div className={'d-flex flex-fill flex-column '} data-action-string ='change-quantity' data-action-id={itemReceipt.id}>
      <div className={'d-flex justify-content-start'} >
        <div className={'text-left align-self-start pr-1 opacity-7 fontSize-12 '} ><small><sub>x</sub></small></div>
        <div style={{fontWeight: 400}} className={'text-left  align-self-start color-gray fontSize-14'}>{itemReceipt.quantityToString} </div>
      </div>

      <div className={'d-flex  pt-1 text-right justify-content-between'}  >
        <div  className={'px-1  align-self-center fontSize-12'} onClick={() => openDialogEditQuantity(itemReceipt)} ><FontAwesomeIcon className={'icon-hover icon-active color-primary'} icon={faPencilAlt}></FontAwesomeIcon></div>
        <div style={{fontWeight: 300}} className={' align-self-center textShadow-white fontSize-26 color-gray'}>{itemReceipt.totalToString}</div>
      </div>

    </div>
  )

}

export default  CellQuantityTotal
