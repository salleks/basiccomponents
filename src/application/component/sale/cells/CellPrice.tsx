import React                    from 'react'
import {ReceiptItem}            from '../../../models/ReceiptItem'
import {FontAwesomeIcon}        from '@fortawesome/react-fontawesome'
import {faPencilAlt}            from '@fortawesome/free-solid-svg-icons'
import {
  openDialogEditPrice,

} from '../SaleDashboard'

export interface ICellQuantityTotalProps {
  itemReceipt : ReceiptItem
}

const CellPrice = ({itemReceipt} : ICellQuantityTotalProps) => {

  return (
    <div className={'d-flex flex-fill flex-column '}  data-action-string ='change-price' data-action-id={itemReceipt.id}>
      <div>
        <small className={'d-flex opacity-7 color-gray'}><div>{itemReceipt.vatValueToString}</div><div><sup>%</sup></div></small>
      </div>

      <div className={'d-flex text-right  pt-1 justify-content-between'}  >
        <div className={'px-1  align-self-center fontSize-12'} onClick={() => openDialogEditPrice(itemReceipt)}><FontAwesomeIcon className={'icon-hover icon-active color-primary'} icon={faPencilAlt}></FontAwesomeIcon></div>
        <div style={{fontWeight: 300}} className={' align-self-center fontSize-24 color-gray '}>{itemReceipt.priceToString}</div>
      </div>

    </div>
  )

}

export default  CellPrice

