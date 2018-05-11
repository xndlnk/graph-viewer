import { Node } from '../../src/domain/model'
import { GraphService } from '../../src/domain/service'

test('find nodes by id', () => {
  let graph: Node = Node.ofRawNode({
    id: 'test-graph',
    nodes: [
      { id: 'a' },
      {
        id: 'b',
        nodes: [
          { id: 'c' }
        ]
      }
    ]
  })
  let graphService = new GraphService(graph)

  expect(graphService.findNode('a').id).toEqual('a')
  expect(graphService.findNode('c').id).toEqual('c')
})

test('reduce node to certain nodes', () => {
  let node: Node = Node.ofRawNode({
    id: 'a',
    nodes: [
      { id: 'b' },
      {
        id: 'c',
        nodes: [
          { id: 'd' },
          { id: 'e' }
        ],
        edges: [
          { sourceId: 'd', targetId: 'e' }
        ]
      }
    ],
    edges: [
      { sourceId: 'b', targetId: 'c' },
      { sourceId: 'b', targetId: 'd' }
    ]
  })
  let graphService = new GraphService(node)

  expect(graphService.reduceNodesRecursive(node, ['b', 'c']))
    .toEqual(Node.ofRawNode({
      id: 'a',
      nodes: [
        { id: 'b' },
        { id: 'c' }
      ],
      edges: [
        { sourceId: 'b', targetId: 'c' }
      ]
    }))

  expect(graphService.reduceNodesRecursive(node, ['d', 'e']))
    .toEqual(Node.ofRawNode({
      id: 'a',
      nodes: [
        {
          id: 'c',
          nodes: [
            { id: 'd' },
            { id: 'e' }
          ],
          edges: [
            { sourceId: 'd', targetId: 'e' }
          ]
        }
      ]
    }))
})
