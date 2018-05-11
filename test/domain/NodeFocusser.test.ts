import { Node } from '../../src/domain/model'
import { GraphService } from '../../src/domain/service'
import { NodeFocusser } from '../../src/domain/NodeFocusser'

test('node is focused', () => {
  let graph: Node = Node.ofRawNode({
    id: 'test-graph',
    nodes: [
      { id: 'a' },
      {
        id: 'b',
        nodes: [
          { id: 'c' },
          { id: 'd' }
        ],
        edges: [
          { sourceId: 'c', targetId: 'd' }
        ],
        props: {
          bProp: 'b-prop-value'
        }
      },
      { id: 'e' }
    ],
    edges: [
      { sourceId: 'a', targetId: 'b' },
      { sourceId: 'a', targetId: 'e' }
    ]
  })

  let nodeFocusser = new NodeFocusser()

  let expectedGraph: Node = Node.ofRawNode({
    id: 'test-graph',
    nodes: [
      { id: 'a' },
      {
        id: 'b',
        nodes: [
          { id: 'c' },
          { id: 'd' }
        ],
        edges: [
          { sourceId: 'c', targetId: 'd' }
        ],
        props: {
          bProp: 'b-prop-value'
        }
      }
    ],
    edges: [
      { sourceId: 'a', targetId: 'b' }
    ]
  })

  expect(nodeFocusser.focusNodeById(graph, 'b')).toEqual(expectedGraph)
})

test('when a node with no edges is focused then outside nodes with edges to inside nodes are added', () => {
  let graph: Node = Node.ofRawNode({
    id: 'test-graph',
    nodes: [
      { id: 'a' },
      {
        id: 'b',
        nodes: [
          { id: 'c' },
          { id: 'd' }
        ],
        edges: [
          { sourceId: 'c', targetId: 'd' }
        ]
      },
      { id: 'e' }
    ],
    edges: [
      { sourceId: 'a', targetId: 'c' },
      { sourceId: 'a', targetId: 'e' }
    ]
  })

  let nodeFocusser = new NodeFocusser()

  let expectedGraph: Node = Node.ofRawNode({
    id: 'test-graph',
    nodes: [
      { id: 'a' },
      {
        id: 'b',
        nodes: [
          { id: 'c' },
          { id: 'd' }
        ],
        edges: [
          { sourceId: 'c', targetId: 'd' }
        ]
      }
    ],
    edges: [
      { sourceId: 'a', targetId: 'c' }
    ]
  })

  expect(nodeFocusser.focusNodeById(graph, 'b')).toEqual(expectedGraph)
})
