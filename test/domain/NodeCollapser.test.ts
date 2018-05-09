import { Node } from '../../src/domain/model'
import { GraphService } from '../../src/domain/service'
import { NodeCollapser } from '../../src/domain/NodeCollapser'

test('top level parent node of a graph is found', () => {
  let graph: Node = {
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
  }

  let gs = new GraphService(graph)
  let nodeCollapser = new NodeCollapser(gs)

  expect(nodeCollapser.getTopLevelParentInGraph(graph, 'c').id).toEqual('b')
  expect(nodeCollapser.getTopLevelParentInGraph(graph, 'd').id).toEqual('b')
})

test.only('edges to inside nodes of all contained nodes are moved to edges to the contained nodes themselfes', () => {
  let graph: Node = {
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
      { sourceNode: 'a', targetNode: 'c' }
    ]
  }

  let nodeCollapser = new NodeCollapser(new GraphService(graph))
  let collapsedGraph = nodeCollapser.collapseContainedNodes(graph)

  let expectedGraph: Node = {
    id: 'test-graph',
    nodes: [
      { id: 'a' },
      { id: 'b' }
    ],
    edges: [
      { sourceNode: 'a', targetNode: 'b' }
    ]
  }

  expect(collapsedGraph).toEqual(expectedGraph)
})
