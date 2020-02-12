import React                from 'react'
import CellQuantityTotal    from './cells/CellQuantityTotal'
import {
  IItemModel,
  IVats
}                           from '../../intefaces'
import {ReceiptItem}        from '../../models/ReceiptItem'
import CellDescription      from './cells/CellDescription'
import CellPrice            from './cells/CellPrice'
import TotalPayingComponent from './TotalPayingComponent'

export interface ISaleTableProps {
  items : any[]
  handlerEventCellClick : (event : React.MouseEvent<HTMLElement, MouseEvent>, id : number, action : string | null) => void
}

const SaleTable = () => {

  const items : IItemModel[] = [
    {
      id: 1,
      price: 12.00,
      vat: 2,
      description: 'Article 12',
      barCode: '1123'
    },
    {
      id: 2,
      price: 22.00,
      vat: 1,
      description: 'Article for sale today on discount 22%',
      barCode: '11234343'
    },
    {
      id: 1,
      price: 12.00,
      vat: 2,
      description: 'Article 12',
      barCode: '1123'
    },
    {
      id: 2,
      price: 22.00,
      vat: 1,
      description: 'Article for sale today on discount 22%',
      barCode: '11234343'
    },
    {
      id: 1,
      price: 12.00,
      vat: 2,
      description: 'Article 12',
      barCode: '1123'
    },
    {
      id: 2,
      price: 22.00,
      vat: 1,
      description: 'Article for sale today on discount 22%',
      barCode: '11234343'
    },
    {
      id: 1,
      price: 12.00,
      vat: 2,
      description: 'Article 12',
      barCode: '1123'
    },
    {
      id: 2,
      price: 22.00,
      vat: 1,
      description: 'Article for sale today on discount 22%',
      barCode: '11234343'
    }
  ]

  const vats : IVats[] = [
    {
      value: 20,
      mark: 'A'
    },
    {
      value: 15,
      mark: 'B'
    },
    {
      value: 10,
      mark: 'C'
    },
    {
      value: 0,
      mark: 'E'
    }
  ]

  const itemReceipts : ReceiptItem[] = React.useMemo(() => {
    return [
      new ReceiptItem(items[0], vats,12.34),
      new ReceiptItem(items[1], vats,1.234),
      new ReceiptItem(items[1], vats,1.234),
      new ReceiptItem(items[1], vats,1.234),
      new ReceiptItem(items[1], vats,1.234),
      new ReceiptItem(items[1], vats,1.234),
      new ReceiptItem(items[1], vats,1.234),
      new ReceiptItem(items[1], vats,1.234),
      new ReceiptItem(items[1], vats,1.234),
      new ReceiptItem(items[1], vats,1.234),
      new ReceiptItem(items[1], vats,1.234)
    ]
  }, [items])

  return (

    <>
      {/* <div >
        <ChangeQuantityComponent
                item={{
                  quantity: '1.00'
                }}
                id={1}
                closeDialog={() => {}}
        />
      </div>*/}

      <div  className={'d-flex flex-column shadow-lg'} data-action-root>
        <div className={'container col-12 rounded-sm border-bottom py-2 my-0 mx-0 px-0 tableHeader-gradient  '}>
          <div className={'col-7'}>
            <div className={'d-flex justify-content-start text-upper'}>
              <div className={'text-center flex-fill '}>Description</div>
              <div className={'fontSize-10 pt-1'}>BarCode</div>
            </div>
          </div>
          <div className={'col-5 container px-1 text-upper' }>
            <div className={'col-5 border-left text-center border-right px-2'} >
                    Price
            </div>
            <div className={'col-7 '}>
              <div className={'d-flex justify-content-start text-upper'}>
                <div className={'fontSize-10 pt-1'}>Quantity</div>
                <div className={'text-right flex-fill'}>Total</div>
              </div>
            </div>
          </div>
        </div>
        <div className={'table-body'}>
          {
            itemReceipts.map((item, index) => {

              return (

                <div key={index} className={`container col-12 border-bottom py-1 my-0 mx-0 px-0 ${index % 2 === 1 ? 'row-odd' : 'row-even'}`}>
                  <div className={'col-7 '}>
                    <CellDescription itemReceipt={item} index={index + 1}/>
                  </div>
                  <div className={'col-5 container px-1' }>
                    <div className={'col-5 border-left border-right px-2'}  >
                      <CellPrice itemReceipt={item}/>
                    </div>
                    <div className={'col-7'}>
                      <CellQuantityTotal itemReceipt={item}/>
                    </div>
                  </div>
                </div>

              )

            })
          }
        </div>

      </div>

    </>
  )
}

export default SaleTable
