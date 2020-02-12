import React               from 'react'
import ComponentTableProps from '../basic/ComponentTableProps'

export interface IApiComponentProps {
  name : string,
  type : string,
  default : string,
  description : string
}

export interface IApiGeneratorProps {
  props : IApiComponentProps[],
  title : string
}

const ApiGeneratorComponent = ({props,title} : IApiGeneratorProps) => {

  const styleRoot = {
    padding: '10px',
    verticalAlign: 'middle',
    width: '100%'
  }

  return (
    <div style={styleRoot}>
      <div>{title}</div>
      <ComponentTableProps>
        <div>Name</div>
        <div>Type</div>
        <div>Default</div>
        <div>Description</div>
      </ComponentTableProps>
      {
        props.map((x : IApiComponentProps,key : number) => {
          return (
            <ComponentTableProps key={key}>
              <div>{x.name}</div>
              <div>{x.type}</div>
              <div>{x.default}</div>
              <div>{x.description}</div>
            </ComponentTableProps>
          )
        })
      }
    </div>
  )

}

export default ApiGeneratorComponent
