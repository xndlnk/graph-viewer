import * as React from 'react'
import { render } from 'react-dom'
import { Route, Link } from 'react-router-dom'

export interface NodeProps {
  id: string
  x: number
  y: number
  width: number
  height: number
  color: string
}

export const Node = (props: NodeProps) => {
  return (
    <div
        key={props.id}
        style={{
          position: 'absolute',
          left: props.x - props.width / 2,
          top: props.y - props.height / 2,
          background: props.color,
          height: props.height,
          width: props.width,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 16,
          fontFamily: 'Roboto, sans-serif'
        }}
    >
      <Link to={'/focus/' + props.id}>{props.id}</Link>
    </div>
  )
}
