import React, {useState} from 'react'

interface IInputTextProps extends React.PropsWithChildren<any> {

}

interface IInputTextState {
  focused :  boolean
}

const InputTextFloat = ({onFocus,onBlur, ...rest} : IInputTextProps) => {

  const [state, setState] : [
    IInputTextState,
    (r : IInputTextState) => void
  ] = useState({
    focused: false
  } as IInputTextState)

  const onFocusHandler = (e : React.FocusEvent<HTMLInputElement>) => {
    setState({
      ...state,
      ...{
        focused: true
      }
    })
    e.persist()
    if (onFocus) {
      onFocus(e) 
    }
  }

  const onBlurHandler = (e : React.FocusEvent<HTMLInputElement>) => {
    setState({
      ...state,
      ...{
        focused:  false
      }
    })
    e.persist()
    if (onBlur) {
      onBlur(e)
    }
  }

  return (
    <div className = {'hw-input-text-float-root'}>
      <div className={state.focused ? 'hw-input-label-float focused' : 'hw-input-label-float'}>Label</div>
      <input  className={'hw-input-text-float'}
              onFocus={onFocusHandler}
              onBlur={onBlurHandler}
      />
      <div className={'hw-input-help-error-text-float'}>help error text</div>
    </div>
  )
}

export default InputTextFloat
