import * as dagre from 'dagre'
import * as model from '../domain/model'
import { GraphService } from '../domain/service'
import * as _ from 'lodash'

export class DagreLayout {
  private dagreGraph: dagre.graphlib.Graph

  constructor(private graph: model.Node) {
  }

  layout() {
    const dagreGraph = new dagre.graphlib.Graph({ compound: true })

    dagreGraph.setGraph({})
    dagreGraph.setDefaultEdgeLabel(() => ({}))

    this.addNodes(dagreGraph, this.graph.getNodes())

    let secondLevelNodes = this.getSecondLevelNodes(this.graph)
    this.addNodes(dagreGraph, secondLevelNodes)
    this.setTopLevelNodeAsParentForSecondLevelNodes(this.dagreGraph, this.graph)

    let graphService = new GraphService(this.graph)

    graphService.getAllEdges().forEach(edge => {
      this.dagreGraph.setEdge(edge.sourceId, edge.targetId)
    })

    // dagreGraph.graph().nodesep = 30
    // dagreGraph.graph().edgesep = 15
    dagreGraph.graph().ranksep = 90
    dagreGraph.graph().ranker = 'tight-tree'

    dagre.layout(dagreGraph)

    let arrangedNodes = dagreGraph.nodes().map(id => dagreGraph.node(id))
    let arrangedEdges = dagreGraph.edges().map(id => dagreGraph.edge(id))

    this.dagreGraph = dagreGraph
  }

  getGraphWith(): number {
    return this.dagreGraph.graph().width
  }

  getGraphHeight(): number {
    return this.dagreGraph.graph().height
  }

  getNodeLayout(id: string): dagre.Node {
    return this.dagreGraph.node(id)
  }

  getEdgeLayout(sourceId: string, targetId: string): dagre.GraphEdge {
    return this.dagreGraph.edge(sourceId, targetId)
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
