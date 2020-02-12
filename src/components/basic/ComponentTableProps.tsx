import React from 'react'

const ComponentTableProps =  (props : React.PropsWithChildren<any>) => {

  const styleRoot = {
    border: '1px solid #eee',
    padding: '10px',
    verticalAlign: 'middle',
    width: '1300px',
    display: 'flex',
    alignItems: 'center'
  }

  const styleDivComponent : any = {
    borderRight: '2px solid #eee',
    padding: '0px 10px',
    flex: '1.5'

  }

  const styleDivType : any = {
    padding: '10px',
    background: 'f2f2f2',
    borderRight: '2px solid #eee',
    textAlign: 'center',
    flex: '1'
  }
  const styleDivDefault : any = {
    borderRight: '2px solid #eee',
    padding: '10px',
    background: 'f2f2f2',
    textAlign: 'center',
    flex: '1'
  }
    
  const styleDivExplain : any = {
    padding: '10px',
    background: 'f2f2f2',
    textAlign: 'left',
    flex: '5',
    flexWrap: 'wrap'
  }

  return (
    <div style = {styleRoot}>
      <div style={styleDivComponent}>
        {props.children[0]}
      </div>
      <div style={styleDivType}>
        {props.children[1]}
      </div>
      <div style={styleDivDefault}>
        {props.children[2]}
      </div>
      <div style={styleDivExplain}>
        {props.children[3]}
      </div>
    </div>
  )

}

export  default  ComponentTableProps
