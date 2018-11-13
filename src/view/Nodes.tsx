import * as React from 'react'

import * as model from '../domain/model'
import { Node } from './Node'
import { NodeViewProps } from './NodeViewProps'

export interface NodesProps extends NodeViewProps {
  nodes: model.Node[]
}

// props with destructuring
export const Nodes = ({ nodes, ...otherProps }: NodesProps) => (
  <div>
    {
      nodes.map(node => (
        <Node
          key={node.id}
          node={node}
          {...otherProps}
        />
      ))
    }
  </div>
)
