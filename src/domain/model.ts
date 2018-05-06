export interface Node {
  id: string
  label?: string
  kind?: string
  nodes?: Node[]
  edges?: Edge[]
  color?: string
}

export interface Edge {
  sourceNode: string
  targetNode: string
  kind?: string
}
