import { Node } from '../../src/domain/model'
import { GraphService } from '../../src/domain/service'
import { NodeCollapser } from '../../src/domain/NodeCollapser'

test('top level parent node of a graph is found', () => {
  let graph: Node = Node.ofRawNode({
    id: 'test-graph',
    nodes: [
      {
        id: 'a'
      },
      {
        id: 'b',
        nodes: [
          {
            id: 'c',
            nodes: [
              {
                id: 'd'
              }
            ]
          }
        ]
      }
    ]
  })

  let nodeCollapser = new NodeCollapser()

  expect(nodeCollapser.getTopLevelParentInGraph(graph, 'c').id).toEqual('b')
  expect(nodeCollapser.getTopLevelParentInGraph(graph, 'd').id).toEqual('b')
})

test('edges to inside nodes of all contained nodes are moved to edges to the contained nodes themselfes', () => {
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
    ],
    edges: [
      { sourceId: 'a', targetId: 'c' }
    ]
  })

  let nodeCollapser = new NodeCollapser()
  let collapsedGraph = nodeCollapser.collapseContainedNodes(graph)

  let expectedGraph: Node = Node.ofRawNode({
    id: 'test-graph',
    nodes: [
      { id: 'a' },
      { id: 'b' }
    ],
    edges: [
      { sourceId: 'a', targetId: 'b' }
    ]
  })

  expect(collapsedGraph).toEqual(expectedGraph)
})
