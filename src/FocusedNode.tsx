import * as React from 'react'
import { Graph } from './Graph'
import { simpleGraph } from './example-graphs/simpleGraph'
import * as model from './model'

export const FocusedNode = (props: FocusedNodeProps) => {
  // TODO: auto-resolve id-based references in model
  let neighbourNodeIds: string[] = simpleGraph.edges
    .filter((edge) => edge.sourceNode === props.focusedNode.id || edge.targetNode === props.focusedNode.id)
    .map((edge) => edge.sourceNode)

  let neighbourNodes: model.Node[] = simpleGraph.nodes.filter((node) => neighbourNodeIds.includes(node.id))
  let nodes: model.Node[] = neighbourNodes.slice()
  nodes.push(props.focusedNode)

  let neighboursEdges: model.Edge[] = simpleGraph.edges
    .filter((edge) => neighbourNodeIds.includes(edge.sourceNode) || neighbourNodeIds.includes(edge.targetNode))

  let focusedGraph: model.Node = {
    id: 'focused_' + props.focusedNode.id,
    nodes: nodes,
    edges: neighboursEdges
  }

  return (
    <Graph graph={focusedGraph} />
  )
}

export interface FocusedNodeProps {
  graph: model.Node
  focusedNode: model.Node
}
