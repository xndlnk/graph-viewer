export interface Node {
  id: string
  label?: string
  kind?: string
  nodes?: Node[]
  edges?: Edge[]
}

export interface Edge {
  sourceNode: string
  targetNode: string
  kind?: string
}
