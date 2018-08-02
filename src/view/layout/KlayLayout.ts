import * as model from '../../domain/model'
import { Layout, NodeLayout, EdgeLayout } from './layoutModel'
import * as _ from 'lodash'
const klay = require('klayjs')

export class KlayLayout implements Layout {
  private graphWithLayout: any

  constructor(private graph: model.Node) {
  }

  async computeLayout(): Promise<Layout> {
    const klayGraph = new KlayModelAdapter().convertGraph(this.graph)

    return new Promise<Layout>(resolve => {
      klay.layout({
        graph: klayGraph,
        success: (graphWithLayout: any) => {
          this.graphWithLayout = graphWithLayout
          resolve(this)
        }
      })
    })
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
      return currentNode.children
        .map((child: any) => this.findChild(id, child))
        .find((child: any) => child != null)
    }
    return null
  }

  getEdgeLayout(sourceId: string, targetId: string): EdgeLayout {
    // TODO: search for nested edges
    const edge: KlayEdge = this.graphWithLayout.edges.find((edge: any) => edge.source === sourceId && edge.target === targetId)
    if (!edge || !edge.sourcePoint || !edge.targetPoint) {
      return {
        points: []
      }
    }

    const points: Array<{x: number, y: number}> = []
    points.push(edge.sourcePoint)
    if (edge.bendPoints) {
      edge.bendPoints.forEach(p => points.push(p))
    }
    points.push(edge.targetPoint)

    const nestedParentNode = this.deepFindNestedParentNode(sourceId)
    if (nestedParentNode) {
      console.log('source ' + sourceId + ' has parent ' + nestedParentNode.id)
      return {
        points: this.getPointsAdjustedRelativeToParentNode(points, nestedParentNode.id)
      }
    } else {
      return {
        points: points
      }
    }
  }

  /** searches for a parent node that is at least on the second level of the graph, i.e. nested in the root node */
  deepFindNestedParentNode(nodeIdToSearch: string): model.Node {
    return this.graph.getNodes()
      .map(node => node.deepFindParendNodeById(nodeIdToSearch))
      .find(parentNode => parentNode !== undefined)
  }

  getPointsAdjustedRelativeToParentNode(points: Array<{x: number, y: number}>, parentNodeId: string): Array<{x: number, y: number}> {
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
        'algorithm': 'layered',
        'direction': 'DOWN',
        'edgeRouting': 'POLYLINE',
        'layoutHierarchy': true
      },
      children: graph.getNodes().map(node => this.convertNode(node)),
      edges: graph.getEdges().map(edge => this.convertEdge(edge))
    }
  }

  convertNode(node: model.Node): KlayNode {
    const klayNode: KlayNode = {
      id: node.id,
      width: 100,
      height: 40,
      properties: {
        'algorithm': 'layered',
        'direction': 'DOWN',
        'edgeRouting': 'POLYLINE',
        'layoutHierarchy': true
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

// ----

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
  sourcePoint: {x: number, y: number}
  targetPoint: {x: number, y: number}
  bendPoints: Array<{x: number, y: number}>
}

/* class ElkModelAdapter {
  convertGraph(graph: model.Node): any {
    return {
      id: 'root',
      layoutOptions: { 'elk.algorithm': 'layered' },
      children: graph.getNodes().map(node => this.convertNode(node)),
      edges: graph.getEdges().map(edge => this.convertEdge(edge))
    }
  }

  convertNode(node: model.Node): ElkNode {
    const elkNode: ElkNode = {
      id: node.id,
      width: 100,
      height: 40
    }
    if (node.hasNodes()) {
      elkNode.children = node.getNodes().map(node => this.convertNode(node))
    }
    if (node.hasEdges()) {
      elkNode.edges = node.getEdges().map(edge => this.convertEdge(edge))
    }
    return elkNode
  }

  convertEdge(edge: model.Edge): any {
    return {
      id: edge.sourceId + '-' + edge.targetId,
      source: edge.sourceId,
      target: edge.targetId
    }
  }
}*/
