export interface Layout {
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
  points: Array<{x: number, y: number}>
}
