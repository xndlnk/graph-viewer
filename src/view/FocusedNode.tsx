import * as React from 'react'
import { Graph } from './Graph'
import * as model from '../domain/model'
import { GraphService } from '../domain/service'
import { Route, Link, match, RouteComponentProps } from 'react-router-dom'

export const FocusedNode = (props: FocusedNodeProps) => {
  let graphService = new GraphService(props.graph)

  let neighbourNodes = graphService.getNeighbourNodes(props.focusedNodeId)

  let nodes = neighbourNodes.slice()
  let focusedNode = graphService.findNode(props.focusedNodeId)
  nodes.push(focusedNode)

  let focusedGraph: model.Node = {
    id: 'focused_' + props.focusedNodeId,
    nodes: nodes,
    edges: graphService.getNeighbourEdges(props.focusedNodeId)
  }

  console.log(JSON.stringify(focusedGraph, null, 2))

  return (
    <Graph graph={focusedGraph} />
  )
}

export interface FocusedNodeProps {
  graph: model.Node
  focusedNodeId: string
}
