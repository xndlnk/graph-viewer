import * as React from 'react'
import { render } from 'react-dom'
import * as dagre from 'dagre'
import { Graph } from './Graph'
import * as model from './model'
import { simpleGraph } from './example-graphs/simpleGraph'

let dagreGraph = convertGraphToDagreGraph(simpleGraph)
dagre.layout(dagreGraph)

export const SimpleGraph = () => (
  <Graph
    width={dagreGraph.graph().width}
    height={dagreGraph.graph().height}
    nodes={dagreGraph.nodes().map(id => dagreGraph.node(id))}
    edges={dagreGraph.edges().map(id => dagreGraph.edge(id))}
  />
)

function convertGraphToDagreGraph(graph: model.Node): dagre.graphlib.Graph {
  const dagreGraph = new dagre.graphlib.Graph({ compound: true })

  dagreGraph.setGraph({})
  dagreGraph.setDefaultEdgeLabel(() => ({}))

  graph.nodes.forEach(node => {
    dagreGraph.setNode(node.id, {
      width: 100,
      height: 40,
      color: 'lightgrey',
      ...node
    })
  })
  graph.edges.forEach(edge => {
    dagreGraph.setEdge(edge.sourceNode, edge.targetNode)
  })

  dagreGraph.setNode('group', {
    id: 'group',
    width: 150,
    height: 50,
    color: 'rgba(255, 0, 0, 0.5)'
  })

  dagreGraph.setParent('c', 'group')
  dagreGraph.setParent('e', 'group')

  dagreGraph.graph().nodesep = 30
  dagreGraph.graph().edgesep = 15
  dagreGraph.graph().ranksep = 90
  dagreGraph.graph().ranker = 'tight-tree'

  return dagreGraph
}
