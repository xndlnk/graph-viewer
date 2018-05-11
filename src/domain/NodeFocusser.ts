import * as _ from 'lodash'
import { Node, Edge } from './model'
import { GraphService } from './service'

export class NodeFocusser {

  focusNodeById(graph: Node, focusedNodeId: string): Node {
    const graphService = new GraphService(graph)
    return this.focusNode(graph, graphService.findNode(focusedNodeId))
  }

  focusNode(graph: Node, focusedNode: Node): Node {
    // TODO: reused single graph service?
    const graphService = new GraphService(graph)

    const neighbourNodeIds = graphService.getNeighbourNodeIds(focusedNode.id)
    neighbourNodeIds.push(focusedNode.id)

    const allInnerNodeIds = graphService.getAllNodesOfNode(focusedNode).map(node => node.id)

    const additionalIds: string[] = []
    if (graphService.isNotConnected(focusedNode)) {
      graphService.getAllEdges().forEach(edge => {
        if (allInnerNodeIds.includes(edge.sourceId)) {
          additionalIds.push(edge.targetId)
        }
        if (allInnerNodeIds.includes(edge.targetId)) {
          additionalIds.push(edge.sourceId)
        }
      })
    }

    const nodeIdsToKeep = _.union(neighbourNodeIds, allInnerNodeIds, additionalIds)

    return graphService.reduce(nodeIdsToKeep)
  }
}
