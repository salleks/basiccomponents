import React, {PropsWithChildren} from 'react'

interface IPaper  extends PropsWithChildren<any> {
  header ?: string
}

const Paper  = ({header,children} : IPaper)  => {

  return (
    <div className={'hw-paper'}>
      {
        header ? (
          <div className={'hw-paper-header'}>
            <span className={'hw-paper-header-name'}>{header}</span>
          </div>
        ) : <></>
      }
      <div className={'hw-paper-body'}>
        {children}
      </div>

    </div>
  )
}

export default Paper
