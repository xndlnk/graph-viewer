import * as React from 'react'
import { render } from 'react-dom'
import * as dagre from 'dagre'
import { Graph } from './Graph'

const data = {
  nodes: [
    { id: 'a', color: 'red' },
    { id: 'b', color: 'blue' },
    { id: 'c', color: 'green' },
    { id: 'd', color: 'yellow' },
    { id: 'e', color: '#AEF023' }
  ],
  connections: [
    ['a', 'c'],
    ['a', 'e'],
    ['e', 'c'],
    ['a', 'd'],
    ['c', 'b'],
    ['d', 'b']
  ]
}
const g = new dagre.graphlib.Graph({ compound: true })

g.setGraph({})
g.setDefaultEdgeLabel(() => ({}))

data.nodes.forEach(node => {
  g.setNode(node.id, {
    width: 100,
    height: 40,
    ...node
  })
})
data.connections.forEach(connection => {
  g.setEdge(connection[0], connection[1])
})

g.setNode('group', {
  id: 'group',
  width: 150,
  height: 50,
  color: 'rgba(255, 0, 0, 0.5)'
})

g.setParent('c', 'group')
g.setParent('e', 'group')

g.graph().nodesep = 30
g.graph().edgesep = 15
g.graph().ranksep = 90
g.graph().ranker = 'tight-tree'

dagre.layout(g)

console.log(g.graph().height)
console.log(g.graph().width)
console.log(g.nodes().map(id => g.node(id)))
console.log(g.edges().map(id => g.edge(id)))

const SimpleGraph = () => (
  <Graph
    width={g.graph().width}
    height={g.graph().height}
    nodes={g.nodes().map(id => g.node(id))}
    edges={g.edges().map(id => g.edge(id))}
  />
)

export default SimpleGraph
