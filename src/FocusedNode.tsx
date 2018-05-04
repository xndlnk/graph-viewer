import * as React from 'react'
import { Graph } from './Graph'
import { simpleGraph } from './example-graphs/simpleGraph'
import * as model from './model'
import { Route, Link, match, RouteComponentProps } from 'react-router-dom'

export const FocusedNode = (props: FocusedNodeProps) => {
  // TODO: auto-resolve id-based references in model
  let sourceNodeIds: string[] = simpleGraph.edges
    .filter((edge) => edge.targetNode === props.focusedNodeId)
    .map((edge) => edge.sourceNode)

  let targetNodeIds: string[] = simpleGraph.edges
    .filter((edge) => edge.sourceNode === props.focusedNodeId)
    .map((edge) => edge.targetNode)

  let neighbourNodes: model.Node[] = simpleGraph.nodes
    .filter((node) => sourceNodeIds.includes(node.id) || targetNodeIds.includes(node.id))

  let nodes: model.Node[] = neighbourNodes.slice()
  let focusedNode: model.Node = simpleGraph.nodes.find((node) => node.id === props.focusedNodeId)
  nodes.push(focusedNode)

  let neighboursEdges: model.Edge[] = simpleGraph.edges
    .filter((edge) => edge.sourceNode === props.focusedNodeId || edge.targetNode === props.focusedNodeId)

  let focusedGraph: model.Node = {
    id: 'focused_' + props.focusedNodeId,
    nodes: nodes,
    edges: neighboursEdges
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
