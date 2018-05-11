import * as React from 'react'
import { Graph } from './Graph'
import * as model from '../domain/model'
import { GraphService } from '../domain/service'
import { NodeFocusser } from '../domain/NodeFocusser'
import { Route, Link, match, RouteComponentProps } from 'react-router-dom'

export const FocusedNode = (props: FocusedNodeProps) => {
  let graphService = new GraphService(props.graph)
  let focusedNode = graphService.findNode(props.focusedNodeId)

  let nodeFocussor = new NodeFocusser()
  let focusedGraph = nodeFocussor.focusNode(props.graph, focusedNode)

  return (
    <Graph graph={focusedGraph} />
  )
}

export interface FocusedNodeProps {
  graph: model.Node
  focusedNodeId: string
}
