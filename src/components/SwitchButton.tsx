import React, {useState} from 'react'

const SwitchButton = () => {

  const [state,setState] : [boolean,(r : boolean) => void] = useState(true as boolean)

  const clickHandler = () => {
    setState(!state)
  }

  let rootCLass = 'hw-switch hw-switch-default hw-primary'
  if (!state) {
    rootCLass += ' off'
  }
  return (
    <div className={'hw-main-switch'}>
      <div className={rootCLass} onClick={clickHandler}>
        <input type={'checkbox'} defaultChecked/>

        <div className={'switch-group'}>

          <label className={'hw-switch-default hw-primary switch-on'}>ENABLE</label>
          <label className={'hw-switch-default hw-default active switch-off'}>DISABLE</label>
          <span className={'switch-handle hw-switch-default hw-default'}/>
        </div>

      </div>
    </div>
  )
}

export default SwitchButton
