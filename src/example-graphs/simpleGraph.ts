import { Node, Edge } from '../model'

export const simpleGraph: Node = {
  id: 'simple',
  label: 'simple graph',
  nodes: [
    { id: 'a' },
    { id: 'b' },
    { id: 'c' },
    { id: 'd' },
    { id: 'e' }
  ],
  edges: [
    {
      sourceNode: 'a',
      targetNode: 'e'
    },
    {
      sourceNode: 'e',
      targetNode: 'c'
    },
    {
      sourceNode: 'a',
      targetNode: 'd'
    },
    {
      sourceNode: 'c',
      targetNode: 'b'
    },
    {
      sourceNode: 'd',
      targetNode: 'b'
    }
  ]
}
