import * as model from '../../domain/model'

export interface Layouter {
  computeLayout(graph: model.Node): Promise<GraphLayout>
}

export interface GraphLayout {
  getGraphWith(): number
  getGraphHeight(): number
  getNodeLayout(id: string): NodeLayout
  getEdgeLayout(sourceId: string, targetId: string): EdgeLayout
}

export interface NodeLayout {
  x: number
  y: number
  width: number
  height: number
}

export interface EdgeLayout {
  points: Array<{ x: number, y: number }>
}
