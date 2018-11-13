import * as React from 'react'

import * as model from '../domain/model'
import { Node } from './Node'
import { Layout } from './layout/layoutModel'

export interface NodesProps {
  nodes: model.Node[]
  graphLayout: Layout
  onClick?: (node: model.Node) => void
}

export const Nodes = (props: NodesProps) => (
  <div>
    {
      props.nodes.map(node => (
        <Node
          key={node.id}
          node={node}
          graphLayout={props.graphLayout}
          onClick={props.onClick}
        />
      ))
    }
  </div>
)
