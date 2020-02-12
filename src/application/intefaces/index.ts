
export interface IItemModel {
  id : number
  description : string
  printDescription ? : string
  barCode : string
  vat : string | number
  price : string | number
  group ? : string | number
}

export  interface  IVats {
  value : number /** value of the vats like 20.00 */
  mark : string /** short description or mark like A or TAX A */
}
