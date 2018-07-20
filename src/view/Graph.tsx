import * as React from 'react'
import { render } from 'react-dom'
import { Node } from './Node'
import { Edge } from './Edge'
import * as model from '../domain/model'
import { withRouter } from 'react-router'
import { DagreLayout } from './layout/DagreLayout'

export interface GraphProps {
  graph: model.Node
}

export class Graph extends React.Component<GraphProps, any> {
  constructor(props: GraphProps) {
    super(props)
  }

  render() {
    const layout = new DagreLayout(this.props.graph)

    return (
      <div
        style={{
          width: layout.getGraphWith(),
          height: layout.getGraphHeight(),
          position: 'relative'
        }}
      >
        {
          this.props.graph.getNodes().map(node => {
            const nodeLayout = layout.getNodeLayout(node.id)
            return (
              <Node
                x={nodeLayout.x}
                y={nodeLayout.y}
                height={nodeLayout.height}
                width={nodeLayout.width}
                node={node}
              />
            )
          })
        }
        <svg width={layout.getGraphWith()} height={layout.getGraphHeight()}>
          {
            this.props.graph.getEdges().map(edge => (
              <Edge arrangedEdge={layout.getEdgeLayout(edge.sourceId, edge.targetId)} />
            ))
          }
        </svg>
      </div>
    )
  }
}
