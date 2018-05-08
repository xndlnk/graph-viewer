import { Node, Edge } from './model'
import * as _ from 'lodash'

export class GraphService {
  private graph: Node
  private allNodes: Node[]
  private allEdges: Edge[]

  /** the nodes and edges of the provided graph must not change while using the GraphService. */
  constructor(graph: Node) {
    this.graph = graph
  }

  findNode(nodeId: string): Node {
    return this.getAllNodes().find(node => node.id === nodeId)
  }

  getNeighbourNodes(node: Node): Node[] {
    let allEdges = this.getAllEdges()
    let sourceNodeIds = allEdges
      .filter((edge) => edge.targetNode === node.id)
      .map((edge) => edge.sourceNode)

    let targetNodeIds = allEdges
      .filter((edge) => edge.sourceNode === node.id)
      .map((edge) => edge.targetNode)

    let neighbourNodes = this.getAllNodes()
      .filter((node) => sourceNodeIds.includes(node.id) || targetNodeIds.includes(node.id))

    return neighbourNodes
  }

  getNeighbourEdges(nodeId: string): Edge[] {
    return this.getAllEdges()
      .filter((edge) => edge.sourceNode === nodeId || edge.targetNode === nodeId)
  }

  getAllEdges(): Edge[] {
    if (!this.allEdges) {
      this.allEdges = this.computeAllEdges(this.graph)
    }
    return this.allEdges
  }

  getAllNodes(): Node[] {
    if (!this.allNodes) {
      this.allNodes = this.computeAllNodes(this.graph)
    }
    return this.allNodes
  }

  private computeAllEdges(root: Node): Edge[] {
    if (root.edges) {
      return _.union(root.edges, _.flatten(root.nodes.map(node => this.computeAllEdges(node))))
    } else {
      return []
    }
  }

  private computeAllNodes(root: Node): Node[] {
    if (root.nodes) {
      return _.union(root.nodes, _.flatten(root.nodes.map(node => this.computeAllNodes(node))))
    } else {
      return []
    }
  }

}
