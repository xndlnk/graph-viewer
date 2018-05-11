import * as React from 'react'
import { Graph } from './Graph'
import * as model from '../domain/model'
import { NodeCollapser } from '../domain/NodeCollapser'

export interface CollapsedNodeProps {
  node: model.Node
}

export const CollapsedNode = (props: CollapsedNodeProps) => {
  let nodeCollapser = new NodeCollapser()
  let collapsedNode = nodeCollapser.collapseContainedNodes(props.node)

  return (
    <Graph graph={collapsedNode} />
  )
}
