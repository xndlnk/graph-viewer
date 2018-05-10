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
    return this.getAllNodes().find(node => node.sameId(nodeId))
  }

  getNeighbourNodes(node: Node): Node[] {
    let sourceIds = this.getAllEdges()
      .filter((edge) => node.sameId(edge.targetId))
      .map((edge) => edge.sourceId)

    let targetIds = this.getAllEdges()
      .filter((edge) => node.sameId(edge.sourceId))
      .map((edge) => edge.targetId)

    let neighbourNodes = this.getAllNodes()
      .filter((node) => sourceIds.includes(node.id) || targetIds.includes(node.id))

    return neighbourNodes
  }

  getNeighbourEdges(node: Node): Edge[] {
    return this.getAllEdges()
      .filter((edge) => edge.sourceId === node.id || edge.targetId === node.id)
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
    if (root.getEdges()) {
      return _.union(root.getEdges(), _.flatten(root.getNodes().map(node => this.computeAllEdges(node))))
    } else {
      return []
    }
  }

  private computeAllNodes(root: Node): Node[] {
    if (root.getNodes()) {
      return _.union(root.getNodes(), _.flatten(root.getNodes().map(node => this.computeAllNodes(node))))
    } else {
      return []
    }
  }

}
