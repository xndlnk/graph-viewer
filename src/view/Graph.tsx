import * as React from 'react'
import { render } from 'react-dom'
import * as dagre from 'dagre'
import { Node } from './Node'
import { Edge } from './Edge'
import * as model from '../domain/model'
import { withRouter } from 'react-router'
import { GraphService } from '../domain/service'
import * as _ from 'lodash'

export interface GraphProps {
  graph: model.Node
}

export class Graph extends React.Component<GraphProps, any> {
  constructor(props: GraphProps) {
    super(props)
  }

  render() {
    let dagreGraph = convertToDagreGraph(this.props.graph)
    dagre.layout(dagreGraph)

    let width = dagreGraph.graph().width
    let height = dagreGraph.graph().height

    let arrangedNodes = dagreGraph.nodes().map(id => dagreGraph.node(id))
    let arrangedEdges = dagreGraph.edges().map(id => dagreGraph.edge(id))

    return (
      <div
        style={{
          width: width,
          height: height,
          position: 'relative'
        }}
      >
        {
          arrangedNodes.map(node => (
            <Node
              x={node.x}
              y={node.y}
              height={node.height}
              width={node.width}
              node={node.node}
            />
          ))
        }
        <svg width={width} height={height}>
          {
            arrangedEdges.map(edge => (
              <Edge arrangedEdge={edge} />
            ))
          }
        </svg>
      </div>
    )
  }
}

function convertToDagreGraph(graph: model.Node): dagre.graphlib.Graph {
  const dagreGraph = new dagre.graphlib.Graph({ compound: true })

  dagreGraph.setGraph({})
  dagreGraph.setDefaultEdgeLabel(() => ({}))

  addNodes(dagreGraph, graph.getNodes())

  let secondLevelNodes = getSecondLevelNodes(graph)
  addNodes(dagreGraph, secondLevelNodes)
  setTopLevelNodeAsParentForSecondLevelNodes(dagreGraph, graph)

  let graphService = new GraphService(graph)

  graphService.getAllEdges().forEach(edge => {
    dagreGraph.setEdge(edge.sourceId, edge.targetId)
  })

  // dagreGraph.graph().nodesep = 30
  // dagreGraph.graph().edgesep = 15
  dagreGraph.graph().ranksep = 90
  dagreGraph.graph().ranker = 'tight-tree'

  return dagreGraph
}

function addNodes(dagreGraph: dagre.graphlib.Graph, nodes: model.Node[]) {
  nodes.forEach(node => {
    dagreGraph.setNode(node.id, {
      width: 100,
      height: 40,
      node: node
    })
  })
}

function setTopLevelNodeAsParentForSecondLevelNodes(dagreGraph: dagre.graphlib.Graph, graph: model.Node) {
  graph.getNodes()
    .filter(node => node.hasNodes())
    .forEach(topNode => {
      topNode.getNodes().forEach(secondNode => {
        if (secondNode.id !== topNode.id) {
          dagreGraph.setParent(secondNode.id, topNode.id)
        }
      })
    })
}

function getSecondLevelNodes(graph: model.Node): model.Node[] {
  return _.flatten(
    graph.getNodes()
      .filter(node => node.hasNodes())
      .map(node => node.getNodes()))
}
