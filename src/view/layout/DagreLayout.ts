import * as dagre from 'dagre'
import * as model from '../../domain/model'
import { Layout, NodeLayout, EdgeLayout } from './layoutModel'
import { GraphService } from '../../domain/service'
import * as _ from 'lodash'

export class DagreLayout implements Layout {
  private dagreGraph: dagre.graphlib.Graph

  constructor(private graph: model.Node) {
  }

  getGraphWith(): number {
    return this.dagreGraph.graph().width
  }

  getGraphHeight(): number {
    return this.dagreGraph.graph().height
  }

  getNodeLayout(id: string): dagre.Node {
    return this.adjustCoordinates(id, this.dagreGraph.node(id))
  }

  adjustCoordinates(nodeId: string, nodeLayout: dagre.Node): dagre.Node {
    let x = nodeLayout.x - nodeLayout.width / 2
    let y = nodeLayout.y - nodeLayout.height / 2

    const parentId = this.dagreGraph.parent(nodeId)
    if (parentId) {
      const parentLayout = this.dagreGraph.node(parentId)
      x = x - (parentLayout.x - parentLayout.width / 2)
      y = y - (parentLayout.y - parentLayout.height / 2)
    }

    return {
      x: x,
      y: y,
      width: nodeLayout.width,
      height: nodeLayout.height
    }
  }

  getEdgeLayout(sourceId: string, targetId: string): dagre.GraphEdge {
    return this.dagreGraph.edge(sourceId, targetId)
  }

  async computeLayout(): Promise<Layout > {
    const dagreGraph = new dagre.graphlib.Graph({ compound: true })

    dagreGraph.setGraph({})
    dagreGraph.setDefaultEdgeLabel(() => ({}))

    this.addNodes(dagreGraph, this.graph.getNodes())

    let secondLevelNodes = this.getSecondLevelNodes(this.graph)
    this.addNodes(dagreGraph, secondLevelNodes)
    this.setTopLevelNodeAsParentForSecondLevelNodes(dagreGraph, this.graph)

    let graphService = new GraphService(this.graph)

    graphService.getAllEdges().forEach(edge => {
      dagreGraph.setEdge(edge.sourceId, edge.targetId)
    })

    // dagreGraph.graph().nodesep = 30
    // dagreGraph.graph().edgesep = 15
    dagreGraph.graph().ranksep = 90
    dagreGraph.graph().ranker = 'tight-tree'

    dagre.layout(dagreGraph)

    this.dagreGraph = dagreGraph

    return new Promise<Layout>(resolve => resolve(this))
  }

  private addNodes(dagreGraph: dagre.graphlib.Graph, nodes: model.Node[]) {
    nodes.forEach(node => {
      dagreGraph.setNode(node.id, {
        width: 100,
        height: 40,
        node: node
      })
    })
  }

  private setTopLevelNodeAsParentForSecondLevelNodes(dagreGraph: dagre.graphlib.Graph, graph: model.Node) {
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

  private getSecondLevelNodes(graph: model.Node): model.Node[] {
    return _.flatten(
      graph.getNodes()
        .filter(node => node.hasNodes())
        .map(node => node.getNodes()))
  }

}
