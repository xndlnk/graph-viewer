import * as React from 'react'
import { render } from 'react-dom'
import * as dagre from 'dagre'
import { Graph } from './Graph'
import * as model from './model'

export interface FocusedNodeProps {
  graph: model.Node
  focusedNode: model.Node
}

export class FocusedNode extends React.Component<FocusedNodeProps, any> {
  render() {
    return (
      <div>empty</div>
    )
  }
}
