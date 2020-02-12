import {
    IItemModel,
    IVats
}                        from "../intefaces";
import {round as _round} from 'lodash'
import {
    formatDecimal,
    gui
}                        from "../utils/Utils";

export class ReceiptItem {

    private _id : number|string
    private _item: IItemModel
    private _quantity: number
    private _price : number
    private _vatsArray: IVats[]

    constructor(item: IItemModel,vats: IVats[],quantity?: number) {
        this._quantity = quantity || 1
        this._price = +item.price
        this._item= item
        this._vatsArray=vats
        this._id = gui(); /// should generate
    }

    get vatValueToString(){
         return formatDecimal(this._vatsArray[+this._item.vat].value,0)
    }

    get id() {
         return this._id
    }

    get price () {
          return this._price
    }

    get description() {
         return this._item.description
    }

    get barCode () {
         return this._item.barCode
    }

    get itemModel () {
         return this._item
    }

    /** return tax position not value */
    get taxNumber ():number {
          return +this._item.vat
    }

    get quantity () {
         return this._quantity
    }

    get quantityToString () {
         return formatDecimal(this.quantity,3)
    }

    get priceToString(){
        return formatDecimal(this.price)
    }

    get total() {
         return _round((this.price * this.quantity),2)
    }

    get totalToString () {
          return formatDecimal(this.total)
    }







}
