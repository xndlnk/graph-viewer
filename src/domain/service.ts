import { Node, Edge } from './model'

export class GraphService {
  graph: Node

  constructor(graph: Node) {
    this.graph = graph
  }

  findNode(nodeId: string): Node {
    return this.graph.nodes.find(node => node.id === nodeId)
  }

  getNeighbourNodes(nodeId: string): Node[] {
    let sourceNodeIds = this.graph.edges
      .filter((edge) => edge.targetNode === nodeId)
      .map((edge) => edge.sourceNode)

    let targetNodeIds = this.graph.edges
      .filter((edge) => edge.sourceNode === nodeId)
      .map((edge) => edge.targetNode)

    let neighbourNodes = this.graph.nodes
      .filter((node) => sourceNodeIds.includes(node.id) || targetNodeIds.includes(node.id))

    return neighbourNodes
  }

  getNeighbourEdges(nodeId: string): Edge[] {
    return this.graph.edges
      .filter((edge) => edge.sourceNode === nodeId || edge.targetNode === nodeId)
  }
}
