import React from 'react'

const ShowComponent =  (props : React.PropsWithChildren<any>) => {

  const styleRoot = {
    border: '1px solid #eee',
    padding: '10px',
    verticalAlign: 'middle',
    width: '500px',
    display: 'flex',
    alignItems: 'center'
  }

  const styleDivComponent : any = {
    borderRight: '2px solid #eee',
    padding: '0px 10px',
    flex: '2'

  }

  const styleDivExplain : any = {
    padding: '10px',
    background: 'f2f2f2',
    textAlign: 'center',
    flex: '1'
  }

  return (
    <div style = {styleRoot}>
      <div style={styleDivComponent}>
        {props.children[0]}
      </div>
      <div style={styleDivExplain}>
        {props.children[1]}
      </div>
    </div>
  )

}

export  default  ShowComponent
