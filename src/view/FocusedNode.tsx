import * as React from 'react'
import { Graph } from './Graph'
import * as model from '../domain/model'
import { GraphService } from '../domain/service'
import { NodeFocusser } from '../domain/NodeFocusser'
import { Route, Link, match, RouteComponentProps } from 'react-router-dom'

export const FocusedNode = (props: FocusedNodeProps) => {
  let graphService = new GraphService(props.graph)

  let focusedNode = graphService.findNode(props.focusedNodeId)
  let neighbourNodes = graphService.getNeighbourNodes(focusedNode)

  let nodes = neighbourNodes.slice()
  nodes.push(focusedNode)

  let focusedGraph: model.Node = new model.Node(
    'focused_' + props.focusedNodeId,
    nodes,
    graphService.getNeighbourEdges(focusedNode))

  return (
    <Graph graph={focusedGraph} />
  )
}

export interface FocusedNodeProps {
  graph: model.Node
  focusedNodeId: string
}
