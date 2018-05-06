import { Node, Edge } from './model'
import * as _ from 'lodash'

export class GraphService {
  graph: Node

  constructor(graph: Node) {
    this.graph = graph
  }

  findNode(nodeId: string): Node {
    return this.getAllNodes(this.graph).find(node => node.id === nodeId)
  }

  getNeighbourNodes(nodeId: string): Node[] {
    let sourceNodeIds = this.graph.edges
      .filter((edge) => edge.targetNode === nodeId)
      .map((edge) => edge.sourceNode)

    let targetNodeIds = this.graph.edges
      .filter((edge) => edge.sourceNode === nodeId)
      .map((edge) => edge.targetNode)

    let neighbourNodes = this.getAllNodes(this.graph)
      .filter((node) => sourceNodeIds.includes(node.id) || targetNodeIds.includes(node.id))

    return neighbourNodes
  }

  getNeighbourEdges(nodeId: string): Edge[] {
    return this.graph.edges
      .filter((edge) => edge.sourceNode === nodeId || edge.targetNode === nodeId)
  }

  getAllEdges(root: Node): Edge[] {
    if (root.edges) {
      return _.union(root.edges, _.flatten(root.nodes.map(node => this.getAllEdges(node))))
    } else {
      return []
    }
  }

  getAllNodes(root: Node): Node[] {
    if (root.nodes) {
      return _.union(root.nodes, _.flatten(root.nodes.map(node => this.getAllNodes(node))))
    } else {
      return []
    }
  }

}
