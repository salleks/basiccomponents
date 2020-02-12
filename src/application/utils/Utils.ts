import *  as _ from 'lodash'
import {random as _random} from 'lodash'


export const  formatDecimal = (value : number|string, decimal: number = 2):string =>{
  const valNumber = typeof value === 'number' ? value : Number(value)
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimal,
    maximumFractionDigits: decimal
  })
  return formatter.format(valNumber)
}

export  const gui = ():string => {
   return `${_random(10,100000)}-${_random(10,100000)}`
}


const Utils = class Utils {

  static formatPrice (value : (number|string)) {
    const valNumber = typeof value === 'number' ? value : Number(value)
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
    return formatter.format(valNumber)
  }

  static formatQuantity (value : (number|string)) {
    const valNumber = typeof value === 'number' ? value : Number(value)
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    })
    return formatter.format(valNumber)
  }

  static checkObjectAreSameByValues (src : any, desc : any) {
    if (_.isNil(src) || _.isNil(desc) ) {
      return false
    }
    if (typeof src != typeof desc) {
      return false
    }

    const str = typeof desc
    switch (str) {
      case 'object':
        if (Array.isArray(str) || Array.isArray(desc)) {
          return false
        }
        break

      case 'bigint':
      case 'function':
      case 'symbol': return false
      default:
        return src === desc
    }

    const keysSrc = Object.keys(src).sort()
    const keysDest = Object.keys(desc).sort()
    if (keysSrc.length != keysDest.length) {
      return false
    }
    if (!_.isEqual(keysSrc,keysDest)) {
      return false
    }

    const len = keysSrc.length
    for (let i = 0;i < len;i++) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
         // @ts-ignore
      if (!Utils.checkObjectAreSameByValues(src[keysSrc[i]], desc[keysSrc[i]])) {
        return false
      }
    }

    return true
  }

  static toNumberFixed (value : string|number) {
    if (typeof value === 'number') {
      value = value.toString()
    }
    while (/\,/g.test(value)) {
      value = value.replace(',','')
    }
    return value
  }

}
export default  Utils
