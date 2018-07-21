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

    // INFO: svg edges have to be included all at once here.
    // using higher z-index for svg is not working because div-elements are not accessible anymore.
    return (
      <div
        key="graph"
        style={{
          width: layout.getGraphWith(),
          height: layout.getGraphHeight(),
          position: 'relative'
        }}
      >
        {
          this.props.graph.getNodes().map(node => (
              <Node
                node={node}
                graphLayout={layout}
              />
            )
          )
        }
        <svg width={layout.getGraphWith() + 10} height={layout.getGraphHeight() + 10}>
          {
            this.props.graph.getAllEdges().map(edge => (
              <Edge edge={edge} arrangedEdge={layout.getEdgeLayout(edge.sourceId, edge.targetId)} />
            ))
          }
        </svg>
      </div>
    )
  }
}
