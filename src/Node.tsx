import * as React from 'react'
import { render } from 'react-dom'

export interface NodeProps {
  id: string
  x: number
  y: number
  width: number
  height: number
  color: string
}

export class Node extends React.Component<NodeProps, any> {
  constructor(props: NodeProps) {
    super(props)
  }

  render() {
    return (
      <div
        key={this.props.id}
        style={{
          position: 'absolute',
          left: this.props.x - this.props.width / 2,
          top: this.props.y - this.props.height / 2,
          background: this.props.color,
          height: this.props.height,
          width: this.props.width,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 16,
          fontFamily: 'Roboto, sans-serif'
        }}
      >
        {this.props.id}
      </div>
    )
  }
}
