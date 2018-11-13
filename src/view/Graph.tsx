import * as React from 'react'

import * as model from '../domain/model'
import { Nodes } from './Nodes'
import { Edge } from './Edge'
import { NodeViewProps } from './NodeViewProps'

export interface GraphProps extends NodeViewProps {
  graph: model.Node
}

export const Graph = (props: GraphProps) => {
  const { graph, graphLayout, onClick } = props

  // INFO: svg edges have to be included all at once here.
  // using higher z-index for svg is not working because div-elements are not accessible anymore.
  return (
    <div
      style={{
        width: graphLayout.getGraphWith(),
        height: graphLayout.getGraphHeight(),
        position: 'relative'
      }}
    >
      <Nodes nodes={graph.getNodes()} graphLayout={graphLayout}
        onClick={onClick}></Nodes>

      <svg width={graphLayout.getGraphWith() + 10}
        height={graphLayout.getGraphHeight() + 10}>
        {
          graph.getAllEdges().map(edge => (
            <Edge key={edge.sourceId + '-' + edge.targetId} edge={edge}
              arrangedEdge={graphLayout.getEdgeLayout(edge.sourceId, edge.targetId)} />
          ))
        }
      </svg>
    </div>
  )
}
