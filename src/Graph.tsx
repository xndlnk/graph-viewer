import * as React from 'react'
import { render } from 'react-dom'
import * as dagre from 'dagre'
import { Node } from './Node'
import * as model from './model'

export interface GraphProps {
  graph: model.Node
}

export class Graph extends React.Component<GraphProps, any> {
  constructor(props: GraphProps) {
    super(props)
  }

  render() {
    let dagreGraph = convertGraphToDagreGraph(this.props.graph)
    dagre.layout(dagreGraph)

    let width = dagreGraph.graph().width
    let height = dagreGraph.graph().height

    let nodes = dagreGraph.nodes().map(id => dagreGraph.node(id))
    let edges = dagreGraph.edges().map(id => dagreGraph.edge(id))

    console.log(JSON.stringify(nodes, null, 2))

    let polyLinePoints = edges.map(edge => {
      return edge.points.map(point => point.x + ',' + point.y).join(' ')
    })

    return (
      <div
        // width={this.props.width}
        // height={height}
        style={{
          position: 'relative'
        }}
      >
        {nodes.map(node => (
          <Node
            id={node.id}
            x={node.x}
            y={node.y}
            height={node.height}
            width={node.width}
            color={node.color}
          />
        ))}
        <svg width={width} height={height}>
          {polyLinePoints.map(points => (
            <polyline
              key={points}
              points={points}
              style={{
                fill: 'none',
                stroke: 'black',
                strokeWidth: 1
              }}
            />
          ))}
        </svg>
      </div>
    )
  }
}

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

  if (graph.nodes.find((node) => node.id === 'c') && graph.nodes.find((node) => node.id === 'e')) {
    dagreGraph.setNode('group', {
      id: 'group',
      width: 150,
      height: 50,
      color: 'rgba(255, 0, 0, 0.5)'
    })

    dagreGraph.setParent('c', 'group')
    dagreGraph.setParent('e', 'group')
  }

  dagreGraph.graph().nodesep = 30
  dagreGraph.graph().edgesep = 15
  dagreGraph.graph().ranksep = 90
  dagreGraph.graph().ranker = 'tight-tree'

  return dagreGraph
}
