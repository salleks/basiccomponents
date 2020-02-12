import {IItemModel} from '../items/ItemsForm'

export interface ISaleItemModel {
  id : number
  article : Partial<IItemModel>
  quantity : number
  total : number
}

export interface ISaleTableBarCodeDescriptionProps {
  index : number
  barCode : string
  description : string
}



export interface IQuantityComponentProps {
  quantity : string
  index : number
}
