import { Node, Edge } from '../domain/model'

export const simpleGraph: Node = {
  id: 'simple',
  label: 'simple graph',
  nodes: [
    { id: 'source1' },
    { id: 'source2' },
    { id: 'sink1' },
    { id: 'sink2' },
    {
      id: 'subsystem1',
      color: 'rgba(255, 0, 0, 0.2)',
      nodes: [
        { id: 'a' },
        { id: 'c' }
      ],
      edges: [
        {
          sourceNode: 'c',
          targetNode: 'a'
        }
      ]
    },
    { id: 'b' },
    { id: 'd' }
  ],
  edges: [
    {
      sourceNode: 'source1',
      targetNode: 'c'
    },
    {
      sourceNode: 'c',
      targetNode: 'd'
    },
    {
      sourceNode: 'source2',
      targetNode: 'c'
    },
    {
      sourceNode: 'source2',
      targetNode: 'd'
    },
    {
      sourceNode: 'd',
      targetNode: 'b'
    },
    {
      sourceNode: 'a',
      targetNode: 'sink1'
    },
    {
      sourceNode: 'b',
      targetNode: 'sink1'
    },
    {
      sourceNode: 'b',
      targetNode: 'sink2'
    }
  ]
}
