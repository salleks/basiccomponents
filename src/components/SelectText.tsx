import React, {useState} from 'react'
import cx from 'classnames'

interface IDropDownState {
  open : boolean,
  selected : string,
  value : string,
  text : string
}

interface ISelectValues {
  value : string,
  label : string
}

export interface IDropDownProps {
  helperText ?: string,
  error ?: string|boolean,
  label ?: string,
  selectValues : ISelectValues[]
  field : string,
  value : string,
  onChange : (value : string,field : string) => void
  required ?: boolean
}

const SelectText = ({selectValues,label,value,required,error,helperText} : IDropDownProps) => {

  const [state,setState] : [
    IDropDownState,
    (r : IDropDownState) => void
  ]  = useState({
    open: false,
    value: value,
    text: value,
  } as IDropDownState)

  const handlerOpenClose = () => {
    setState({
      ...state,
      ...{
        open: !state.open
      }
    })
  }

  const handlerOnChange = (selectedValue : string,selectedText : string) => {
    setState({
      ...state,
      ...{
        open: false,
        value: selectedValue,
        text: selectedText
      }
    })
    // onChange(e,field)
  }

  const selectValuesClasses = cx({
    ['hw-select-data-value']:true,
    ['open'] : state.open,
    ['error']: !!error
  })

  const arrowClasses = cx({
    ['hw-arrow']: true,
    ['open']: !!state.open
  })

  return (
    <div className={'hw-select-text-root'}>
      <label className={'hw-select-label'}>{label} {required ? <small className={'hw-label-required'}>*</small> : null}</label>
      <div  className="hw-dropdown-main-div">
        <div className="hw-dropdown-selected-value" onClick={handlerOpenClose}>
          <input type="text"
                 className={'hw-dropdown-input'}
          />
          <div className="value">{state.text}</div>
          <div className={arrowClasses} >
            <span className={'hw-arrow-caret-open'}>&#9650;</span>
            <span className={'hw-arrow-caret-closed'}>&#9660;</span>
          </div>
        </div>

        <div className={selectValuesClasses}>
          {
            selectValues.map((item,key) => {
              let active = ''
              if (item.value === state.value) {
                active = 'select-item'
              }
              return (
                <div key={key} className={active} onClick={() => handlerOnChange(item.value,item.label)}>{item.label}</div>
              )
            })
          }
        </div>
        {
          error ? <div className={'hw-select-help-text'}>{error}</div> :
            (helperText ?
              <div className={'hw-select-help-text'}>{helperText}</div>
              :  <div className={'hw-select-help-text'}>&nbsp;</div>)
        }
      </div>
    </div>
  )
}

export default SelectText
