import React         from 'react'
import {ReceiptItem} from '../../models/ReceiptItem'
import {Button}      from '../../../components/Button'

export interface ITotalPayingComponentProps {
  itemReceipt : ReceiptItem
}

const TotalPayingComponent = () => {
  return (

    <div className={'d-flex flex-fill flex-column color-grey text-upper'}>
      <div className={'d-flex pt-1 fontSize-24 '}>total sell</div>
      <div className={'d-flex text-right justify-content-between'}>
        <div className={'px-1 align-self-center fontSize-18 fontWeight-300'}>subtotal</div>
        <div style={{fontWeight: 300}} className={' align-self-center textShadow-white fontSize-26 color-gray'}>100</div>
      </div>
      <div className={'d-flex text-right justify-content-between'}>
        <div className={'px-1 align-self-center fontSize-18 fontWeight-300'}>total</div>
        <div style={{fontWeight: 300}} className={' align-self-center textShadow-white fontSize-26 color-gray'}>200</div>
      </div>
    </div>

  )
}

export default TotalPayingComponent