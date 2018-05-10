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
