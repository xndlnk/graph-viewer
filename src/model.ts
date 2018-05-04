export interface Node {
  id: string
  label?: string
  kind?: string
  nodes?: Node[]
  edges?: Edge[]
  properties?: Property[]
}

export interface Property {
  name: string
  value: string
}

export interface Edge {
  sourceNode: string
  targetNode: string
  kind?: string
}
