import * as React from 'react'
import { Graph } from './Graph'
import * as model from '../domain/model'
import { GraphService } from '../domain/service'
import { NodeFocusser } from '../domain/NodeFocusser'
import { Route, Link, match, RouteComponentProps } from 'react-router-dom'

export const FocusedNode = (props: FocusedNodeProps) => {
  const graphService = new GraphService(props.graph)
  const focusedNode = graphService.findNode(props.focusedNodeId)

  const nodeFocussor = new NodeFocusser(graphService)
  const focusedGraph = nodeFocussor.focusNode(props.graph, focusedNode)

  return (
    <Graph graph={focusedGraph} />
  )
}

export interface FocusedNodeProps {
  graph: model.Node
  focusedNodeId: string
}
