import { RawNode, Node } from '../domain/model'

const rawSimpleGraph: RawNode = {
  id: 'simple',
  nodes: [
    { id: 'source1' },
    { id: 'source2' },
    { id: 'sink1' },
    { id: 'sink2' },
    {
      id: 'subsystem1',
      nodes: [
        { id: 'a' },
        { id: 'c' }
      ],
      edges: [
        {
          sourceId: 'c',
          targetId: 'a'
        }
      ],
      props: {
        color: 'rgba(255, 0, 0, 0.2)'
      }
    },
    { id: 'b' },
    { id: 'd' }
  ],
  edges: [
    {
      sourceId: 'source1',
      targetId: 'c'
    },
    {
      sourceId: 'c',
      targetId: 'd'
    },
    {
      sourceId: 'source2',
      targetId: 'c'
    },
    {
      sourceId: 'source2',
      targetId: 'd'
    },
    {
      sourceId: 'd',
      targetId: 'b'
    },
    {
      sourceId: 'a',
      targetId: 'sink1'
    },
    {
      sourceId: 'b',
      targetId: 'sink1'
    },
    {
      sourceId: 'b',
      targetId: 'sink2'
    }
  ]
}

export const simpleGraph = Node.ofRawNode(rawSimpleGraph)
