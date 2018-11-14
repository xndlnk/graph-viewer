import * as model from '../../domain/model'
import { Layouter, GraphLayout, NodeLayout, EdgeLayout } from './layoutModel'
const klay = require('klayjs')

export class KlayLayouter implements Layouter {

  async computeLayout(graph: model.Node): Promise<GraphLayout> {
    const klayGraph = new KlayModelAdapter().convertGraph(graph)

    return new Promise<GraphLayout>(resolve => {
      klay.layout({
        graph: klayGraph,
        success: (graphWithLayout: KlayNode) => {
          const klayLayout = new KlayLayout(graph, graphWithLayout)
          resolve(klayLayout)
        }
      })
    })
  }
}

class KlayLayout implements GraphLayout {

  constructor(private graph: model.Node, private graphWithLayout: KlayNode) {
  }

  getGraphWith(): number {
    return this.graphWithLayout.width as number
  }

  getGraphHeight(): number {
    return this.graphWithLayout.height as number
  }

  getNodeLayout(id: string): NodeLayout {
    // TODO: add types to elkjs model
    const child = this.findChild(id, this.graphWithLayout)
    if (!child) return null

    return {
      x: child.x,
      y: child.y,
      width: child.width,
      height: child.height
    }
  }

  findChild(id: string, currentNode: any): any {
    if (currentNode.id === id) return currentNode
    else if (currentNode.children) {
      const result = currentNode.children
        .map((child: any) => this.findChild(id, child))
        .find((child: any) => child != null && child !== undefined)
      if (result) {
        return result
      }
    }
    return null
  }

  getEdgeLayout(sourceId: string, targetId: string): EdgeLayout {
    const edge: KlayEdge = this.deepFindEdge(this.graphWithLayout, sourceId, targetId)
    if (!edge || !edge.sourcePoint || !edge.targetPoint) {
      console.log('cannot find edge ' + sourceId + '-' + targetId)
      return {
        points: []
      }
    }

    const points: Array<{ x: number, y: number }> = []
    points.push(edge.sourcePoint)
    if (edge.bendPoints) {
      edge.bendPoints.forEach(p => points.push(p))
    }
    points.push(edge.targetPoint)

    const nestedParentNode = this.deepFindNestedParentNode(sourceId)
    if (nestedParentNode) {
      return {
        points: this.getPointsAdjustedRelativeToParentNode(points, nestedParentNode.id)
      }
    } else {
      return {
        points: points
      }
    }
  }

  deepFindEdge(node: KlayNode, sourceId: string, targetId: string): KlayEdge {
    if (node.edges) {
      const edge: KlayEdge = node.edges.find((edge: KlayEdge) => edge.source === sourceId && edge.target === targetId)
      if (edge) {
        return edge
      }
    }

    if (node.children) {
      return node.children
        .map(childNode => this.deepFindEdge(childNode, sourceId, targetId))
        .find(edge => edge != null)
    }

    return null
  }

  /** searches for a parent node that is at least on the second level of the graph, i.e. nested in the root node */
  deepFindNestedParentNode(nodeIdToSearch: string): model.Node {
    return this.graph.getNodes()
      .map(node => node.deepFindParendNodeById(nodeIdToSearch))
      .find(parentNode => parentNode !== undefined)
  }

  getPointsAdjustedRelativeToParentNode(points: Array<{ x: number, y: number }>, parentNodeId: string): Array<{ x: number, y: number }> {
    const parentNodeLayout = this.getNodeLayout(parentNodeId)
    return points.map(point => {
      return { x: parentNodeLayout.x + point.x, y: parentNodeLayout.y + point.y }
    })
  }
}

class KlayModelAdapter {
  convertGraph(graph: model.Node): any {
    return {
      id: 'root',
      properties: {
        algorithm: 'de.cau.cs.kieler.klay.layered',
        spacing: 20,
        layoutHierarchy: true,
        intCoordinates: true,
        'direction': 'DOWN',
        'edgeRouting': 'POLYLINE',
        // 'mergeEdges': true,
        'edgeSpacingFactor': 0.5,
        'crossMin': 'LAYER_SWEEP',
        thoroughness: 40
      },
      children: graph.getNodes().map(node => this.convertNode(node)),
      edges: graph.getEdges().map(edge => this.convertEdge(edge))
    }
  }

  convertNode(node: model.Node): KlayNode {
    const klayNode: KlayNode = {
      id: node.id,
      width: 150,
      height: 40,
      properties: {
        algorithm: 'de.cau.cs.kieler.klay.layered',
        spacing: 20,
        layoutHierarchy: true,
        intCoordinates: true,
        'direction': 'DOWN',
        'edgeRouting': 'POLYLINE',
        // 'mergeEdges': true,
        'edgeSpacingFactor': 0.5,
        'crossMin': 'LAYER_SWEEP',
        thoroughness: 40
      }
    }
    if (node.hasNodes()) {
      klayNode.children = node.getNodes().map(node => this.convertNode(node))
    }
    if (node.hasEdges()) {
      klayNode.edges = node.getEdges().map(edge => this.convertEdge(edge))
    }
    return klayNode
  }

  convertEdge(edge: model.Edge): any {
    return {
      id: edge.sourceId + '-' + edge.targetId,
      source: edge.sourceId,
      target: edge.targetId
    }
  }
}

interface KlayNode {
  id: string,
  x?: number,
  y?: number,
  width: number,
  height: number,
  children?: KlayNode[],
  edges?: KlayEdge[],
  properties?: any
}

interface KlayEdge {
  id: string,
  source: string,
  target: string,
  sourcePoint: { x: number, y: number }
  targetPoint: { x: number, y: number }
  bendPoints: Array<{ x: number, y: number }>
}
